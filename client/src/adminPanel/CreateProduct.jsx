import React from 'react'

const CreateProduct = () => {

    const [newProducts,setNewProducts] = React.useState({
        imageUrl:null,
        productName:'',
        price:'',
        description:''
        
    })

    const handleCreate = async(e) => {
        e.preventDefault();
        console.log(newProducts.productName,newProducts.price,newProducts.description,newProducts.imageUrl);

        try {
            const url = 'http://localhost:8080/api/v1/admin/adminDashboard';
            const getToken = localStorage.getItem('Tokens');

            const formData  = new FormData();
            formData.append("productImage",newProducts.imageUrl);
            formData.append("productName",newProducts.productName);
            formData.append("price",newProducts.price);
            formData.append("description",newProducts.description)

            const res = await fetch(url,{
                method:'POST',
                headers:{
                    'Authorization':`${getToken}`,
                    // 'Content-type':'application/json'
                },
                body:formData
            })

            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log("Error while sending data:",error)
        }
        
    }
    return (
        <>
            <div className='min-h-screen flex items-center justify-center bg-gray-800 w-full'>
                <div className='w-1/2  flex items-center justify-center'>
                    <form className='bg-white rounded-2xl p-8 w-full max-w-md'onSubmit={handleCreate}>
                        <h3 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>Admin Panel</h3>

                        <label 
                            htmlFor="productImage"
                            className='block text-sm font-medium text-gray-700'
                        >
                            Product Image:
                        </label>
                        <input 
                            type="file" 
                            name='productImage' 
                             className="mt-1 mb-4 w-full px-3 py-2 border border-gray-300 rounded-lg 
                             bg-white text-gray-700 cursor-pointer focus:outline-none focus:ring-2 
                             focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 
                             file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 
                             file:text-blue-700 hover:file:bg-blue-100"
                            //  value={newProducts.imageUrl}
                             onChange={(e) => setNewProducts({...newProducts,imageUrl:e.target.files[0]})}

                        />

                        <label
                            htmlFor="productName"
                            className='block text-sm font-medium text-gray-700'
                        >
                            Product Name:
                        </label>
                        <input
                            type="text"
                            name='productName'
                            placeholder='Enter product name...'
                            value={newProducts.productName}
                            onChange={(e) => setNewProducts({...newProducts,productName:e.target.value})}
                            className='mt-1 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'
                        />

                        <label htmlFor="price" className='block text-sm font-medium text-gray-700'>Price:</label>
                        <input
                            type="text"
                            name='price'
                            placeholder='Enter product price...'
                            value={newProducts.price}
                            onChange={(e) => setNewProducts({...newProducts,price:e.target.value})}
                            className='mt-1 mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'

                        />

                        <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description:</label>
                        <textarea
                            name="description"
                            placeholder="Enter product's description"
                            value={newProducts.description}
                            onChange={(e) => setNewProducts({...newProducts,description:e.target.value})}
                            className="mt-1 mb-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>




                        <button
                            className='w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer'
                            type='submit'
                        >
                            Add product
                        </button>


                    </form>
                </div>

                <div className='w-1/2 flex items-center justify-center '>
                    <div className='w-full items-center justify-center bg-white rounded-2xl px-8 py-6'>
                        <h3 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>All Products</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProduct
