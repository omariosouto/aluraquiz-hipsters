"use client";

import { useRouter } from "next/navigation";

import { AluraQuizLogo } from "./_components/AluraquizLogo";
import { Footer } from "./_components/Footer";
import { Card } from "./_components/Card";

import pageStyles from "./page.module.css";

export default function Page() {
  const router = useRouter();

  return (
    <main className={pageStyles.screen} style={{ flex: 1 }}>
      <section className={pageStyles.container}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px"
          }}
        >
          <AluraQuizLogo />
        </div>

        <Card
          headerTitle="Teste suas habilidades"
        >
          <p style={{ marginBottom: "32px" }}>
            Teste os seus conhecimentos sobre o universo Marvel e divirta-se criando o seu AluraQuiz!
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();

              const name = "Mario";
              router.push(`/game?player=${name}`)
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <input
                type="text"
                placeholder="Diz aí seu nome pra jogar :)"
                name="playerName"
              />
            </div>
            <button>
              Jogar
            </button>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  )
}