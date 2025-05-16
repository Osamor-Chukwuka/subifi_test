import react, { useState } from 'react';
import "../styles/styles.css";
import subifiLogo from "../assets/logoo.png";
import rays from "../assets/rayslogin.png";
import { BsEnvelope } from "react-icons/bs";
import { HiOutlineEyeOff } from "react-icons/hi";
import { details } from './config.js'
import { LoginApi } from '../api-call/api.jsx';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const callLoginApi = async () => {
        setLoading(true)
        try {
            const { response, jsonResponse, error } = await LoginApi(email, password);
            console.log(response)
            console.log(jsonResponse)

            if (error) {
                setError(error)
                setTimeout(() => {
                    setError(null)
                }, 3000);
                setLoading(false)
                return;
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(jsonResponse.data))
                window.location.href = '/';
            } else {
                setError(jsonResponse.apierror ? jsonResponse.apierror.message : jsonResponse.title + ' ' + '(' + jsonResponse.status + ')')
                setTimeout(() => {
                    setError(null)
                }, 3000);
                setLoading(false)
                return;
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError(null)
            }, 3000);
        }
    }

    const loginn = (e) => {
        e.preventDefault();
        callLoginApi();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        name == "email" ? setEmail(value) : setPassword(value)
    }

    return (
        <div className='flex flex-col h-0'>
            <div className='flex flex-col items-center bg-gray-100 h-screen' >
                <div className='mt-9 pt-9 w-32'>
                    <img src={subifiLogo} alt="" />
                </div>
                <div className='mb-9'>
                    <p>Admin Dashboard</p>
                </div>


                <div className='bg-white mt-9 px-9 pt-9' >
                    <div className=' '>
                        <h2 className='font-bold text-2xl'>Log in to your Account</h2>
                        <p className='pb-2'>Welcome back! Log in to your Admin account with</p>
                    </div>

                    <div className='hrDiv'>
                        <hr className='flex-grow border-gray-400' />
                    </div>

                    <form action="" className='pt-7 loginForm' onSubmit={loginn}>
                        <div className='relative flex flex-col'>
                            <label htmlFor="email">Email</label>
                            <input required onChange={handleInputChange} value={email} type="text" name="email" id="email" autoComplete="email" placeholder='someone@gmail.com' className='border-slate-500 p-2 border rounded w-full textinput' />


                            <div className="right-4 absolute inset-y-0 flex items-center pt-8">
                                <BsEnvelope className='text-lg text-slate-500'></BsEnvelope >
                            </div>
                        </div>


                        <div className='relative flex flex-col pt-7'>
                            <label htmlFor="password">Password</label>
                            <input required value={password} onChange={handleInputChange} type="password" name="password" id="password" autoComplete="password" placeholder='********' className='border-slate-500 p-2 border rounded w-full textinput' />


                            <div className="right-4 absolute inset-y-0 flex items-center pt-8">
                                <HiOutlineEyeOff className='mt-5 text-lg text-slate-500'></HiOutlineEyeOff >
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div className='flex py-3'>
                                <input type="checkbox" name="remember" id="remember" value='true' className='checked:border-green-500 check me-2' />
                                <label htmlFor="remember" className='rememberLabel'>Remember me</label>
                            </div>

                            <div className='py-3'>
                                <a href='' className='font-bold forgotPassword'>Forgot password?</a>
                            </div>
                        </div>

                        <div>
                            {error && <p className="pt-2 text-center text-red-600 text-sm" id="result">{error}</p>}
                        </div>


                        <div className='flex justify-center pt-8 pb-4 submitDiv'>
                            <button type='submit' className='py-3 rounded-lg'>Log In</button>
                        </div>
                    </form>


                </div>

            </div>
            <div className='bg-gray-100 rayImageLogin'>
                <img src={rays} alt="" className='w-full' />
            </div>
        </div>

    );
}


export default Login;