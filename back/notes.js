const { request } = require("express");
const express = require("express");
const router = new express.Router();
const db = require("./db");
// const noteModel = require("./../models/noteModel");
const cookieParser = require("cookie-parser")
const {createTokens, validateToken} = require("./JWT");
// const { user } = require("pg/lib/defaults");
const app = express()
// app.use(express.json());
app.use(cookieParser())
//// cache
const services = require("./proto/service_grpc_pb");
const messages = require('./proto/service_pb');
const grpc = require('@grpc/grpc-js');
const fs = require('fs')
//// cache
var cert = fs.readFileSync('./cert/ca-cert.pem');
creds = grpc.credentials.createSsl(cert)
const client = new services.AddServiceClient('localhost:8080', creds);

router.get("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
     // cache
     let parameterReq = new messages.Request1();
     parameterReq.setA('' + req.cookies.username + '-' +  id + '');
     client.getKey(parameterReq, function(err, response) {
         console.log(response.array[0]);
         if (response.array[0] != 'There is no such value in cache!' && response.array[0] != '!deleted!') {
            res.status(200).json(response.array[0]);
            return;
         }
         // db
         db.query(
            "SELECT * FROM notes WHERE id = $1",
            [id],
            (error, results, fields) => {
                if (error) {
                    throw error;
                }
                if (results.rows[0] == undefined) {
                    res.status(200).send("there is no such value in database")
                    return;
                }
                if((results.rows[0]["userid"] == req.cookies.username || ("admin" === req.cookies.username))){
                    res.status(200).json(results.rows[0]["content"]);
                } else{
                    res.status(200).send("you can not see another people's note")
                }
            }
        );
     });
     // cache
});

router.post("/notes/new", (req, res) => {
    try{
        const cookieUsername = req.cookies.username
        const { id, content } = req.body;
        // cache
        let parameterReq = new messages.Request2();
        parameterReq.setA('' + cookieUsername + '-' +  id + '');
        parameterReq.setB('' + content + '');
        client.setKey(parameterReq, function(err, response) {
            console.log(response.array[0]);
        });
        // cache
        db.query(
            "INSERT INTO notes(id, content, userid) VALUES($1, $2, $3)",
            [id, content, cookieUsername]
        );
        res.status(201).send(`note added with ID: ${id}`);
    }catch (err){
        console.log(err.message);
    }
});

router.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    db.query(
        "SELECT * FROM notes WHERE id = $1",
        [id],
        (error, results, fields) => {
            if (error) {
                throw error;
            }
            if (results.rows[0] == undefined) {
                res.status(200).send("there is no such value in database")
                return;
            }
            // cache
            let parameterReq = new messages.Request2();
            parameterReq.setA('' + req.cookies.username + '-' +  id + '');
            parameterReq.setB('' + content + '');
            client.setKey(parameterReq, function(err, response) {
                console.log(response.array[0]);
            });
            // cache
            if((results.rows[0]["userid"] == req.cookies.username) || ("admin" === req.cookies.username)){
                db.query(
                    "UPDATE notes SET content = $1 WHERE id = $2",
                    [content, id],
                    (error, results) => {
                        if (error) {
                            throw error;
                        }
                        res.status(200).send(`note updated with ID: ${id}`);
                    }
                );
            }else{
                res.status(200).send("you can not edit another people's note")
            }
        }
    );
});

router.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.query(
        "SELECT * FROM notes WHERE id = $1",
        [id],
        (error, results, fields) => {
            if (error) {
                throw error;
            }
            if (results.rows[0] == undefined) {
                res.status(200).send("there is no such value in database")
                return;
            }
             // cache
             let parameterReq = new messages.Request2();
             parameterReq.setA('' + req.cookies.username + '-' +  id + '');
             parameterReq.setB('' + '!deleted!' + '');
             client.setKey(parameterReq, function(err, response) {
                 console.log(response.array[0]);
             });
             // cache
            if((results.rows[0]["userid"] == req.cookies.username) || ("admin" === req.cookies.username)){
                db.query("DELETE FROM notes WHERE id = $1", [id], (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.status(200).send(`note deleted with ID: ${id}`);
                });
            }
            else{
                res.status(200).send("you can not see another people's note")
            }
        }
    );
});

module.exports = router;
