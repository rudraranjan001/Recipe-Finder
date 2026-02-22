import React,{ createContext , useState , useEffect , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';

const parseJwt = (token) =>{
    try{

        // btoa() -> encode to Base64
        // atob() -> decode from Base64
        return JSON.parse(atob(token.split('.')[1]));
    }
    catch(e){

        return null;
    }
}

const mapUserFromToken = (token) => {
    const decodedUser = parseJwt(token);

    if (!decodedUser || decodedUser.exp * 1000 <= Date.now()) {
        return null;
    }

    return {
        id: decodedUser.id,
        name: decodedUser.name,
        email: decodedUser.email,
    };
};

export const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token){
            const parsedUser = mapUserFromToken(token);

            if (parsedUser) {
                setUser(parsedUser);
            } else {
                localStorage.removeItem('token');
            }
        }

        setLoading(false);
    },[]);

    const login = async (email, password) => {
        const data = await loginService({ email, password });

        if (!data?.token) {
            throw new Error('Invalid login response from server.');
        }

        const parsedUser = mapUserFromToken(data.token);

        if (!parsedUser) {
            throw new Error('Invalid or expired token received.');
        }

        localStorage.setItem('token', data.token);
        setUser(parsedUser);

        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    };

    const authContextValue = {
        user,
        loading,
        login,
        logout,
    }

    return(
        <AuthContext.Provider value = {authContextValue}>
                {!loading && children }
        </AuthContext.Provider>
    )
};
