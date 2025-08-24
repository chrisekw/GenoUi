import { ImageResponse } from 'next/og'
import { Logo } from '@/components/icons/logo'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '5px',
          backgroundColor: '#09090b', // dark background from theme
        }}
      >
        <Logo
            style={{
                color: '#4f46e5', // primary color from theme
            }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
