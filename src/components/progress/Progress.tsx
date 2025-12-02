import CircularProgress from "./CircularProgress";

const VARIANT_MAP = {
  default: {
    titleClass: "text-lg font-bold",
    percentClass: "text-xl text-[57px] font-bold",
  },
  large: {
    titleClass: "text-sm lg:text-lg font-semibold",
    percentClass:
      "text-[54px] lg:text-[74px] xl:text-[80px] leading-[1.2] sm:leading-[1] lg:leading-[1.2]",
  },
};

export default function Progress({
  title,
  percent,
  variant = "default",
}: ProgressProps) {
  const styles = VARIANT_MAP[variant];

  const percentSize = variant === "large" ? "text-3xl" : "text-xl";

  return (
    <div className="flex h-full items-center justify-center gap-6">
      <CircularProgress
        percent={percent}
        strokeColor={"#009D97"}
      />

      <div className="text-white lg:text-left">
        <p className={styles.titleClass}>{title}</p>
        <p className={`${styles.percentClass} font-bold`}>
          {percent}
          <span className={`${percentSize} font-medium`}>%</span>
        </p>
      </div>
    </div>
  );
}
