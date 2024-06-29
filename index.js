const express = require('express');
const app = express();
const Pool = require('pg').Pool;
const path = require('path');
const ejs = require('ejs');
const PORT = 3000;
const client = require('./connection.js')
require('dotenv').config();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Client is listening on port " + PORT);
});

client.connect();

app.get('/users', (req, res) => {
    
    client.query('Select * from users', (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    });
});

app.get('/users/:id', (req, res) => {
    
    client.query(`Select * from users where id=${req.params.id}`, (err, result) => {
        if(!err) {
            res.send(result.rows)
        }
    });
});

app.post('/users', (req, res) => {
    const user = req.body;
    let insertQuery = `INSERT INTO users(id, firstname, lastname, location) VALUES ($1, $2, $3, $4)`;

    client.query(insertQuery, [user.id, user.firstName, user.lastName, user.location], (err, result) => {
        if (!err) {
            res.send("User added successfully!");
        } else {
            console.log(err);
            res.send("Error adding user");
        }
    });
});

app.put('/users/:id', (req, res) => {
    const user = req.body;
    const userId = req.params.id;
    let updateQuery = `UPDATE users SET firstname = $1, lastname = $2, location = $3 WHERE id = $4`;

    client.query(updateQuery, [user.firstName, user.lastName, user.location, userId], (err, result) => {
        if (!err) {
            res.send("User updated successfully!");
        } else {
            console.log(err);
            res.send("Error updating user");
        }
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    let updateQuery = `DELETE FROM public.users WHERE id=$1;`;

    client.query(updateQuery, [userId], (err, result) => {
        if (!err) {
            res.send("User deleted successfully!");
        } else {
            console.log(err);
            res.send("Error deleting user");
        }
    });
});
