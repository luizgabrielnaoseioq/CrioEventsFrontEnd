"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Link2, ImageIcon, Globe, Plus, Upload, X } from "lucide-react"

interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  link: string
  eventUrl: string
  image: FileList | null
}

export function EventRegistrationPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EventFormData>()

  const watchedImage = watch("image")

  // Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    // Reset the file input
    const fileInput = document.getElementById("image") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Event data:", {
      ...data,
      image: data.image?.[0] || null,
    })

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form after success
    setTimeout(() => {
      reset()
      setImagePreview(null)
      setSubmitSuccess(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cadastro de Eventos</h1>
          <p className="text-gray-600 text-lg">Crie e compartilhe seus eventos de forma simples e rápida</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Plus className="w-6 h-6 text-blue-600" />
                Novo Evento
              </CardTitle>
              <CardDescription className="text-base">Preencha as informações do seu evento abaixo</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                    Título do Evento *
                  </Label>
                  <Input
                    id="title"
                    {...register("title", {
                      required: "Título é obrigatório",
                      minLength: { value: 3, message: "Título deve ter pelo menos 3 caracteres" },
                    })}
                    placeholder="Ex: Workshop de React Avançado"
                    className="h-12 text-base"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                  className="space-y-2"
                >
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                    Descrição
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Descreva seu evento, o que os participantes podem esperar..."
                    className="min-h-[100px] text-base resize-none"
                  />
                </motion.div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="date" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data do Evento *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      {...register("date", { required: "Data é obrigatória" })}
                      className="h-12 text-base"
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="time" className="text-sm font-semibold text-gray-700">
                      Horário
                    </Label>
                    <Input id="time" type="time" {...register("time")} className="h-12 text-base" />
                  </motion.div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="link" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Link2 className="w-4 h-4" />
                      Link de Inscrição
                    </Label>
                    <Input
                      id="link"
                      type="url"
                      {...register("link", {
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "URL deve começar com http:// ou https://",
                        },
                      })}
                      placeholder="https://exemplo.com/inscricoes"
                      className="h-12 text-base"
                    />
                    {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.45 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="eventUrl" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      URL do Evento
                    </Label>
                    <Input
                      id="eventUrl"
                      type="url"
                      {...register("eventUrl", {
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "URL deve começar com http:// ou https://",
                        },
                      })}
                      placeholder="https://exemplo.com/evento"
                      className="h-12 text-base"
                    />
                    {errors.eventUrl && <p className="text-red-500 text-sm">{errors.eventUrl.message}</p>}
                  </motion.div>
                </div>

                {/* Image Upload */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="space-y-4"
                >
                  <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Imagem do Evento
                  </Label>

                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <Label htmlFor="image" className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                        Clique para fazer upload da imagem
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <p className="text-gray-500 text-sm mt-2">PNG, JPG ou GIF até 5MB</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="absolute top-2 right-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="pt-6"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Cadastrando Evento...
                      </div>
                    ) : (
                      "Cadastrar Evento"
                    )}
                  </Button>
                </motion.div>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-green-700 font-medium">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      Evento cadastrado com sucesso!
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
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
  )
}
