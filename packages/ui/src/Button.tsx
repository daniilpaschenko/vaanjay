import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  style,
}) => {
  const base: React.CSSProperties = {
    borderRadius: 8,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: 'all 0.15s ease',
    width: fullWidth ? '100%' : undefined,
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: '#2563EB', color: '#FFFFFF' },
    secondary: { backgroundColor: '#F1F5F9', color: '#0F172A', border: '1px solid #E2E8F0' },
    ghost: { backgroundColor: 'transparent', color: '#2563EB' },
  }

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '10px 20px', fontSize: 14 },
    lg: { padding: '14px 28px', fontSize: 16 },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...sizes[size], ...style }}
    >
      {children}
    </button>
  )
}
