import React from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { cn, tw } from "../../lib/utils";

export interface Step {
  /**
   * Unique identifier for the step
   */
  id: string;
  /**
   * Title of the step
   */
  title: string;
  /**
   * Optional description of the step
   */
  description?: string;
  /**
   * Optional icon for the step
   */
  icon?: React.ReactNode;
  /**
   * Whether the step is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Array of steps to display
   */
  steps: Step[];
  /**
   * The current active step index (0-based)
   * @default 0
   */
  activeStep?: number;
  /**
   * The visual style of the stepper
   * @default "default"
   */
  variant?: "default" | "numbered" | "minimal";
  /**
   * The orientation of the stepper
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * The size of the stepper
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether steps are clickable for navigation
   * @default false
   */
  clickable?: boolean;
  /**
   * Whether to show step connectors
   * @default true
   */
  showConnector?: boolean;
  /**
   * Whether to show step descriptions
   * @default true
   */
  showDescription?: boolean;
  /**
   * Callback when a step is clicked (only works if clickable is true)
   */
  onStepClick?: (stepIndex: number, step: Step) => void;
  /**
   * Callback when the active step changes
   */
  onChange?: (stepIndex: number) => void;
}

// Base styles
const stepperBase = tw`flex w-full`;

// Step base styles
const stepBase = tw`relative flex items-center gap-3`;

// Step indicator styles
const stepIndicatorBase = tw`flex items-center justify-center rounded-full border-2 transition-all duration-200`;

// Step content styles
const stepContentBase = tw`flex min-w-0 flex-1 flex-col gap-1`;

// Step title styles
const stepTitleBase = tw`font-medium transition-colors duration-200`;

// Step description styles
const stepDescriptionBase = tw`text-sm transition-colors duration-200`;

// Connector styles
const connectorBase = tw`transition-all duration-200`;

// Variants
const variants = {
  default: {
    stepIndicator: {
      inactive: tw`border-gray-300 bg-white text-gray-500`,
      active: tw`border-blue-600 bg-blue-600 text-white`,
      completed: tw`border-green-600 bg-green-600 text-white`,
      disabled: tw`border-gray-200 bg-gray-100 text-gray-400`,
    },
    stepTitle: {
      inactive: tw`text-gray-500`,
      active: tw`text-blue-600`,
      completed: tw`text-green-600`,
      disabled: tw`text-gray-400`,
    },
    stepDescription: {
      inactive: tw`text-gray-400`,
      active: tw`text-gray-600`,
      completed: tw`text-gray-600`,
      disabled: tw`text-gray-300`,
    },
    connector: {
      inactive: tw`bg-gray-300`,
      active: tw`bg-blue-600`,
      completed: tw`bg-green-600`,
    },
  },
  numbered: {
    stepIndicator: {
      inactive: tw`border-gray-300 bg-white text-gray-500`,
      active: tw`border-blue-600 bg-blue-600 text-white`,
      completed: tw`border-green-600 bg-green-600 text-white`,
      disabled: tw`border-gray-200 bg-gray-100 text-gray-400`,
    },
    stepTitle: {
      inactive: tw`text-gray-500`,
      active: tw`text-blue-600`,
      completed: tw`text-green-600`,
      disabled: tw`text-gray-400`,
    },
    stepDescription: {
      inactive: tw`text-gray-400`,
      active: tw`text-gray-600`,
      completed: tw`text-gray-600`,
      disabled: tw`text-gray-300`,
    },
    connector: {
      inactive: tw`bg-gray-300`,
      active: tw`bg-blue-600`,
      completed: tw`bg-green-600`,
    },
  },
  minimal: {
    stepIndicator: {
      inactive: tw`border-gray-200 bg-white text-gray-400`,
      active: tw`border-blue-500 bg-blue-500 text-white`,
      completed: tw`border-green-500 bg-green-500 text-white`,
      disabled: tw`border-gray-100 bg-gray-50 text-gray-300`,
    },
    stepTitle: {
      inactive: tw`text-gray-400`,
      active: tw`text-blue-500`,
      completed: tw`text-green-500`,
      disabled: tw`text-gray-300`,
    },
    stepDescription: {
      inactive: tw`text-gray-300`,
      active: tw`text-gray-500`,
      completed: tw`text-gray-500`,
      disabled: tw`text-gray-200`,
    },
    connector: {
      inactive: tw`bg-gray-200`,
      active: tw`bg-blue-500`,
      completed: tw`bg-green-500`,
    },
  },
};

