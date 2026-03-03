import React from 'react';
import { Toaster } from 'sonner';
import EmployeeDashboard from './pages/EmployeeDashboard';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <EmployeeDashboard />
    </>
  );
}

export default App;