import { signIn } from "@/api/sign-in";
import { useSession } from "@/hooks/use-session";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignIn() {
  const { signIn: signInUser } = useSession();
  const navigate = useNavigate();

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: async (token: string) => {
      return await signIn({ token });
    },
    mutationKey: ["authentication"],
    onSuccess: () => {
      toast.success("Sucesso ao realizar login!");
      navigate("/calendar");
    },
    onError: () => {
      toast.error("Erro ao realizar login. Tente novamente");
    },
  });

  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div
        className="flex flex-col space-y-4 items-center justify-center h-full"
        data-aos="fade-right"
      >
        <h1 className="text-2xl font-bold">
          Bem vindo ao <span className="text-blue-500">Crio eventos!</span>
        </h1>
        <GoogleLogin
          theme="filled_blue"
          size="large"
          text="continue_with"
          shape="circle"
          ux_mode="popup"
          onSuccess={async (credentialResponse) => {
            const token = credentialResponse.credential;
            if (!token) return;
            try {
              const response = await signInFn(token);
              console.log("teste", response);
              if (response?.user && response?.accessToken) {
                signInUser(
                  response.user,
                  response.accessToken,
                  response.refreshToken
                );
              }
            } catch (err) {
              console.error("Erro ao autenticar:", err);
            }
          }}
          onError={() => console.log("Google OAuth Failed")}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
}
