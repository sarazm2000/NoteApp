const C = require("./constants");
const express = require("express");
const app = express();
const bp = require("body-parser");
const pool = require("./db");
const bcrypt = require("bcrypt");
const { user } = require("pg/lib/defaults");
const { addListener } = require("nodemon");
const cookieParser = require("cookie-parser");
const { createTokens, validateToken } = require("./JWT.js");
const res = require("express/lib/response");
const rateLimit = require("express-rate-limit");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
const router = require("./notes")

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    rateLimit({
        windowMs: 60 * 1000,
        max: C.limit,
        message: `You exceeded ${C.limit} request in 60 seconds limit. Please wait`,
        headers: true,
    })
);
app.use(router)

app.post("/reg", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if(username == "admin"){
            res.status(200).send("you can not use admin username")
        }else{
            const hashedPassword = await bcrypt.hash(password, 8);
            const newUser = await pool.query(
                "INSERT INTO users(username, password, email) VALUES($1 ,$2 ,$3)",
                [username, hashedPassword, email]
            );
            res.json(newUser);
        }     
    } catch (err) {
        console.log(err.message);
    }
});

app.post("/login", async (req, res) => {
    let isLogged = false;
    try {
        const { username, password } = req.body;
        const user = pool.query("SELECT * FROM users", (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                for (let i = 0; i < res.rows.length; i++) {
                    if (
                        res.rows[i].username === username &&
                        bcrypt.compareSync(password, res.rows[i].password)
                    ) {
                        isLogged = true;
                    }
                    else if("admin" === username &&
                        password == res.rows[i].password){
                            isLogged = true
                        }
                }
            }
        });

        setTimeout(() => {
            if (isLogged) {
                sessionid = uuidv4();
                const accessToken = createTokens(user);
                res.cookie("access-token", accessToken, {
                    maxAge: 3600 * 24 * 30 * 1000,
                });

                // res.cookie("session id", sessionid, {
                //     maxAge: 3600 * 24 * 30 * 1000,
                // });
                
                res.cookie("username", username, {
                    maxAge: 3600 * 24 * 30 * 1000,
                });
                req.cookies.username = username

                // const session = pool.query(
                //     "UPDATE users SET sessionid = $1 WHERE username = $2",
                //     [sessionid, username]
                // );
                res.json("successfuly logged in!")
                // console.log("logged in, jwt saved, session id saved.");
            } else {
                console.log("not logged in");
            }
        }, 100);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/profile", validateToken, (req, res) => {
    res.json("profile");
});

app.listen(3000, () => {
    console.log("server is up on port 3000");
});

module.exports = {}
