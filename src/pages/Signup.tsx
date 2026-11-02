import "../styles/pages/auth.css";

import { useAtom } from "jotai";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import { authRepository } from "../modules/auth/auth.repository";
import { currentUserAtom } from "../modules/auth/current-user.state";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = async () => {
    setIsSubmitting(true);
    try {
      const { user, token } = await authRepository.signup(
        name,
        email,
        password,
      );
      // setItem関数を使用して"token"という名前でアクセストークンをローカルストレージに保存
      localStorage.setItem("token", token);
      setCurrentUser(user);
    } catch {
      alert("ユーザー登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
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
                <label className="auth-label" htmlFor="username">
                  ユーザー名
                </label>
                <div className="auth-input-container">
                  <input
                    value={name}
                    // onChange={(e) => {e.target.value}}
                    onChange={(e) => setName(e.target.value)}
                    id="username"
                    name="username"
                    placeholder="ユーザー名"
                    required
                    type="text"
                    className="input-auth"
                  />
                </div>
              </div>
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
                  disabled={!name || !email || !password || isSubmitting}
                  onClick={signup}
                  className="home-button"
                  style={{ width: "100%" }}
                >
                  登録
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
