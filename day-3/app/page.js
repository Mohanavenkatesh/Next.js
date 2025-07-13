import Image from "next/image";
import HomeComponent from "./components/Home/Home";
import AboutComponent from "./components/About/AboutComponent";

export default function Home() {
  return (
    <>
      <HomeComponent />
      <AboutComponent/>
    </>
  );
}
