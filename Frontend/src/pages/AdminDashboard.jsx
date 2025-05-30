import React, { useEffect, useState } from 'react';
import ChildList from '../components/ChildList';
import ChildRegistrationForm from '../components/ChildRegistrationForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { unparse } from 'papaparse';
import {
  getChildren,
  addChild,
  updateChild,
  deleteChild,
} from '../api/childService';

const AdminDashboard = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await getChildren();
      setChildren(response.data);
    } catch (error) {
      toast.error('Failed to fetch children.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = async (child) => {
    try {
      const response = await addChild(child);
      setChildren([...children, response.data]);
      toast.success('Child registered successfully!');
    } catch {
      toast.error('Failed to add child.');
    }
  };

  const handleEditChild = async (updatedChild) => {
    try {
      await updateChild(updatedChild);
      setChildren(children.map(c => c.id === updatedChild.id ? updatedChild : c));
      toast.success('Child updated successfully!');
    } catch {
      toast.error('Failed to update child.');
    }
  };

  const handleDeleteChild = async (id) => {
    if (!window.confirm('Are you sure you want to delete this child?')) return;
    try {
      await deleteChild(id);
      setChildren(children.filter((c) => c.id !== id));
      toast.success('Child deleted successfully!');
    } catch {
      toast.error('Failed to delete child.');
    }
  };

  const handleExportCSV = () => {
    if (children.length === 0) {
      toast.warning('No children data to export.');
      return;
    }

    try {
      const dataForCsv = children.map((child) => ({
        ...child,
        vaccination: Array.isArray(child.vaccination)
          ? child.vaccination.join(', ')
          : child.vaccination,
      }));
      const csv = unparse(dataForCsv);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'children.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('CSV exported successfully!');
    } catch {
      toast.error('CSV export failed.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Dashboard</h2>
      <ChildRegistrationForm onAddChild={handleAddChild} />
      <div style={styles.buttonContainer}>
        <button
          onClick={handleExportCSV}
          style={styles.button}
          disabled={children.length === 0}
        >
          Export CSV
        </button>
      </div>
      <div style={styles.listContainer}>
        <ChildList
          isAdmin
          children={children}
          onDelete={handleDeleteChild}
          onEdit={handleEditChild}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  buttonContainer: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2e86de',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  listContainer: {
    marginTop: '20px',
  },
};

export default AdminDashboard;
