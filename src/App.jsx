import { useEffect, useRef, useState } from 'react'
import './App.css'

const APP_URL = 'https://prod.synthematic.app'

const FEATURES = [
  { icon: '📅', name: 'Calendar', copy: 'Schedules, events and team availability in one shared view.' },
  { icon: '✅', name: 'Tasks & Projects', copy: 'Assign work, set deadlines, track progress to done.' },
  { icon: '🗂️', name: 'Kanban Boards', copy: 'Visual pipelines with drag-and-drop and task codes.' },
  { icon: '💬', name: 'Chat & DMs', copy: 'Team chat, direct messages and @mentions — no extra app.' },
  { icon: '⏱️', name: 'Time Tracking', copy: 'Clock in/out, live presence and accurate timesheets.' },
  { icon: '🧾', name: 'Billing & Invoicing', copy: 'Subscriptions, invoices and payment status in one place.' },
  { icon: '🔐', name: 'Document Vault', copy: 'Store contracts and files with controlled access.' },
  { icon: '🛡️', name: 'Security & Roles', copy: 'Per-member permissions. Owners control who sees what.' },
  { icon: 'CRM', name: 'CRM & Pipeline', copy: 'Contacts and a drag-and-drop deal pipeline with custom stages.' },
  { icon: '👥', name: 'Member Management', copy: 'Invite your team, set roles, manage modules per person.' },
  { icon: 'API', name: 'Developer API', copy: 'API keys, signed webhooks and an MCP server for AI assistants.' },
  { icon: 'Admin', name: 'Admin Console', copy: 'Manage workspaces, members, users and content without code.' },
  { icon: '🏠', name: 'Property Management', copy: 'Track units, tenants and records for small portfolios.' },
]

const CATEGORIES = [
  'Project management',
  'Team chat',
  'Time tracking',
  'File storage',
  'Invoicing & billing',
]

// Real plans from api-synthematic/config/plans.yaml (PHP, monthly)
const PLANS = [
  {
    name: 'Micro',
    price: '₱499',
    tagline: 'For small teams getting organized',
    seats: '2–5 members',
    popular: false,
  },
  {
    name: 'Startup',
    price: '₱999',
    tagline: 'For growing startups',
    seats: '6–10 members',
    popular: true,
  },
  {
    name: 'Growth',
    price: '₱1,799',
    tagline: 'For scaling operations',
    seats: '11–20 members',
    popular: false,
  },
  {
    name: 'Business',
    price: '₱3,499',
    tagline: 'For established teams',
    seats: '21–50 members',
    popular: false,
  },
]

const FAQ = [
  {
    q: 'Does my team need to install anything?',
    a: 'No. Synthematic runs entirely in the browser — desktop or mobile. Send your team a link, they sign in, and they are working. No IT setup, no updates to chase.',
  },
  {
    q: 'Is our data secure?',
    a: 'Yes. Authentication and data run on Google\'s Firebase infrastructure with encryption in transit and at rest. Every member gets a role, and owners control exactly which modules each person can access.',
  },
  {
    q: 'How does billing work?',
    a: 'Plans are monthly, priced in Philippine pesos, and include every module. Pay online or by bank transfer. Extra team members beyond your plan are just ₱150 per seat per month.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. There are no lock-ins. Cancel anytime and keep access through the end of your billing period.',
  },
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function CountUp({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(() => {
    if (typeof window === 'undefined') return to
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return reduced || !('IntersectionObserver' in window) ? to : 0
  })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return
    let raf
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const dur = 1200
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(Math.round(to * eased))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])
  return (
    <span ref={ref} className="stat-num">
      {prefix}
      {val}
      {suffix}
    </span>
  )
}

