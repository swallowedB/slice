import CircularProgress from "./CircularProgress";

export default function Progress({ className, title, percent }: ProgressProps) {
  return (
    <div className={`${className}`}>
      <CircularProgress percent={percent} />

      <div>
        <p>{title}</p>
        <strong>{percent}%</strong>
      </div>
    </div>
  );
}
