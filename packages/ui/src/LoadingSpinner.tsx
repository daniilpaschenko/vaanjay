import React from 'react'

interface LoadingSpinnerProps {
  size?: 'small' | 'large'
  color?: string
  message?: string
  fullScreen?: boolean
}

const spinnerStyle: React.CSSProperties = {
  display: 'inline-block',
  width: 20,
  height: 20,
  border: '2px solid #E2E8F0',
  borderTopColor: '#2563EB',
  borderRadius: '50%',
  animation: 'spin 0.6s linear infinite',
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  message,
  fullScreen = false,
}) => {
  const dim = size === 'large' ? 40 : 20
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        ...(fullScreen ? { minHeight: '100vh' } : {}),
      }}
    >
      <div
        style={{
          ...spinnerStyle,
          width: dim,
          height: dim,
          borderWidth: dim * 0.1,
        }}
      />
      {message && <p style={{ color: '#64748B', marginTop: 12, fontSize: 14 }}>{message}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
