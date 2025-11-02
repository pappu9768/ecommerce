import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'

import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
  const [allShoes, setAllShoes] = useState([])

  useEffect(() => {

    const getAllProducts = async () => {
      try {
        const url = 'http://localhost:8080/api/v1/admin/allProducts'
        const getToken = localStorage.getItem('Tokens');

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `${getToken}`,
            'Content-type': 'application/json'
          }
        })

        const result = await res.json();
        console.log(result.allProducts);
        setAllShoes(result.allProducts)
      } catch (error) {
        console.log(error)
      }
    }

    getAllProducts();
  }, [])

  const handleBuy = () =>{
    
  }
  return (
    <>


      <div className='bg-[#d0d4D5] min-h-screen'>
        <Navbar />

        <div className='h-[calc(100%-64px)] w-full relative flex'>
          {/* left-content */}
          <div className='w-[40%] px-[80px] py-[100px]'>
            <h5 className='mb-[15px] text-xl text-[#000] capitalize font-medium'>Explore Limited Edition</h5>
            <h1 className='mb-[15px] text-4xl uppercase font-bold'>nike limited edition</h1>
            <p className='mb-[15px] text-[#555]'>Unleash the extraordinay. Evlaute your game with Nike's limited edition.
              Where innovation meets style,leaving a lasting mark. Just do it.  </p>
            <button className='mt-[20px] bg-[#000] text-white text-[15px] px-[38px] py-[12px] rounded-[50px] border-none rounded-tl-none  '>Shop Now</button>

          </div>

          {/* right-content */}
          <div className='w-[60%] h-full px-[90px] py-[100px] flex gap-[15px]'>


            {/* all products */}
            <div className="w-full grid grid-cols-3 gap-6">
              {allShoes.length > 0 ? (
                allShoes.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white p-4 w-[230px] h-[400px] rounded-2xl shadow-md flex flex-col justify-between hover:scale-105 transition-transform duration-200"
                  >

                    <div>
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className='w-full h-64 object-cover rounded-lg shadow-md'
                      />
                      <h3 className="text-lg font-semibold">{item.productName}</h3>
                      <p className="text-gray-700 font-medium">₹{item.price}</p>
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {item.description}
                      </p>


                    </div>
                    <button
                      className='w-full p-[4px] bg-red-400 rounded mt-[6px] cursor-pointer'
                      onClick={handleBuy}
                    >
                      Buy Now
                    </button>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-xl text-gray-600">There are no products to show</h1>
              )}
            </div>


          </div>



        </div>
      </div>
    </>
  )
}

export default Home
