import AuthLayouts from "../components/Layouts/AuthLayouts";
import FormLogin from "../components/Fragments/FormLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <AuthLayouts title="Login">
      <FormLogin />
      <p className="text-center text-sm mt-5">
        Don't have an account?
        <Link to={"/register"} className="text-primary pl-2 font-bold">
          Register
        </Link>
      </p>
    </AuthLayouts>
  );
};

export default LoginPage;
