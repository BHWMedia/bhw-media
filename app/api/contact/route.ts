// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// ─── Validation Schema ────────────────────────────────────────────────────────

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
    .min(10, 'Brief too short') // Lowered from 30 to prevent blocking programmatic wizard templates
    .max(2000, 'Brief too long'),
  referral: z.string().optional(),
  websiteUrl: z.string().optional(),
  painPoint: z.enum(['speed', 'conversion', 'ui']).optional(),
  source: z.string().optional(),
})

type ContactPayload = z.infer<typeof contactSchema>

// ─── HTML Email Template Builder ─────────────────────────────────────────────

function buildEmailHtml(data: ContactPayload): string {
  const isAuditRequest = data.source === 'AuditWizard'

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
      ;">${label}</td>
      <td style="
        padding: 11px 0;
        border-bottom: 1px solid #2A2A3A;
        color: ${isAccent ? '#7C5BFF' : '#FFFFFF'};
        font-size: 13px;
        font-weight: ${isAccent ? '600' : '400'};
        vertical-align: top;
      ;">${value}</td>
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
    ;">${text}</span>
  `

  const auditMetaBlock = isAuditRequest && data.websiteUrl
    ? `
      <tr>
        <td colspan="2" style="padding: 14px 0 2px;">
          <div style="
            background: rgba(0,212,255,0.06);
            border: 1px solid rgba(0,212,255,0.15);
            border-radius: 10px;
            padding: 14px 16px;
          ;">
            <p style="
              margin: 0 0 8px;
              font-family: 'Courier New', monospace;
              font-size: 10px;
              letter-spacing: 0.1em;
              text-transform: uppercase;
              color: #00D4FF;
            ;">// Audit Request Metadata</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Website URL', `<a href="${data.websiteUrl}" style="color: #00D4FF; text-decoration: none;">${data.websiteUrl}</a>`)}
              ${data.painPoint ? row('Pain Point', data.painPoint === 'speed' ? 'Core Web Vitals / Speed' : data.painPoint === 'conversion' ? 'Low Conversion Rates' : 'Outdated Layout / UI') : ''}
            </table>
          </div>
        </td>
      </tr>
    `
    : ''

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${isAuditRequest ? 'Free Audit Request' : 'New Project Brief'} — BHW Media</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05050A; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td>
        <table
          width="600"
          padding="0"
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
          <tr>
            <td style="
              padding: 28px 32px 24px;
              border-bottom: 1px solid #2A2A3A;
              background: linear-gradient(135deg, rgba(124,91,255,0.12) 0%, rgba(0,212,255,0.06) 100%);
            ;">
              <p style="
                margin: 0 0 6px;
                font-family: 'Courier New', monospace;
                font-size: 10px;
                letter-spacing: 0.15em;
                text-transform: uppercase;
                color: ${isAuditRequest ? '#00D4FF' : '#7C5BFF'};
              ;">${isAuditRequest ? '// FREE AUDIT REQUEST' : '// NEW PROJECT BRIEF'}</p>
              <p style="
                margin: 0 0 4px;
                font-size: 22px;
                font-weight: 700;
                color: #FFFFFF;
                letter-spacing: -0.5px;
              ;">BHW Media</p>
              <p style="
                margin: 0;
                font-size: 12px;
                color: #7A7A94;
              ;">${isAuditRequest ? 'A free audit has been requested via bhw-media.vercel.app/audit' : 'A new enquiry has been submitted via bhw-media.vercel.app/contact'}</p>
            </td>
          </tr>

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
                  ;">Project type</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #2A2A3A; vertical-align: top;">
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
                  ;">Budget</td>
                  <td style="padding: 11px 0; border-bottom: 1px solid #2A2A3A; vertical-align: top;">
                    ${badge(data.budget, 'rgba(245,166,35,0.18)', '#F5A623')}
                  </td>
                </tr>
                ${row('Found via', data.referral ?? '—')}
                ${auditMetaBlock}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 32px 28px;">
              <div style="
                background-color: #1A1A24;
                border: 1px solid #2A2A3A;
                border-radius: 12px;
                padding: 20px;
              ;">
                <p style="
                  margin: 0 0 10px;
                  font-family: 'Courier New', monospace;
                  font-size: 10px;
                  letter-spacing: 0.1em;
                  text-transform: uppercase;
                  color: #7A7A94;
                ;">Project Brief</p>
                <p style="
                  margin: 0;
                  font-size: 14px;
                  line-height: 1.75;
                  color: #C8C8D8;
                  white-space: pre-wrap;
                  word-break: break-word;
                ;">${data.brief.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <a
                href="mailto:${data.email}?subject=Re%3A%20Your%20BHW%20Media%20${isAuditRequest ? 'audit%20request' : 'enquiry'}"
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
              >Reply to ${data.name} &#8594;</a>
            </td>
          </tr>

          <tr>
            <td style="
              padding: 16px 32px;
              border-top: 1px solid #2A2A3A;
              text-align: center;
            ;">
              <p style="
                margin: 0;
                font-size: 11px;
                color: #3A3A4E;
                font-family: 'Courier New', monospace;
              ;">
                BHW Media &nbsp;&middot;&nbsp; mediabhw@gmail.com &nbsp;&middot;&nbsp; instagram.com/media._bhw
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

// ─── CRM Webhook Dispatcher — Isolated, Fail-Safe ─────────────────────────────

async function dispatchCrmWebhook(
  data: ContactPayload,
  webhookUrl: string,
): Promise<void> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8_000)

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        ...data,
        source: data.source ?? 'BHW Media Production Main Web Intake',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      console.error(
        `[BHW CRM] Webhook returned non-200 status: ${response.status} ${response.statusText}`,
      )
      return
    }

    console.info('[BHW CRM] Webhook dispatch successful.')
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[BHW CRM] Webhook timed out after 8 seconds. Lead still captured via Resend.')
    } else {
      console.error('[BHW CRM] Webhook dispatch failed with unexpected error:', err)
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

// ─── Fallback Resend Notification ─────────────────────────────────────────────

async function dispatchFallbackNotification(
  resend: Resend,
  data: ContactPayload,
): Promise<void> {
  try {
    await resend.emails.send({
      from: 'BHW Media <onboarding@resend.dev>',
      to: ['mediabhw@gmail.com'],
      replyTo: data.email,
      subject: `[FALLBACK] New intake: ${data.name} — ${data.projectType}`,
      html: `
        <p style="font-family: monospace; color: #fff; background: #111; padding: 20px; border-radius: 8px;">
          <strong style="color: #FF4D6D;">FALLBACK ALERT</strong><br/><br/>
          Primary dispatch failed. Raw lead data below:<br/><br/>
          <strong>Name:</strong> ${data.name}<br/>
          <strong>Email:</strong> ${data.email}<br/>
          <strong>Company:</strong> ${data.company ?? '—'}<br/>
          <strong>Project Type:</strong> ${data.projectType}<br/>
          <strong>Budget:</strong> ${data.budget}<br/>
          <strong>Website:</strong> ${data.websiteUrl ?? '—'}<br/>
          <strong>Brief:</strong><br/>
          ${data.brief.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
        </p>
      `,
    })
    console.info('[BHW Contact] Fallback notification dispatched successfully.')
  } catch (fallbackErr) {
    console.error('[BHW Contact] CRITICAL — Fallback notification also failed:', fallbackErr)
    console.error('[BHW Contact] RAW LEAD DATA FOR MANUAL RECOVERY:', JSON.stringify(data))
  }
}

// ─── POST Handler ─────────────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body — expected JSON' },
      { status: 400 },
    )
  }

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

  if (!process.env.RESEND_API_KEY) {
    console.error('[BHW Contact] RESEND_API_KEY is missing from environment configuration.')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  let primaryDispatchSucceeded = false

  try {
    const { error: resendError } = await resend.emails.send({
      from: 'BHW Media <onboarding@resend.dev>',
      to: ['mediabhw@gmail.com'],
      replyTo: data.email,
      subject: `${data.source === 'AuditWizard' ? '[Audit Request]' : 'New brief:'} ${data.projectType} — ${data.name}`,
      html: buildEmailHtml(data),
    })

    if (resendError) {
      console.error('[BHW Contact] Resend primary dispatch error:', resendError)
      await dispatchFallbackNotification(resend, data)
    } else {
      primaryDispatchSucceeded = true
      console.info(`[BHW Contact] Primary dispatch successful for: ${data.email}`)
    }
  } catch (err) {
    console.error('[BHW Contact] Unexpected exception during primary Resend dispatch:', err)
    await dispatchFallbackNotification(resend, data)
  }

  if (process.env.MAKE_CRM_WEBHOOK_URL) {
    dispatchCrmWebhook(data, process.env.MAKE_CRM_WEBHOOK_URL).catch((err) => {
      console.error('[BHW Contact] Unhandled rejection from CRM dispatcher:', err)
    })
  } else {
    console.warn('[BHW Contact] MAKE_CRM_WEBHOOK_URL is not set. CRM sync skipped.')
  }

  if (primaryDispatchSucceeded) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  return NextResponse.json(
    {
      error:
        'Our mail system is temporarily unavailable. Your inquiry was logged. Please email mediabhw@gmail.com directly if you need an immediate response.',
    },
    { status: 502 },
  )
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}