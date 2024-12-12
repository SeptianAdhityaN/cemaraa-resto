import { useEffect, useRef } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const handleLogin = (event) => {
    event.preventDefault();
    localStorage.setItem('username', event.target.username.value);
  };

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Username"
        name="username"
        type="text"
        placeholder="Asep Mangkuwanito"
        ref={usernameRef}
      />

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="********"
      />

      <Link to={"/"}><Button classname="bg-primary w-full" type="submit">Login</Button></Link>
    </form>
  );
};

export default FormLogin;
