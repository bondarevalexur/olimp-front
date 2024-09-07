import clsx from "clsx";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className,
}: any) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variantStyles: Record<string, string> = {
    primary: "bg-amber-400 text-white hover:bg-amber-600 focus:ring-amber-500",
    secondary:
      "border-amber-400 border-2 text-amber-700 hover:text-white hover:bg-amber-600 focus:ring-amber-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm max-h-8",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className,
        {
          "opacity-50 cursor-not-allowed": disabled,
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
