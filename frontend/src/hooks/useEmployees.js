import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import * as api from '../api/employeeService';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await api.getEmployees();
      setEmployees(res.data);
    } catch (err) {
      toast.error('Failed to connect to backend database');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return { employees, fetchEmployees };
};