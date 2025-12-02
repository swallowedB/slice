"use client";

import { useState } from "react";
import BaseInput from "@/components/common/input/base-input/BaseInput";
import InputModal from "@/components/common/popup-modal/InputModal";
import AttachmentField from "./AttachmentField";
import FormFieldSection from "./FormFieldSection";
import { SelectOption } from "./SelectOption";

import Button from "@/components/common/button/Button";
import SelectBox from "@/components/common/selectBox/SelectBox";
import {
  ChevronDownIcon,
  LinkIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";

const mockGoals = [
  "자바스크립트로 웹 서비스 만들기",
  "디자인 시스템 강의 듣기",
];

const MODAL_TYPE = {
  create: "할 일 생성",
  edit: "할 일 수정",
} as const;

export type TaskFormMode = keyof typeof MODAL_TYPE;

export interface TaskFormData {
  title: string;
  goal: string;
  status: "TODO" | "DONE";
  link: string;
  file: File | null;
}

interface TaskFormInputProps {
  mode: TaskFormMode;
  onClose: () => void;
  onConfirm: (data: TaskFormData) => void;
}

export default function TaskFormContent({
  mode,
  onClose,
  onConfirm,
}: TaskFormInputProps) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [status, setStatus] = useState<"TODO" | "DONE">("TODO");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const isConfirmDisabled = title.trim() === "" || goal.trim() === "";
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  const handleConfirm = () => {
    if (isConfirmDisabled) return;

    onConfirm({
      title,
      goal,
      status,
      link,
      file,
    });
  };

  return (
    <InputModal
      title={MODAL_TYPE[mode]}
      onClose={onClose}
      onConfirm={handleConfirm}
      footer={
        <div className="flex w-full gap-2 px-3 pb-4">
          <Button
            variant="outline-gray"
            size="full"
            onClick={onClose}>
            취소
          </Button>

          <Button
            variant="primary"
            size="full"
            onClick={handleConfirm}
            isDisabled={isConfirmDisabled}>
            확인
          </Button>
        </div>
      }>
      <div className="flex flex-col gap-3 px-3 pb-4">
        {/* 상태 (edit 전용) */}
        {isEdit && (
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-gray-700">
              상태 <span className="text-orange-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <SelectOption
                label="TO DO"
                value="TODO"
                selected={status === "TODO"}
                onClick={() => setStatus("TODO")}
              />

              <SelectOption
                label="DONE"
                value="DONE"
                selected={status === "DONE"}
                onClick={() => setStatus("DONE")}
              />
            </div>
          </div>
        )}

        <FormFieldSection
          label="제목"
          required>
          <BaseInput
            value={title}
            placeholder="할 일의 제목을 적어주세요"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-200 bg-white"
          />
        </FormFieldSection>

        <FormFieldSection
          label="목표"
          required>
          <div className="relative w-full">
            <button
              onClick={() => setIsGoalOpen((p) => !p)}
              className={`flex h-14 w-full items-center justify-between rounded-xl border bg-white px-4 transition-colors ${
                isGoalOpen ? "border-orange-300" : "border-gray-200"
              }`}>
              <span className={goal ? "text-gray-700" : "text-gray-400"}>
                {goal || "목표를 선택해주세요"}
              </span>
              <span>
                <ChevronDownIcon className="h-6 w-6 text-gray-300" />
              </span>
            </button>

            {isGoalOpen && (
              <div className="absolute top-[60px] left-0 z-30 w-full">
                <SelectBox
                  variant="sidebar"
                  items={mockGoals}
                  onSelect={(goalItem) => {
                    setGoal(goalItem);
                    setIsGoalOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </FormFieldSection>

        <FormFieldSection label="파일">
          <AttachmentField
            type="file"
            value={file}
            placeholder="파일을 업로드해주세요"
            icon={<DocumentArrowUpIcon className="h-5 w-5" />}
            onChange={(f) => setFile(f as File | null)}
          />
        </FormFieldSection>

        <FormFieldSection label="링크">
          <AttachmentField
            type="link"
            value={link}
            placeholder="링크를 업로드해주세요"
            icon={<LinkIcon className="h-5 w-5" />}
            onChange={(v) => setLink(v as string)}
          />
        </FormFieldSection>
      </div>
    </InputModal>
  );
}
