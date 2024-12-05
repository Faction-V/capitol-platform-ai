import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const proxy = process.env.CLJ_API_BASE_URL;
  const pathname = request.nextUrl.pathname;
  const code = request.nextUrl.searchParams.get("code");
  const email = request.nextUrl.searchParams.get("email");

  // If the user is trying to validate an invitation code
  if (pathname.includes("/org/invite")) {
    const code = request.nextUrl.searchParams.get("code");
    const email = request.nextUrl.searchParams.get("email");

    const result = await fetch(`${proxy}/org/member/invite/validate`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const member = await result.json();

    if (member?.cookieName && member?.cookie) {
      cookieStore.set(member?.cookieName, member?.cookie);
    }

    if (!member.error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const data = await fetch(`${proxy}/user/current-user`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
  });

  const user = await data.json();

  const userData = {
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    isOwner: user?.orgInfo?.role === "owner",
    orgName: user?.orgInfo?.name,
    orgLogo: user?.orgInfo?.imageUrl,
  };

  // If the user is authenticated, continue as normal
  if (!user.error) {
    if (!user?.firstName && !user?.lastName && pathname !== "/new-member") {
      return NextResponse.redirect(new URL("/new-member", request.url));
    }

    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const headers = new Headers(request.headers);
    headers.set("user", JSON.stringify(userData));

    return NextResponse.next({
      request: {
        headers,
      },
    });
  }

  if (code && email) {
    const data = await fetch(`${proxy}/user/otp/validate`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        email: email?.toLowerCase(),
        code: code,
      }),
    });

    const responseData = await data.json();
    cookieStore.set(responseData?.cookieName, responseData?.cookie);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname !== "/login") {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|images|public).*)",
  ],
};
