import React,{useState} from 'react'

export default function RegisterPage() {

    const [formData , setFormData] = useState({
        name : '',
        email : '',
        password : '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, //create a copy of existing state
            [e.target.name] : e.target.value, //it is a "computer property name" that will dynamically sets the key and updates its value
        });
    };
    const handleSubmit = (e) => {
        s.preventDefault();
        console.log('Registering with :', formData);
        
    };

  return (
    <div className='auth-container'>
        <form  className="auth-form" onSubmit={handleSubmit}>
            <h2>Create an Account</h2>

            <div className="form-group">
                <label htmlFor='name'>Name</label>
                <input 
                    type = "text"
                    id = "name"
                    name = "name"
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange = {handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor='email'>Email Address</label>
                <input 
                    type = "email"
                    id = "email"
                    name = "email"
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange = {handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor='password'>Password</label>
                <input 
                    type = "password"
                    id = "password"
                    name = "password"
                    placeholder='Create your password'
                    value={formData.password}
                    onChange = {handleChange}
                    required
                />
            </div>

            <button type = "submit" className='auth-button'>Register</button>
        </form>
    </div>
  )
}
