"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { AluraQuizLogo } from "../_components/AluraquizLogo";
import { Card } from "../_components/Card";
import { Footer } from "../_components/Footer";
import pageStyles from "../page.module.css";
import config from "../../config.json";
import { Alternative } from "../_components/Alternative";

const questions = config.questions;

const answerStates = {
  DEFAULT: "DEFAULT",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
} as const;

export default function GameScreen() {
  const router = useRouter();
  const [answerState, setAnswerState] = React.useState<keyof typeof answerStates>(answerStates.DEFAULT);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [userAnswers, setUserAnswers] = React.useState([]);
  const questionNumber = currentQuestion + 1;
  const question = questions[currentQuestion];
  const isLastQuestion = questionNumber === questions.length;

  React.useEffect(() => {
    if(isLastQuestion) {
      const totalPoints = userAnswers.reduce((_totalPoints, currentAnswer) => {
        if(currentAnswer === true) return _totalPoints + 1;
        return _totalPoints;
      }, 0);

      // DESAFIO: Pegar o nome do usuário definido na tela anterior e mostrar na tela final
      alert(`Você concluiu o desafio! e acertou ${totalPoints}`);
      router.push("/");
      return;
    }
  }, [userAnswers]);

  return (
    <main
      className={pageStyles.screen}
      style={{
        flex: 1,
        backgroundImage: `url("${question.image}")`,
      }}
    >
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
          headerTitle={`Pergunta ${questionNumber} de ${questions.length}`}
        >
          <h1>
            {question.title}
          </h1>
          <p>
            {question.description}
          </p>
          <form
            style={{
              marginTop: "24px", 
            }}
            onSubmit={(event) => {
              // DESAFIO: Quebrar o onSubmit em funções menores
              event.preventDefault();
              const $questionInfo = event.target as HTMLFormElement;
              const formData = new FormData($questionInfo);
              const { alternative } = Object.fromEntries(formData.entries());

              const isCorrectAnswer = alternative === question.answer;
              if (isCorrectAnswer) {
                setUserAnswers([
                  ...userAnswers,
                  true
                ]);
                setAnswerState(answerStates.SUCCESS);
              }
              if (!isCorrectAnswer) {
                setUserAnswers([
                  ...userAnswers,
                  false
                ]);
                setAnswerState(answerStates.ERROR);
              }
              setTimeout(() => {
                if(isLastQuestion) return;
                
                setCurrentQuestion(currentQuestion + 1);
                setAnswerState(answerStates.DEFAULT);
              }, 2 * 1000);
            }}
          >
            {question.alternatives.map((alternative, index) => (
              <div
                key={alternative + index}
                style={{
                  marginBottom: "8px",
                }}
              >
                <Alternative
                  label={alternative}
                  order={index}
                />
              </div>
            ))}
            {answerState === answerStates.DEFAULT && (
              <button>
                Confirmar
              </button>
            )}
            <p style={{ textAlign: "center" }}>
              {answerState === answerStates.ERROR && (
                "❌"
              )}
              {answerState === answerStates.SUCCESS && (
                "✅"
              )}
            </p>
          </form>
        </Card>
        <Footer />
      </section>
    </main>
  );
}

// Desafio: Criar um componente genérico que representa nossa tela
// Desafio: Criar a tela de resultados quando tiverem "acabado" as questões