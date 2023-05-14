import LoginComponent from "@app/src/components/login.component";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function login() {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginComponent />
    </div>
  );
}

export default login;
