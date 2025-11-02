import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {

    const navigate = useNavigate();
    const [login,setLogin] = React.useState({
        email:'',
        password:''
    })
    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(login.email,login.password)

        try {
            const url = 'http://localhost:8080/api/v1/auth/login'
            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify(login)
            })

            const loginResult = await res.json();
            console.log(loginResult);

            const {error,message,success,jwtToken} = loginResult

            if(success){
                toast.success(message);
                localStorage.setItem('Tokens',jwtToken)
                setTimeout(() =>{
                    navigate('/home')
                },1000)
            }else if(error){
                toast.error(error.details[0].message)
            }else if(!success){
                toast.error(message)
            }
        } catch (error) {
            console.error(error)
        }

    }
    return (
        <>
            <div  className='flex items-center justify-center min-h-screen w-full bg-gray-800'>
                <form
                    onSubmit={handleLogin}
                    className='bg-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] rounded-2xl p-8 w-full max-w-md h-10/12'
                >
                    <h3 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Login</h3>

                    <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                    <input 
                        type="email" name='email' placeholder='Enter your email...' 
                        value={login.email}
                        onChange={(e) => setLogin({...login,email:e.target.value})}
                        className='mt-1 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                        />

                    <label htmlFor="password" className='block text-sm font-medium text-gray-700'>Password</label>
                    <input type="password" name='password' placeholder='Enter your password...' 
                        value={login.password}
                        onChange={(e) => setLogin({...login,password:e.target.value})}
                        className='mt-1 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                    
                    />

                    <button type='submit' className='w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer'>Login</button>

                    <Link to='/signup'>Dont have Account? Sign-Up here</Link>
                </form>
            </div>
        </>
    )
}

export default Login
