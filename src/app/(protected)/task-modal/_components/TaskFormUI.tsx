"use client";

import BaseInput from "@/components/common/input/base-input/BaseInput";
import AttachmentSection from "./sections/AttachmentSection";
import FormFieldSection from "./sections/FormFieldSection";
import { CheckboxSection } from "./sections/CheckboxSection";
import SelectBox from "@/components/common/selectBox/SelectBox";
import {
  ChevronDownIcon,
  LinkIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";

interface TaskFormUIProps {
  isEdit: boolean;
  title: string;
  setTitle: (v: string) => void;
  goal: string;
  setGoal: (v: string) => void;
  status: "TODO" | "DONE";
  setStatus: (v: "TODO" | "DONE") => void;
  link: string;
  setLink: (v: string) => void;
  file: File | null;
  setFile: (f: File | null) => void;
  isGoalOpen: boolean;
  setIsGoalOpen: (v: boolean) => void;
  goals: string[];
}

export default function TaskFormUI({
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
  isGoalOpen,
  setIsGoalOpen,
  goals,
}: TaskFormUIProps) {
  return (
    <div className="flex flex-col gap-6 px-3 pb-4">
      {/* 상태 (edit 전용) */}
      {isEdit && (
        <FormFieldSection
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
        </FormFieldSection>
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
            onClick={() => setIsGoalOpen(!isGoalOpen)}
            className={`flex h-14 w-full items-center justify-between rounded-xl border bg-white px-4 transition-colors ${
              isGoalOpen ? "border-orange-300" : "border-gray-200"
            }`}>
            <span className={goal ? "text-gray-700" : "text-gray-400"}>
              {goal || "목표를 선택해주세요"}
            </span>
            <ChevronDownIcon className="h-6 w-6 text-gray-300" />
          </button>

          {isGoalOpen && (
            <div className="absolute top-[60px] left-0 z-30 w-full">
              <SelectBox
                variant="sidebar"
                items={goals}
                onSelect={(item) => {
                  setGoal(item);
                  setIsGoalOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </FormFieldSection>

      <FormFieldSection label="파일">
        <AttachmentSection
          type="file"
          value={file}
          placeholder="파일을 업로드해주세요"
          icon={<DocumentArrowUpIcon className="h-5 w-5" />}
          onChange={(f) => setFile(f as File | null)}
        />
      </FormFieldSection>

      <FormFieldSection label="링크">
        <AttachmentSection
          type="link"
          value={link}
          placeholder="링크를 업로드해주세요"
          icon={<LinkIcon className="h-5 w-5" />}
          onChange={(v) => setLink(v as string)}
        />
      </FormFieldSection>
    </div>
  );
}
