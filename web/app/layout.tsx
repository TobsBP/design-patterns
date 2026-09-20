import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Newsreader } from "next/font/google";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catálogo de padrões de projeto",
  description:
    "Os padrões de projeto do repositório, com a explicação, o código TypeScript e uma demonstração que roda no navegador.",
};

// Roda antes da primeira pintura: sem isso a página nasce escura e pisca ao
// trocar para o tema salvo.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${bricolage.variable} ${newsreader.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="relative min-h-full">
        <div className="absolute right-6 top-6 z-30 sm:right-10">
          <ThemeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}
