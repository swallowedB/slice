import CircularProgress from "./CircularProgress";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const VARIANT_MAP = {
  default: {
    titleClass: "text-sm",
    percentClass: "text-xl",
  },
  large: {
    titleClass: "text-sm lg:text-lg font-semibold",
    percentClass:
      "text-[54px] sm:text-[74px] lg:text-[80px] leading-[1.2] sm:leading-[1] lg:leading-[1.2]",
  },
};

export default function Progress({
  title,
  percent,
  variant = "default",
}: ProgressProps) {
  const { isDesktop } = useDeviceSize();
  const styles = VARIANT_MAP[variant];

  const circleSize = variant === "large" && isDesktop ? 160 : 92;

  return (
    <div className="flex h-full flex-wrap items-center justify-center sm:justify-start sm:pl-3.75 lg:pl-4">
      <CircularProgress
        percent={percent}
        size={circleSize}
      />

      <div className="ml-7.5 text-white">
        <p className={styles.titleClass}>{title}</p>
        <p className={`${styles.percentClass} font-bold`}>
          {percent}
          <span className="text-3xl font-medium">%</span>
        </p>
      </div>
    </div>
  );
}
