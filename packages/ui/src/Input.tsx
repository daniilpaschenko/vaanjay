import React from 'react'

interface InputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  multiline?: boolean
  error?: string
  style?: React.CSSProperties
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  error,
  style,
}) => {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#F8FAFC',
    border: `1px solid ${error ? '#DC2626' : '#E2E8F0'}`,
    borderRadius: 8,
    color: '#0F172A',
    fontSize: 15,
    outline: 'none',
    resize: 'none',
    ...style,
  }

  const Component = multiline ? 'textarea' : 'input'

  return (
    <div>
      <Component
        value={value}
        onChange={(e: any) => onChangeText(e.target.value)}
        placeholder={placeholder}
        type={secureTextEntry ? 'password' : undefined}
        style={inputStyle}
        rows={multiline ? 4 : undefined}
      />
      {error && <p style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  )
}
