const publicRoutes = new Set(['/signup', '/login', '/']);

// eslint-disable-next-line import/prefer-default-export, consistent-return
export function middleware(request) {
	const cookieValue = request.cookies.get('connect.sid')?.value;

	if (!cookieValue && !publicRoutes.has(request.nextUrl.pathname)) {
		return Response.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!_next/static|_next/image|favicon.ico).*)'
	]
};
