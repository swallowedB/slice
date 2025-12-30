"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GoalIcon, TodoIcon, NoteIcon } from "@/assets/icons";

const steps = [
  {
    icon: GoalIcon,
    title: "목표 설정하기",
    description: "달성하고 싶은 목표를 만들고\n이름을 정하세요",
  },
  {
    icon: TodoIcon,
    title: "할 일 추가하기",
    description: "목표에 맞는 할 일을 추가하고\n자료를 첨부하세요",
  },
  {
    icon: NoteIcon,
    title: "학습하고 기록하기",
    description: "할 일을 완료하며 학습하고,\n노트로 기록하세요",
  },
];

export default function StepsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-gray-50 px-4 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-sm font-medium text-[#FF8A50] sm:mb-4 sm:text-base lg:text-lg">
            목표 설정부터 기록까지
          </p>
          <h2 className="text-foreground text-2xl font-bold text-balance sm:text-3xl lg:text-4xl">
            쉽고 빠르게 할 일을 시작해요
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group">
                <div className="flex h-full flex-col rounded-3xl bg-white p-6 text-center shadow-lg transition-all duration-300 hover:shadow-2xl sm:max-h-[400px] sm:p-10">
                  <div className="mb-4 flex justify-center sm:mb-6">
                    <IconComponent className="h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36" />
                  </div>

                  <h3 className="text-foreground mb-2 text-lg font-bold sm:mb-3 sm:text-xl lg:text-2xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
