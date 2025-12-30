"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function CTASection() {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-linear-to-b from-[#FFF9E6] to-[#FFF4D9] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <motion.div
        className="absolute top-20 left-16 h-16 w-16 opacity-40"
        animate={{
          rotate: [0, 45, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}>
        <div className="h-full w-full rotate-45 rounded-lg bg-[#FFD54F]" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-24 h-10 w-10 rounded-full bg-[#81D4D4] opacity-50"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}>
          <p className="mb-3 text-sm font-medium text-[#FF8A50] sm:mb-4 sm:text-base lg:text-lg">
            슬라이스 하나로 정리부터 실행까지
          </p>
          <h2 className="mb-8 text-3xl leading-tight font-bold text-gray-900 sm:mb-10 sm:text-4xl lg:mb-12 lg:text-6xl">
            오늘의 할 일, Slice로 계획해요
          </h2>
          <motion.button
            onClick={() => router.push("/login")}
            className="bg-orange-250 cursor-pointer rounded-full px-10 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#FF7043] sm:px-16 sm:py-4 sm:text-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 117, 85, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}>
            시작하기
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        className="absolute right-8 bottom-12 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#FF8A50] shadow-2xl sm:right-16 sm:bottom-16 sm:h-20 sm:w-20"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}>
        <svg
          className="h-8 w-8 text-white sm:h-10 sm:w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
    </section>
  );
}
