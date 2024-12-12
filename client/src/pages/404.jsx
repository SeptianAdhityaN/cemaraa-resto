import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="text-xl my-5">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
