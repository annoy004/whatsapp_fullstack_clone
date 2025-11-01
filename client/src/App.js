

import React, { useState, useEffect } from "react";
import "./App.css";
import Messenger from "./components/Messenger.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/accountprovider.jsx";
import Loader from "./components/Loader.jsx"; // 👈 make sure this exists

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // ✅ Set Google Client ID
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '453626519073-ca6d59jjoskudtm62v380uvho4l2qqla.apps.googleusercontent.com';

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000); // start fade after 2s
    const removeTimer = setTimeout(() => setLoading(false), 2500); // hide loader
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          opacity: fadeOut ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
