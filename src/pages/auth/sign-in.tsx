import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/sign-in";

export function SignIn() {
  const { mutateAsync: signInFn } = useMutation({
    mutationFn: async (token: string) => {
      return await signIn({ token });
    },
  });
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="font-bold text-2xl">
        Bem vindo ao <span className="font-bold text-blue-500">Crio!</span>
      </h1>
      <GoogleOAuthProvider clientId="217279053649-p17jfr1nr6r61umc7ft73pnrcsc50pq7.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={async (credentialsResponse: any) => {            
            try {
              signInFn(credentialsResponse.credential);
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
}
