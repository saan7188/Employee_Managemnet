import React from 'react';
import { Search, Plus, User, Eye, Edit2, Trash2 } from 'lucide-react';

export default function EmployeeTable({ 
  filteredEmployees, searchTerm, setSearchTerm, handleNavigation, openDelete 
}) {
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Employee</h2>
        <div className="header-actions">
          <div className="search-wrapper">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input" 
            />
          </div>
          <button className="btn-primary" onClick={() => handleNavigation('add')}>
            <Plus size={16} /> Add New Employee
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '4rem 0' }}>No records found</td>
              </tr>
            ) : (
              filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td className="table-avatar-cell">
                    <div className="avatar-sm">
                      {emp.avatar ? <img src={emp.avatar} alt="" /> : <User size={16} color="#9ca3af" />}
                    </div>
                    {emp.name}
                  </td>
                  <td>{emp.employeeId}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.project}</td>
                  <td>{emp.type}</td>
                  <td>{emp.status}</td>
                  <td>
                    <div className="action-btns">
                      <button onClick={() => handleNavigation('view', emp)}><Eye size={18} /></button>
                      <button onClick={() => handleNavigation('edit', emp)}><Edit2 size={18} /></button>
                      <button onClick={() => openDelete(emp)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}