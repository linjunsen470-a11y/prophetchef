import React from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline-light";
  size?: "small" | "default";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  type = "button",
  target,
  rel,
}) => {
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    "outline-light": "btn-outline-light",
  };
  const sizeClasses = size === "small" ? "btn-small" : "";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};
