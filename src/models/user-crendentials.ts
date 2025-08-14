export interface IUserCrendentials {
    id: string;
    email: string;
    picture?: string;
    role: "USER" | "ADMIN",
    create_at: string;
    name?: string;
}