import React from 'react';
import { Users, Calendar, MessageSquare, LayoutDashboard } from 'lucide-react';

export default function Sidebar({ handleNavigation }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>RS-TECH</h1>
      </div>
      <nav className="nav-menu">
        <div className="nav-item">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>
        <div className="nav-item-wrapper">
          <div className="nav-item active" onClick={() => handleNavigation('list')}>
            <Users size={20} />
            <span>Employee</span>
          </div>
        </div>
        <div className="nav-item">
          <Calendar size={20} />
          <span>Calendar</span>
        </div>
        <div className="nav-item">
          <MessageSquare size={20} />
          <span>Messages</span>
        </div>
      </nav>
    </aside>
  );
}