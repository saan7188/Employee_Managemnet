import React, { useState } from 'react';
import { toast } from 'sonner';
import { useEmployees } from '../hooks/useEmployees';
import * as api from '../api/employeeService';

import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import EmployeeTable from '../components/employees/EmployeeTable';
import EmployeeForm from '../components/employees/EmployeeForm';
import DeleteModal from '../components/common/DeleteModal';

const defaultForm = { employeeId: '', name: '', department: '', designation: '', project: '', type: '', status: '', avatar: '' };

export default function EmployeeDashboard() {
  const { employees, fetchEmployees } = useEmployees();
  
  const [currentView, setCurrentView] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState(defaultForm);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredEmployees = employees.filter(emp =>
    emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigation = (view, emp = null) => {
    if (view === 'add') setFormData(defaultForm);
    if (emp) { setFormData(emp); setSelectedEmployee(emp); }
    setCurrentView(view);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('avatar', file);
    const toastId = toast.loading('Uploading image...');

    try {
      const res = await api.uploadAvatar(uploadData);
      setFormData({ ...formData, avatar: res.data.avatarUrl });
      toast.success('Image uploaded!', { id: toastId });
    } catch (err) {
      toast.error('Failed to upload image', { id: toastId });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.employeeId || !formData.name) return toast.error("Name and Employee ID required");

    try {
      if (currentView === 'edit') {
        await api.updateEmployee(selectedEmployee.id, formData);
        toast.success('Updated successfully');
      } else {
        await api.addEmployee(formData);
        toast.success('Added successfully');
      }
      fetchEmployees();
      setCurrentView('list');
    } catch (err) { toast.error('Error saving employee'); }
  };

  const openDelete = (emp) => { setSelectedEmployee(emp); setShowDeleteModal(true); };

  const confirmDelete = async () => {
    try {
      await api.deleteEmployee(selectedEmployee.id);
      toast.success('Deleted successfully');
      setShowDeleteModal(false);
      fetchEmployees();
    } catch (err) { toast.error('Delete failed'); }
  };

  return (
    <div className="app-layout">
      <Sidebar handleNavigation={handleNavigation} />
      <div className="main-wrapper">
        <Header />
        <main className="content-area">
          {currentView === 'list' ? (
            <EmployeeTable 
              filteredEmployees={filteredEmployees} searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
              handleNavigation={handleNavigation} openDelete={openDelete} 
            />
          ) : (
            <EmployeeForm 
              currentView={currentView} formData={formData} handleInputChange={handleInputChange} 
              handleSubmit={handleSubmit} handleImageUpload={handleImageUpload} handleNavigation={handleNavigation} 
            />
          )}
        </main>
      </div>
      <DeleteModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={confirmDelete} />
    </div>
  );
}