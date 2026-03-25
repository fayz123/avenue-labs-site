import logoUrl from '/logo.png'

// ─── Color tokens ────────────────────────────────────────────────────────────
const NAVY      = '#1a365d'
const NAVY_DARK = '#0d1b2e'
const WHITE     = '#FFFFFF'
const SLATE     = '#F1F5F9'   // section backgrounds
const BODY      = '#475569'   // secondary text
const MUTED     = '#94A3B8'   // tertiary text
const CYAN      = '#22D3EE'   // accent
const CYAN_D    = '#0891B2'   // accent hover

// ─── Shared helpers ───────────────────────────────────────────────────────────
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

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
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
        <img src={logoUrl} alt="Avenue Labs" style={{ height: 62, objectFit: 'contain' }} />
        <a
          href="mailto:hello@avenue.so"
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
          Inquire
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      background: NAVY_DARK,
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Fine grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          `linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),` +
          `linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Top-right accent glow */}
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 500, height: 500,
        background: `radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '7rem 2rem',
        position: 'relative', zIndex: 1,
      }}>
        <SectionLabel dark>Claude-Native Enterprise Architecture</SectionLabel>

        <h1 style={{
          color: WHITE,
          fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
          fontWeight: 300,
          lineHeight: 1.12,
          letterSpacing: '-0.025em',
          margin: '0 0 0.25rem',
          maxWidth: 820,
        }}>
          Enterprise AI That{' '}
          <br />
          <span style={{
            color: CYAN,
            fontWeight: 700,
            fontStyle: 'italic',
          }}>
            Actually Works
          </span>
          {' '}in Production.
        </h1>

        <hr style={rule} />

        <p style={{
          color: MUTED,
          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
          lineHeight: 1.85,
          maxWidth: 620,
          margin: '0 0 2.75rem',
        }}>
          Avenue Labs is a boutique AI consultancy that helps enterprises
          move beyond proof-of-concept. We design, deploy, and modernize
          systems around Claude — so your organization ships intelligent
          products with confidence, security, and scale.
        </p>

        <a
          href="mailto:hello@avenue.so"
          style={{
            display: 'inline-block',
            background: CYAN,
            color: NAVY_DARK,
            padding: '0.9rem 2.25rem',
            fontSize: '0.82rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.background = '#67E8F9'}
          onMouseLeave={e => e.target.style.background = CYAN}
        >
          Inquire for Implementation →
        </a>

        <p style={{
          marginTop: '1.5rem',
          color: MUTED,
          fontSize: '0.72rem',
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.1em',
        }}>
          No retainers. No bloat. Just results.
        </p>
      </div>
    </section>
  )
}

// ─── Methodology ─────────────────────────────────────────────────────────────
const pillars = [
  {
    id: '01',
    phase: 'Architect',
    sub: 'Design',
    body: 'We map your enterprise context, data flows, and risk surface — then design a Claude-native architecture that fits your infrastructure, compliance posture, and product roadmap.',
    bullets: ['System & prompt architecture', 'Data classification & privacy boundaries', 'Cost & latency modeling'],
  },
  {
    id: '02',
    phase: 'Implement',
    sub: 'Deployment',
    body: 'From API integration to full-stack feature delivery, we write production-grade code and run the rollout — bringing your AI system live with observability built in from day one.',
    bullets: ['Claude API & Anthropic SDK integration', 'Evaluation frameworks & red-teaming', 'CI/CD pipelines & monitoring'],
  },
  {
    id: '03',
    phase: 'Modernize',
    sub: 'Legacy Code',
    body: 'We audit and migrate aging codebases — replacing brittle rule-based logic and legacy ML pipelines with robust, maintainable Claude-powered solutions.',
    bullets: ['Legacy system audits & dependency mapping', 'Incremental migration strategies', 'Regression testing & human-in-the-loop safeguards'],
  },
]

