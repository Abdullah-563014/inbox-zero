"use client";

/*
 * Adapted from: https://github.com/dubinc/dub
 *
 * Original work Copyright (c) 2023 Dub, Inc.
 * Licensed under AGPL-3.0
 *
 * This file may have been modified from the original.
 */
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useId } from "react";
import { ArrowUpRight } from "lucide-react";

const tabSelectButtonVariants = cva("p-4 transition-colors duration-75", {
  variants: {
    variant: {
      default:
        "text-content-subtle data-[selected=true]:text-content-emphasis data-[selected=false]:hover:text-content-default",
      accent:
        "text-content-subtle transition-[color,font-weight] data-[selected=true]:text-blue-600 data-[selected=false]:hover:text-content-default data-[selected=true]:font-medium",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tabSelectIndicatorVariants = cva("absolute bottom-0 w-full px-1.5", {
  variants: {
    variant: {
      default: "text-bg-inverted",
      accent: "text-blue-600",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function TabSelect<T extends string>({
  variant,
  options,
  selected,
  onSelect,
  className,
}: VariantProps<typeof tabSelectButtonVariants> & {
  options: { id: T; label: string; href?: string; target?: string }[];
  selected: string | null;
  onSelect?: Dispatch<SetStateAction<T>> | ((id: T) => void);
  className?: string;
}) {
  const layoutGroupId = useId();

  return (
    <div className={cn("flex text-sm", className)}>
      <LayoutGroup id={layoutGroupId}>
        {options.map(({ id, label, href, target }) => {
          const isSelected = id === selected;
          const As = href ? Link : "div";
          return (
            <As
              key={id}
              className="relative"
              href={href ?? "#"}
              target={target ?? undefined}
            >
              <button
                type="button"
                {...(onSelect && !href && { onClick: () => onSelect(id) })}
                className={cn(
                  tabSelectButtonVariants({ variant }),
                  target === "_blank" && "group flex items-center gap-1.5",
                )}
                data-selected={isSelected}
              >
                {label}
                {target === "_blank" && <ArrowUpRight className="size-2.5" />}
              </button>
              {isSelected && (
                <motion.div
                  layoutId="indicator"
                  transition={{
                    duration: 0.1,
                  }}
                  className={tabSelectIndicatorVariants({ variant })}
                >
                  <div className="h-0.5 rounded-t-full bg-current" />
                </motion.div>
              )}
            </As>
          );
        })}
      </LayoutGroup>
    </div>
  );
}
