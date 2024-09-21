import "../assets/styles/Login.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

function MyComponent({ setCaptchaToken }) {
  const onChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaToken(value); // Almacena el valor del captcha en el estado del componente padre
  };

  return (
    <div>
      <ReCAPTCHA
        sitekey="6LeZjUkqAAAAAAzw1frG8WHq86JRA5s9YslHP9C7"
        onChange={onChange}
      />
    </div>
  );
}

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggin, setLogin] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null); // Estado para almacenar el token de captcha
  const userRole = sessionStorage.getItem('userRole');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userRole) {
      navigate('/Home');
    }
  }, [userRole, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/empleado/`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  function verificar() {
    if (!captchaToken) {
      alert("Por favor completa el reCAPTCHA antes de iniciar sesión.");
      return; // Si el captcha no está completado, no permite continuar
    }

    try {
      const userquery = users.find(use => use.Usuario === user);
      if (userquery.Contraseña === password) {
        console.log("Correcto", userquery);
        setLogin(true);
        sessionStorage.setItem('userNombre', userquery.NombreEmpleado);
        sessionStorage.setItem('userRole', userquery.TipoEmpleado);
        alert("Inicio de sesión correcto");
      } else {
        sessionStorage.setItem('userNombre', null);
        sessionStorage.setItem('userRole', null);
        alert("Usuario y/o contraseña incorrectos");
        console.log("Incorrecto");
      }
    } catch (error) {
      sessionStorage.setItem('userNombre', null);
      sessionStorage.setItem('userRole', null);
      console.error("Usuario no existente");
      alert("Usuario y/o contraseña incorrectos");
    }

    setPassword("");
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      verificar(); // Ejecuta la función cuando se presiona Enter
    }
  };

  return (
    <div className="contenedor-login">
      <h1 className="titulo-cabecero">Supermercado XYZ</h1>
      <div className="contenedor-datos">
        {isLoggin && (
          <Navigate to="/Home" replace={true} />
        )}
        <h3>Usuario</h3>
        <input value={user} onChange={(e) => setUser(e.target.value)} type="text" className="datos" placeholder="Usuario" onKeyDown={handleKeyDown} />
        <h3>Contraseña</h3>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="datos" placeholder="Contraseña" onKeyDown={handleKeyDown} />
        
        <MyComponent setCaptchaToken={setCaptchaToken} />

        <button onClick={verificar} className="boton-login">Iniciar Sesión</button>
      </div>
    </div>
  );
}

export default Login;
