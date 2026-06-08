import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend Client securely with server-validated environment vectors
const resend = new Resend(process.env.RESEND_API_KEY)

// ─── STRICT TRANS-VALIDATION SCHEMA ──────────────────────────────────────────

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name too short')
    .max(80, 'Name too long'),
  email: z
    .string()
    .email('Invalid email protocol structure'),
  company: z.string().max(100).optional(),
  projectType: z.string().min(1, 'Project type vector required'),
  budget: z.string().min(1, 'Budget metric required'),
  brief: z
    .string()
    .min(30, 'Brief information density too short')
    .max(2000, 'Brief information density exceeded limit'),
  referral: z.string().optional(),
})

// ─── HIGH FIDELITY SECURITY SANITIZATION NODE ─────────────────────────────────

/**
 * Escapes hazardous characters to completely prevent HTML Injection vulnerabilities
 */
function sanitizeInput(str: string): string {
  if (!str) return '—'
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// ─── PREMIUM BRAND HTML DESIGN ARCHITECTURE ──────────────────────────────────

function buildEmailHtml(rawData: z.infer<typeof contactSchema>): string {
  // Sanitize all elements cleanly prior to building production template layout
  const data = {
    name: sanitizeInput(rawData.name),
    email: sanitizeInput(rawData.email),
    company: rawData.company ? sanitizeInput(rawData.company) : '—',
    projectType: sanitizeInput(rawData.projectType),
    budget: sanitizeInput(rawData.budget),
    brief: sanitizeInput(rawData.brief),
    referral: rawData.referral ? sanitizeInput(rawData.referral) : 'Not specified',
  }

  const renderDataRow = (label: string, value: string, isAccent = false) => `
    <tr>
      <td style="
        padding: 14px 0;
        border-bottom: 1px solid rgba(58, 58, 78, 0.3);
        color: #7A7A94;
        font-size: 11px;
        font-family: 'Courier New', Courier, monospace;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        width: 150px;
        vertical-align: top;
      ">${label}</td>
      <td style="
        padding: 14px 0;
        border-bottom: 1px solid rgba(58, 58, 78, 0.3);
        color: ${isAccent ? '#7C5BFF' : '#FFFFFF'};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: ${isAccent ? '600' : '400'};
        vertical-align: top;
        line-height: 1.5;
      ">${value}</td>
    </tr>
  `

  const renderBadge = (text: string, bg: string, color: string) => `
    <span style="
      background-color: ${bg};
      color: ${color};
      padding: 4px 14px;
      border-radius: 8px;
      font-size: 11px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      display: inline-block;
    ">${text}</span>
  `

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Synchronization Core Brief — BHW Media</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05050A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #05050A; padding: 40px 16px;">
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
            border-radius: 20px;
            border: 1px solid rgba(58, 58, 78, 0.5);
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          "
        >

          <tr>
            <td style="
              padding: 36px 40px 32px;
              border-bottom: 1px solid rgba(58, 58, 78, 0.5);
              background: linear-gradient(135deg, rgba(124, 91, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%);
            ">
              <p style="
                margin: 0 0 6px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 11px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: #00D4FF;
                font-weight: bold;
              ">// SPECIFICATION METRICS OVERLAY</p>
              <h1 style="
                margin: 0 0 6px;
                font-size: 26px;
                font-weight: 800;
                color: #FFFFFF;
                letter-spacing: -0.03em;
              ">BHW Media Intake</h1>
              <p style="
                margin: 0;
                font-size: 13px;
                color: #7A7A94;
                line-height: 1.4;
              ">A new operational request has been routed through your production network desk.</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 40px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${renderDataRow('Identity Node', data.name)}
                ${renderDataRow('Comms Channel', `<a href="mailto:${rawData.email}" style="color: #00D4FF; text-decoration: none; border-bottom: 1px dashed rgba(0, 212, 255, 0.4);">${data.email}</a>`)}
                ${renderDataRow('Corporate Unit', data.company)}
                <tr>
                  <td style="
                    padding: 14px 0;
                    border-bottom: 1px solid rgba(58, 58, 78, 0.3);
                    color: #7A7A94;
                    font-size: 11px;
                    font-family: 'Courier New', Courier, monospace;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    width: 150px;
                    vertical-align: top;
                  ">Target Vector</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(58, 58, 78, 0.3); vertical-align: top;">
                    ${renderBadge(data.projectType, 'rgba(124, 91, 255, 0.12)', '#9B7FFF')}
                  </td>
                </tr>
                <tr>
                  <td style="
                    padding: 14px 0;
                    border-bottom: 1px solid rgba(58, 58, 78, 0.3);
                    color: #7A7A94;
                    font-size: 11px;
                    font-family: 'Courier New', Courier, monospace;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    width: 150px;
                    vertical-align: top;
                  ">Budget Scope</td>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(58, 58, 78, 0.3); vertical-align: top;">
                    ${renderBadge(data.budget, 'rgba(0, 212, 255, 0.1)', '#00D4FF')}
                  </td>
                </tr>
                ${renderDataRow('Discovery Source', data.referral)}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 40px 32px;">
              <div style="
                background-color: #161622;
                border: 1px solid rgba(58, 58, 78, 0.4);
                border-radius: 12px;
                padding: 24px;
              ">
                <p style="
                  margin: 0 0 12px;
                  font-family: 'Courier New', Courier, monospace;
                  font-size: 11px;
                  letter-spacing: 0.15em;
                  text-transform: uppercase;
                  color: #7A7A94;
                  font-weight: bold;
                ">PROJECT CONFIGURATION SPECS</p>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.8;
                  color: #C8C8D8;
                  white-space: pre-wrap;
                  word-break: break-word;
                ">${data.brief}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 40px; text-align: center;">
              <a
                href="mailto:${rawData.email}?subject=Re: Your BHW Media Project Enquiry"
                style="
                  display: inline-block;
                  background-color: #7C5BFF;
                  color: #FFFFFF;
                  text-decoration: none;
                  padding: 15px 36px;
                  border-radius: 12px;
                  font-size: 14px;
                  font-weight: 600;
                  letter-spacing: 0.02em;
                  box-shadow: 0 8px 24px rgba(124, 91, 255, 0.25);
                "
              >
                Initiate Project Channels &rarr;
              </a>
            </td>
          </tr>

          <tr>
            <td style="
              padding: 20px 40px;
              border-top: 1px solid rgba(58, 58, 78, 0.5);
              background-color: #0D0D13;
              text-align: center;
            ">
              <p style="
                margin: 0;
                font-size: 11px;
                color: #5A5A78;
                font-family: 'Courier New', Courier, monospace;
                letter-spacing: 0.02em;
              ">
                BHW Media Platform Nodes &nbsp;&middot;&nbsp; mediabhw@gmail.com
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

// ─── TRANS-FLOW ROUTE ENGINE INTERFACE ────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Structural parser phase
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid payload execution — matrix expected JSON context' },
      { status: 400 }
    )
  }

  // 2. Strict type assertion layer via Zod engine
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation operations failed metrics verification',
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const validData = parsed.data

  // 3. Environment protection guard verification
  if (!process.env.RESEND_API_KEY) {
    console.error('[BHW Node Crash] CRITICAL: RESEND_API_KEY environment vector missing.')
    return NextResponse.json(
      { error: 'System architecture setup fault' },
      { status: 500 }
    )
  }

  // 4. Dispatch transaction payload processing
  try {
    const { error } = await resend.emails.send({
      // NOTE: Update to custom domain 'BHW Media <hello@bhwmedia.co>' inside Resend configurations once domains resolve.
      from: 'BHW Media <onboarding@resend.dev>',
      to: ['mediabhw@gmail.com'],
      replyTo: validData.email,
      subject: `[Brief Sync] ${validData.projectType} — ${validData.name}`,
      html: buildEmailHtml(validData),
    })

    if (error) {
      console.error('[BHW Mail Failure] Resend Engine feedback:', error)
      return NextResponse.json(
        { error: 'Communication relay refused network allocation — please retry' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[BHW System Failure] Crash unexpected trace:', err)
    return NextResponse.json(
      { error: 'Unexpected operations kernel exception' },
      { status: 500 }
    )
  }
}

// Lock all secondary methods with explicit status response codes
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method operation vector not allowed on this node channel' },
    { status: 405 }
  )
}