"use client"

import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Pedágio Digital"
            width={240}
            height={60}
            className="h-12 md:h-14 w-auto"
            priority
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
                Início
              </a>
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
                Buscar débitos
              </a>
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
                Acessar conta
              </a>
              <a href="#" className="text-lg font-medium hover:text-primary transition-colors">
                Central de atendimento
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
