import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {getAllProducts} from '../features/products/productSlice'
import Product from '../components/Product'
import Loader from '../components/Loader'

function HomeScreen() {
  const {products, isError, isLoading, message} = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllProducts())
    
    if(isError){
      toast.error(message)
    }
  }, [dispatch, isError, message])

  if(isLoading){
    return <Loader />
  }

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