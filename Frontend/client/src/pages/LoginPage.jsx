import React,{ useState,useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container , Box , Typography , TextField , Button , Alert } from '@mui/material';

function LoginPage() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [ error , setError ] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    const registrationMessage = location.state?.registrationMessage;

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(null);

        try{
            await login(email,password);
            navigate(from,{ replace: true });
        }
        catch(err){
            setError(err.message || 'Failed to login.');
        }

    };

  return (
    <Container component="main" maxWidth="xs">
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

          {registrationMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {registrationMessage}
            </Alert>
          )}

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
