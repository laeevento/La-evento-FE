import Image from "next/image";
import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <div className="pt-16 pl-16 absolute">
      <Image src={logo} alt="La-Evento Logo" priority />
    </div>
  );
};

export default Logo;
