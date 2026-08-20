import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function proxy(req) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("accessToken")?.value;

  if (pathname === "/login") {
    if (accessToken) {
      try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
