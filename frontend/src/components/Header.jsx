import {Link} from 'react-router-dom'
import {MdShoppingCart} from 'react-icons/md'
import {FaUserAlt} from 'react-icons/fa'
import {BsCart4} from 'react-icons/bs'

function Header() {
  return (
<div className="navbar bg-zinc-900 text-white shadow-md sticky top-0 z-50">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link>Item 1</Link></li>
        <li><Link>Item 3</Link></li>
      </ul>
    </div>
    <Link to='/' className="btn btn-ghost normal-case text-lg lg:text-2xl lg:mx-12"><MdShoppingCart /><p className='mx-2'>E-Mart</p></Link>
    <div className="hidden lg:flex">
    <ul className="menu menu-horizontal px-1 ">
      <li><Link>Item 1</Link></li>
      <li><Link>Item 3</Link></li>
    </ul>
    </div>
  </div>
  <div className="navbar-end">
        <div className="dropdown dropdown-end mx-2">
            <label tabIndex={0} className="btn bg-white btn-circle text-black hover:bg-white hover:scale-105">
                <div className="indicator">
                  <BsCart4 />
                <span className="badge badge-sm indicator-item text-white">5</span>
                </div>
            </label>
            <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                    <button className="btn btn-block">View cart</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    <Link className="btn bg-white text-black mx-2 hover:bg-white hover:scale-105 lg:mr-12"><FaUserAlt /><p className='ml-2'>signin</p></Link>
</div>
  )
}

export default Header