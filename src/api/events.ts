import { api } from "@/lib/axios";
import type { EventsProps } from "@/models/events";
export async function getAllEvents() {
    try {
        const { data } = await api.get<EventsProps[]>("/event")
        return data
    } catch (error) {
        console.error(error);
    }
}