import './App.css';
import Messenger from './components/Messenger.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/accountprovider.jsx';


function App() {
  // Updated for production deployment
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '453626519073-ca6d59jjoskudtm62v380uvho4l2qqla.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
          <Messenger/>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
