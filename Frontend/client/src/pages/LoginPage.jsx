import React,{ useState,useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login  as loginService } from '../services/authService';
import { Container , Box , Typography , TextField , Button , Alert } from '@mui/material';

function LoginPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ error , setError ] = useState(null);    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    

    // const handleChange = (e) =>{
    //     if(error) setError(null);

    //     setFormData({
    //         ...formData,
    //         [e.target.name] : e.target.value,
    //     });
    // };

    const handleSubmit = async (e) =>{ 
        e.preventDefault();
        setError(null);

        try{
            // const data = await loginService(formData);
            
            // console.log('Login Successfull',data);
            // if(data.token){
            //     localStorage.setItem('token',data.token);

            //     login(data);//update the global AuthContext state with the user data
            //     navigate('/');//Redirect the user to the homapage
            //     console.log('Token saved to localstorage');
                
            // }

            await login(email,password);
            navigate(from,{ replace: true });
        }
        catch(err){
            // const errData = err.response?.data;
            // console.error(err);
            // setError(errData.message || err.message || 'An unexpected error occurred . Please try again later')
            setError(err.message || 'Failed to login.')
            
        }
        
    };

  return (
    // <div className='flex min-h-[80vh] items-center justify-center bg-[#f9f9f9] p-8'>
        
    //     <form onSubmit={handleSubmit} className="w-full max-w-[400px] rounded-[12px] bg-white p-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.1)]">

    //     <h2 className="mb-8 text-2xl text-[#333]"> Welcome Back 😊 </h2>

    //         {error && <p className="mb-4 rounded-[8px] border border-[#f5c6cb] bg-[#f8d7da] px-5 py-3 text-center text-[#721c24]">{error}</p>}

    //     <div className="mb-6 text-left">

    //         <label html = "email">Email Address</label>
    //         <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
    //          transition-colors focus:border-[#f0a500] focus:outline-none
    //          focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
    //             type='email'
    //             id = 'email'
    //             name = 'email'
    //             placeholder='Enter your email'
    //             value={formData.email}
    //             onChange={handleChange}
    //             required
    //         />
    //     </div>

    //     <div className="mb-6 text-left">

    //         <label html = "password">Password</label>
    //         <input   className="w-full rounded-[8px] border border-[#ddd] px-4 py-3 text-base
    //          transition-colors focus:border-[#f0a500] focus:outline-none
    //          focus:shadow-[0_0_0_2px_rgba(240,165,0,0.2)]"
    //             type='password'
    //             id = 'password'
    //             name = 'password'
    //             placeholder='Enter your password'
    //             value={formData.password}
    //             onChange={handleChange}
    //             required
    //         />
    //     </div>            

    //         <button type='submit' className='w-full rounded-[8px] bg-[#f0a500] py-[0.8rem] text-[1.1rem] font-bold text-white
    //          transition-colors hover:bg-[#d89400]'>Login</button>
    //     </form>
         
    // </div>

    <Container component="main" maxWidth="xs">
      {/* <Box> provides a wrapper for our form content. We use the sx prop to create
          a centered, column-based flex container. */}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        {/* We use Box as our form element for easy styling with `sx`. */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Conditionally render an Alert for displaying login errors. */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>

  )
}
export default LoginPage