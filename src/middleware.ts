import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest){
    const cookies = request.cookies.get('@auth.user')?.value;
    const user = cookies ? JSON.parse(cookies) : null;

    const signInURL = new URL('/', request.url)

    if (!user) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.next()
        }

        const response = NextResponse.redirect(signInURL);
        response.cookies.set('loginToast', 'Log in to access this page');
        return response;
    }
}

export const config = {
    matcher: ['/tours', '/tours/:path*', '/favorites', '/bookings']
}