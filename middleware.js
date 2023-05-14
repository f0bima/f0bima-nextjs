import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //   const { data: session } = await useSession();

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookies: false,
  });

  console.log(token);

  if (req.nextUrl.pathname.startsWith("/todo") && !token) {
    console.log("NOT AUTH");
    return NextResponse.redirect(
      new URL([req.nextUrl.origin, "login"].join("/"))
    );
  }

  if (req.nextUrl.pathname.startsWith("/login") && token) {
    console.log("AUTH");
    return NextResponse.redirect(
      new URL([req.nextUrl.origin, "/"].join("")),
      req.url
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todo/:path*", "/todo", "/login"],
};
