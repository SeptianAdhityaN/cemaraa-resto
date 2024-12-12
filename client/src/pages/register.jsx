import AuthLayouts from "../components/Layouts/AuthLayouts";
import FormRegister from "../components/Fragments/FormRegister";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <AuthLayouts title="Register">
      <FormRegister />
      <p className="text-center text-sm mt-5">
        Already have an account?
        <Link to={"/login"} className="text-primary pl-2 font-bold">
          Login
        </Link>
      </p>
    </AuthLayouts>
  );
};

export default RegisterPage;
