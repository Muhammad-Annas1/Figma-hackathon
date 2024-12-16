import * as React from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

// Pagination component that wraps navigation controls
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// Component for holding the pagination items
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

// Individual pagination item wrapper
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

// Props for pagination links, including size and active state
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

// Pagination link component with optional active styling
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost", // Outline for active state
        size,
      }),
      isActive && "bg-black/5 shadow-none border-none !text-black", // Additional styling when active
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// PaginationPrevious component for the "Previous" button
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 px-2.5 xs:pl-2.5", className)}
    {...props}
  >
    <ArrowLeftIcon className="h-4 w-4 hidden xs:block" /> {/* Previous arrow icon */}
    <span className="xs:ml-2">Previous</span> {/* Text for Previous */}
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

// PaginationNext component for the "Next" button
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 px-2.5 xs:pr-2.5", className)}
    {...props}
  >
    <span className="xs:mr-2">Next</span> {/* Text for Next */}
    <ArrowRightIcon className="h-4 w-4 hidden xs:block" /> {/* Next arrow icon */}
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

// PaginationEllipsis component for the ellipsis (three dots) indicating more pages
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" /> {/* Dots icon for more pages */}
    <span className="sr-only">More pages</span> {/* Screen reader text */}
  </span>
);

PaginationEllipsis.displayName = "PaginationEllipsis";

// Export all pagination components for use
export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
