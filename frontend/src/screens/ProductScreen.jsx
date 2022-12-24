import {useParams} from 'react-router-dom'
import products from '../products'
import Rating from '../components/Rating'
import BackButton from '../components/BackButton'

function ProductScreen() {
    const params = useParams()
    const product = products.find(p => p._id === params.id)

  return (
    <div className='mx-20'>
        <BackButton url="/" />
        <div className='grid grid-cols-1 lg:grid-cols-2 mt-4'>
            <div className='grid grid-cols-1'>
                <figure><img src={product.image} alt={product.name} /></figure>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div className="flex flex-col w-full px-2 my-4 lg:my-0">
                    <h1 className='text-black text-2xl lg:text-4xl'>{product.name.toLocaleUpperCase()}</h1> 
                    <div className="divider"></div> 
                    <Rating value={product.rating} text={`${product.numReviews} Reviews`} color='#affc41' />
                    <div className="divider"></div> 
                    <h1 className='text-black font-medium'>Price: &#8377; {product.price}</h1>
                    <div className="divider"></div> 
                    <p className='text-black font-medium'>Description: {product.description}</p>
                </div>
                <div className="card w-auto h-44 bg-base-100 rounded-none mx-5 grid grid-rows-3 border-2 divide-y-2 my-4 lg:my-0">
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Price:</h1>
                        <h1 className='m-auto '>&#8377; {product.price}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Status:</h1>
                        <h1 className='m-auto'>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h1>
                    </div>
                    <div className="grid grid-cols-1">
                        <button className='btn mx-5 my-auto rounded-none text-white hover:scale-105' disabled={product.countInStock === 0}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductScreen