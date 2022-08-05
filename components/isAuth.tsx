import styles from "../styles/isauth.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

const error_message = {
  login: "Заполни логин, сука",
  password: "Заполни пароль, сука",
  pizdec: "Хуйню пишешь...",
};

export default function IsAuth() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cookies, setCookie, deleteCookie] = useCookies();

  async function SubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    if (!password) return setErrorMessage(error_message.password);
    if (!login) return setErrorMessage(error_message.login);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const body = await response.json();
    if (body.data) {
      setCookie("user", body.data.id);
    } else {
      setErrorMessage(error_message.pizdec);
    }
  }

  return (
    <div className={styles.isauth}>
      <div>
        <div>Пчеел.. мы тебя не узнаём</div>
        <div>
          <form onSubmit={SubmitHandler}>
            <input
              type="text"
              name="login"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {errorMessage && <span>{errorMessage}</span>}
            <button type="submit">Я уже смешарик</button>
          </form>
          <Link href="/register">
            <a>Я новенький</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
