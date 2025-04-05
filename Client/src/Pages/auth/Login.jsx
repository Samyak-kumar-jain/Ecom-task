import { loginUser } from '../../features/Authslice/authslice.js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation (min 8 characters, at least 1 letter, 1 number, and 1 '@' character)
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
        password: 'Password must be at least 8 characters long, include at least 1 letter, 1 number, and 1 "@" character.',
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }

    if (valid) {
      dispatch(loginUser(formData))
        .unwrap() // Unwrap the result to handle success or failure directly
        .then((response) => {
          // Success case: Display success toast and reset form data
          if (response?.success) {
            toast.success('Login successful!', {
              position: 'top-center',
              autoClose: 3000,
            });
            setFormData({ email: '', password: '' });
          }
        })
        .catch((error) => {
          // Failure case: Display error toast with server message or a default message
          toast.error(error || 'An error occurred', {
            position: 'top-center',
            autoClose: 3000,
          });
        });
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-3 w-96">
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>
      
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
        className="w-full bg-black text-white py-2 rounded-md hover:bg-grey focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
      <p className="text-sm text-center text-gray-600 mt-4">
        Don't have an account?{' '}
        <Link to="/auth/register" className="text-blue-500 hover:text-blue-700">
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
