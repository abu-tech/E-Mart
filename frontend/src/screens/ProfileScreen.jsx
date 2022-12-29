import { useState, useEffect } from "react"
import {FaUserTie, FaUser, FaLock} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {updateUserDetails, reset} from '../features/auth/authSlice'
import Loader from '../components/Loader'

function ProfileScreen() {
    const [changeDetails, setChangeDetails] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = formData
    const dispatch = useDispatch()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            toast.success("Details Updated!")
        }
        dispatch(reset())
    }, [message, isError, isSuccess, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const updatedData = {
        name,
        email,
        password,
    }

    const updateDetails = () => {
        dispatch(updateUserDetails(updatedData))
        setChangeDetails(false)
        setChangePassword(false)
    }

    if(isLoading) {
        return <Loader />
    }

  return (
    <div className="flex flex-col lg:flex-row mx-12 my-4">
        <div className="flex-auto w-1/4">
            <h1 className="font-semibold text-3xl text-black mb-2">USER PROFILE</h1>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex justify-start font-semibold"><FaUser /><p className='mx-0.5'>Name</p></span>
                </label>
                <input type="text" placeholder="Name" id='name' className={changeDetails ? "input input-bordered" : "input input-bordered disabled:opacity-75"} disabled={!changeDetails} onChange={onChange} value={name}/>
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex justify-start font-semibold"><FaUserTie /><p className='mx-0.5'>Email</p></span>
                </label>
                <input type="email" placeholder="Email" id='email' className={changeDetails ? "input input-bordered" : "input input-bordered disabled:opacity-75"} disabled={!changeDetails} onChange={onChange} value={email}/>
            </div>
            {changePassword && <>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex justify-start font-semibold"><FaLock /><p className='mx-0.5'>Password</p></span>
                </label>
                <input type="password" placeholder="Password" id='password' className="input input-bordered" value={password} onChange={onChange}/>
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex justify-start font-semibold"><FaLock /><p className='mx-0.5'>Confirm Password</p></span>
                </label>
                <input type="password" placeholder="Confirm Password" id='password2' className="input input-bordered" value={password2}  onChange={onChange}/>
            </div>
            </>
                }
            <label className="label">
            <Link className="label-text-alt link link-hover" onClick={() => setChangePassword(!changePassword)}>Change Password?</Link>
            </label>
            <div className="flex-row justify-between form-control mt-6">
                <button className="btn text-white hover:scale-105" onClick={() => setChangeDetails(!changeDetails)}>{changeDetails ? 'Cancel' : 'Edit'}</button>
                <button className={(changeDetails || changePassword) ? "btn btn-ghost text-black bg-base-200" : "hidden"} onClick={updateDetails}>Save Details</button>
            </div>
        </div>
        <div className="flex-auto w-3/4"></div>
    </div>
  )
}

export default ProfileScreen