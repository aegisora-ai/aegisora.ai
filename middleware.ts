```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `[Supabase Middleware] Missing required environment variable: ${name}`,
    );
  }

  return value;
}

const protectedRoutes = ["/dashboard"];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = request.nextUrl.clone();

  loginUrl.pathname = "/login";
  loginUrl.searchParams.set(
    "returnTo",
    `${request.nextUrl.pathname}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

function redirectToDashboard(request: NextRequest): NextResponse {
  const dashboardUrl = request.nextUrl.clone();

  dashboardUrl.pathname = "/dashboard";
  dashboardUrl.search = "";

  return NextResponse.redirect(dashboardUrl);
}

export async function middleware(request: NextRequest) {
  const supabaseUrl = getRequiredEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
  );

  const supabaseAnonKey = getRequiredEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          for (const {
            name,
            value,
            options,
          } of cookiesToSet) {
            request.cookies.set(name, value);
          }

          response = NextResponse.next({
            request,
          });

          for (const {
            name,
            value,
            options,
          } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (isProtectedRoute(pathname) && !user) {
    return redirectToLogin(request);
  }

  if (pathname === "/login" && user) {
    return redirectToDashboard(request);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
  ],
};
```
