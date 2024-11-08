import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const proxy = process.env.CLJ_API_BASE_URL;

  const data = await fetch(`${proxy}/user/current-user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  const user = await data.json();

  // If the user is authenticated, continue as normal
  if (!user.error) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|login|favicon.ico|robots.txt|images|public).*)",
  ],
};
