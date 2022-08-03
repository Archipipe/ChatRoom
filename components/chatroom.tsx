import styles from "../styles/chatroom.module.scss";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import io, { Socket } from "Socket.IO-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;

export default function ChatRoom() {
  const [input, setInput] = useState("");
  const [div, setDiv] = useState("");
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("update-input", (msg) => {
      console.log(msg);
      setDiv(msg);
    });
  };

  const onClickEvent = (e: any) => {
    if (socket) socket.emit("input-change", input);
  };

  return (
    <div className={styles.main}>
      <div></div>
      <div>
        <div>{div}</div>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
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
