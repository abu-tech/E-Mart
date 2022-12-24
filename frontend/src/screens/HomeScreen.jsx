import { useState, useEffect } from 'react'
import Product from '../components/Product'
import axios from 'axios'

function HomeScreen() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products')

      setProducts(response.data)
    }

    fetchProducts()
  }, [])

  return (
    <>
        <h1 className='text-4xl text-center pt-2 text-black'>LATEST PRODUCTS</h1>
        <div className='flex flex-wrap justify-items-center pt-5 mx-5'>
            {products.map((product) =>(
                <Product key={product._id} product={product} />
            ))}
        </div>
    </>
  )
}

export default HomeScreen