import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow access to login page
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    // Allow auth API routes (needed for sign-in/sign-out to work)
    if (pathname.startsWith("/api/auth")) {
        return NextResponse.next();
    }

    // Protect admin pages and admin API routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        const response = await fetch(
            `${request.nextUrl.origin}/api/auth/get-session`,
            {
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            }
        );

        const session = await response.json();

        if (!session?.session) {
            // For API routes, return 401 Unauthorized
            if (pathname.startsWith("/api/")) {
                return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                );
            }
            // For pages, redirect to login
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};

