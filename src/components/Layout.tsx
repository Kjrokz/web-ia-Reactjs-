import Navbar from "./NavbarComponent";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <div className="contenedor">
      <div className="separador">
        <div>
          <header>
            <Navbar />
          </header>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <main>{children}</main>
          </motion.div>
        </div>
        <footer /* className="fixed-bottom" */>
          <div className="footer">
            <span className="content-footer">2021</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
