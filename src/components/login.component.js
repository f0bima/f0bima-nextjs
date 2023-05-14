import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

function LoginComponent() {
  const { data: session, status } = useSession();
  return (
    <div className="">
      <div
        className={`font-thin ${
          status === "authenticated" ? "hidden" : "block"
        }`}
      >
        <button
          onClick={() => signIn("google")}
          className="flex justify-center items-center gap-2 rounded-full bg-white p-2 shadow-md hover:shadow-2xl hover:scale-105 duration-75"
        >
          <Image
            src={"/assets/google logo.webp"}
            width={20}
            height={20}
          ></Image>{" "}
          <p className="font-thin">Masuk dengan Google</p>
        </button>
      </div>
      <div
        className={`font-thin ${
          status === "authenticated" ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => signOut()}
          className=" flex justify-center items-center gap-2 rounded-full bg-white p-2 shadow-md hover:shadow-2xl hover:scale-105 duration-75"
        >
          <Image
            src={"/assets/google logo.webp"}
            width={20}
            height={20}
          ></Image>{" "}
          <p className="font-thin">Logout</p>
        </button>
      </div>
    </div>
  );
}

export default LoginComponent;
