import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import logo from './img/logo.png';
import show_password from './img/show_password.png'
import classes from './App.module.css';
import Countries from './Countries';
import Settings from './Settings';
import jwtDecode from 'jwt-decode';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    country: '',
    ricordami: false,
  });

  const [loginData, setLoginData] = useState({});
  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');

    if (storedLoginData) {
      const decodedToken = jwtDecode(storedLoginData); 
        setLoginData(decodedToken);
        setLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Esegui la chiamata POST utilizzando i dati di login
    fetch('https://sicce-test.thingscloud.it/api/mobile/login', {
      method: 'POST',
      body: JSON.stringify({ email: formData.email, password: formData.password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Login failed');
          throw new Error('Login failed');
        }
      })
      .then((data) => {
        const decodedToken = jwtDecode(data.token); 
        setLoginData(decodedToken);
        setLoggedIn(true);

        if (formData.ricordami) {
          localStorage.setItem('loginData', JSON.stringify(data));
        } else {
          localStorage.removeItem('loginData');
        }
      })
      .catch((error) => console.log(error));
  };

 
  const handleRegister = () => {
    // Azione da eseguire quando viene cliccato il pulsante "Registrati"
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/settings" /> : <LoginForm handleChange={handleChange} handleLogin={handleLogin} handleRegister={handleRegister} formData={formData} />} />
        <Route path="/settings" element={loggedIn ? <Settings loginData={loginData} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const LoginForm = ({handleChange, handleLogin, handleRegister, formData }) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleShowPassword = ()=>{
    setShowPassword(!showPassword)
  }
  return (
    <form className={classes.app}>
      <header className={classes.header}></header>

      <img className={classes.logo} src={logo} alt="logo"></img>
      <div>
      <input
        className={classes.name}
        type="text"
        id="name"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className={classes.surname}
        type="text"
        id="surname"
        name="surname"
        placeholder="Cognome"
        value={formData.surname}
        onChange={handleChange}
      />
      <input
        className={classes.email}
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className={classes.password}       
        type= {showPassword ? "text":"password"}
        id="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <img src={show_password} className={classes.showPassowrd} onClick={handleShowPassword}/>

      <Countries selectedCountry= {formData.country} handleChange={handleChange} />
      <input type="hidden" id="country" name="country" value={formData.country} />
      </div>
      <input
        className={classes.checkbox}
        type="checkbox"
        name="ricordami"
        checked={formData.ricordami}
        onChange={handleChange}
      />
      
      <div className={classes.remenberMe}>Ricordami</div>
      <a className={classes.lostPassword} >
        Password dimenticata?
      </a>

      <button className={classes.login} onClick={handleLogin}>
        Login
      </button>
      <div className={classes.haiAccount}>Non hai un account?</div>
      <button className={classes.register} onClick={handleRegister}>
        Registrati
      </button>
    </form>
  );
};

export default App;
