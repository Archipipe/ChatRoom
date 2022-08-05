import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ChatRoom from "../components/chatroom";
import Header from "../components/header";
import IsAuth from "../components/isAuth";

export default function Index(props: any) {
  const [cookie, setCookie, deleteCookie] = useCookies();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(!cookie.user);
  }, [cookie]);

  return (
    <>
      {isAuth && <IsAuth />}
      <Header />
      <ChatRoom />
    </>
  );
}
