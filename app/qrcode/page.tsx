import Image from "next/image";
import styles from "../page.module.css";
import QRcode from "../../components/QRcode";
export default function Home() {
  function handleClick() {
    alert("You clicked me!");
  }

  return (
    <>
      <QRcode></QRcode>
    </>
  );
}
