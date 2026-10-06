import React from 'react'

interface VerifiedBadgeProps {
  type: 'blue' | 'gold' | 'official'
  size?: number
  style?: React.CSSProperties
}

const BADGE_COLORS = {
  blue: '#2563EB',
  gold: '#F59E0B',
  official: '#16A34A',
}

const BADGE_LABELS = {
  blue: 'V',
  gold: 'V',
  official: 'V',
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ type, size = 16, style }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: BADGE_COLORS[type],
        color: '#FFFFFF',
        fontSize: size * 0.55,
        fontWeight: 800,
        flexShrink: 0,
        ...style,
      }}
      title={`${type} verified`}
    >
      {BADGE_LABELS[type]}
    </span>
  )
}
