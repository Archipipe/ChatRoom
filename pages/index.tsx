import { useEffect, useRef } from "react";
import styles from "../styles/index.module.scss";

import Header from "../components/header";

export default function Index() {
  return (
    <>
      <Header></Header>
      <div className={styles.main}>
        <div></div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
