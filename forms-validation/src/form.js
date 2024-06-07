import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneRegex = /^\+[0-9]{1,3}-[0-9]{10}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const aadharRegex = /^\d{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email is invalid!';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!passwordRegex.test(formData.password)) newErrors.password = 'Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!';
    if (!formData.phone) newErrors.phone = 'Phone Number is required';
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Phone Number must be in the format +<country code>-<10 digit number>,i.e., +91-6578345610';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.pan) newErrors.pan = 'PAN is required';
    else if (!panRegex.test(formData.pan)) newErrors.pan = 'PAN must be in the format ABCDE1234F';
    if (!formData.aadhar) newErrors.aadhar = 'Aadhar is required';
    else if (!aadharRegex.test(formData.aadhar)) newErrors.aadhar = 'Aadhar must be a 12-digit number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [name]: value };
      setIsFormValid(Object.values(updatedFormData).every((val) => val !== ''));
      return updatedFormData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/success', { state: formData });
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <header>Form Validation</header>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span>{errors.password}</span>}
        <small>Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!</small>
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
        <small>Phone Number must be in the format +CountryCode-10 digit number, i.e, +91-6578345610</small>
      </div>
      <div>
        <label>Country</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          {/* Add more countries as needed */}
        </select>
        {errors.country && <span>{errors.country}</span>}
      </div>
      <div>
        <label>City</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {formData.country === 'India' && (
            <>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Patna">Patna</option>
              <option value="Bangalore">Bangalore</option>
              {/* Add more cities */}
            </>
          )}
          {formData.country === 'USA' && (
            <>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              {/* Add more cities */}
            </>
          )}
        </select>
        {errors.city && <span>{errors.city}</span>}
      </div>
      <div>
        <label>PAN Number</label>
        <input
          type="text"
          name="pan"
          value={formData.pan}
          onChange={handleChange}
        />
        {errors.pan && <span>{errors.pan}</span>}
        <small>PAN must be in the format ABCDE1234F</small>
      </div>
      <div>
        <label>Aadhar Number</label>
        <input
          type="text"
          name="aadhar"
          value={formData.aadhar}
          onChange={handleChange}
        />
        {errors.aadhar && <span>{errors.aadhar}</span>}
        <small>Aadhar must be a 12-digit number</small>
      </div>
      <button type="submit" enabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default Form;
  