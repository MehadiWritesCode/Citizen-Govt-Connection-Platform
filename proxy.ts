import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'bn']

export async function proxy(request: NextRequest) {

//create response object
let response = NextResponse.next({
    request:{
      headers:request.headers
    }
})

// for Session clear
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  //check user session
  const {data:{user}} = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  if(!user && pathname.includes('/user-dashboard')){
    const url = request.nextUrl.clone();
    const currentLang = pathname.split('/')[1] || 'en'
    url.pathname = `/${currentLang}/auth`;
    return NextResponse.redirect(url)
  }


  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = 'en' // default language
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}




