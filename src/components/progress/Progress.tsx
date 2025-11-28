import CircularProgress from "./CircularProgress";

const VARIANT_MAP = {
  default: {
    size: 92,
    titleClass: "text-sm",
    percentClass: "text-xl",
  },
  large: {
    size: 160,
    titleClass: "text-lg font-semibold",
    percentClass: "lg:text-[80px] leading-[1.2]",
  },
};

export default function Progress({
  title,
  percent,
  variant = "default",
}: ProgressProps) {
  const styles = VARIANT_MAP[variant];
  return (
    <div className="flex h-full flex-wrap items-center sm:pl-3.75 lg:pl-4">
      <CircularProgress
        percent={percent}
        size={styles.size}
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
