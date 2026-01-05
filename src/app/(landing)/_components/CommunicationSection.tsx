"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CommunicationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-linear-to-b from-white to-gray-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-medium text-[#FF8A50] sm:text-base">
            목표를 공유하고 응원받기
          </p>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            다양한 사람들과
            <br />
            서로의 목표를 응원해요
          </h2>
        </motion.div>
        <div className="relative mx-auto flex min-h-[400px] max-w-4xl items-center justify-center sm:min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, rotate: -5 }
                : { opacity: 0, x: -100, rotate: -10 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-20 left-0 sm:top-10 sm:left-10">
            <div className="relative">
              <div className="w-64 rounded-[40px] border-2 border-[#FFD54F] bg-linear-to-br from-[#FFF9E6] to-[#FFF4D9] px-8 py-8 shadow-lg sm:w-80 sm:px-12 sm:py-12">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#00CCC0] to-[#00B8AD] shadow-md sm:h-20 sm:w-20">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-[#00CCC0] px-4 py-2 shadow-lg">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white" />
                </div>
              </div>
              <motion.div
                className="absolute -top-8 -left-8 space-y-2"
                animate={{
                  rotate: [0, 10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}>
                <div className="h-1 w-12 rotate-45 rounded-full bg-[#FFD54F]" />
                <div className="h-1 w-16 rotate-45 rounded-full bg-[#FFD54F]" />
                <div className="h-1 w-10 rotate-45 rounded-full bg-[#FFD54F]" />
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-0 right-0 sm:top-10 sm:right-20">
            <div className="rounded-[50px] border-2 border-[#00CCC0] bg-linear-to-br from-[#D4F5F5] to-[#B8EDED] px-10 py-10 shadow-lg sm:px-16 sm:py-16">
              <div className="flex items-center justify-center">
                <div className="to-orange-250 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#FFD54F] shadow-md sm:h-24 sm:w-24">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                      <div className="h-2.5 w-2.5 rounded-full bg-gray-900" />
                    </div>
                    <div className="mx-auto h-2 w-4 rounded-full bg-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 10 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, rotate: 5 }
                : { opacity: 0, x: 100, rotate: 10 }
            }
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 sm:bottom-32 sm:left-auto sm:translate-x-0">
            <div className="relative">
              <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-[#FFB8C6] bg-linear-to-br from-white to-gray-50 shadow-xl sm:h-56 sm:w-56">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-[#FFB8C6] to-[#FF9DB1] shadow-md sm:h-28 sm:w-28">
                  <div className="flex flex-col items-center">
                    <div className="mb-1 flex gap-1.5">
                      <div className="h-2 w-1.5 rotate-12 bg-gray-900" />
                      <div className="h-2 w-1.5 -rotate-12 bg-gray-900" />
                    </div>
                    <div className="h-3 w-5 rounded-t-full bg-gray-900" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute right-4 bottom-12 sm:right-12 sm:bottom-24">
            <div className="rounded-[30px] bg-[#FFB8C6] px-6 py-4 shadow-lg sm:px-8 sm:py-6">
              <span className="text-2xl font-bold text-white italic sm:text-3xl">
                m
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
