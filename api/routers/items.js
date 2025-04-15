const express = require('express');
const db = require('../db');
const upload = require('../storage');

const itemsRouter = express.Router(); // router for handling routes related to items

itemsRouter.get('/', (req, res) => { // route to get all items
  const sql = `SELECT * FROM items`; // SQL query to select all data from the 'items' table

  db.query(sql, (err, results) => { // executes the query
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred'); // logs the error
    }
    res.json(results);
  });
});

itemsRouter.get('/:id', (req, res) => { // route to get a specific item by id
  const { id } = req.params;
  const sql = `SELECT * FROM items WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
    res.json(results[0]);
  });
});

itemsRouter.delete('/:id', (req, res) => { // route to delete a specific item by id
  const { id } = req.params;
  const sql = `DELETE FROM items WHERE id = ? LIMIT 1`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
    res.json({ message: 'Item Deleted' });
  });
});

itemsRouter.put('/:id', upload.single('image'), (req, res) => { // route to update a specific item by id
  const { id } = req.params;
  const { name, description, item_id } = req.body;

  let updateItemSQL = `UPDATE items SET name = ?, description = ?, item_id = ?`; // SQL query to update the item
  const queryParams = [name, description, item_id]; // parameters for the query

  if (req.file) { // if an image is uploaded, add it to the query
    updateItemSQL += `, image_name = ?`;
    queryParams.push(req.file.filename);  
  }

  updateItemSQL += ` WHERE id = ? LIMIT 1`; // add the condition to update the specific item
  queryParams.push(id); 

  db.query(updateItemSQL, queryParams, (err, results) => { // executes the query
    if (err) { 
      console.error(err);
      return res.status(500).send('An error occurred'); // returns an error response if an error occurs
    }
    res.json({ message: 'Item updated successfully' }); 
  });
});

itemsRouter.post('/', upload.single('image'), (req, res) => { // route to add a new item
  const { item_id, name, description } = req.body; 
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO items (brand_id, name, description, image_name) VALUES (?, ?, ?, ?)`; // SQL query to insert a new item into the items table

  db.query(sql, [item_id, name, description, image], (err, results) => { // executes the query
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred'); // returns an error response if an error occurs
    }
    res.json({ message: 'Item added successfully' }); 
  });
});

module.exports = itemsRouter; // exports the router to be used in other files