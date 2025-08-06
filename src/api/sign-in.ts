import { api } from "../lib/axios";
import type { ISignIn } from "../models/sign-in";

export async function signIn({ token }: { token: string }) {

    console.log('tokne mano', token);
    

    try {
        const response = await api.post<ISignIn>('/users', {
           token
        })
        return response
    } catch (error) {
        console.error(error);
    }
}