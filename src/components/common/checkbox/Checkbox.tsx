import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ListItemVariant } from "../list-item/listItem.types";

type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  variant?: ListItemVariant;
};

const Checkbox = ({
  id,
  checked,
  onChange,
  variant = "default",
}: CheckboxProps) => {
  return (
    <div>
      <input
        id={`${id}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <span
        className={clsx(
          `flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-colors peer-checked:border-orange-400 peer-checked:bg-orange-400 peer-focus:ring-1 peer-focus:ring-orange-400/40`,
          {
            "border-orange-100 bg-orange-100": variant === "white",
            "border-gray-200 bg-white": variant === "default",
          },
        )}>
        {checked && (
          <CheckIcon className="strokeWidth={3} h-3 w-3 text-white" />
        )}
      </span>
    </div>
  );
};

export default Checkbox;