function Methodology() {
  return (
    <section style={{ background: WHITE, padding: '7rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: '4.5rem' }}>
          <SectionLabel>Our Process</SectionLabel>
          <h2 style={{
            color: NAVY,
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            The <strong style={{ fontWeight: 700 }}>Avenue</strong> Methodology
          </h2>
          <hr style={rule} />
          <p style={{ color: BODY, fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 520, margin: 0 }}>
            Three disciplined phases that take an AI initiative from napkin sketch
            to reliable, production-hardened system.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1.5rem',
        }}>
          {pillars.map((p) => (
            <div key={p.id} style={{
              background: SLATE,
              padding: '2.5rem',
              borderTop: `3px solid ${CYAN}`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.1rem',
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: CYAN_D,
                  letterSpacing: '0.05em',
                }}>
                  {p.id}
                </span>
                <span style={{
                  flex: '0 0 18px',
                  height: '1px',
                  background: 'rgba(8,145,178,0.35)',
                }} />
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: BODY,
                }}>
                  {p.sub}
                </span>
              </div>

              <h3 style={{
                color: NAVY,
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: '0 0 0.9rem',
                letterSpacing: '-0.02em',
              }}>
                {p.phase}
              </h3>

              <p style={{ color: BODY, fontSize: '0.9rem', lineHeight: 1.8, margin: '0 0 1.4rem' }}>
                {p.body}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.bullets.map((b) => (
                  <li key={b} style={{
                    display: 'flex', gap: '0.55rem', alignItems: 'flex-start',
                    color: BODY, fontSize: '0.85rem', lineHeight: 1.7, paddingBottom: '0.3rem',
                  }}>
                    <span style={{ color: CYAN, flexShrink: 0, marginTop: 3 }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Divider band ─────────────────────────────────────────────────────────────
function StatBand() {
  const stats = [
    { value: 'Claude-Native', label: 'Model Strategy' },
    { value: 'Enterprise', label: 'Grade Security' },
    { value: 'Full-Stack', label: 'AI Delivery' },
    { value: 'Zero', label: 'Unnecessary Bloat' },
  ]
  return (
    <section style={{
      background: NAVY,
      padding: '3.5rem 2rem',
      borderTop: `1px solid rgba(34,211,238,0.15)`,
      borderBottom: `1px solid rgba(34,211,238,0.15)`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2rem',
        textAlign: 'center',
      }}>
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{
              color: CYAN, fontSize: '1.35rem', fontWeight: 700,
              letterSpacing: '-0.01em', marginBottom: '0.3rem',
            }}>
              {s.value}
            </div>
            <div style={{
              color: MUTED, fontSize: '0.7rem',
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Horizon ──────────────────────────────────────────────────────────────────
function Horizon() {
  const areas = [
    {
      icon: '◈',
      title: 'Embodied AI & Robotics',
      body: 'Researching the intersection of large language models and physical systems — from sensor fusion and robotic perception to autonomous manipulation and real-world feedback loops.',
    },
    {
      icon: '⬡',
      title: 'Deep Research Agents',
      body: 'Autonomous, multi-step research workflows that traverse structured and unstructured corpora — surfacing insights that no single prompt can reach.',
    },
    {
      icon: '◉',
      title: 'Constitutional Architecture',
      body: 'System-level governance layers that encode organizational policy directly into the model context — moving beyond prompt-level guardrails.',
    },
  ]

  return (
    <section style={{
      background: NAVY_DARK,
      padding: '7rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative rings */}
      {[600, 900, 1200].map((size) => (
        <div key={size} style={{
          position: 'absolute',
          bottom: -(size / 2),
          right: -(size / 2),
          width: size, height: size,
          borderRadius: '50%',
          border: `1px solid rgba(34,211,238,${0.06 - size / 30000})`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '4rem', maxWidth: 640 }}>
          <SectionLabel dark>Long-Term Research</SectionLabel>
          <h2 style={{
            color: WHITE,
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 300,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            The Horizon:{' '}
            <span style={{ color: CYAN, fontWeight: 700 }}>
              Robotics &amp; Deep Research
            </span>
          </h2>
          <hr style={{ ...rule, margin: '1.25rem 0' }} />
          <p style={{ color: MUTED, fontSize: '0.92rem', lineHeight: 1.85, margin: 0 }}>
            Beyond today's engagements, Avenue Labs maintains an active research
            practice exploring where Claude-native intelligence will go next.
            These are not products — they are directions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(34,211,238,0.08)',
        }}>
          {areas.map((a) => (
            <div key={a.title} style={{
              background: NAVY_DARK,
              padding: '2.25rem',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#0f2540'}
              onMouseLeave={e => e.currentTarget.style.background = NAVY_DARK}
            >
              <div style={{
                fontSize: '1.3rem', color: CYAN, marginBottom: '1rem', opacity: 0.85,
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {a.icon}
              </div>
              <h3 style={{
                color: WHITE, fontSize: '1.05rem', fontWeight: 600,
                margin: '0 0 0.65rem', letterSpacing: '-0.01em',
              }}>
                {a.title}
              </h3>
              <p style={{ color: MUTED, fontSize: '0.875rem', lineHeight: 1.8, margin: 0 }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      background: WHITE,
      borderTop: `1px solid rgba(26,54,93,0.08)`,
      padding: '2.5rem',
      textAlign: 'center',
    }}>
      <img src={logoUrl} alt="Avenue Labs" style={{ height: 38, marginBottom: '1rem' }} />
      <p style={{
        color: MUTED,
        fontSize: '0.72rem',
        fontFamily: 'JetBrains Mono, monospace',
        letterSpacing: '0.1em',
        margin: 0,
      }}>
        © {new Date().getFullYear()} Avenue Labs
      </p>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Methodology />
        <StatBand />
        <Horizon />
      </main>
      <Footer />
    </>
  )
}