function App() {
  useReveal()
  return (
    <div className="site">
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">
            <span className="logo-dot" aria-hidden="true" />
            Synthematic
          </a>
          <nav className="nav-links" aria-label="Primary">
            <a href="#product">Product</a>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="btn btn-ghost" href={APP_URL}>
            Sign in
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-inner">
            <p className="eyebrow" data-reveal>
              The business operating platform
            </p>
            <h1 data-reveal style={{ transitionDelay: '80ms' }}>
              Run your entire business
              <br />
              from <span className="grad">one app</span>.
            </h1>
            <p className="hero-sub" data-reveal style={{ transitionDelay: '160ms' }}>
              Calendar, tasks, chat, time tracking, billing and documents — in one secure web app
              your team opens in any browser. No installs. No IT. No chaos.
            </p>
            <div className="hero-cta" data-reveal style={{ transitionDelay: '240ms' }}>
              <a className="btn btn-primary" href={APP_URL}>
                Get started →
              </a>
              <a className="btn btn-ghost" href="#features">
                See all features
              </a>
            </div>

            <div className="shot-wrap" data-reveal style={{ transitionDelay: '320ms' }}>
              <div className="shot">
                <header className="shot-topbar">
                  <span className="shot-brand">
                    <i aria-hidden="true" /> Synthematic
                  </span>
                  <span className="shot-user">
                    Maria Santos
                    <span className="shot-caret" aria-hidden="true" />
                  </span>
                </header>
                <main className="shot-page">
                  <div className="shot-page-head">
                    <div>
                      <span className="shot-label">Workspace</span>
                      <h1>Acme Builders</h1>
                    </div>
                    <span className="shot-pill accent">owner</span>
                  </div>
                  <nav className="shot-subnav">
                    <span className="active">Overview</span>
                    <span>Calendar</span>
                    <span>Tasks</span>
                    <span>Board</span>
                    <span>Chat</span>
                    <span>Time</span>
                    <span>Bills</span>
                    <span>Vault</span>
                    <span>Security</span>
                    <span>Members</span>
                    <span>Properties</span>
                    <span>CRM</span>
                  </nav>
                  <div className="shot-row space">
                    <h2>Acme Builders</h2>
                    <span className="shot-pill accent">owner</span>
                  </div>
                  <div className="shot-stats">
                    <div className="shot-stat">
                      <strong>3</strong>
                      <span>My open tasks</span>
                    </div>
                    <div className="shot-stat">
                      <strong>2</strong>
                      <span>Events next 7 days</span>
                    </div>
                    <div className="shot-stat">
                      <strong>8</strong>
                      <span>Activity (7 days)</span>
                    </div>
                    <div className="shot-stat">
                      <strong>6</strong>
                      <span>Members</span>
                    </div>
                  </div>
                  <div className="shot-grid2">
                    <section className="shot-card glow">
                      <div className="shot-row space">
                        <h2>Time clock</h2>
                        <span className="shot-link">Open →</span>
                      </div>
                      <div className="shot-clock">
                        <span className="shot-elapsed">02:41:07</span>
                        <span className="shot-muted">since 9:03 AM</span>
                      </div>
                      <button type="button" className="shot-btn danger full" tabIndex={-1}>
                        Clock out
                      </button>
                    </section>
                    <section className="shot-card">
                      <div className="shot-row space">
                        <h2>
                          My tasks <span className="shot-muted">3</span>
                        </h2>
                        <span className="shot-link">Open →</span>
                      </div>
                      <div className="shot-row space">
                        <span>Finalize site inspection report</span>
                        <span className="shot-pill danger">due Oct 18</span>
                      </div>
                      <div className="shot-row space">
                        <span>Order cement delivery — Phase 2</span>
                        <span className="shot-muted mono">Oct 24</span>
                      </div>
                      <div className="shot-row space">
                        <span>Review supplier invoices</span>
                        <span className="shot-muted mono">Oct 26</span>
                      </div>
                    </section>
                  </div>
                </main>
              </div>
              <p className="shot-caption">
                Sample workspace — the real Synthematic overview screen
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="stats" id="product">
          <div className="container stats-grid">
            <div className="stat" data-reveal>
              <CountUp to={11} />
              <p>modules in one platform</p>
            </div>
            <div className="stat" data-reveal style={{ transitionDelay: '80ms' }}>
              <CountUp to={1} />
              <p>login for everything</p>
            </div>
            <div className="stat" data-reveal style={{ transitionDelay: '160ms' }}>
              <CountUp to={0} />
              <p>installs required</p>
            </div>
            <div className="stat" data-reveal style={{ transitionDelay: '240ms' }}>
              <CountUp to={499} prefix="₱" />
              <p>per month, everything included</p>
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="section">
          <div className="container why-grid">
            <div data-reveal>
              <h2>
                Why pay for <span className="grad">five separate tools</span>?
              </h2>
              <p className="section-sub">
                Project management here, chat there, time tracking somewhere else, invoices in
                another tab. Five bills, five logins, and work lost between them.
              </p>
              <p className="section-sub">
                Synthematic replaces the whole stack with one platform your entire team actually
                uses — every module included on every plan.
              </p>
              <a className="btn btn-primary" href={APP_URL}>
                Replace your stack →
              </a>
            </div>
            <div className="cost-card" data-reveal style={{ transitionDelay: '120ms' }}>
              <h3>The typical stack</h3>
              <ul className="cost-list">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <span>{c}</span>
                    <span className="strike">separate subscription</span>
                  </li>
                ))}
                <li className="cost-total">
                  <span>What you manage today</span>
                  <span className="strike">5 apps, 5 bills</span>
                </li>
              </ul>
              <div className="cost-vs">
                <div>
                  <span className="cost-plan">Synthematic Micro — every module included</span>
                  <strong>₱499/mo</strong>
                </div>
                <span className="save-pill">11-in-1 platform</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section" id="features">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">Everything included</p>
              <h2>Eleven tools. One login.</h2>
              <p className="section-sub">
                Every plan includes every feature. No modules to unlock, no per-seat surprises.
              </p>
            </div>
            <div className="features-grid">
              {FEATURES.map((f, i) => (
                <div
                  className="feature"
                  key={f.name}
                  data-reveal
                  style={{ transitionDelay: `${(i % 5) * 60}ms` }}
                >
                  <span className="feature-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3>{f.name}</h3>
                  <p>{f.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">How it works</p>
              <h2>Live in three steps.</h2>
            </div>
            <div className="steps">
              {[
                ['01', 'Create your workspace', 'Sign up in under two minutes and pick your plan.'],
                ['02', 'Invite your team', 'Send invites by email. Set each member\'s role and modules.'],
                ['03', 'Get to work', 'Plan, chat, track and bill — everything in one place, from day one.'],
              ].map(([n, title, copy], i) => (
                <div className="step" key={n} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="step-num">{n}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="section security">
          <div className="container security-inner" data-reveal>
            <div>
              <p className="eyebrow">Security first</p>
              <h2>Your business stays yours.</h2>
              <p className="section-sub">
                Built on Google&apos;s Firebase platform — the same infrastructure trusted by
                teams worldwide. Security isn&apos;t an add-on; it&apos;s the foundation.
              </p>
            </div>
            <ul className="security-list">
              <li>
                <span className="ok">✓</span> Encrypted in transit and at rest
              </li>
              <li>
                <span className="ok">✓</span> Role-based access for every member
              </li>
              <li>
                <span className="ok">✓</span> Per-module permissions you control
              </li>
              <li>
                <span className="ok">✓</span> Runs in your browser — nothing to install or update
              </li>
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="section" id="pricing">
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">Pricing</p>
              <h2>Simple, honest pricing.</h2>
              <p className="section-sub">
                Monthly plans in Philippine pesos. Every module included on every plan. Extra seats
                just ₱150/month.
              </p>
            </div>
            <div className="pricing-grid">
              {PLANS.map((p, i) => (
                <div
                  key={p.name}
                  className={`plan${p.popular ? ' popular' : ''}`}
                  data-reveal
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {p.popular && <span className="plan-badge">Most popular</span>}
                  <h3>{p.name}</h3>
                  <p className="plan-tag">{p.tagline}</p>
                  <p className="plan-price">
                    {p.price}
                    <span>/mo</span>
                  </p>
                  <p className="plan-seats">{p.seats}</p>
                  <a
                    className={`btn ${p.popular ? 'btn-primary' : 'btn-ghost'} btn-block`}
                    href={APP_URL}
                  >
                    Get started
                  </a>
                  <ul className="plan-list">
                    <li>✓ Every feature included</li>
                    <li>✓ All modules unlocked</li>
                    <li>✓ Cancel anytime</li>
                  </ul>
                </div>
              ))}
            </div>
            <p className="pricing-note" data-reveal>
              Teams of 51+? Custom plans available on request.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container narrow">
            <div className="section-head" data-reveal>
              <p className="eyebrow">FAQ</p>
              <h2>Questions, answered.</h2>
            </div>
            <div className="faq" data-reveal>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section final-cta">
          <div className="container final-inner" data-reveal>
            <h2>
              One app for your <span className="grad">whole business</span>.
            </h2>
            <p className="section-sub">
              Join small businesses that run everything in Synthematic.
            </p>
            <a className="btn btn-primary btn-lg" href={APP_URL}>
              Get started today →
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span className="logo small">
            <span className="logo-dot" aria-hidden="true" />
            Synthematic
          </span>
          <p>The all-in-one business platform for small teams.</p>
          <p className="muted">© 2026 Synthematic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
