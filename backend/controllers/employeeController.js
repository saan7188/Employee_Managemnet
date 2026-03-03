const db = require("../db");

exports.getAllEmployees = (req, res) => {
  db.query("SELECT * FROM employees ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};


exports.getEmployeeById = (req, res) => {
  db.query("SELECT * FROM employees WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};


exports.createEmployee = (req, res) => {
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
};

exports.updateEmployee = (req, res) => {
  const { employeeId, name, department, designation, project, type, status, avatar } = req.body;

  db.query(
    `UPDATE employees SET employeeId=?, name=?, department=?, designation=?, project=?, type=?, status=?, avatar=? WHERE id=?`,
    [employeeId, name, department, designation, project, type, status, avatar, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Employee updated successfully" });
    }
  );
};


exports.deleteEmployee = (req, res) => {
  db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee deleted successfully" });
  });
};