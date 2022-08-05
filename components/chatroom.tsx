import styles from "../styles/chatroom.module.scss";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import io, { Socket } from "Socket.IO-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useCookies } from "react-cookie";
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;

interface IUser {
  id: string;
  login: string;
  password: string;
}
interface IBody {
  message: string;
  data: IUser;
}
interface IMessage {
  message: string;
  author: string;
}

export default function ChatRoom() {
  // States
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<IMessage[]>([]);
  const [cookie, setCookie, deleteCookie] = useCookies();
  const [user, setUser] = useState<IUser | null>(null);

  //Effects

  useEffect(() => {
    socketInitializer();
    getChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUser();
    const handleTabClose = (event: any) => {
      event.preventDefault();
      if (socket) {
        return socket.emit("delete-user", cookie?.user);
      }
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookie?.user]);

  // Functions

  const getUser = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(cookie?.user),
    });

    const body: IBody = await response.json();
    if (body.data) {
      setUser(body.data);
      if (socket) socket.emit("add-user", cookie?.user);
    }
  };

  const getChat = async () => {
    const response = await fetch("/api/message/");
    if (response.status == 200) {
      const body = await response.json();
      console.log(body);
      setChat(
        body.data.map((msg: any) => {
          return {
            message: msg.message,
            author: msg.authorLogin,
          };
        })
      );
    }
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("got-msg", (msg: IMessage) => {
      setChat((oldChat) => [...oldChat, msg]);
    });
  };

  const onClickEvent = (e: any) => {
    if (socket && user)
      socket.emit("send-msg", JSON.stringify({ message, user }));
  };

  return (
    <div className={styles.main}>
      <div></div>
      <div>
        <div>
          {chat.map((msg, index) => {
            return (
              <span key={index}>
                {msg.message} - {msg.author}
              </span>
            );
          })}
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          />
          <button
            type="submit"
            onClick={(e) => {
              onClickEvent(e);
            }}
          >
            ЖМи блятб
          </button>
        </div>
      </div>
    </div>
  );
}
