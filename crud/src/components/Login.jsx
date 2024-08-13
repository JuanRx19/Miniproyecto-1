import "../assets/styles/Login.css"

function Login() {
  return (
    <div className="contenedor-login">
      <h1 className="titulo-cabecero">Supermercado XYZ</h1>
      <div className="contenedor-datos">
        <h3>Usuario</h3>
        <input type="text" className="datos"/>
        <h3>Contraseña</h3>
        <input type="password" className="datos"/>
        <button className="boton-login">Iniciar Sesión</button>
      </div>
    </div>
  );
}

export default Login;
