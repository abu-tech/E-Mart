import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import {getOrderDetails, reset} from '../features/order/orderSlice'
import Loader from '../components/Loader'

function OrderScreen() {
    const {order, isSuccess, isError, isLoading, message} = useSelector(state => state.order)

    //calculate prices
    // const itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    const dispatch = useDispatch()
    const params = useParams()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        dispatch(getOrderDetails(params.id))
    }, [isError, message, dispatch, params.id])

    if(isLoading){
        return <Loader />
    }

  return (
    <>
        <div className="flex flex-col lg:flex-row mx-12 mt-4 p-4">
            <div className='flex-auto w-2/3'>
                <div className='border-b-2 p-4'>
                    <h1 className='text-2xl mb-2'>Shipping</h1>
                    <p className='text-md font-medium'>
                        <strong>Address:&nbsp;</strong>
                        {order.shippingAddress.address}, 
                        {order.shippingAddress.city}, 
                        {order.shippingAddress.postalCode}, 
                        {order.shippingAddress.country} 
                    </p>
                </div>
                <div className='border-b-2 p-4'>
                    <h1 className='text-2xl mb-2'>Payment Method</h1>
                    <p className='text-md font-medium'>
                        <strong>Method:&nbsp;</strong>
                        {order.paymentMethod}
                    </p>
                </div>
                <div className='p-4'>
                <h1 className='text-2xl mb-2'>Order Items</h1>
                    {order.orderItems.length === 0 ? 
                    <div className="alert alert-warning shadow-sm rounded-none mt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Your Cart is empty Go Back And Add Something!</span>
                    </div>
                    </div> :
                        order.orderItems.map((item) => (
                            <div className="card card-side bg-base-100 rounded-none h-12 mt-4 border-b-2">
                            <figure className="w-1/12 mr-2"><img src={item.image} alt="product"/></figure>
                            <Link to={`/product/${item.product}`} className="hover:underline text-sm text-black font-semibold m-2 w-3/5">
                                {item.name}
                            </Link>
                            <h1 className="text-md text-black font-semibold m-2 w-1/3">{item.qty} &nbsp; x &nbsp; &#8377; {item.price} = {item.price*item.qty}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-auto w-1/3'>
                <div className="card w-auto h-80 bg-base-100 rounded-none mx-5 grid grid-rows-5 border-2 divide-y-2 my-4 lg:my-0">
                    <div className="grid grid-cols-1">
                        <h1 className='text-2xl m-auto'>Order Summary</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Items:</h1>
                        <h1 className='m-auto '>&#8377;</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Shipping:</h1>
                        <h1 className='m-auto'>&#8377; {order.shippingPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Tax:</h1>
                        <h1 className='m-auto'>&#8377; {order.taxPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Total:</h1>
                        <h1 className='m-auto'>&#8377; {order.totalPrice}</h1>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OrderScreen