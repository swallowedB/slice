import CircularProgress from "./CircularProgress";
import { ProgressProps, Variant } from "./Progress.types";

type VariantStyle = {
  title: string;
  percent: string;
  percentSize: string;
  stroke: string;
};

const variants: Record<Variant, VariantStyle> = {
  default: {
    title: "text-lg sm:text-base lg:text-lg font-bold",
    percent: "text-[57px] leading-[1] sm:text-[48px] lg:text-[57px] font-bold",
    percentSize: "text-xl",
    stroke: "#FFA96C",
  },
  large: {
    title: "text-sm lg:text-lg font-semibold",
    percent:
      "text-[54px] lg:text-[74px] xl:text-[80px] leading-[1.2] sm:leading-[1] lg:leading-[1.2]",
    percentSize: "text-3xl",
    stroke: "#009D97",
  },
};

export default function Progress({
  title,
  percent,
  variant = "default",
}: ProgressProps) {
  const v = variants[variant];

  return (
    <>
      <CircularProgress
        percent={percent}
        variant={variant}
        strokeColor={v.stroke}
      />

      <div className="text-white lg:text-left">
        <p className={`${v.title} break-keep`}>{title}</p>
        <p className={`${v.percent} font-bold`}>
          {percent}
          <span className={`${v.percentSize} font-medium`}>%</span>
        </p>
      </div>
    </>
  );
}
