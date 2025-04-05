import { registerUser } from '../../features/Authslice/authslice.js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }

    if (!validatePassword(formData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long and include at least 1 letter and 1 number.',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    if (valid) {
      dispatch(registerUser(formData))
        .unwrap()
        .then(() => {
          toast.success('Registration successful!', {
            position: 'top-center',
            autoClose: 3000,
          });
          setFormData({ name: '', email: '', password: '', role: 'user' });
          navigate('/auth/login'); // Redirect to login page after successful registration
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            toast.error('User already exists. Please try a different username or email.', {
              position: 'top-center',
              autoClose: 3000,
            });
          } else {
            toast.error('Registration failed. Please try again.', {
              position: 'top-center',
              autoClose: 3000,
            });
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-md p-3 w-96">
        <h2 className="text-3xl text-center font-bold text-gray-800">Sign up</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            autoComplete="off"
          />
          {errors.email && <p className="text-black text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
            autoComplete="off"
          />
          {errors.password && <p className="text-black text-sm mt-1">{errors.password}</p>}
        </div>
       
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          Register
        </button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-black hover:text-blue-700 font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
