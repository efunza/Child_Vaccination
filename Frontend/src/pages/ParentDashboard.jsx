import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChildList from '../components/ChildList';
import ChildRegistrationForm from '../components/ChildRegistrationForm'; // your existing form

const ParentDashboard = () => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [regId, setRegId] = useState('');
  const [childData, setChildData] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const [fetchingChild, setFetchingChild] = useState(false);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/dashboard/parent', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChildren(response.data.children || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const handleFetchChild = async () => {
    if (!regId.trim()) {
      setFetchError('Please enter a registration ID.');
      setChildData(null);
      return;
    }
    setFetchingChild(true);
    setFetchError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/children/${regId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChildData(response.data.child);
    } catch (err) {
      setFetchError('Child not found or error fetching data.');
      setChildData(null);
    } finally {
      setFetchingChild(false);
    }
  };

  const handleAddOrUpdateChild = (child) => {
    setChildren((prev) => {
      const exists = prev.find((c) => c.id === child.id);
      if (exists) {
        return prev.map((c) => (c.id === child.id ? child : c));
      }
      return [...prev, child];
    });
    setChildData(null);
    setRegId('');
    setFetchError('');
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👨‍👩‍👧 Parent Dashboard</h2>

      {/* Input to fetch child by registration ID */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter Child Registration ID"
          value={regId}
          onChange={(e) => setRegId(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleFetchChild} disabled={fetchingChild} style={styles.button}>
          {fetchingChild ? 'Fetching...' : 'Fetch Child'}
        </button>
      </div>
      {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}

      {/* Show child details form if fetched */}
      {childData && (
        <ChildRegistrationForm
          initialData={childData}
          onAddChild={handleAddOrUpdateChild}
          onEditChild={handleAddOrUpdateChild}
        />
      )}

      {/* List existing linked children */}
      {children.length === 0 ? (
        <p>No children linked to your account.</p>
      ) : (
        <ChildList children={children} />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  inputGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
};

export default ParentDashboard;
