import React from 'react'

interface CardProps {
  children: React.ReactNode
  padding?: number
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({ children, padding = 16, style }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        border: '1px solid #E2E8F0',
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
