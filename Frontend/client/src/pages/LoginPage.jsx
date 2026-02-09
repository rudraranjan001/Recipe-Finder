import React,{ useState } from 'react'
import { login } from '../services/authService';


function LoginPage() {
    const [formData ,setFormData] = useState({
        email : '',
        password : '',
    });

    const [ error , setError ] = useState(null);    

    const handleChange = (e) =>{
        if(error) setError(null);

        setFormData({
            ...formData,
            [e.target.name] : e.target.value,
        });
    };

    const handleSubmit = async (e) =>{ 
        e.preventDefault();
        setError(null);

        try{
            const data = await login(formData);
            
            console.log('Logging in with :',formData);
        }
        catch(err){
            const errData = err.response?.data;
            console.error(err);
            setError(errData.message || err.message || 'An unexpected error occurred . Please try again later')
            
        }
        
    };

  return (
    <div className='flex min-h-[80vh] items-center justify-center bg-[#f9f9f9] p-8'>
        
        <form onSubmit={handleSubmit} className="w-full max-w-[400px] rounded-[12px] bg-white p-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.1)]">

        <h2 className="mb-8 text-2xl text-[#333]"> Welcome Back🥳 </h2>

            {error && <p className="mb-4 rounded-[8px] border border-[#f5c6cb] bg-[#f8d7da] px-5 py-3 text-center text-[#721c24]">{error}</p>}

        <div className="mb-6 text-left">

            <label html = "email">Email Address</label>
            <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
             transition-colors focus:border-[#f0a500] focus:outline-none
             focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
                type='email'
                id = 'email'
                name = 'email'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mb-6 text-left">

            <label html = "password">Password</label>
            <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
             transition-colors focus:border-[#f0a500] focus:outline-none
             focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
                type='password'
                id = 'password'
                name = 'password'
                placeholder='Enter your password'
                value={formData.password}
                onChange={handleChange}
                required
            />
        </div>            

            <button type='submit' className='w-full rounded-[8px] bg-[#f0a500] py-[0.8rem] text-[1.1rem] font-bold text-white
             transition-colors hover:bg-[#d89400]'>Login</button>
        </form>
         
    </div>
  )
}
export default LoginPage