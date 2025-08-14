import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@/hooks/use-session'
import { toast } from 'sonner'

export function PrivateRoute() {
  const { isAuthenticated, accessToken } = useSession()

  console.log(accessToken);
  

  if (!isAuthenticated && !accessToken) {
     toast.warning('Sessão expirada! Realize novamente o login.')
    return (<Navigate to="/" replace />)
  }

  return <Outlet />
}
