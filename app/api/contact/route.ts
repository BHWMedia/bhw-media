import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// ─── Resend client ────────────────────────────────────────────────────────────

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Validation schema (mirrors client-side) ──────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name too short')
    .max(80, 'Name too long'),
  email: z
    .string()
    .email('Invalid email'),
  company: z.string().max(100).optional(),
  projectType: z.string().min(1, 'Project type required'),
  budget: z.string().min(1, 'Budget required'),
  brief: z
    .string()
    .min(30, 'Brief too short')
    .max(2000, 'Brief too long'),
  referral: z.string().optional(),
})

// ─── Email HTML builder ───────────────────────────────────────────────────────

function buildEmailHtml(data: z.infer<typeof contactSchema>): string {
  const row = (label: string, value: string, isAccent = false) => `
    <tr>
      <td style="
        padding: 11px 0;
        border-bottom: 1px solid #2A2A3A;
        color: #7A7A94;
        font-size: 12px;
        font-family: 'Courier New', monospace;
        width: 140px;
        vertical-align: top;
      ">${label}</td>
      <td style="
        padding: 11px 0;
        border-bottom: 1px solid #2A2A3A;
        color: ${isAccent ? '#7C5BFF' : '#FFFFFF'};
        font-size: 13px;
        font-weight: ${isAccent ? '600' : '400'};
        vertical-align: top;
      ">${value}</td>
    </tr>
  `

  const badge = (text: string, bg: string, color: string) => `
    <span style="
      background: ${bg};
      color: ${color};
      padding: 3px 12px;
      border-radius: 999px;
      font-size: 11px;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      display: inline-block;
    ">${text}</span>
  `

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Project Brief — BHW Media</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05050A; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td>
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          align="center"
          style="
            max-width: 600px;
            width: 100%;
            background-color: #111118;
            border-radius: 16px;
            border: 1px solid #2A2A3A;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td style="
              padding: 28px 32px 24px;
              border-bottom: 1px solid #2A2A3A;
              background: linear-gradient(135deg, rgba(124,91,255,0.12) 0%, rgba(0,212,255,0.06) 100%);
            ">
              <p style="
                margin: 0 0 6px;
                font-family: 'Courier New', monospace;
                font-size: 10px;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: #00D4FF;
              ">// NEW PROJECT BRIEF</p>
              <p style="
                margin: 0 0 4px;
                font-size: 22px;
                font-weight: 700;
                color: #FFFFFF;
                letter-spacing: -0.5px;
              ">BHW Media</p>
              <p style="
                margin: 0;
                font-size: 12px;
                color: #7A7A94;
              ">A new enquiry has been submitted via bhwmedia.co</p>
            </td>
          </tr>

          <!-- Details table -->
          <tr>
            <td style="padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row('Name', data.name)}
                ${row('Email', `<a href="mailto:${data.email}" style="color: #00D4FF; text-decoration: none;">${data.email}</a>`)}
                ${row('Company', data.company ?? '—')}
                <tr>
                  <td style="
                    padding: 11px 0;
                    border-bottom: 1px solid #2A2A3A;
                    color: #7A7A94;
                    font-size: 12px;
                    font-family: 'Courier New', monospace;
                    width: 140px;
                    vertical-align: top;
                  ">Project type</td>
                  <td style="
                    padding: 11px 0;
                    border-bottom: 1px solid #2A2A3A;
                    vertical-align: top;
                  ">
                    ${badge(data.projectType, 'rgba(124,91,255,0.2)', '#9B7FFF')}
                  </td>
                </tr>
                <tr>
                  <td style="
                    padding: 11px 0;
                    border-bottom: 1px solid #2A2A3A;
                    color: #7A7A94;
                    font-size: 12px;
                    font-family: 'Courier New', monospace;
                    width: 140px;
                    vertical-align: top;
                  ">Budget</td>
                  <td style="
                    padding: 11px 0;
                    border-bottom: 1px solid #2A2A3A;
                    vertical-align: top;
                  ">
                    ${badge(data.budget, 'rgba(245,166,35,0.18)', '#F5A623')}
                  </td>
                </tr>
                ${row('Found via', data.referral ?? '—')}
              </table>
            </td>
          </tr>

          <!-- Brief section -->
          <tr>
            <td style="padding: 0 32px 28px;">
              <div style="
                background-color: #1A1A24;
                border: 1px solid #2A2A3A;
                border-radius: 12px;
                padding: 20px;
              ">
                <p style="
                  margin: 0 0 10px;
                  font-family: 'Courier New', monospace;
                  font-size: 10px;
                  letter-spacing: 0.1em;
                  text-transform: uppercase;
                  color: #7A7A94;
                ">Project Brief</p>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.75;
                  color: #C8C8D8;
                  white-space: pre-wrap;
                  word-break: break-word;
                ">${data.brief.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              
                href="mailto:${data.email}?subject=Re: Your BHW Media enquiry"
                style="
                  display: inline-block;
                  background-color: #7C5BFF;
                  color: #FFFFFF;
                  text-decoration: none;
                  padding: 13px 32px;
                  border-radius: 999px;
                  font-size: 14px;
                  font-weight: 600;
                  letter-spacing: 0.01em;
                "
              >Reply to ${data.name} →</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              padding: 16px 32px;
              border-top: 1px solid #2A2A3A;
              text-align: center;
            ">
              <p style="
                margin: 0;
                font-size: 11px;
                color: #3A3A4E;
                font-family: 'Courier New', monospace;
              ">
                BHW Media &nbsp;·&nbsp; mediabhw@gmail.com &nbsp;·&nbsp; instagram.com/media._bhw
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim()
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Parse request body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body — expected JSON' },
      { status: 400 },
    )
  }

  // 2. Validate with zod
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const data = parsed.data

  // 3. Guard: RESEND_API_KEY must be set
  if (!process.env.RESEND_API_KEY) {
    console.error('[BHW Contact] RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    )
  }

  // 4. Send email via Resend
  try {
    const { error } = await resend.emails.send({
      // While on Resend free tier, the from address must use their onboarding domain.
      // Once you verify bhwmedia.co in the Resend dashboard, change this to:
      // from: 'BHW Media <hello@bhwmedia.co>'
      from: 'BHW Media <onboarding@resend.dev>',
      to: ['mediabhw@gmail.com'],
      replyTo: data.email,
      subject: `New brief: ${data.projectType} — ${data.name}`,
      html: buildEmailHtml(data),
    })

    if (error) {
      console.error('[BHW Contact] Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email — please try again' },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[BHW Contact] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 },
    )
  }
}

// Explicitly block all other HTTP methods on this route
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}