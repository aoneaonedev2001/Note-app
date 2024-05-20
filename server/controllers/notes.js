const db = require('../db');


//----createNote
exports.createNote = (req, res) => {
    const { title, content, customer_id ,category_id} = req.body;
    const sql = "INSERT INTO Note (title, content, created_at, updated_at, customer_id, category_id) VALUES (?, ?, NOW(), NOW(), ?, ?)";
    db.query(sql, [title, content, customer_id,category_id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ message: "Note has been created successfully." });
    });
  };
  

  //----readAllNote
  exports.readAllNote = (req, res) => {
    const sql = "SELECT * FROM Note";
    db.query(sql, (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json(results);
    });
  };

  //---readAllMyNote
  exports.readAllMyNote = (req, res) => {
       const { id } = req.params;
      //const { id } = req.body;
    const sql = "SELECT * FROM Note WHERE customer_id = ?";
    db.query(sql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Note not found." });
      }
      res.status(200).json(results);
    });
  };
  
  //----readNote
exports.readNote = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Note WHERE note_id = ?";
    db.query(sql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Note not found." });
      }
      res.status(200).json(results[0]);
    });
  };
  
  //----updateNote
  exports.updateNote = (req, res) => {
    const { id } = req.params;
    const { title, content,category } = req.body;
    const sql1 = "UPDATE Note SET title = ?, content = ?, category_id = ?, updated_at = NOW() WHERE note_id = ?";
    db.query(sql1, [title, content,category, id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Note not found." });
      }
    });
   
    const sql2 = "INSERT INTO HistoryNote (note_id, action, edited_at) VALUES (?,  ?, NOW())";
    db.query(sql2, [id, "Update"], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
    });
    res.status(200).json({ message: "Note has been updated successfully." });
  };

  
  //----deleteNote
  exports.deleteNote = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Note WHERE note_id = ?";
    db.query(sql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Note not found." });
      }
      const sql2 = "INSERT INTO HistoryNote (note_id, action, edited_at) VALUES (?,  ?, NOW())";
      db.query(sql2, [id, "Delete"], (error, results) => {
        if (error) {
          return res.status(500).json({ error });
        }
      });
      res.status(200).send({ message: "Note has been delete successfully." });
    });
  };