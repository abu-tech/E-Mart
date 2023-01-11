import { useEffect } from "react"
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from "react-redux"
import {getAllProducts, deleteProduct, createProduct, reset} from '../features/products/productSlice'
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {FaPlus} from 'react-icons/fa'

function ProductListScreen() {
    const {products, isLoading, isError, messsage, isDeleted, isCreated, product} = useSelector(state => state.products)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError){
            toast.error(messsage)
        }

        if(isDeleted){
            toast.success('Product Deleted')
            dispatch(reset())
        }

        if(isCreated){
            navigate(`/admin/products/${product._id}/edit`)
            dispatch(reset())
        }

        dispatch(getAllProducts())
    }, [dispatch, isError, messsage, isDeleted, navigate, product._id, isCreated])

    const deleteProductHandler = (productId) => {
        dispatch(deleteProduct(productId))
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <>
      <div className="flex justify-between mx-4 lg:mx-12">
        <h1 className="font-semibold text-3xl  text-black my-4">PRODUCTS</h1>
        <button className="btn rounded-none text-white my-4 hover:scale-105" onClick={createProductHandler}><FaPlus /> <p className="mx-1">Create Product</p></button>
      </div>
      {isLoading ? <Spinner /> :
        <div className="overflow-x-auto text-black mx-4 lg:mx-12">
        <table className="table w-full text-black">
        <thead>
            <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {products.map((product, index) => (
                <tr key={product._id} >
                    <th>{index + 1}</th>
                    <td>{product._id}</td>
                    <td><Link to={`/product/${product._id}`} className="hover:underline">{product.name}</Link></td>
                    <td>&#8377; {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                    <div>
                      <Link to={`/admin/products/${product._id}/edit`} className="btn bg-base-200 btn-ghost btn-sm mr-1"><BiEdit /></Link>
                      <button onClick={() => deleteProductHandler(product._id)} className="btn btn-active text-white btn-sm ml-1"><AiFillDelete /></button>
                    </div>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    </div> 
      }
    </>
  )
}

export default ProductListScreen