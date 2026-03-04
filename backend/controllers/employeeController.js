const db = require("../db");

exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  const { employeeId, name, department, designation, project, type, status, avatar } = req.body;

  try {
    await db.query(
      `INSERT INTO employees (employeeId, name, department, designation, project, type, status, avatar)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [employeeId, name, department, designation, project, type, status, avatar]
    );
    res.json({ message: "Employee added successfully" });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: "Employee ID already exists!" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { employeeId, name, department, designation, project, type, status, avatar } = req.body;

  try {
    await db.query(
      `UPDATE employees SET employeeId=?, name=?, department=?, designation=?, project=?, type=?, status=?, avatar=? WHERE id=?`,
      [employeeId, name, department, designation, project, type, status, avatar, req.params.id]
    );
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await db.query("DELETE FROM employees WHERE id = ?", [req.params.id]);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};