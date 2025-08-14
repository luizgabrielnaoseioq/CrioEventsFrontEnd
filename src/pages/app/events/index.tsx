"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Link2,
  ImageIcon,
  Globe,
  Plus,
  Upload,
  X,
  MapPin,
} from "lucide-react";
import { api } from "@/lib/axios";

interface EventFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  social_links: string;
  event_url: string;
  image: string;
  // image: FileList | null;
}

export function EventRegistrationPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<EventFormData>();

  const watchedImage = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const onSubmit = async (data: EventFormData) => {
    try {
      const formData = {
        description: data.description,
        end_date: data.end_date,
        event_url: data.event_url,
        image_url: data.image ? data.image[0] : null,
        location: data.location,
        social_links: data.social_links,
        start_date: data.start_date,
        title: data.title,
      };

      await api.post("/events", formData);

      reset();
      setImagePreview(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cadastro de Eventos
          </h1>
          <p className="text-gray-600 text-lg">
            Crie e compartilhe seus eventos de forma simples e rápida
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Plus className="w-6 h-6 text-blue-600" />
                Novo Evento
              </CardTitle>
              <CardDescription className="text-base">
                Preencha as informações do seu evento abaixo
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Evento *</Label>
                  <Input
                    id="title"
                    {...register("title", {
                      required: "Título é obrigatório",
                      minLength: {
                        value: 3,
                        message: "Título deve ter pelo menos 3 caracteres",
                      },
                    })}
                    placeholder="Ex: Workshop de React Avançado"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Descreva seu evento..."
                  />
                </div>

                {/* Datas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="start_date"
                      className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Data de Início *
                    </Label>
                    <Input
                      id="start_date"
                      type="date"
                      {...register("start_date", {
                        required: "Data de início é obrigatória",
                      })}
                    />
                    {errors.start_date && (
                      <p className="text-red-500 text-sm">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end_date">Data de Término</Label>
                    <Input
                      id="end_date"
                      type="date"
                      {...register("end_date")}
                    />
                  </div>
                </div>

                {/* Localização */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Localização
                  </Label>
                  <Input
                    id="location"
                    {...register("location")}
                    placeholder="Ex: Avenida Paulista, São Paulo"
                  />
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="social_links"
                      className="flex items-center gap-2">
                      <Link2 className="w-4 h-4" /> Redes Sociais
                    </Label>
                    <Input
                      id="social_links"
                      type="url"
                      {...register("social_links")}
                      placeholder="https://instagram.com/seuevento"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="event_url"
                      className="flex items-center gap-2">
                      <Globe className="w-4 h-4" /> URL do Evento
                    </Label>
                    <Input
                      id="event_url"
                      type="url"
                      {...register("event_url")}
                      placeholder="https://meuevento.com"
                    />
                  </div>
                </div>

                {/* Imagem */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Imagem do Evento
                  </Label>
                  {!imagePreview ? (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Label
                        htmlFor="image"
                        className="cursor-pointer text-blue-600 font-medium">
                        Clique para fazer upload
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Botão */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12">
                    {isSubmitting ? "Cadastrando..." : "Cadastrar Evento"}
                  </Button>
                </div>

                {isSubmitSuccessful && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-700 font-medium">
                    Evento cadastrado com sucesso!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-blue-900">Organize</h3>
              <p className="text-blue-700 text-sm">Defina data e horário</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4 text-center">
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-purple-900">Compartilhe</h3>
              <p className="text-purple-700 text-sm">Links de inscrição</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <ImageIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-900">Destaque</h3>
              <p className="text-green-700 text-sm">Imagens atrativas</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
