import React,{useState} from 'react'
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {

    const navigate = useNavigate();
    const [formData , setFormData] = useState({
        name : '',
        email : '',
        password : '',
    });
    //Add a new state to hold and display any error message from the backend
    const [error, setError] = useState(null);

    const handleChange = (e) => {

        //Clear previous errors when the user starts typing again
        if(error) setError(null);
        setFormData({
            ...formData, //create a copy of existing state
            [e.target.name] : e.target.value, //it is a "computer property name" that will dynamically sets the key and updates its value
        });
    };

    //Make the handleSubmuit function asynx
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError(null);

        try{

            await register(formData);

            navigate('/login',{
                state : {
                    registrationMessage: 'Registration successful. Please login',
                    registeredEmail: formData.email,
                }
            })

        }catch(err){
            console.error(err);
            setError(err.message || 'An unexpected error occured.Pleass try again later')

        }

    };

  return (
    <div className='flex min-h-[80vh] items-center justify-center bg-[#f9f9f9] p-8'>
        <form  className="w-full max-w-[400px] rounded-[12px] bg-white p-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.1)]" onSubmit={handleSubmit}>
            <h2 className="mb-8 text-2xl text-[#333]">Create an Account</h2>

            {/* render the message if it exists */}
            {error && <p className='mb-4 rounded-[8px] border border-[#f5c6cb] bg-[#f8d7da] px-5 py-3 text-center text-[#721c24]'>{error}</p>}

            <div className="mb-6 text-left">
                <label htmlFor='name'>Name</label>
                <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
             transition-colors focus:border-[#f0a500] focus:outline-none
             focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
                    type = "text"
                    id = "name"
                    name = "name"
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange = {handleChange}
                    required
                />
            </div>

            <div className="mb-6 text-left">
                <label htmlFor='email'>Email Address</label>
                <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
             transition-colors focus:border-[#f0a500] focus:outline-none
             focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
                    type = "email"
                    id = "email"
                    name = "email"
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange = {handleChange}
                    required
                />
            </div>

            <div className="mb-6 text-left">
                <label htmlFor='password'>Password</label>
                <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
             transition-colors focus:border-[#f0a500] focus:outline-none
             focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
                    type = "password"
                    id = "password"
                    name = "password"
                    placeholder='Create your password'
                    value={formData.password}
                    onChange = {handleChange}
                    required
                />
            </div>

            <button type = "submit" className='w-full rounded-[8px] bg-[#f0a500] py-[0.8rem] text-[1.1rem] font-bold text-white
             transition-colors hover:bg-[#d89400]'>Register</button>
        </form>
    </div>
  )
}
