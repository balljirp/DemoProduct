const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');

let prod_list = [{
    id: null,
    title: null,
    price: null,
    description: null,
    category: null,
    image: null,
    rating: { rate: null, count: null },
    count: null
}];

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
//             count INTEGER NOT NULL,
//             num INTEGER NOT NULL
//         )`
// );

// ส่งแบบ form-data
// app.use(upload.array());
// app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cors());

app.post('/products', (req, res) => {
    prod_list = req.body;
    prod_list.forEach(product => {
        const sql = `INSERT INTO products(title, price, category, description, image, count, num)
                        VALUES(?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [product.title, product.price, product.category, product.description, product.image, product.rating.count, product.count], (err) => {
            if (err) return err.message;

            console.log("A new row has been created");
        });
    });

    db.close((err) => {
        if (err) return console.log(err.message);

        console.log("connection closed");
    });
});

app.listen(port, () => {
    console.log("Starting node.js at port " + port);
});