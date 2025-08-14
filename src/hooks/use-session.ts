import { useAuthStore } from '../pages/auth/store/auth-store'

export function useSession() {
  const { accessToken, isAuthenticated, signIn, signOut, user, updateTokens } = useAuthStore()
  return {
    user,
    isAuthenticated,
    accessToken,
    signIn,
    signOut,
    updateTokens,
  }
}