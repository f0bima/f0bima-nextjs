import Image from "next/image";
import { Inter } from "next/font/google";
import MenuCardComponent from "@app/src/components/menu.card.component";
import moment from "moment/moment";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginComponent from "@app/src/components/login.component";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-neutral-200 px-52 gap-4"
      data-theme="cupcake"
    >
      <h1 className="text-5xl font-light">{`Hello ${
        status === "authenticated" ? session.user.name : "Guest"
      }`}</h1>
      <p className="text-center italic font-light">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim illo
        suscipit necessitatibus perferendis inventore autem dignissimos ullam
        repellat accusamus veniam!
      </p>

      <LoginComponent />

      <div className="grid grid-cols-3 gap-4">
        <MenuCardComponent
          title="Employee."
          img="/assets/employe.jpg"
          link={"/service"}
        />
        <MenuCardComponent
          title="Product"
          img="/assets/shoping.jpg"
          link={"/product"}
        />
        <MenuCardComponent
          title="Task"
          img="/assets/task.webp"
          link={"/todo"}
        />
      </div>
    </div>
  );
}
