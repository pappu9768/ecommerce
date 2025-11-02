import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Navbar = () => {

    const navigate = useNavigate()
    const [getName, setGetName] = React.useState('');

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

                const { success, userName,message } = result;
                if(success){
                    setGetName(userName.toUpperCase())
                }else if(!success){
                    console.log(message)
                }
            } catch (error) {
                console.error(error)

            }
        }

        gettingName();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('Tokens');
        toast("Logout successfully!!")
        navigate('/login')
    }

   
    return (
        <>
            <div className='h-16 w-full bg-gray-400 flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.8)] rounded-b-xl'>
                <div className='flex items-center justify-center ml-6'>
                    <h3 className='text-3xl font-medium'>STORE</h3>

                    <p className='ml-20 text-xl'>Welcome!<span className='ml-2 font-extrabold tracking-wider'>{getName}</span></p>
                </div>

                <div className='mr-8'>
                    {

                    }
                    <input
                        type="search"
                        placeholder="Search..."
                        className="border border-gray-900 rounded p-2 text-black mr-5"
                    />

                    <button className='p-2 rounded bg-gray-900 text-gray-300 cursor-pointer' onClick={handleLogout}>Logout</button>

                    ():()

                </div>

            </div>
        </>
    )
}

export default Navbar
