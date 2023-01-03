import {memo} from "react";
import Image from 'next/image';

const menus = ["Blog", "Socials", "Past Socials", "Clubs", "Contact"]

const Header = () => {
  return <div className="flex flex-row items-center justify-between py-2">
    <Image
      width={200}
      height={36}
      layout={"fixed"}
      src="/images/logo.svg"
      alt="logo"
    />
    <div className="flex flex-row items-center gap-8">
      {
        menus.map((item, i) => <div className="cursor-pointer text-black" key={i}>
          {item}
        </div>)
      }
    </div>
  </div>
}

export default memo(Header)
