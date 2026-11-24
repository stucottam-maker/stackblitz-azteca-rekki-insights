import { NextRequest, NextResponse } from "next/server";

const marketingHosts = new Set(["kommee.co.uk", "www.kommee.co.uk"]);
const marketingPaths = new Set(["/welcome", "/pricing", "/demo", "/join"]);

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const launchApp = request.nextUrl.searchParams.get("app") === "1";
  const agent = request.headers.get("user-agent") || "";
  const nativeWebView = /; wv\)|\bKommeeAndroid\b/i.test(agent);
  const path = request.nextUrl.pathname;

  if (path === "/" && marketingHosts.has(hostname) && !launchApp && !nativeWebView) {
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.rewrite(url);
  }
  const response = NextResponse.next();
  if (!marketingHosts.has(hostname) || !marketingPaths.has(path)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

// Keep static files and API requests outside this page-only SEO middleware.
export const config = { matcher: ["/", "/welcome", "/pricing", "/demo", "/join", "/account/:path*", "/compliance/:path*", "/ingredients/:path*", "/insights/:path*", "/invoices/:path*", "/login/:path*", "/menu/:path*", "/orders/:path*", "/recipes/:path*", "/reports/:path*", "/reset-password/:path*", "/restaurants/:path*", "/settings/:path*", "/stock/:path*", "/suppliers/:path*", "/team/:path*", "/workspaces/:path*"] };
