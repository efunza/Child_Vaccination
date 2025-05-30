import React, { useState, useEffect } from 'react';

const vaccinationOptions = [
  'MMR',
  'Polio',
  'Hepatitis B',
  'Diphtheria',
  'Tetanus',
  'Chickenpox',
];

const ChildRegistrationForm = ({ onAddChild, onEditChild, initialData = null }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [vaccinations, setVaccinations] = useState([]);
  const [parentName, setParentName] = useState('');
  const [parentContact, setParentContact] = useState('');

  // When initialData changes (edit mode), prefill form fields
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setAge(initialData.age);
      setVaccinations(initialData.vaccination || []);
      setParentName(initialData.parentName);
      setParentContact(initialData.parentContact);
    } else {
      // Clear form if no initialData (add mode)
      setName('');
      setAge('');
      setVaccinations([]);
      setParentName('');
      setParentContact('');
    }
  }, [initialData]);

  const handleVaccinationChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    // Map selected vaccinations, keep dates if already selected before
    const newVaccinations = selectedOptions.map((vacName) => {
      const existing = vaccinations.find((v) => v.name === vacName);
      return existing || { name: vacName, date: '' };
    });
    setVaccinations(newVaccinations);
  };

  const handleDateChange = (vacName, date) => {
    setVaccinations((prev) =>
      prev.map((v) => (v.name === vacName ? { ...v, date } : v))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !age || !parentName.trim() || !parentContact.trim()) {
      alert('Please fill in name, age, parent/guardian name, and contact.');
      return;
    }

    for (const vac of vaccinations) {
      if (vac.date && isNaN(new Date(vac.date).getTime())) {
        alert(`Please enter a valid date for vaccination: ${vac.name}`);
        return;
      }
    }

    const childData = {
      id: initialData ? initialData.id : Date.now(),
      name: name.trim(),
      age,
      vaccination: vaccinations,
      parentName: parentName.trim(),
      parentContact: parentContact.trim(),
    };

    if (initialData && onEditChild) {
      onEditChild(childData);
    } else {
      onAddChild(childData);

      // Reset only on add
      setName('');
      setAge('');
      setVaccinations([]);
      setParentName('');
      setParentContact('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>{initialData ? 'Edit Child Registration' : 'Register a Child'}</h3>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Child Name</label>
        <input
          type="text"
          placeholder="Enter child's full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Age</label>
        <input
          type="number"
          min="0"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Parent/Guardian Name</label>
        <input
          type="text"
          placeholder="Enter parent or guardian's full name"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Parent/Guardian Contact</label>
        <input
          type="text"
          placeholder="Enter parent or guardian's contact number"
          value={parentContact}
          onChange={(e) => setParentContact(e.target.value)}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Vaccinations <span style={styles.smallText}>(hold Ctrl/Cmd to select multiple)</span>
        </label>
        <select
          multiple
          value={vaccinations.map((v) => v.name)}
          onChange={handleVaccinationChange}
          style={styles.select}
        >
          {vaccinationOptions.map((vac) => (
            <option key={vac} value={vac}>
              {vac}
            </option>
          ))}
        </select>
      </div>

      {vaccinations.map((vac) => (
        <div key={vac.name} style={styles.inputGroup}>
          <label style={styles.label}>Date for {vac.name} vaccination</label>
          <input
            type="date"
            value={vac.date}
            onChange={(e) => handleDateChange(vac.name, e.target.value)}
            style={styles.input}
          />
        </div>
      ))}

      <button type="submit" style={styles.button}>
        {initialData ? 'Update Child' : 'Register Child'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
    maxWidth: '400px',
    margin: '0 auto 30px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: '20px',
    color: '#2e86de',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '18px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: '600',
    color: '#444',
  },
  smallText: {
    fontWeight: '400',
    fontSize: '0.8rem',
    color: '#888',
    marginLeft: '6px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outlineColor: '#2e86de',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    height: '110px',
    outlineColor: '#2e86de',
    cursor: 'pointer',
  },
  button: {
    width: '100%',
    backgroundColor: '#2e86de',
    color: 'white',
    padding: '12px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'background-color 0.3s',
  },
};

export default ChildRegistrationForm;
