import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ListItemVariant } from "../list/list-item/types";

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  variant?: ListItemVariant;
};

export default function Checkbox({
  id,
  checked,
  onChange,
  variant = "default",
}: CheckboxProps) {
  const BASE_CHECKBOX =
    "flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-colors peer-focus:ring-1 peer-focus:ring-orange-400/40 peer-checked:border-orange-400 peer-checked:bg-orange-400";

  const VARIANT_CLASS = {
    default: "border-gray-200 bg-white",
    white: "border-orange-100 bg-orange-100",
  };

  return (
    <div className="inline-flex h-4.5 w-4.5 items-center justify-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <span className={clsx(BASE_CHECKBOX, VARIANT_CLASS[variant])}>
        {checked && (
          <CheckIcon
            strokeWidth={3}
            className="h-3 w-3 text-white"
          />
        )}
      </span>
    </div>
  );
}
