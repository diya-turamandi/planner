import React, { useState } from 'react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1); // Step tracker
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
    // You can also send formData to backend here
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Step {step} of 3</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}

        {step === 2 && (
          <>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        {step === 3 && (
          <>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </>
        )}

        <div style={{ marginTop: '20px' }}>
          {step > 1 && <button type="button" onClick={handleBack}>Back</button>}
          {step < 3 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}
