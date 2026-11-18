import { NextRequest, NextResponse } from "next/server";

const marketingHosts = new Set(["kommee.co.uk", "www.kommee.co.uk"]);

export function middleware(request: NextRequest) {
  const hostname = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const launchApp = request.nextUrl.searchParams.get("app") === "1";
  const agent = request.headers.get("user-agent") || "";
  const nativeWebView = /; wv\)|\bKommeeAndroid\b/i.test(agent);

  if (marketingHosts.has(hostname) && !launchApp && !nativeWebView) {
    const url = request.nextUrl.clone();
    url.pathname = "/welcome";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
