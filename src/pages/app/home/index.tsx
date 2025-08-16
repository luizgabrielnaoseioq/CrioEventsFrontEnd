"use client";

import { useSession } from "@/hooks/use-session";
import { ReactTyped } from "react-typed";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/api/events";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Clock,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventsProps {
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
  };
}

export function Home() {
  const { user } = useSession();
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });

  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const startFormatted = start.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });

    const endFormatted = end.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  const formatAddress = (address: EventsProps["address"]) => {
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.number) parts.push(address.number);
    if (address.city) parts.push(address.city);
    return parts.join(", ");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Olá,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <ReactTyped
                  strings={[`${user?.name}!`, "Criador!"]}
                  typeSpeed={100}
                  loop
                />
              </span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl">
            Descubra eventos incríveis e conecte-se com experiências únicas
          </p>
        </motion.div>

        <Separator className="mb-8" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Próximos Eventos
            </h2>
            {events && events.length > 0 && (
              <Badge variant="secondary" className="text-sm">
                {events.length} {events.length === 1 ? "evento" : "eventos"}
              </Badge>
            )}
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && events && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          event.image_url ||
                          "/placeholder.svg?height=200&width=400&query=event"
                        }
                        alt={event.title || "Event image"}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900 font-semibold shadow-lg">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDateRange(event.start_date, event.end_date)}
                        </Badge>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-white/90 text-gray-900 hover:bg-white"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </h3>

                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>Início: {formatDate(event.start_date)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Fim: {formatDate(event.end_date)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">
                            {formatAddress(event.address)}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Users className="w-4 h-4 mr-1" />
                          Ver Detalhes
                        </Button>

                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && (!events || events.length === 0) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum evento encontrado
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Parece que não há eventos cadastrados ainda. Que tal criar o
                primeiro?
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/events")}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Criar Primeiro Evento
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
