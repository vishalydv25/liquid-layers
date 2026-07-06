import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useCart, useWishlist } from "../../Context";
import { fetchCartProducts, fetchWishlist } from "../../Utils";
import styles from "./Login.module.css";

const Login = () => {
  const { authDispatch } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const location = useLocation();

  const emailRef = useRef();

  const navigate = useNavigate();

  const { cartDispatch } = useCart();

  const { wishlistDispatch } = useWishlist();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const guestLoginHandler = () => {
    setFormData((prev) => ({
      ...prev,
      email: "test@gmail.com",
      password: "test123",
      rememberMe: true,
    }));
  };

  const formSubmitHandler = async (e) => {
    if (formData.email && formData.password) {
      e.preventDefault();
      try {
        const response = await axios.post("/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          toast.success(`Welcome back! ${response.data.foundUser.firstName}`);
          authDispatch({
            type: "LOGIN",
            payload: {
              token: response.data.encodedToken,
              user: response.data.foundUser,
            },
          });
          if (formData.rememberMe) {
            localStorage.setItem("token", response.data.encodedToken);
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.foundUser)
            );
          }
          fetchCartProducts(response.data.encodedToken, cartDispatch);
          fetchWishlist(response.data.encodedToken, wishlistDispatch);
          navigate(location?.state?.from?.pathname || -1, { replace: true });
        } else {
          console.error("ERROR: ", response);
          alert("ERROR");
        }
      } catch (error) {
        toast.error(error.response.data.errors[0]);
        console.error(error);
      }
    }
  };

  return (
    <>
      <main>
        <form>
          <div className={styles.loginContainer}>
            <h3>Login</h3>
            <div className={`input-container ${styles.inputContainer}`}>
              <label htmlFor="email">Email Address *</label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className={`input-container ${styles.inputContainer}`}>
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className={`checkbox-container ${styles.checkboxContainer}`}>
              <input
                type="checkbox"
                name="disabled example input"
                id="checkbox-1"
                checked={formData.rememberMe}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    rememberMe: !prev.rememberMe,
                  }))
                }
              />
              <label htmlFor="checkbox-1">Remember me</label>
            </div>
            <button
              className={`btn ${styles.guestLogin}`}
              type="button"
              onClick={guestLoginHandler}
            >
              Use guest credentials
            </button>
            <button
              className={`btn ${styles.btn}`}
              type="submit"
              onClick={formSubmitHandler}
            >
              Log In
            </button>
            <div className={styles.spacer}>
              <span>OR</span>
            </div>
            <button className={`btn ${styles.btn} ${styles.secondary}`}>
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export { Login };
