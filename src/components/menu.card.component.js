import Image from "next/image";
import Link from "next/link";
import React from "react";

function MenuCardComponent(props) {
  const { title, img, link } = props;
  return (
    // <div className="">
    <Link
      href={link}
      className="relative rounded-lg bg-neutral-50 overflow-hidden hover:shadow-2xl shadow-cyan-950 hover:scale-105 duration-200"
    >
      <Image
        width={200}
        height={200}
        className="object-cover aspect-square"
        src={img}
      />
      <div className="absolute text-white bottom-0">{title}</div>
    </Link>
    // </div>
  );
}

export default MenuCardComponent;
