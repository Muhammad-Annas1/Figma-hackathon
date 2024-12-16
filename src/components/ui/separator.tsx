"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative} // Optional decorative separator
      orientation={orientation} // Vertical or horizontal orientation
      className={cn(
        "shrink-0 bg-border", // Basic styling for the separator
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", // Style based on orientation
        className // Custom className passed as a prop
      )}
      {...props} // Spread other props to the root element
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
