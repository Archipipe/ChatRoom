import styles from "../styles/header.module.scss";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const avaRef = useRef<HTMLDivElement>(null);
  const [avaStyle, setAvaStyle] = useState({ width: "0px" });
  useEffect(() => {
    if (avaRef.current) {
      setAvaStyle({ width: `${avaRef.current.offsetHeight}px` });
    }
  }, [avaRef]);
  return (
    <div className={styles.header}>
      <nav>
        <div></div>
        <div></div>
        <div></div>
      </nav>
      <div ref={avaRef} style={avaStyle}></div>
    </div>
  );
}
