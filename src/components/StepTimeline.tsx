interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepTimelineProps {
  steps: Step[];
  variant?: "client" | "landlord";
}

const variantStyles = {
  client: {
    circle: "bg-teal",
    line: "bg-teal-light",
  },
  landlord: {
    circle: "bg-orange",
    line: "bg-orange-light",
  },
} as const;

export default function StepTimeline({
  steps,
  variant = "client",
}: StepTimelineProps) {
  const styles = variantStyles[variant];

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={step.number} className="flex items-stretch">
            {/* Left column: circle + connecting line */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white shadow-sm ${styles.circle}`}
              >
                {step.number}
              </div>
              {!isLast && (
                <div className={`w-0.5 grow ${styles.line}`} />
              )}
            </div>

            {/* Right column: title + description */}
            <div className={`ml-4 ${isLast ? "" : "pb-8"}`}>
              <h3 className="font-display font-semibold text-navy">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
