import React, { useState, useRef, useEffect } from "react";
import fiche2 from "./assets/fiche2.png";
import buttonImg from "./assets/button.png";
import logo from "./assets/texture_login/logo.png";
import registerFiche from "./assets/texture_register/fiche.png";
import registerButton from "./assets/texture_register/button.png";
import "./App.css";
import Menu from "./menu";
import Therapist from "./therapist";
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isRegisterView, setIsRegisterView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [currentUser, setCurrentUser] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("username") : null
  );

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      const existing = localStorage.getItem("preAuthPath");
      if (!existing) {
        localStorage.setItem("preAuthPath", window.location.pathname || "/");
      }
    }
  }, []);

  if (token) {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/therapist"
    ) {
      return <Therapist />;
    }
    return (
      <Menu
        username={currentUser}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          setToken(null);
          setCurrentUser(null);
        }}
      />
    );
  }
  // registration form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // If in register view, handle registration data
    if (isRegisterView) {
      if (!firstName || !lastName || !regEmail || !regPassword || !regConfirm) {
        alert("Please fill all registration fields.");
        return;
      }
      if (regPassword !== regConfirm) {
        alert("Passwords do not match.");
        return;
      }

      setIsRegistering(true);
      fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail,
          username: `${firstName} ${lastName}`,
          password: regPassword,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || JSON.stringify(data));
          // save token and username
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.user?.username || regEmail);
            setToken(data.token);
            setCurrentUser(data.user?.username || regEmail);
          }
          setIsRegisterView(false);
          alert("Registration successful");
        })
        .catch((err) => {
          console.error(err);
          alert("Registration failed: " + err.message);
        })
        .finally(() => setIsRegistering(false));
      return;
    }

    // sign in
    setIsRegistering(true);
    fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || JSON.stringify(data));
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.user?.username || email);
          setToken(data.token);
          setCurrentUser(data.user?.username || email);
        }
        // token and current user set — App will now render the Menu component
      })
      .catch((err) => {
        console.error(err);
        alert("Sign in failed: " + err.message);
      })
      .finally(() => setIsRegistering(false));
  }

  function handleRegisterClick(e: React.MouseEvent) {
    e.preventDefault();
    // hide the fiche2 form components immediately (we'll still run the existing animation flow)
    setIsRegistering(true);
    if (isAnimating) return;
    setIsAnimating(true);
    const el = wrapperRef.current;
    if (el) el.classList.add("fade-out");

    // wait for fade-out, swap image, then fade-in
    window.setTimeout(() => {
      setIsRegisterView(true);
      if (el) {
        el.classList.remove("fade-out");
        el.classList.add("fade-in");
      }
      window.setTimeout(() => {
        if (el) el.classList.remove("fade-in");
        setIsAnimating(false);
        // registration flow started — clear the temporary 'isRegistering' flag
        // so controls are not permanently disabled
        setIsRegistering(false);
      }, 350);
    }, 300);
  }

  return (
    <div className="app-container">
      <div className="app-bg" />

      <img src={logo} className="site-logo" alt="Logo" />

      <div className="fiche2-wrapper" ref={wrapperRef}>
        <img
          src={isRegisterView ? registerFiche : fiche2}
          className="fiche2-img"
          alt={isRegisterView ? "fiche-register" : "fiche2"}
        />

        <form
          ref={formRef}
          className={`fiche2-form ${
            isRegistering || isRegisterView ? "hide-contents" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            className="fiche2-email"
            placeholder="Enter your email"
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isRegistering || isRegisterView}
          />

          <input
            type="password"
            className="fiche2-password"
            placeholder="Enter your password"
            aria-label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isRegistering || isRegisterView}
          />

          <div className="fiche2-controls">
            <label className="fiche2-remember">
              <input
                type="checkbox"
                className="fiche2-remember-checkbox"
                disabled={isRegistering || isRegisterView}
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="fiche2-remember-label">Remember me</span>
            </label>

            <a href="#" className="fiche2-forgot">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            className="fiche2-submit"
            aria-label="sign in"
            disabled={isRegistering || isRegisterView}
          >
            <img src={buttonImg} alt="Sign in" />
          </button>
          <a href="#" className="fiche2-register" onClick={handleRegisterClick}>
            Don't have an account ? Register
          </a>

          {/* Registration fields (appear after swap) */}
          <div
            className={`register-fields ${
              isRegisterView && !isAnimating ? "visible" : ""
            }`}
          >
            <input
              type="text"
              className="fiche2-input reg-first"
              placeholder="Prénom"
              aria-label="first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isRegisterView || isAnimating}
            />

            <input
              type="text"
              className="fiche2-input reg-last"
              placeholder="Nom"
              aria-label="last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isRegisterView || isAnimating}
            />

            <input
              type="email"
              className="fiche2-input reg-email"
              placeholder="Email"
              aria-label="registration email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              disabled={!isRegisterView || isAnimating}
            />

            <input
              type="password"
              className="fiche2-input reg-pass"
              placeholder="Password"
              aria-label="registration password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              disabled={!isRegisterView || isAnimating}
            />

            <input
              type="password"
              className="fiche2-input reg-confirm"
              placeholder="Confirm password"
              aria-label="confirm password"
              value={regConfirm}
              onChange={(e) => setRegConfirm(e.target.value)}
              disabled={!isRegisterView || isAnimating}
            />

            <button
              type="submit"
              className="fiche2-submit reg-submit"
              aria-label="register"
              disabled={!isRegisterView || isAnimating}
            >
              <img src={registerButton} alt="Register" />
            </button>
          </div>
        </form>
        {isRegisterView && !isAnimating && (
          <button
            type="button"
            className="register-cta-btn"
            onClick={() => {
              const f = formRef.current as HTMLFormElement | null;
              if (f) {
                const requestSubmit = (
                  f as HTMLFormElement & {
                    requestSubmit?: (submitter?: HTMLElement | null) => void;
                  }
                ).requestSubmit;
                if (typeof requestSubmit === "function") {
                  requestSubmit.call(f);
                } else {
                  f.submit();
                }
              }
            }}
          >
            <img src={registerButton} alt="Register" />
          </button>
        )}
      </div>
    </div>
  );
}
