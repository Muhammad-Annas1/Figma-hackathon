"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  label?: string;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  (
    {
      className,
      min,
      max,
      step = 1,
      defaultValue = [min, max],
      label,
      ...props
    },
    ref
  ) => {
    const [values, setValues] = React.useState<[number, number]>(defaultValue);

    // Update values on change
    const handleValueChange = (newValues: number[]) => {
      setValues([newValues[0], newValues[1]]);
    };

    return (
      <div className="w-full relative">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            className
          )}
          min={min}
          max={max}
          step={step}
          value={values}
          onValueChange={handleValueChange}
          {...props}
        >
          {/* Track for the slider */}
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
            <SliderPrimitive.Range className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>

          {/* First thumb with label */}
          <div
            className="absolute -translate-x-1/2 -bottom-8 text-xs font-medium px-2 py-1 rounded z-10"
            style={{
              left: `${((values[0] - min) / (max - min)) * 100}%`, // Position of first thumb
            }}
          >
            {label} {values[0]}
          </div>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-primary/50 bg-black shadow-none" />

          {/* Second thumb with label */}
          <div
            className="absolute -translate-x-1/2 -bottom-8 text-xs font-medium px-2 py-1 rounded z-10"
            style={{
              left: `${((values[1] - min) / (max - min)) * 100}%`, // Position of second thumb
            }}
          >
            {label} {values[1]}
          </div>
          <SliderPrimitive.Thumb className="relative block h-4 w-4 rounded-full border border-primary/50 bg-black shadow-none" />
        </SliderPrimitive.Root>
      </div>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
