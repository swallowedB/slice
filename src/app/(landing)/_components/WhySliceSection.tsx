"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TodoIcon, ProgressIcon, NoteIcon } from "@/assets/icons";
import DoneCard from "@/assets/svgs/landing/done-card.svg";

export default function WhySliceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-orange-250 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 lg:text-left">
          <p className="mb-3 text-sm font-medium sm:mb-4 sm:text-base lg:text-lg">
            더 똑똑한 할 일 관리
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            슬라이스가 특별한 이유
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                <TodoIcon className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl lg:text-2xl">
                스마트한 할 일 관리
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                <ProgressIcon className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl lg:text-2xl">
                진행 상황 시각화
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                <NoteIcon className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl lg:text-2xl">
                편리한 학습 노트
              </h3>
            </motion.div>
          </motion.div>

          {/* Right: Dashboard Preview */}
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative z-10 w-full max-w-2xl">
              <DoneCard
                className="h-auto w-full drop-shadow-2xl"
                aria-label="완료된 할일 목록"
              />
              <motion.div
                className="absolute -top-4 -right-4 z-20 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#00CCC0] shadow-2xl sm:-top-6 sm:-right-6 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}>
                <svg
                  className="h-8 w-8 text-white sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-0 left-0 z-20 -mb-6 flex items-center gap-3 rounded-full bg-[#FFB639] px-5 py-3 shadow-2xl sm:-left-4 sm:-mb-8 sm:px-6 sm:py-4 lg:-left-6 lg:-mb-10">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                  <svg className="h-12 w-12 -rotate-90 transform sm:h-14 sm:w-14">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="7"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="white"
                      strokeWidth="7"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20 * 0.64} ${2 * Math.PI * 20}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <span className="text-3xl font-bold sm:text-4xl">64</span>
                  <span className="ml-1 text-xl sm:text-2xl">%</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
