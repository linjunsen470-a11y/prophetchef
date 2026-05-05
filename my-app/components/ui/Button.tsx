import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outlineLight';
type ButtonSize = 'default' | 'small';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  fullWidthMobile?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'default', href, className = '', fullWidthMobile = false, ...props }, ref) => {
    const classNames = [
      styles.btn,
      styles[variant],
      size === 'small' ? styles.small : '',
      fullWidthMobile ? styles.fullWidthMobile : '',
      className
    ].filter(Boolean).join(' ');

    if (href) {
      return (
        <Link href={href} className={classNames} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      );
    }

    return (
      <button className={classNames} ref={ref as React.Ref<HTMLButtonElement>} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
