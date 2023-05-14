import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import LoginComponent from "./login.component";

//  */
export default function NavbarComponent(props) {
  const { logo } = props;
  const { data: session, status } = useSession();

  const menus = [
    {
      title: "Employe",
      link: "/service",
    },
    {
      title: "Product",
      link: "/product",
    },
    {
      title: "Todo",
      link: "/todo",
    },
  ];

  return (
    <header className="fixed z-50 w-full flex justify-around items-center bg-slate-500 shadow-lg shadow-slate-400 h-12">
      <Link href={"/"} className="flex gap-5 items-center">
        {logo !== null && (
          <img className="w-8 h-8 object-cover" src={logo} alt="MyLogo" />
        )}
        <h1 className="text-lime-400">{session?.user?.name || "Guest"}</h1>
      </Link>

      <ul className="flex justify-center items-center gap-10 h-full">
        {menus.map((menu, idx) => {
          return (
            <li key={idx}>
              <Link
                className="bg-lime-300 px-4 rounded-full py-1 text-gray-700 hover:bg-gray-700 hover:text-lime-300"
                href={menu.link}
              >
                {menu.title}
              </Link>
            </li>
          );
        })}

        {session && <LoginComponent />}
      </ul>
    </header>
  );
}
