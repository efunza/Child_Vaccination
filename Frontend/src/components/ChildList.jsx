import React from 'react';

const ChildList = ({ children, onEdit, onDelete }) => {
  if (children.length === 0) {
    return <p style={{ textAlign: 'center' }}>No children registered yet.</p>;
  }

  return (
    <div style={styles.listContainer}>
      {children.map((child) => (
        <div key={child.id} style={styles.childCard}>
          <h4 style={styles.childName}>{child.name}</h4>
          <p><strong>Age:</strong> {child.age}</p>

          <div>
            <strong>Vaccinations:</strong>{' '}
            {child.vaccination && child.vaccination.length > 0 ? (
              <ul style={styles.vaccinationList}>
                {child.vaccination.map((vac, idx) => (
                  <li key={idx}>
                    {vac.name} — <em>{vac.date || 'Date not provided'}</em>
                  </li>
                ))}
              </ul>
            ) : (
              'None'
            )}
          </div>

          <p><strong>Parent/Guardian Name:</strong> {child.parentName || 'N/A'}</p>
          <p><strong>Parent/Guardian Phone:</strong> {child.parentPhone || 'N/A'}</p>
          <p><strong>Parent/Guardian Email:</strong> {child.parentEmail || 'N/A'}</p>

          <div style={styles.buttonGroup}>
            <button onClick={() => onEdit(child.id)} style={styles.editButton}>
              Edit
            </button>
            <button onClick={() => onDelete(child.id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  listContainer: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  childCard: {
    backgroundColor: '#f9f9f9',
    padding: '18px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  childName: {
    margin: '0 0 8px 0',
    color: '#2e86de',
  },
  vaccinationList: {
    marginTop: '6px',
    marginBottom: '6px',
    paddingLeft: '20px',
    color: '#333',
  },
  buttonGroup: {
    marginTop: '12px',
    display: 'flex',
    gap: '12px',
  },
  editButton: {
    backgroundColor: '#f0ad4e',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#d9534f',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: '600',
  },
};

export default ChildList;
