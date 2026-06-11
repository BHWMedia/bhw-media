import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BHW Media — Premium Web Design & Digital Production'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#05050A',
          padding: '64px 72px',
          fontFamily: 'system-ui, sans-serif',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,91,255,0.35) 0%, transparent 70%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#7C5BFF' }} />
          <span style={{ color: '#7C5BFF', fontSize: '14px', letterSpacing: '0.15em', transform: 'uppercase' }}>
            BHW MEDIA
          </span>
        </div>
        <h1 style={{ color: '#FFFFFF', fontSize: '64px', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-1px', margin: '0 0 20px' }}>
          We Build Websites
          <br />
          <span style={{ color: '#7C5BFF' }}>That Convert.</span>
        </h1>
        <p style={{ color: '#C8C8D8', fontSize: '22px', margin: 0, maxWidth: '700px' }}>
          Premium web design and digital production for brands that demand excellence.
        </p>
      </div>
    ),
    { ...size }
  )
}