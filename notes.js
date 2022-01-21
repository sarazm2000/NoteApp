const { request } = require("express");
const express = require("express");
const router = new express.Router();
const db = require("../db");
const noteModel = require("./../models/noteModel");

router.get("/notes/:id", (req, res) => {
    db.pool.query(
        "SELECT * FROM notes WHERE id = $1",
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
});

router.post("/notes/new", (req, res) => {
    const { id, content } = req.body;
    db.pool.query(
        "INSERT INTO notes (id, content) VALUES ($1, $2)",
        [id, content],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(`note added with ID: ${id}`);
        }
    );
});

router.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    db.pool.query(
        "UPDATE notes SET content = $1 WHERE id = $2",
        [content, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`note updated with ID: ${id}`);
        }
    );
});

router.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    db.pool.query("DELETE FROM notes WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`note deleted with ID: ${id}`);
    });
});

module.exports = router;
