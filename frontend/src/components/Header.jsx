import {Link, useNavigate} from 'react-router-dom'
import {FaUserAlt, FaUserAstronaut, FaFeatherAlt} from 'react-icons/fa'
import {ImCart} from 'react-icons/im'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Header() {
  const {user, isSuccess} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandle = () => {
    dispatch(logout())
    navigate('/login')
    toast.info('BYE BYE!')
  }

  return (
      <div className="navbar bg-zinc-900 text-white shadow-md sticky top-0 z-50">
        <div className="navbar-start">
          <Link to='/' className="btn btn-ghost normal-case text-lg lg:text-2xl lg:mx-12"><FaFeatherAlt /><p className='mx-2'>E-Mart</p></Link>
        </div>
        <div className="navbar-end">
              <div className="form-control lg:mx-4">
                <input type="text" placeholder="Search" className="input input-bordered text-black" />
              </div>
              <Link to='/cart' className="btn bg-white btn-circle text-black hover:bg-white hover:scale-105 lg:mx-4">
                  <ImCart />
              </Link>
              {user !== null ? 
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-circle text-black bg-white hover:bg-white hover:scale-105 ml-3 mr-1 lg:ml-4 lg:mr-8">
                      <FaUserAstronaut/>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li onClick={document.activeElement.blur()}><Link to='/profile' className="justify-between text-black font-medium">Profile</Link></li>
                    <li className='text-black' onClick={document.activeElement.blur()}><Link className='font-medium' onClick={logoutHandle}>Logout</Link></li>
                  </ul>
                </div> : 
                <Link to='/login' className="btn bg-white text-black mx-2 hover:bg-white hover:scale-105 lg:mr-12"><FaUserAlt /><p className='ml-2'>signin</p></Link>
              }
        </div>
      </div>
  )
}

export default Header