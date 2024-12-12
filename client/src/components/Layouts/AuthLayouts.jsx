const AuthLayouts = (props) => {
  const { children, title } = props;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs rounded shadow-md px-3 py-2 bg-background">
        <h1 className="text-3xl text-primary font-bold">{title}</h1>
        <p className="font-medium text-secondary mb-8">Masukkan data dengan benar</p>
        {children}
      </div>
    </div>
  );
};

export default AuthLayouts;
