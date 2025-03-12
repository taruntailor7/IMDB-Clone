import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProducer } from '../store/slices/producerSlice';

function ProducerForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProducer({ name, gender, dob, bio }));
    setName('');
    setGender('');
    setDob('');
    setBio('');
  };

  return (
    <div>
      <h3>Add Producer</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Gender:</label>
          <input value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label>DOB:</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button type="submit">Save Producer</button>
      </form>
    </div>
  );
}

export default ProducerForm;
