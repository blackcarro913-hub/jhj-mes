import { type NextRequest, NextResponse } from "next/server"

const API_TOKEN = "6a270909b651709eb62d2ab817644c72"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const placa = searchParams.get("placa")

  if (!placa) {
    return NextResponse.json({ error: "Placa não informada" }, { status: 400 })
  }

  // Validate plate format (7 characters)
  if (placa.length !== 7) {
    return NextResponse.json({ error: "Placa inválida. Use o formato AAA0X00 ou AAA9999" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://wdapi2.com.br/consulta/${placa}/${API_TOKEN}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: errorData.message || "Erro ao consultar placa" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao consultar API:", error)
    return NextResponse.json({ error: "Erro ao consultar API de placas" }, { status: 500 })
  }
}
