import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    // a method that sets the value of local storage
    const logged_in_status = localStorage.getItem('LoggedIn');
    if(logged_in_status === '1'){
      setIsLoggedIn(true);
    }
  }, [])
 
  // the method inside the useEffect just executes only when the dependecies [] change.
  // since there are no dependencies it will only execute once, avoiding infinite loop.
  // when the app component runs for the first time, only then the method and that is it. 
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    // after the user logs in, we want to store the status so that next time the users comes to 
    // login page, we will redirect him/her to the home page directly.
    localStorage.setItem('LoggedIn', '1'); // for logged out it will be '0'
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
