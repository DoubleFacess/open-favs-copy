import { defineMiddleware } from 'astro:middleware'
import { supabase } from '../providers/supabase'

const protectedRoutes = ['/dashboard', '/main', '/dashboard-dev']
const redirectRoutes = ['/login/signin', '/login/register']

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    if (protectedRoutes.includes(url.pathname)) {
      const accessToken = cookies.get('sb-access-token')
      const refreshToken = cookies.get('sb-refresh-token')

      if (!accessToken || !refreshToken) {
        return redirect('/login/signin')
      }

      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      })

      if (error) {
        cookies.delete('sb-access-token', {
          path: '/',
        })
        cookies.delete('sb-refresh-token', {
          path: '/',
        })
        return redirect('/login/signin')
      }
      console.log('auth data', data)
      locals.email = data.user?.email!
      locals.id = data.user?.id!
      const [username, domain] = locals.email.split('@');
      locals.user_name = username
      cookies.set('sb-access-token', data?.session?.access_token!, {
        sameSite: 'strict',
        path: '/',
        secure: true,
      })
      cookies.set('sb-refresh-token', data?.session?.refresh_token!, {
        sameSite: 'strict',
        path: '/',
        secure: true,
      })
    }

    if (redirectRoutes.includes(url.pathname) || redirectRoutes.includes(url.pathname.replace(/\/$/, ''))) {
      const accessToken = cookies.get('sb-access-token')
      const refreshToken = cookies.get('sb-refresh-token')

      if (accessToken && refreshToken) {
        return redirect('/dashboard-dev')
      }
    }
    return next()
  },
)
