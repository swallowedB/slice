"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Dashboard from "@/assets/svgs/landing/dashboard.svg";

export default function HeroSection() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full bg-linear-to-b from-[#FFF9E5] to-[#D4FFFE]">
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute top-8 right-4 h-20 w-20 sm:top-12 sm:right-12 sm:h-28 sm:w-28 lg:top-16 lg:right-24 lg:h-40 lg:w-40"
          viewBox="0 0 200 200"
          fill="none">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="#FFD88C"
            opacity="0.5"
          />
          <circle
            cx="60"
            cy="140"
            r="50"
            fill="#FFE5B4"
            opacity="0.3"
          />
        </svg>
        <svg
          className="absolute bottom-8 left-4 h-16 w-16 sm:bottom-12 sm:left-12 sm:h-24 sm:w-24 lg:bottom-16 lg:left-24 lg:h-32 lg:w-32"
          viewBox="0 0 200 200"
          fill="none">
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="#A8E6CF"
            opacity="0.4"
          />
          <circle
            cx="140"
            cy="60"
            r="40"
            fill="#C7F0DB"
            opacity="0.25"
          />
        </svg>
        <svg
          className="absolute top-1/3 left-1/4 h-12 w-12 -translate-y-1/2 transform sm:h-20 sm:w-20 lg:h-28 lg:w-28"
          viewBox="0 0 200 200"
          fill="none">
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="#FFB8A0"
            opacity="0.35"
          />
        </svg>
        <svg
          className="absolute top-1/2 right-1/3 h-10 w-10 -translate-y-1/2 transform sm:h-16 sm:w-16 lg:h-24 lg:w-24"
          viewBox="0 0 200 200"
          fill="none">
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="#B8E6FF"
            opacity="0.3"
          />
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center px-4 pt-12 pb-8 sm:px-8 sm:pt-16 sm:pb-12 lg:px-12 lg:pt-20 lg:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 max-w-4xl text-center sm:mb-16 lg:mb-20">
          <p className="mb-3 text-sm font-medium text-[#FF8A50] sm:mb-4 sm:text-base lg:text-lg">
            슬라이스 하나로 정리부터 실행까지
          </p>
          <h1 className="mb-6 px-4 text-2xl leading-tight font-bold text-balance text-gray-900 sm:mb-8 sm:text-4xl lg:text-5xl">
            오늘의 할 일, Slice로 계획해요
          </h1>
          <motion.button
            onClick={() => router.push("/dashboard")}
            className="bg-orange-250 cursor-pointer rounded-full px-10 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#FF7043] sm:px-16 sm:py-4 sm:text-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 117, 85, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}>
            시작하기
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex w-full max-w-5xl items-center justify-center rounded-3xl bg-white shadow-2xl backdrop-blur-sm">
          <Dashboard
            className="h-auto w-full max-w-[1200px] rounded-3xl drop-shadow-2xl"
            aria-label="슬라이스 대시보드 미리보기"
          />
        </motion.div>
      </div>
    </section>
  );
}
