import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import logoUrl from '/logo.png'

// ─── Color tokens (shared with App.jsx) ──────────────────────────────────────
const NAVY      = '#1a365d'
const NAVY_DARK = '#0d1b2e'
const WHITE     = '#FFFFFF'
const SLATE     = '#F1F5F9'
const BODY      = '#475569'
const MUTED     = '#94A3B8'
const CYAN      = '#22D3EE'
const CYAN_D    = '#0891B2'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY'
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

function SectionLabel({ children, dark = false }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '1.1rem',
      background: dark ? 'rgba(34,211,238,0.08)' : 'rgba(8,145,178,0.08)',
      border: `1px solid ${dark ? 'rgba(34,211,238,0.2)' : 'rgba(8,145,178,0.2)'}`,
      padding: '0.28rem 0.7rem',
      borderRadius: '2px',
    }}>
      <span style={{
        width: 5, height: 5,
        borderRadius: '50%',
        background: dark ? CYAN : CYAN_D,
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: dark ? CYAN : CYAN_D,
      }}>
        {children}
      </span>
    </div>
  )
}

const rule = {
  width: 32,
  height: 2,
  background: CYAN,
  margin: '1.25rem 0',
  border: 'none',
}

const inputBase = {
  width: '100%',
  padding: '0.85rem 1rem',
  fontSize: '0.9rem',
  fontFamily: 'Inter, sans-serif',
  color: NAVY,
  background: WHITE,
  border: `1px solid rgba(26,54,93,0.15)`,
  borderRadius: '2px',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

export default function Contact() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    if (!executeRecaptcha) {
      setErrorMsg('reCAPTCHA not ready. Please try again.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const token = await executeRecaptcha('contact_form')
      const formData = new FormData(e.target)
      formData.append('g-recaptcha-response', token)
      formData.append('access_key', WEB3FORMS_KEY)
      formData.append('subject', 'New inquiry from avenuelabs.ai')
      formData.append('from_name', 'Avenue Labs Website')

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        e.target.reset()
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }, [executeRecaptcha])

  return (
    <>
      {/* Nav */}
      <nav style={{
        background: WHITE,
        borderBottom: `1px solid rgba(26,54,93,0.08)`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/">
            <img src={logoUrl} alt="Avenue Labs" style={{ height: 62, objectFit: 'contain' }} />
          </Link>
          <Link
            to="/"
            style={{
              background: NAVY,
              color: WHITE,
              border: 'none',
              padding: '0.6rem 1.5rem',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.target.style.background = CYAN_D}
            onMouseLeave={e => e.target.style.background = NAVY}
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero header */}
      <section style={{
        background: NAVY_DARK,
        padding: '5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),` +
            `linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <SectionLabel dark>Get in Touch</SectionLabel>
          <h1 style={{
            color: WHITE,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: '0 0 0.25rem',
          }}>
            Let's Build{' '}
            <span style={{ color: CYAN, fontWeight: 700, fontStyle: 'italic' }}>
              Something Real
            </span>
          </h1>
          <hr style={rule} />
          <p style={{
            color: MUTED,
            fontSize: 'clamp(0.92rem, 1.5vw, 1.05rem)',
            lineHeight: 1.85,
            maxWidth: 540,
            margin: 0,
          }}>
            Tell us about your project, timeline, and goals. We'll respond within
            one business day.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section style={{ background: SLATE, padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {status === 'success' ? (
            <div style={{
              background: WHITE,
              padding: '3.5rem',
              textAlign: 'center',
              borderTop: `3px solid ${CYAN}`,
            }}>
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                color: CYAN_D,
              }}>
                ✓
              </div>
              <h2 style={{
                color: NAVY,
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: '0 0 0.75rem',
              }}>
                Message Sent
              </h2>
              <p style={{
                color: BODY,
                fontSize: '0.95rem',
                lineHeight: 1.8,
                margin: '0 0 2rem',
              }}>
                Thank you for reaching out. We'll get back to you within one
                business day at the email you provided.
              </p>
              <Link
                to="/"
                style={{
                  display: 'inline-block',
                  background: NAVY,
                  color: WHITE,
                  padding: '0.75rem 2rem',
                  fontSize: '0.78rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = CYAN_D}
                onMouseLeave={e => e.target.style.background = NAVY}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: WHITE,
              padding: '3rem',
              borderTop: `3px solid ${CYAN}`,
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  color: NAVY,
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  margin: '0 0 0.4rem',
                  letterSpacing: '-0.01em',
                }}>
                  Contact Us
                </h2>
                <p style={{ color: BODY, fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  All fields are required unless marked optional.
                </p>
              </div>

              {/* Name row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    name="first_name"
                    required
                    style={inputBase}
                    onFocus={e => e.target.style.borderColor = CYAN}
                    onBlur={e => e.target.style.borderColor = 'rgba(26,54,93,0.15)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    name="last_name"
                    required
                    style={inputBase}
                    onFocus={e => e.target.style.borderColor = CYAN}
                    onBlur={e => e.target.style.borderColor = 'rgba(26,54,93,0.15)'}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Work Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  style={inputBase}
                  onFocus={e => e.target.style.borderColor = CYAN}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,54,93,0.15)'}
                />
              </div>

              {/* Company */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Company</label>
                <input
                  name="company"
                  required
                  style={inputBase}
                  onFocus={e => e.target.style.borderColor = CYAN}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,54,93,0.15)'}
                />
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Subject</label>
                <select
                  name="subject_line"
                  required
                  defaultValue=""
                  style={{ ...inputBase, cursor: 'pointer', appearance: 'auto' }}
                  onFocus={e => e.target.style.borderColor = CYAN}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,54,93,0.15)'}
                >
                  <option value="" disabled>Select a topic</option>
                  <option value="New Project">New Project</option>
                  <option value="Enterprise AI Architecture">Enterprise AI Architecture</option>
                  <option value="Legacy Modernization">Legacy Modernization</option>
                  <option value="Claude API Integration">Claude API Integration</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  style={{ ...inputBase, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = CYAN}
                  onBlur={e => e.target.style.borderColor = 'rgba(26,54,93,0.15)'}
                />
              </div>

              {/* Honeypot (hidden anti-spam) */}
              <input type="hidden" name="botcheck" value="" />

              {/* Error message */}
              {status === 'error' && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#991B1B',
                  padding: '0.75rem 1rem',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem',
                  borderRadius: '2px',
                }}>
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  background: status === 'sending' ? MUTED : CYAN,
                  color: NAVY_DARK,
                  border: 'none',
                  padding: '0.95rem',
                  fontSize: '0.82rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => {
                  if (status !== 'sending') e.target.style.background = '#67E8F9'
                }}
                onMouseLeave={e => {
                  if (status !== 'sending') e.target.style.background = CYAN
                }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          )}

          {/* Direct email fallback */}
          <p style={{
            textAlign: 'center',
            marginTop: '2rem',
            color: MUTED,
            fontSize: '0.78rem',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.08em',
          }}>
            Or email us directly at{' '}
            <a href="mailto:support@avenuelabs.ai" style={{ color: CYAN_D, textDecoration: 'none' }}>
              support@avenuelabs.ai
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: WHITE,
        borderTop: `1px solid rgba(26,54,93,0.08)`,
        padding: '2.5rem',
        textAlign: 'center',
      }}>
        <Link to="/">
          <img src={logoUrl} alt="Avenue Labs" style={{ height: 38, marginBottom: '1rem' }} />
        </Link>
        <p style={{
          color: MUTED,
          fontSize: '0.72rem',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          &copy; {new Date().getFullYear()} Avenue Labs
        </p>
      </footer>
    </>
  )
}

const labelStyle = {
  display: 'block',
  marginBottom: '0.35rem',
  fontSize: '0.75rem',
  fontFamily: 'JetBrains Mono, monospace',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: NAVY,
}
