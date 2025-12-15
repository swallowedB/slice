"use client";

import { Goal } from "@/api/types/goal";

import BaseInput from "@/components/common/input/base-input/BaseInput";
import AttachmentSection from "./sections/AttachmentSection";
import InputFieldSection from "./sections/InputFieldSection";
import { CheckboxSection } from "./sections/CheckboxSection";
import SelectBox from "@/components/common/select-box/SelectBox";

import {
  ChevronDownIcon,
  LinkIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";

interface TodoFormUIProps {
  isEdit: boolean;
  title: string;
  setTitle: (v: string) => void;

  goal: Goal | null;
  setGoal: (v: Goal | null) => void;

  status: "TODO" | "DONE";
  setStatus: (v: "TODO" | "DONE") => void;

  link: string;
  setLink: (v: string) => void;

  file: File | null;
  setFile: (f: File | null) => void;
  existingFileName?: string | null;

  isGoalOpen: boolean;
  setIsGoalOpen: (v: boolean) => void;

  goals: Goal[];
}

export default function TodoFormUI({
  isEdit,
  title,
  setTitle,
  goal,
  setGoal,
  status,
  setStatus,
  link,
  setLink,
  file,
  setFile,
  existingFileName,
  isGoalOpen,
  setIsGoalOpen,
  goals,
}: TodoFormUIProps) {
  return (
    <div className="flex flex-col gap-2.5 px-2 pb-4">
      {/* 상태 (edit 전용) */}
      {isEdit && (
        <InputFieldSection
          label="상태"
          required>
          <div className="flex items-center gap-4">
            <CheckboxSection
              label="TO DO"
              value="TODO"
              selected={status === "TODO"}
              onClick={() => setStatus("TODO")}
            />

            <CheckboxSection
              label="DONE"
              value="DONE"
              selected={status === "DONE"}
              onClick={() => setStatus("DONE")}
            />
          </div>
        </InputFieldSection>
      )}

      <InputFieldSection
        label="제목"
        required>
        <BaseInput
          value={title}
          placeholder="할 일의 제목을 적어주세요"
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 bg-white placeholder:text-gray-600"
        />
      </InputFieldSection>

      <InputFieldSection
        label="목표"
        required>
        <div className="relative w-full">
          <button
            onClick={() => setIsGoalOpen(!isGoalOpen)}
            className={`flex h-14 w-full items-center justify-between rounded-xl border bg-white px-4 transition-colors ${
              isGoalOpen ? "border-orange-300" : "border-gray-200"
            }`}>
            <span className={goal ? "text-gray-700" : "text-gray-600"}>
              {goal ? goal.title : "목표를 선택해주세요"}
            </span>
            <ChevronDownIcon className="h-6 w-6 text-gray-300" />
          </button>

          {isGoalOpen && (
            <div className="absolute top-[60px] left-0 z-30 w-full">
              <SelectBox
                variant="sidebar"
                items={goals.map((g) => g.title)}
                onSelect={(title) => {
                  const found = goals.find((g) => g.title === title) ?? null;
                  setGoal(found);
                  setIsGoalOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </InputFieldSection>

      <InputFieldSection label="파일">
        <AttachmentSection
          type="file"
          value={file}
          existingFileName={existingFileName ?? null}
          placeholder="파일을 업로드해주세요"
          icon={<DocumentArrowUpIcon className="h-5 w-5" />}
          onChange={(f) => setFile(f as File | null)}
        />
      </InputFieldSection>

      <InputFieldSection label="링크">
        <AttachmentSection
          type="link"
          value={link}
          placeholder="링크를 업로드해주세요"
          icon={<LinkIcon className="h-5 w-5" />}
          onChange={(v) => setLink(v as string)}
        />
      </InputFieldSection>
    </div>
  );
}
