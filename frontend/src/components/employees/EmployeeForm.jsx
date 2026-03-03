import React, { useRef } from 'react';
import { ChevronLeft, User, Camera, Edit2 } from 'lucide-react';

export default function EmployeeForm({ 
  currentView, formData, handleInputChange, handleSubmit, handleImageUpload, handleNavigation 
}) {
  const fileInputRef = useRef(null);
  const isViewOnly = currentView === 'view';
  const isEdit = currentView === 'edit';
  
  let title = isEdit ? "Edit Employee Details" : isViewOnly ? "View Employee Details" : "Add New Employee";

  return (
    <div className="form-container">
      <div className="page-header" style={{ justifyContent: 'flex-start' }}>
        <button type="button" className="back-btn" onClick={() => handleNavigation('list')}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">{title}</h2>
      </div>

      <div className="tab-header">
        <div className="tab-active">
          <User size={16} /> Personal Information
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleImageUpload} />
        
        <div 
          className={`avatar-upload-box ${!isViewOnly ? 'clickable' : ''}`}
          onClick={() => !isViewOnly && fileInputRef.current.click()}
        >
          {formData.avatar ? (
             <img src={formData.avatar} alt="Avatar" />
          ) : isViewOnly ? (
            <User size={32} color="#9ca3af" />
          ) : (
            <Camera size={24} color="#9ca3af" />
          )}
          {!isViewOnly && (
            <div className="edit-badge"><Edit2 size={12} /></div>
          )}
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>Name*</label>
            {isViewOnly ? <div className="view-text">{formData.name || '-'}</div> : 
              <input required name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="Enter name" />
            }
          </div>
          <div className="input-group">
            <label>Employee ID*</label>
            {isViewOnly ? <div className="view-text">{formData.employeeId || '-'}</div> : 
              <input required name="employeeId" value={formData.employeeId} onChange={handleInputChange} className="form-input" placeholder="Enter employee ID" />
            }
          </div>
          <div className="input-group">
            <label>Department*</label>
            {isViewOnly ? <div className="view-text">{formData.department || '-'}</div> : 
              <select required name="department" value={formData.department} onChange={handleInputChange} className="form-input">
                <option value="">Select Department</option>
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
              </select>
            }
          </div>
          <div className="input-group">
            <label>Designation*</label>
            {isViewOnly ? <div className="view-text">{formData.designation || '-'}</div> : 
              <select required name="designation" value={formData.designation} onChange={handleInputChange} className="form-input">
                <option value="">Select designation</option>
                <option value="Design Lead">Design Lead</option>
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
              </select>
            }
          </div>
          <div className="input-group">
            <label>Project</label>
            {isViewOnly ? <div className="view-text">{formData.project || '-'}</div> : 
              <input name="project" value={formData.project} onChange={handleInputChange} className="form-input" placeholder="Enter Project" />
            }
          </div>
          <div className="input-group">
            <label>Type*</label>
            {isViewOnly ? <div className="view-text">{formData.type || '-'}</div> : 
              <select required name="type" value={formData.type} onChange={handleInputChange} className="form-input">
                <option value="">Select Type</option>
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
              </select>
            }
          </div>
          <div className="input-group">
            <label>Status*</label>
            {isViewOnly ? <div className="view-text">{formData.status || '-'}</div> : 
              <select required name="status" value={formData.status} onChange={handleInputChange} className="form-input">
                <option value="">Select Status</option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
              </select>
            }
          </div>
        </div>

        {!isViewOnly && (
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => handleNavigation('list')}>Cancel</button>
            <button type="submit" className="btn-primary">{isEdit ? 'Update' : 'Confirm'}</button>
          </div>
        )}
      </form>
    </div>
  );
}