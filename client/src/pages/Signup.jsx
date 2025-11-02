import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = React.useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  })
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(signup.name, signup.email, signup.password);

    try {
      const url = 'http://localhost:8080/api/v1/auth/signup';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(signup)
      })

      const signupResult = await res.json();
      console.log(signupResult);

      const { error, message, success } = signupResult;
      if (success) {
        toast.success(message)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else if (error) {
        toast.error(error.details[0].message)
      } else if (!success) {
        toast.error(message)
      }

    } catch (error) {
      console.log(error)
    }



  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] rounded-2xl p-8 w-full max-w-md"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Sign Up
          </h3>

          {/* Name */}
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={signup.name}
            onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            className="mt-1 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {/* Email */}
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={signup.email}
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            className="mt-1 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            className="mt-1 mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {/* mobile */}
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile no.
          </label>
          <input
            type="number"
            name="mobile"
            placeholder="Enter your mobile no..."
            value={signup.mobile}
            onChange={(e) => setSignup({ ...signup, mobile: e.target.value })}
            className="mt-1 mb-6 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            Signup
          </button>

          <Link to='/login'>Allready Have account? Login here</Link>
        </form>
      </div>

    </>
  )
}

export default Signup
