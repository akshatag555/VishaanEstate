import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleauth } from '../Actions/User';
export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
  
      const result = await signInWithPopup(auth, provider);
  
      // Event listener to handle popup closure
      window.addEventListener('beforeunload', () => {
        console.log('Popup closed');
      });
  
      dispatch(googleauth(result.user.displayName, result.user.email));
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };
  
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  );
}