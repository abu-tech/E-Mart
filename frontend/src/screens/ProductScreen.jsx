import {useParams, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {getProduct} from '../features/products/productSlice'
import {addToCart} from '../features/cart/cartSlice'
import Rating from '../components/Rating'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'

function ProductScreen() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const {product, isError, isLoading, message} = useSelector(state => state.products)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getProduct(params.id))
    }, [dispatch, isError, message, params.id])

    const handleCart = () => {
        dispatch(addToCart({productId: product._id, qty}))
        navigate('/cart')
    }

  return (
    <div className='mx-20 mt-12'>
        <BackButton url="/" />
        {isLoading ? <Loader /> :
            <div className='grid grid-cols-1 lg:grid-cols-2 mt-4'>
                <div className='grid grid-cols-1'>
                    <figure><img src={product.image} alt={product.name} /></figure>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className="flex flex-col w-full px-2 my-4 lg:my-0">
                        <h1 className='text-black text-2xl lg:text-4xl'>{product.name}</h1> 
                        <div className="divider"></div> 
                        <Rating value={product.rating} text={`${product.numReviews} Reviews`} color='#affc41' />
                        <div className="divider"></div> 
                        <h1 className='text-black font-medium'>Price: &#8377; {product.price}</h1>
                        <div className="divider"></div> 
                        <p className='text-black font-medium'>Description: {product.description}</p>
                    </div>
                    <div className="card w-auto h-56 bg-base-100 rounded-none mx-5 grid grid-rows-4 border-2 divide-y-2 my-4 lg:my-0">
                        <div className="grid grid-cols-2 text-xl font-medium text-black">
                            <h1 className='m-auto'>Price:</h1>
                            <h1 className='m-auto '>&#8377; {product.price}</h1>
                        </div>
                        <div className="grid grid-cols-2 text-xl font-medium text-black">
                            <h1 className='m-auto'>Status:</h1>
                            <h1 className='m-auto'>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h1>
                        </div>
                        <div className="grid grid-cols-2 text-xl font-medium text-black">
                            <h1 className='m-auto'>Qty:</h1>
                            <select className="select m-auto bg-gray-100" value={qty} onChange={(e) => setQty(Number(e.target.value))} disabled={product.countInStock === 0}>
                            {[...Array(product.countInStock).keys()].map(x => (
                                <option value={x + 1} key={x + 1}>
                                    {x + 1}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1">
                            <button className='btn mx-5 my-auto rounded-none text-white hover:scale-105' onClick={handleCart} disabled={product.countInStock === 0}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default ProductScreen