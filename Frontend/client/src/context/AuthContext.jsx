import React,{ createContext , useState , useEffect} from 'react'

const parseJwt = (token) =>{
    try{

        // btoa() → encode to Base64
        // atob() → decode from Base64
        return JSON.parse(atob(token.split('.')[1]));
    }
    catch(e){

        return null;
    }
}

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){

            //In an production app, you would make an API call to your backend  here to verify the token is still valid.
            const decodeUser = parseJwt(token);

            if(decodeUser && decodeUser.exp * 1000 > Date.now()){
                setUser({
                    id:decodeUser.id,
                    name:decodeUser.name,
                    email:decodeUser.email,
                });
            }
            else{
                localStorage.removeItem('token');
            }
        }

        setLoading(false);
    },[]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
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
    


