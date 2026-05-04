"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const eventDate = new Date("2026-05-09T18:00:00");
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/background.jpg"
          alt="Atardecer en Hermosillo"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/30 to-transparent" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <p className="text-orange-200 text-lg tracking-[0.5em] uppercase mb-4">
            Hermosillo, Sonora
          </p>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-2 tracking-tight uppercase bg-gradient-to-r from-orange-300 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            The Last Ride
          </h1>
          
          <p className="text-orange-100 text-xl md:text-2xl mb-12">
            9 de Mayo, 2026
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Minutos" },
              { value: timeLeft.seconds, label: "Segundos" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 min-w-[100px] md:min-w-[140px]"
              >
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="text-orange-200 text-sm md:text-base uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-orange-100/80 text-lg">
              En la mejor terraza de la ciudad
            </p>
            <p className="text-white/60 text-sm">
              Prepárate para la mejor noche de tu vida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}