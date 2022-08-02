import styles from "../styles/register.module.scss";

import React from "react";
import { useState, useEffect } from "react";
import { Prisma } from "@prisma/client";
import { useCookies } from "react-cookie";

interface bodyType {
  data: {
    id: string;
    login: string;
    password: string;
  };
  message: string;
}

enum EInputTypes {
  login = "login",
  password = "password",
}

const error_message = {
  login: "Логин должен быть больше 4 символов и иметь буквы (Можн русской)",
  password: "Пароль должен быть больше 8 символов и иметь буквы",
  exists: "Такой еблан уже существует",
  pizdec: "Произошёл пиздец, сообщи о нём одмену",
};

export default function Register() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSumbitable, setIsSubmitable] = useState<boolean>(false);
  const [errosMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  async function SubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    e.preventDefault();
    const user: Prisma.UserCreateInput = { login, password };
    const response = await fetch("/api/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });
    setIsLoading(false);
    if (response.status === 200) {
      const body: bodyType = await response.json();
      setCookie("user", body.data.id);
    } else if (response.status === 403) {
      setErrorMessage(error_message.exists);
      setIsSubmitable(false);
    } else {
      setErrorMessage(error_message.pizdec);
    }
  }

  function ChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    switch (name) {
      case EInputTypes.login:
        setLogin(e.target.value);
        break;
      case EInputTypes.password:
        setPassword(e.target.value);
        break;
    }
  }

  useEffect(() => {
    if (!Validator(EInputTypes.login, login)) {
      setIsSubmitable(false);
      setErrorMessage(error_message[EInputTypes.login]);
      return;
    }
    if (!Validator(EInputTypes.password, password)) {
      setIsSubmitable(false);
      setErrorMessage(error_message[EInputTypes.password]);
      return;
    }
    setIsSubmitable(true);
  }, [login, password]);

  function Validator(type: EInputTypes, string: string) {
    switch (type) {
      case EInputTypes.login:
        return /^(?=.*[A-Za-zА-Яа-я])[A-Za-zА-Яа-я\d]{4,}$/.test(string);
      case EInputTypes.password:
        return /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/.test(string);
    }
  }

  return (
    <>
      <div className={styles.Register}>
        <form onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Твоё имя"
            name={EInputTypes.login}
            onChange={ChangeHandler}
            value={login}
          />
          <label htmlFor={EInputTypes.login}>Введи имя блет</label>

          <input
            type="password"
            placeholder="Твой пароль"
            name={EInputTypes.password}
            onChange={ChangeHandler}
            value={password}
          />
          <label htmlFor={EInputTypes.password}>Введи пароль блет</label>

          <span
            style={isSumbitable ? { display: "none" } : { display: "block" }}
          >
            {errosMessage}
          </span>

          <button type="submit" disabled={!isSumbitable}>
            Добавить смешарика
          </button>
        </form>
      </div>
    </>
  );
}
