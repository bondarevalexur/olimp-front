import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({
  children,
  onClick,
  type = "button",
  href,
  to,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}: any) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variantStyles: Record<string, string> = {
    primary: "bg-lime-600 text-white hover:bg-lime-400 focus:ring-lime-500 hover:text-orange-600",
    secondary:
      "border-lime-700 border-2 text-lime-700 hover:text-white hover:bg-lime-600 focus:ring-lime-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm max-h-8",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  if (to)
    return (
      <Link
        to={to}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className, {
          "cursor-not-allowed opacity-50": disabled,
        })}
      >
        {" "}
        {children}
      </Link>
    );

  if (href)
    return (
      <a
        href={href}
        className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className, {
          "cursor-not-allowed opacity-50": disabled,
        })}
      >
        {children}
      </a>
    );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className, {
        "cursor-not-allowed opacity-50": disabled,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
