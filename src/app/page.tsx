"use client";

import Image from "next/image";
import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WhatsappLink } from "@/components/whatsapp-link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const main = useRef(null);

  useGSAP(
    () => {
      // Create a timeline for the initial animations
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-image",
        { scale: 1.2 },
        {
          scale: 1.0,
          duration: 1.5,
          ease: "power2.out",
        },
        0
      );

      tl.fromTo(
        ".title-letter",
        { y: -50, opacity: 0, filter: "blur(3px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.05,
        },
        0 // Start at the same time as hero image
      );

      tl.fromTo(
        ".subtitle-letter",
        { y: -25, opacity: 0, filter: "blur(3px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.01,
        },
        0 // Start at the same time as hero image
      );

      // Wait for initial animation to complete, then set up scroll trigger
      tl.call(() => {
        gsap.fromTo(
          ".hero-image",
          {
            scale: 1.0,
          },
          {
            scale: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-section",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        gsap.to(".hero-content", {
          filter: "blur(3px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom center",
            scrub: 1,
          },
        });
      });
    },
    { scope: main }
  );

  return (
    <main className="relative w-full min-h-screen overflow-hidden" ref={main}>
      <section id="hero" className="hero-section fixed inset-0 h-screen">
        <div className="hero-content absolute w-full mx-auto top-1/5 z-10 text-center text-white flex flex-col gap-4">
          <h1 className="text-6xl sm:text-7xl tracking-widest font-galano">
            {"SOLAIRE".split("").map((letter, index) => (
              <span key={index} className="title-letter inline-block">
                {letter}
              </span>
            ))}
          </h1>

          <p className="text-xl tracking-widest font-brandon">
            {/* Mobile: Each word on its own line */}
            <span className="md:hidden">
              {"MICROGERAÇÃO | MINIGERAÇÃO | HOMOLOGAÇÃO"
                .split(" | ")
                .map((word, index) => (
                  <span key={index} className="block">
                    {word}
                  </span>
                ))}
            </span>
            {/* Desktop: Original text with character spans */}
            <span className="hidden md:inline">
              {"[MICROGERAÇÃO | MINIGERAÇÃO | HOMOLOGAÇÃO]"
                .split("")
                .map((char, index) => (
                  <span key={index} className="subtitle-letter inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
            </span>
          </p>

          <button className="hero-button bg-transparent font-medium text-xl text-white border-white rounded-xl mt-4 px-12 py-4 border w-fit mx-auto hover:bg-black hover:border-black cursor-pointer  transition-all duration-300 ease-in-out">
            Conheça Mais
          </button>
        </div>

        <div className="relative h-full w-full">
          <Image
            className="hero-image absolute inset-0 object-cover"
            style={{
              filter: "blur(3px)",
            }}
            src="/solar-panel.jpg"
            alt="Instalação painel solar"
            fill
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </section>

      <section
        id="solucoes"
        className="relative bg-white min-h-screen w-full mt-[100vh] rounded-t-3xl"
      >
        <div className="container mx-auto py-36 px-6 flex flex-col gap-16">
          <h2 className="text-center text-6xl sm:text-7xl tracking-wide sm:tracking-widest font-galano">
            Soluções Completas
          </h2>
          <p className="sm:text-4xl text-2xl tracking-wider font-brandon text-center">
            Da concepção à homologação, <br /> oferecemos um serviço completo{" "}
            <br /> para seu projeto de energia solar
          </p>

          <div className="w-full sm:aspect-video aspect-square bg-slate-300 rounded-3xl relative overflow-hidden shadow-2xl">
            <Image
              src="/solar-panels-nature.jpg"
              alt="Futuro que queremos com energia solar"
              fill
              className="object-cover object-bottom"
            />
          </div>

          <div className="pt-8 grid grid-cols-1 xl:grid-cols-3 gap-8 divide-x-0 xl:divide-x-[1px] divide-slate-300">
            <div className="py-4 space-y-2">
              <h3 className="text-4xl lg:text-5xl tracking-wide sm:tracking-widest font-galano">
                Proposta
              </h3>

              <p className="text-xl tracking-widest font-brandon text-slate-600">
                Análisamos cada caso individualmente e elaboramos a proposta que
                mais faça sentido para vocẽ
              </p>
            </div>

            <div className="py-4 space-y-2">
              <h3 className="text-4xl lg:text-5xl tracking-wide sm:tracking-widest font-galano">
                Homologação
              </h3>

              <p className="text-xl tracking-widest font-brandon text-slate-600">
                Cuidamos de todo o processo burócratico junto as fornecedoras de
                energia.
              </p>
            </div>

            <div className="py-4 space-y-2">
              <h3 className="text-4xl lg:text-5xl tracking-wide sm:tracking-widest font-galano">
                Acompanhamento
              </h3>

              <p className="text-xl tracking-widest font-brandon text-slate-600">
                Estaremos sempre próximos e a disposição para que o processo da
                sua instalação sejá o melhor possível
              </p>
            </div>
          </div>
        </div>

        {/* <div className="size-[900px] absolute bottom-0 right-0 blur-3xl opacity-75 z-0 pointer-events-none">
          <Image
            src="/solaire-inovacoes-joker.png"
            alt="Logomarca solaire"
            fill
          />
        </div> */}
      </section>

      <section id="contato" className="relative bg-white w-full">
        <div className="w-full rounded-t-3xl bg-neutral-900">
          <div className="container mx-auto pt-36 px-6">
            <h2 className="text-white text-center text-6xl sm:text-7xl tracking-wide sm:tracking-widest font-galano">
              Vamos Conversar
            </h2>

            <WhatsappLink message="Olá, quero saber mais sobre a Solari">
              <div className="text-white border border-white px-4 rounded">
                Nos contate
              </div>
            </WhatsappLink>

            <Image
              src="/solaire-inovacoes-logomarca.png"
              alt="Logomarca solaire"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
