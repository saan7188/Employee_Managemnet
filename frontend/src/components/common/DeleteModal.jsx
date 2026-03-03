import { Trash2 } from 'lucide-react';

export default function DeleteModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <div className="modal-body">
          <div className="modal-icon">
            <Trash2 size={56} strokeWidth={1.5} />
          </div>
          <h3 className="modal-title">Are you sure you want<br/>to Delete</h3>
        </div>

        <div className="modal-actions">
          <button className="btn-danger" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={onConfirm}>Yes</button>
        </div>

      </div>
    </div>
  );
}