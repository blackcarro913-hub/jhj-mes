import { Suspense } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SearchCard } from "@/components/search-card"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Header />
        <Hero />
        <SearchCard />
        <Footer />
      </Suspense>
    </main>
  )
}
