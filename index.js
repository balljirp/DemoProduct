const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');

const db = new sqlite3.Database("./products.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.log(err.message);

    console.log("connection successful");
});

// db.run(`CREATE TABLE products
//         (
//             prod_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//             title TEXT NOT NULL,
//             price INTEGET NOT NULL,
//             category TEXT NOT NULL,
//             description TEXT NOT NULL,
//             image TEXT NOT NULL,
//             piece INTEGER NOT NULL,
//             count INTEGER NOT NULL
//         )`
// );

// ส่งแบบ form-data
// app.use(upload.array());
// app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cors());

app.post('/products', (req, res) => {
    console.log(req.body);
    // const { body } = req;
    // const { firstname } = body;
    // const { lastname } = body;
    // const { username } = body;
    // const { email } = body;
    // const { password } = body;

    // const sql = `INSERT INTO users(first_name, last_name, username, password, email)
    //                     VALUES(?, ?, ?, ?, ?)`;

    // db.run(sql, [firstname, lastname, username, password, email], (err) => {
    //     if (err) return err.message;

    //     console.log("A new row has been created");
    // });

    db.close((err) => {
        if (err) return console.log(err.message);

        console.log("connection closed");
    });
});

// db.close((err) => {
//     if (err) return console.log(err.message);

//     console.log("connection closed");
// });

app.listen(port, () => {
    console.log("Starting node.js at port " + port);
});