import React from 'react'

interface AvatarProps {
  uri?: string
  name: string
  size?: number
  isOnline?: boolean
  showOnline?: boolean
  badge?: 'blue' | 'gold' | 'official'
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 40,
  isOnline,
  showOnline,
  badge,
}) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const colors = ['#2563EB', '#7C3AED', '#0891B2', '#059669', '#D97706', '#DC2626']
  const bgColor = colors[name.charCodeAt(0) % colors.length]

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {uri ? (
        <img
          src={uri}
          alt={name}
          style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: '#FFF', fontWeight: 700, fontSize: size * 0.4 }}>{initials}</span>
        </div>
      )}
      {badge && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: '50%',
            backgroundColor: badge === 'gold' ? '#F59E0B' : badge === 'official' ? '#16A34A' : '#2563EB',
            border: '2px solid white',
          }}
        />
      )}
      {showOnline && isOnline && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size * 0.25,
            height: size * 0.25,
            borderRadius: '50%',
            backgroundColor: '#16A34A',
            border: '2px solid white',
          }}
        />
      )}
    </div>
  )
}
