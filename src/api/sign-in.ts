import type { ISignIn } from "@/models/sign-in";
import { api } from "@/lib/axios";

export async function signIn({ token }: { token: string }) {
    try {
        const { data } = await api.post<ISignIn>('/users', {
            token
        })
        return data
    } catch (error) {
        console.error(error);
    }
}