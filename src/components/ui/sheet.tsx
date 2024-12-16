"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

// Sheet Overlay Component without animations
const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>

>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80", // Simple overlay background without animations
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Sheet content variants (side positioning)
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg", // Removed transitions and animations
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b", // Top side
        bottom: "inset-x-0 bottom-0 border-t", // Bottom side
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm", // Left side
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm", // Right side
      },
    },

    defaultVariants: {
      side: "right", // Default side is right
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)} // Apply side and custom className
      {...props}
    >
      {/* Close button */}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 focus:outline-none">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))

SheetContent.displayName = SheetPrimitive.Content.displayName

// Header for Sheet Content
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left", // Simple header layout
      className
    )}
    {...props}
  />
)

SheetHeader.displayName = "SheetHeader"

// Footer for Sheet Content
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", // Simple footer layout
      className
    )}
    {...props}
  />
)

SheetFooter.displayName = "SheetFooter"

// Title for Sheet Content
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)} // Basic title styling
    {...props}
  />
))

SheetTitle.displayName = SheetPrimitive.Title.displayName

// Description for Sheet Content
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)} // Basic description styling
    {...props}
  />
))


SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
