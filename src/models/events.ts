export interface EventsProps {
    id: string;
    title: string;
    image_url: string;
    description: string;
    start_date: string;
    end_date: string;
    address: {
        number: string;
        id: string;
        street: string;
        city: "CRICIUMA" | "TUBARAO" | null;
        complement: string | null;
    }
}