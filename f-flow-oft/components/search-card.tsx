"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function SearchCard() {
  const router = useRouter()
  const [plate, setPlate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const isValidPlate = plate.length === 7
  const canSubmit = isValidPlate && !isLoading

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isValidPlate) {
      setError("Por favor, digite uma placa válida (7 caracteres).")
      return
    }

    // Navigate directly to debitos page with just the plate
    router.push(`/debitos?placa=${plate}`)
  }

  return (
    <section className="container mx-auto px-4 pb-6 md:pb-20">
      <Card className="bg-gray-100 border-border p-5 md:p-8 lg:p-10 max-w-2xl">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-3 leading-tight text-balance text-gray-900">
            Portal de Pagamentos para Pedágios e Free Flow
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Evite multas e regularize os débitos do seu veículo de forma simples, rápida e segura.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <Input
              type="text"
              placeholder="DIGITE SUA PLACA"
              value={plate}
              onChange={(e) => {
                setPlate(e.target.value.toUpperCase())
                setError("") // Clear error when user types
              }}
              className="w-full h-12 md:h-14 text-base md:text-lg bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              maxLength={7}
              disabled={isLoading}
            />
            {error && <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className={`w-full h-11 md:h-12 text-sm md:text-base font-semibold transition-colors ${
              canSubmit
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-gray-400 text-gray-700 cursor-not-allowed hover:bg-gray-400"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Consultando...
              </>
            ) : (
              "CONSULTAR DÉBITOS"
            )}
          </Button>
        </form>
      </Card>
    </section>
  )
}
