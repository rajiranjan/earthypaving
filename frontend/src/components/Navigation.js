import axios from "../axios";
import React, { useRef, useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from 'react-icons/fa';
import { logout, resetNotifications } from "../features/userSlice";
import "./Navigation.css";
function Navigation({ userImage }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  function handleLogout() {
    dispatch(logout());
  }
  const unreadNotifications = user?.notifications?.reduce((acc, current) => {
    if (current.status === "unread") return acc + 1;
    return acc;
  }, 0);
  function handleToggleNotifications() {
    setShowNotifications((prevShowNotifications) => !prevShowNotifications);
    dispatch(resetNotifications());
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";
    dispatch(resetNotifications());
    if (unreadNotifications > 0)
      axios.post(`/users/${user._id}/updateNotifications`);
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        !bellRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Navbar expand="lg" className="navibar">
      <Container className="contain">
        <LinkContainer to="/" className="navlink">
          <Navbar.Brand className="earth">
            <img src="https://res.cloudinary.com/dy1pydfmg/image/upload/v1683837213/page-1-removebg-preview_r65mi6.png" className="home-banner" alt="Logo" />
          </Navbar.Brand>
        </LinkContainer>
        <div className="nav-links">
          <LinkContainer to="/" className="navlink-link" >
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/aboutus" className="navlink-link">
            <Nav.Link>About Us</Nav.Link>
          </LinkContainer>
          {/* <LinkContainer to="/category/all" className="navlink-link">
            <Nav.Link>Products</Nav.Link>
          </LinkContainer> */}
          <NavDropdown title="Products" id="productDropdown">
            <LinkContainer to="/category/all">
              <NavDropdown.Item>All Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/category/stones">
              <NavDropdown.Item>Stones</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/category/grasses">
              <NavDropdown.Item>Grasses</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login" className="navlinknav" style={{ color: "white" }}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
            {user && !user.isAdmin && (
              <LinkContainer to="/cart" className="navlink-link" style={{marginLeft:"15%", marginBottom:"-25px"}}>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <>
                <Nav.Link
                  className="navlinknav1"
                  onClick={handleToggleNotifications}
                >
                  <div className="navlinknav-icon">
                    <i style={{ color: "#BA9364" }}
                      className="fas fa-bell"
                      ref={bellRef}
                      data-count={unreadNotifications || null}
                    ></i>
                  </div>
                </Nav.Link>
                <NavDropdown title={<FaUser style={{ color: '#BA9364' }} />} id="basic-nav-dropdown">
                  {user.isAdmin && (
                    <>
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/new-product">
                        <NavDropdown.Item>Create Product</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                    </>
                  )}
                  {user && !user.isAdmin && (
                    <LinkContainer to="/orders" className="order">
                      <Nav.Link>My Orders </Nav.Link>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={handleLogout} className="logoutBtn">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {userImage && (
                  <img
                    src={userImage}
                    alt="User"
                    className="user-image"
                  />
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div
        id="notify"
        className="notifications-container"
        ref={notificationRef}
        style={{
          backgroundColor: "#152D51",
          position: "absolute",
          top: bellPos.top + 60,
          left: bellPos.right,
          display: showNotifications ? "block" : "none",
          zIndex: 100,
        }}
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p id="para" className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifications yet</p>
        )}
      </div>
    </Navbar>
  );
}
export default Navigation;