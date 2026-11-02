import "../styles/pages/auth.css";

import { useAtom } from "jotai";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { authRepository } from "../modules/auth/auth.repository";
import { currentUserAtom } from "../modules/auth/current-user.state";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const signin = async () => {
    const { user } = await authRepository.signin(email, password);
    setCurrentUser(user);
  };

  if (currentUser) return <Navigate to="/" replace />;

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-title">Notionクローン</h2>
        <div className="auth-form-container">
          <div className="auth-card">
            <div className="auth-form">
              <div>
                <label className="auth-label" htmlFor="email">
                  メールアドレス
                </label>
                <div className="auth-input-container">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <label className="auth-label" htmlFor="password">
                  パスワード
                </label>
                <div className="auth-input-container">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    className="input-auth"
                  />
                </div>
              </div>
              <div>
                <button
                  disabled={!email || !password}
                  onClick={signin}
                  className="home-button"
                  style={{ width: "100%" }}
                >
                  ログイン
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
