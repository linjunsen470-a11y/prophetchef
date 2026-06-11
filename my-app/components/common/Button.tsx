import React from "react";
import Link from "next/link";
import styles from "./Button.module.css";
import { sanitizeHref } from "@/lib/urls";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline-light";
  size?: "small" | "default";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  fullWidthMobile?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  children,
  iconStart,
  iconEnd,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  type = "button",
  target,
  rel,
  fullWidthMobile = false,
}) => {
  const variantClassMap: Record<string, string> = {
    primary: styles.primary,
    secondary: styles.secondary,
    "outline-light": styles.outlineLight,
  };

  const combinedClasses = [
    styles.btn,
    variantClassMap[variant],
    size === "small" ? styles.small : "",
    fullWidthMobile ? styles.fullWidthMobile : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const safeHref = sanitizeHref(href);
    const safeRel = target === "_blank" ? rel || "noopener noreferrer" : rel;

    return (
      <Link
        href={safeHref}
        className={combinedClasses}
        target={target}
        rel={safeRel}
      >
        {iconStart}
        {children}
        {iconEnd}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
};
