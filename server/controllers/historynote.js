const db = require("../db");

//----createHistoryNote
exports.createHistoryNote = (req, res) => {
    const { note_id, action } = req.body;
    const sql = "INSERT INTO historynote (note_id, action, edited_at) VALUES (?, ?, NOW())";
    db.query(sql, [note_id, action], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ message: "History Note has been created successfully." });
    });
  };


  //----readAllHistorynote
exports.readAllHistoryNote = (req, res) => {
    const sql = "SELECT * FROM historynote";
    db.query(sql, (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json(results);
    });
  };
  
  //----readAllMyHistorynote
exports.readAllMyHistoryNote = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM historynote WHERE note_id = ?";
    db.query(sql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json(results);
    });
  };

    //----readHistorynote
exports.readHistoryNote = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM historynote WHERE note_id = ?";
    db.query(sql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json(results);
    });
  };

  //----updateHistoryNote
exports.updateHistoryNote = (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    const sql = "UPDATE historynote SET action = ?, edited_at = NOW() WHERE history_id = ?";
    db.query(sql, [action, id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "History Note not found." });
      }
      res.status(200).json({ message: "History Note has been updated successfully." });
    });
  };
  
  //----deleteHistoryNote
exports.deleteHistoryNote = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM historynote WHERE history_id = ?";
    db.query(sql, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "History Note not found." });
      }
      res.status(204).send({ message: "History Note has been delete successfully." });
    });
  };
  
  