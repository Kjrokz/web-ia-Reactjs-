import { Navbar, Container, Nav, Image, NavDropdown } from "react-bootstrap";
import { DropdownSubmenu } from "react-bootstrap-submenu";
import { NavLink, Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.png";

const NavbarComponent = () => {
  const location = useLocation();

  //console.log(location);

  return (
    <div>
      <Navbar collapseOnSelect variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to={`${process.env.REACT_APP_ROUTE}/`}>
              <Image src={Logo} width={200} height={50} className="image" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <NavLink
                to={`${process.env.REACT_APP_ROUTE}/`}
                activeClassName="active"
                className="nav-link"
                exact={true}
              >
                Home
              </NavLink>

              {/* <Link href="/tires">
                <span
                  className={`nav-link ${
                    router.pathname === "/tires" ? "active" : ""
                  }`}
                >
                  Tires
                </span>
              </Link> */}

              <NavDropdown id="nav-dropdown-webcam" title="Webcam">
                <div
                  className={`${
                    location.pathname ===
                    `${process.env.REACT_APP_ROUTE}/facial`
                      ? "activeDropdown"
                      : ""
                  }`}
                >
                  <NavDropdown.Item>
                    <Link to={`${process.env.REACT_APP_ROUTE}/facial`}>
                      <span>Facial</span>
                    </Link>
                  </NavDropdown.Item>
                </div>
                <div
                  className={`${
                    location.pathname === `${process.env.REACT_APP_ROUTE}/eyes`
                      ? "activeDropdown"
                      : ""
                  }`}
                >
                  <NavDropdown.Item>
                    <Link to={`${process.env.REACT_APP_ROUTE}/eyes`}>
                      <span className="link">Eyes</span>
                    </Link>
                  </NavDropdown.Item>
                </div>
                <div
                  className={`${
                    location.pathname ===
                    `${process.env.REACT_APP_ROUTE}/direction`
                      ? "activeDropdown"
                      : ""
                  }`}
                >
                  <NavDropdown.Item>
                    <Link to={`${process.env.REACT_APP_ROUTE}/direction`}>
                      <span className="link">Direction</span>
                    </Link>
                  </NavDropdown.Item>
                </div>
                <div
                  className={`${
                    location.pathname ===
                    `${process.env.REACT_APP_ROUTE}/webcam`
                      ? "activeDropdown"
                      : ""
                  }`}
                >
                  <NavDropdown.Item>
                    <Link to={`${process.env.REACT_APP_ROUTE}/webcam`}>
                      <span className="link">Fatiga</span>
                    </Link>
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              <NavDropdown id="nav-dropdown-tires" title="Tires">
                <div
                  className={`${
                    location.pathname ===
                    `${process.env.REACT_APP_ROUTE}/tiresDesgaste`
                      ? "activeDropdown"
                      : ""
                  }`}
                >
                  <NavDropdown.Item>
                    <Link to={`${process.env.REACT_APP_ROUTE}/tiresDesgaste`}>
                      <span className="link">Desgaste superior</span>
                    </Link>
                  </NavDropdown.Item>
                </div>
                <div
                  className={`${
                    location.pathname ===
                    `${process.env.REACT_APP_ROUTE}/tiresCorteLateral`
                      ? "activeDropdown"
                      : ""
                  }`}
                >
                  <NavDropdown.Item>
                    <Link
                      to={`${process.env.REACT_APP_ROUTE}/tiresCorteLateral`}
                    >
                      <span className="link">Corte lateral</span>
                    </Link>
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

              <NavDropdown id="nav-dropdown-tires" title="Security">
                <DropdownSubmenu title="Helmet" id="collasible-nav-dropdown">
                  <div
                    className={`${
                      location.pathname ===
                      `${process.env.REACT_APP_ROUTE}/helmet`
                        ? "activeDropdown"
                        : ""
                    }`}
                  >
                    <NavDropdown.Item>
                      <Link to={`${process.env.REACT_APP_ROUTE}/helmet`}>
                        <span className="link">Image</span>
                      </Link>
                    </NavDropdown.Item>
                  </div>
                  <div
                    className={`${
                      location.pathname ===
                      `${process.env.REACT_APP_ROUTE}/helmetVideo`
                        ? "activeDropdown"
                        : ""
                    }`}
                  >
                    <NavDropdown.Item>
                      <Link to={`${process.env.REACT_APP_ROUTE}/helmetVideo`}>
                        <span className="link">Video</span>
                      </Link>
                    </NavDropdown.Item>
                  </div>
                </DropdownSubmenu>

                <DropdownSubmenu title="Antiparra" id="collasible-nav-dropdown">
                  <div
                    className={`${
                      location.pathname ===
                      `${process.env.REACT_APP_ROUTE}/antiparra`
                        ? "activeDropdown"
                        : ""
                    }`}
                  >
                    <NavDropdown.Item>
                      <Link to={`${process.env.REACT_APP_ROUTE}/antiparra`}>
                        <span className="link">Image</span>
                      </Link>
                    </NavDropdown.Item>
                  </div>
                  <div
                    className={`${
                      location.pathname ===
                      `${process.env.REACT_APP_ROUTE}/antiparraVideo`
                        ? "activeDropdown"
                        : ""
                    }`}
                  >
                    <NavDropdown.Item>
                      <Link
                        to={`${process.env.REACT_APP_ROUTE}/antiparraVideo`}
                      >
                        <span className="link">Video</span>
                      </Link>
                    </NavDropdown.Item>
                  </div>
                </DropdownSubmenu>
              </NavDropdown>

              <NavLink
                to={`${process.env.REACT_APP_ROUTE}/countObjects`}
                activeClassName="active"
                className="nav-link"
              >
                Count Object
              </NavLink>

              {/* <NavLink
                to={`${process.env.REACT_APP_ROUTE}/trackingObjects`}
                activeClassName="active"
                className="nav-link"
              >
                Tracking Objects
              </NavLink> */}

              <NavLink
                to={`${process.env.REACT_APP_ROUTE}/areas`}
                activeClassName="active"
                className="nav-link"
              >
                Area images
              </NavLink>
              <NavLink
                to={`${process.env.REACT_APP_ROUTE}/truck`}
                activeClassName="active"
                className="nav-link"
              >
                Volume Truck
              </NavLink>
              {/* <Link href="/consideraciones">
                <span
                  className={`nav-link ${
                    router.pathname === "/consideraciones" ? "active" : ""
                  }`}
                >
                  Consideraciones
                </span>
              </Link> */}
            </Nav>
          </Navbar.Collapse>
          {/* <Button className="responsive">1</Button> */}
          {/* <BiMenu
            className="responsive"
            fill="white"
            width={100}
            height={100}
            onClick={() => {}}
          /> */}
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
