import { createContext, useState } from "react";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    
    return(
        <AuthContext.Provider
        value={{
            signed: false,
        }}
        >
         {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;