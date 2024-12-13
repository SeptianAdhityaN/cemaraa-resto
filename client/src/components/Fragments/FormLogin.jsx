import { useEffect, useRef } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    localStorage.setItem('username', username);

    navigate('/');
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

      <Button classname="bg-primary w-full" type="submit">Login</Button>
    </form>
  );
};

export default FormLogin;
