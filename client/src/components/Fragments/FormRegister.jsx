import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect, useRef } from "react";

const FormLogin = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    localStorage.setItem('username', event.target.text.value);
    localStorage.setItem('email', event.target.email.value);
    window.location.href = "/login";
  } 

  const usernameRef = useRef(null);
  useEffect(() => {
    usernameRef.current.focus();
  }, [])

  return (
    <form onSubmit={handleRegister}>
      <InputForm
        label="Username"
        name="text"
        type="text"
        placeholder="Asep Mangkuwanito"
        ref={usernameRef}
      />

      <InputForm
        label="Email"
        name="email"
        type="email"
        placeholder="asep@gmail.com"
      />

      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="********"
      />
      <InputForm
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="********"
      />

      <Button classname="bg-primary w-full" type="submit">Register</Button>
    </form>
  );
};

export default FormLogin;
