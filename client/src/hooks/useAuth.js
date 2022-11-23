import { useContext } from 'react';
import { Context } from './../providers/context/context';


const useAuth = () => {
    const { state:{ user:{ username, email, token } } } = useContext(Context)

    return {
        isAuth:!!email,
        // isAuth:true,
        email,
        username,
        token
    }
}

export default useAuth