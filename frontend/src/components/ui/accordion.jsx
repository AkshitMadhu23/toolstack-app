import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ value, className = "", children, ...props }) {
  return (
    <AccordionPrimitive.Item value={value} className={className} {...props}>
      {children}
    </AccordionPrimitive.Item>
  );
}

export function AccordionTrigger({ className = "", children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={`flex flex-1 items-center justify-between gap-2 text-left text-sm font-medium transition-colors ${className}`}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ className = "", children, ...props }) {
  return (
    <AccordionPrimitive.Content
      className={`overflow-hidden text-sm text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className}`}
      {...props}
    >
      <div className="pt-2 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  );
}
