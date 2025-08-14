import type { IUserCrendentials } from "./user-crendentials"

export interface ISignIn {
    accessToken: string
    refreshToken: string
    user: IUserCrendentials
}