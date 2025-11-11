import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.webp";
import pizzaImg from "../assets/pizza.jpg";
import fetucciniImg from "../assets/fetuccini.webp";
import picadaImg from "../assets/picada.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  const especialidades = [
    {
      name: "Pizza Chaplin",
      description:
        "Masa casera, salsa de la casa y el toque clásico del restobar.",
      image: pizzaImg,
    },
    {
      name: "Fetuccini con salsa",
      description: "Pasta fresca con una salsa cremosa artesanal.",
      image: fetucciniImg,
    },
    {
      name: "Picada completa",
      description:
        "Sabores para compartir: fiambres, quesos, y pan casero.",
      image: picadaImg,
    },
  ];

  return (
    <>
      {/* 🟡 HERO SECTION */}
      <section
        className="min-h-[80vh] bg-cover bg-center flex flex-col justify-center text-white relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenido */}
        <div className="relative z-10 container mx-auto px-6 md:px-20 py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <h1 className="text-5xl md:text-6xl font-cinzel text-[#fff5cc] drop-shadow-lg">
              Chaplin Restobar
            </h1>
            <p className="mt-4 text-lg font-lato text-gray-200">
              Sabores caseros, ambiente clásico y un toque vintage. Descubre nuestra carta y ven a disfrutar.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button
                className="btn-chaplin px-6 py-3 text-base md:text-lg"
                onClick={() => navigate("/productos")}
              >
                Ver carta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🟠 ESPECIALIDADES */}
      <section className="bg-neutral-950 text-white py-20 px-6 md:px-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-cinzel text-[var(--chaplin-accent)] mb-10 text-center">
            Nuestras Especialidades
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {especialidades.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden bg-neutral-900/80 hover:bg-neutral-800 transition shadow-lg"
              >
                <div
                  className="h-56 sm:h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-[var(--chaplin-accent)]">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
