import React, { useState } from "react";
import styles from "./Login.module.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // For demonstration, using static values 'admin' and 'password123'
    if (username === "admin" && password === "password123") {
      onLogin();
    } else {
      setErrorMessage("Incorrect credentials");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles["login-box"]}>
        <h2>Login to Ecolife</h2>
        <form onSubmit={handleLogin}>
          <div className={styles["user-box"]}>
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {errorMessage && (
            <div style={{ color: "#03e9f4" }}>{errorMessage}</div>
          )}
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
