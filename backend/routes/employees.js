// routes/employees.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// GET single employee
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM employees WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// ADD employee
router.post("/", (req, res) => {
  const { employeeId, name, department, designation, project, type, status, avatar } = req.body;

  db.query(
    `INSERT INTO employees (employeeId, name, department, designation, project, type, status, avatar)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [employeeId, name, department, designation, project, type, status, avatar],
    (err) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: "Employee ID already exists!" });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Employee added successfully" });
    }
  );
});

// UPDATE employee
router.put("/:id", (req, res) => {
  const { employeeId, name, department, designation, project, type, status, avatar } = req.body;

  db.query(
    `UPDATE employees SET employeeId=?, name=?, department=?, designation=?, project=?, type=?, status=?, avatar=? WHERE id=?`,
    [employeeId, name, department, designation, project, type, status, avatar, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated successfully" });
    }
  );
});

// DELETE employee
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully" });
  });
});

module.exports = router;