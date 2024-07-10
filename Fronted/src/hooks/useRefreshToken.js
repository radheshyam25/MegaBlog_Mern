
import { useDispatch} from 'react-redux';
import { refresh as updateaccesstoken } from '../appwrite/backauth';
import { updatetoken } from '../store/authSlice';

const useRefreshToken=()=>{
    const dispatch=useDispatch();
    
    const refresh=async()=>{
        
        const response=await updateaccesstoken();
    
    const accesstoken=response.data.accessToken;

   dispatch(updatetoken({accesstoken}));
    return accesstoken;
}
return refresh;
};

export default useRefreshToken;





