import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="top-header">
      <div className="header-actions">
        <button className="icon-btn"><Settings size={18} /></button>
        <button className="icon-btn"><Bell size={18} /></button>
        <button className="icon-btn"><User size={18} /></button>
      </div>
    </header>
  );
}