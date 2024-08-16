import "../assets/styles/Login.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggin, setLogin] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/empleado/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  function verificar(){
    try{
      const userquery = users.find(use => use.Usuario === user);
      if(userquery.Contraseña === password){
        console.log("Correcto")
        setLogin(true)
        //navigate('/home');
      }else{
        console.log("Incorrecto")
      }
    } catch (error){
      console.error("Usuario no existente")
    }
    
  }

  return (
    <div className="contenedor-login">
      <h1 className="titulo-cabecero">Supermercado XYZ</h1>
      <div className="contenedor-datos">
        {isLoggin && (
          <Navigate to="/Home" replace={true} />
        )}
        <h3>Usuario</h3>
        <input value={user} onChange={(e) => setUser(e.target.value)} type="text" className="datos"/>
        <h3>Contraseña</h3>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="datos"/>
        <button onClick={verificar} className="boton-login">Iniciar Sesión</button>
      </div>
    </div>
  );
}

export default Login;
