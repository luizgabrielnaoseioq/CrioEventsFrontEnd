import { useSession } from "@/hooks/use-session";
import { ReactTyped } from "react-typed";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { ptBR } from "date-fns/locale";

export function Home() {
  const { user } = useSession();
  return (
      <div className="flex flex-col items-center justify-center w-full h-screen space-y-4 px-14">
        <h1 className="text-2xl">
          Olá,{" "}
          <span className="text-blue-500 font-bold">
            <ReactTyped
              strings={[user?.name ?? "", "Criador"]}
              typeSpeed={100}
              loop
            />
          </span>
        </h1>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          locale={ptBR}
        />
      </div>
  );
}