// Sizes
const sizes = {
  sm: {
    stepIndicator: tw`h-6 w-6 text-xs`,
    stepTitle: tw`text-sm`,
    stepDescription: tw`text-xs`,
    connector: {
      horizontal: tw`h-0.5 w-full`,
      vertical: tw`h-full w-0.5`,
    },
    gap: tw`gap-2`,
  },
  md: {
    stepIndicator: tw`h-8 w-8 text-sm`,
    stepTitle: tw`text-base`,
    stepDescription: tw`text-sm`,
    connector: {
      horizontal: tw`h-0.5 w-full`,
      vertical: tw`h-full w-0.5`,
    },
    gap: tw`gap-3`,
  },
  lg: {
    stepIndicator: tw`h-10 w-10 text-base`,
    stepTitle: tw`text-lg`,
    stepDescription: tw`text-base`,
    connector: {
      horizontal: tw`h-1 w-full`,
      vertical: tw`h-full w-1`,
    },
    gap: tw`gap-4`,
  },
};

// Orientation styles
const orientations = {
  horizontal: tw`flex-row items-center`,
  vertical: tw`flex-col`,
};

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep = 0,
      variant = "default",
      orientation = "horizontal",
      size = "md",
      clickable = false,
      showConnector = true,
      showDescription = true,
      onStepClick,
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    const handleStepClick = (stepIndex: number, step: Step) => {
      if (!clickable || step.disabled) return;

      onStepClick?.(stepIndex, step);
      onChange?.(stepIndex);
    };

    const getStepState = (stepIndex: number, step: Step) => {
      if (step.disabled) return "disabled";
      if (stepIndex < activeStep) return "completed";
      if (stepIndex === activeStep) return "active";
      return "inactive";
    };

    const getStepIndicatorContent = (stepIndex: number, step: Step, state: string) => {
      if (variant === "numbered") {
        return stepIndex + 1;
      }

      if (state === "completed") {
        return <HiOutlineCheck className='h-4 w-4' />;
      }

      if (step.icon) {
        return step.icon;
      }

      return stepIndex + 1;
    };

    const renderConnector = (stepIndex: number) => {
      if (!showConnector || stepIndex === steps.length - 1) return null;

      const nextStep = steps[stepIndex + 1];
      const currentState = getStepState(stepIndex, steps[stepIndex]);
      const nextState = getStepState(stepIndex + 1, nextStep);

      let connectorState: "inactive" | "active" | "completed" = "inactive";
      if (currentState === "completed" || nextState === "active" || nextState === "completed") {
        connectorState = currentState === "completed" ? "completed" : "active";
      }

      const connectorStyles = [
        connectorBase,
        sizes[size].connector[orientation],
        variants[variant].connector[connectorState],
      ];

      if (orientation === "horizontal") {
        return <div className={cn("mx-4 flex-1", connectorStyles)} />;
      } else {
        return <div className={cn("my-2 ml-4", connectorStyles)} />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(stepperBase, orientations[orientation], sizes[size].gap, className)}
        role='tablist'
        aria-orientation={orientation}
        {...props}
      >
        {steps.map((step, stepIndex) => {
          const state = getStepState(stepIndex, step);
          const isClickable = clickable && !step.disabled;

          return (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  stepBase,
                  sizes[size].gap,
                  orientation === "vertical" && "w-full",
                  isClickable && "cursor-pointer"
                )}
                onClick={() => handleStepClick(stepIndex, step)}
                role={isClickable ? "tab" : undefined}
                aria-selected={stepIndex === activeStep}
                aria-disabled={step.disabled}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={e => {
                  if (isClickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleStepClick(stepIndex, step);
                  }
                }}
              >
                {/* Step Indicator */}
                <div
                  className={cn(
                    stepIndicatorBase,
                    sizes[size].stepIndicator,
                    variants[variant].stepIndicator[state],
                    isClickable && "hover:shadow-md"
                  )}
                >
                  {getStepIndicatorContent(stepIndex, step, state)}
                </div>

                {/* Step Content */}
                <div className={cn(stepContentBase)}>
                  <div
                    className={cn(
                      stepTitleBase,
                      sizes[size].stepTitle,
                      variants[variant].stepTitle[state]
                    )}
                  >
                    {step.title}
                  </div>
                  {showDescription && step.description && (
                    <div
                      className={cn(
                        stepDescriptionBase,
                        sizes[size].stepDescription,
                        variants[variant].stepDescription[state]
                      )}
                    >
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector */}
              {renderConnector(stepIndex)}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";
