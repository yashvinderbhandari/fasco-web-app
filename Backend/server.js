const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash@999',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server.');

    connection.query('CREATE DATABASE IF NOT EXISTS Product_Details', (err) => {
        if (err) throw err;
        console.log('Database "Product_Details" created.');

        connection.changeUser({ database: 'Product_Details' }, (err) => {
            if (err) throw err;
            console.log('Connected to "Product_Details" database.');

            const createTableSQL = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    brand VARCHAR(255) NOT NULL,
                    image VARCHAR(255),
                    price DECIMAL(10, 2) NOT NULL
                )`;

            connection.query(createTableSQL, (err) => {
                if (err) throw err;
                console.log('Products table created.');
            });
        });
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

app.post('/add-product', upload.single('productImage'), (req, res) => {
    const { productName, productBrand, productPrice } = req.body;
    const productImage = req.file ? req.file.filename : null;

    const sql = 'INSERT INTO products (name, brand, image, price) VALUES (?, ?, ?, ?)';
    connection.query(sql, [productName, productBrand, productImage, productPrice], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ success: false, message: 'Error adding product' });
        }
        res.send({ success: true, message: 'Product added successfully!' });
    });
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ success: false, message: 'Error fetching products' });
        }
        res.json(results);
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    connection.query(sql, [productId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ success: false, message: 'Error fetching product' });
        }
        if (results.length === 0) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        res.json(results[0]);
    });
});

app.put('/products/:id', upload.single('productImage'), (req, res) => {
    const productId = req.params.id;
    const { productName, productBrand, productPrice } = req.body;
    const productImage = req.file ? req.file.filename : null;

    let sql = 'UPDATE products SET name = ?, brand = ?, price = ?';
    const values = [productName, productBrand, productPrice];

    if (productImage) {
        sql += ', image = ?';
        values.push(productImage);
    }

    sql += ' WHERE id = ?';
    values.push(productId);

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ success: false, message: 'Error updating product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        res.send({ success: true, message: 'Product updated successfully!' });
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';

    connection.query(sql, [productId], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ success: false, message: 'Error deleting product' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
        res.send({ success: true, message: 'Product deleted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
