import React from 'react'
import { clsx } from 'clsx'

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  type?: React.HTMLInputTypeAttribute;
  clearable?: boolean;
  passwordToggle?: boolean;
  id?: string;
}

const sizeClasses = {
  sm: 'h-9 text-sm px-3',
  md: 'h-10 text-base px-3.5',
  lg: 'h-12 text-base px-4'
} as const

const variantClasses = {
  outlined: 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-input focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
  filled: 'border border-transparent bg-gray-100 dark:bg-background-input focus:ring-2 focus:ring-primary-500',
  ghost: 'border border-transparent bg-transparent focus:ring-2 focus:ring-primary-500'
} as const

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = 'outlined',
    size = 'md',
    loading = false,
    type = 'text',
    clearable = false,
    passwordToggle = false,
    id
  },
  ref
) {
  const [showPassword, setShowPassword] = React.useState(false)
  const inputId = id || React.useId()
  const describedById = helperText || errorMessage ? inputId + '-desc' : undefined
  const isPassword = type === 'password'

  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type

  const base = clsx(
    'w-full rounded-xl outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    sizeClasses[size],
    variantClasses[variant],
    invalid && 'border-red-500 ring-red-500 focus:ring-red-500 focus:border-red-500'
  )

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          className={base}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid || undefined}
          aria-describedby={describedById}
          type={currentType}
        />
        {loading && (
          <span
            aria-hidden
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.25"
              ></circle>
              <path
                d="M22 12a10 10 0 0 1-10 10"
                stroke="currentColor"
                strokeWidth="4"
              ></path>
            </svg>
          </span>
        )}
        {!loading && clearable && value && value.length > 0 && (
          <button
            type="button"
            aria-label="Clear input"
            className="absolute inset-y-0 right-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={(e) => {
              if (onChange) {
                const event = Object.create(e);
                Object.defineProperty(event, "target", {
                  value: { value: "" },
                });
                // @ts-expect-error minimal synthetic
                onChange(event);
              }
            }}
          >
            ×
          </button>
        )}
        {!loading && isPassword && passwordToggle && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-2 px-2 mr-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? "👁️‍🗨️" : "🕶️"}
          </button>
        )}
      </div>
      {(helperText || (invalid && errorMessage)) && (
        <p
          id={describedById}
          className={clsx(
            "mt-1 text-xs",
            invalid ? "text-red-600" : "text-gray-500"
          )}
        >
          {invalid && errorMessage ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
})
