const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-secondary p-10">
      <aside>
        <img className="w-16 rounded-md" src="/images/logo.jpeg" alt="" />
        <p className="font-bold">
          Cemaraa Group.
          <br />
          Providing the best products
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://instagram.com/cemaraafarm" target="_blank">
            <ion-icon size="large" name="logo-instagram"></ion-icon>
          </a>
          <a href="#">
            <ion-icon size="large" name="logo-whatsapp"></ion-icon>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
