"use client";
import qrCode from "qrcode";
import { useState } from "react";
import styles from "./page.module.css";
export default function QRcode() {
  const [textarea, setTextarea] = useState("");
  const [codeImg, setcodeImg] = useState("");

  async function handleClick() {
    if (textarea) {
      const dataURL = await qrCode.toDataURL(textarea);
      console.log(dataURL);
      setcodeImg(dataURL);
    }
  }

  return (
    <>
      <textarea
        name="textarea"
        rows={5}
        cols={30}
        placeholder="text."
        onInput={(e) => {
          console.log("onInput", e);
          setTextarea((e.target as HTMLTextAreaElement).value);
        }}
      ></textarea>
      <button onClick={handleClick}>QRCODE</button>

      <img
        src={codeImg}
        width="400"
        height="400"
        alt="code"
        className={styles.img}
      />
    </>
  );
}
