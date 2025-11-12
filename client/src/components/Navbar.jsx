import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { ApiContext } from '../contextApi/ApiContext.jsx';

const Navbar = () => {

    const navigate = useNavigate()
    const [getName, setGetName] = React.useState('');
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        const gettingName = async () => {
            try {
                const url = 'http://localhost:8080/api/username';
                const getToken = localStorage.getItem('Tokens')
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${getToken}`,
                        'Content-type': 'application/json'
                    }
                })

                const result = await res.json();
                // console.log(result);

                const { success, userName, message } = result;
                if (success) {
                    setGetName(userName.toUpperCase())
                    // console.log(user)
                } else if (!success) {
                    console.log(message)
                }
            } catch (error) {
                console.error(error)

            }
        }
        const checkUser = async () => {
            const token = localStorage.getItem('Tokens')

            if (token) {
                const url = 'http://localhost:8080/api/loggedIn'
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${token}`
                    },

                })

                const result = await res.json()
                console.log(result);
                setUsers(result.user?.role)
                console.log(result.user?.role)
                // console.log(users.user?.role)

            }
        }
        checkUser();

        gettingName();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('Tokens');
        toast("Logout successfully!!")
        navigate('/login')
    }

    const toLogIn = () => {
        navigate('/login')
    }

    const toCreate = () => {
        navigate('/admin')
    }


    return (
        <>
            <div className='h-16 w-full bg-gray-400 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.8)] rounded-b-xl'>
                <div className='flex items-center justify-center ml-6'>
                    <h3 className='text-3xl font-medium'>STORE</h3>

                    <p className='ml-20 text-xl'>Welcome!<span className='ml-2 font-extrabold tracking-wider'>{getName}</span></p>
                </div>

                <div className='mr-8'>

                    <input
                        type="search"
                        placeholder="Search..."
                        className="border border-gray-900 rounded p-2 text-black mr-5"
                    />



                    {
                        (users === 0 || users === 1) ? (
                            <>
                                <button
                                    className="p-2 rounded bg-gray-900 text-gray-300 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                                {users === 1 && (
                                    <button
                                        className="p-2 rounded bg-gray-500 text-gray-300 cursor-pointer ml-[8px]"
                                        onClick={toCreate}
                                    >
                                        Create Product
                                    </button>
                                )}
                            </>
                        ) : (
                            <button
                                className="p-2 rounded bg-gray-900 text-gray-300 cursor-pointer"
                                onClick={toLogIn}
                            >
                                Log in
                            </button>
                        )
                    }




                </div>

            </div>
        </>
    )
}

export default Navbar
