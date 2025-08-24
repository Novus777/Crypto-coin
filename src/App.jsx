import React from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ArrowRight, Twitter, Globe, Wallet, Shield, Zap, ExternalLink, AlertCircle } from 'lucide-react'

// === QUICK SETUP ===
// Minimal Apple-style page (no external logo file).
// Set your token mint below. (Live chart removed by request.)
// Build: npm run build  •  Publish dir: dist

const CONTRACT_ADDRESS = 'BFK9uJLDLZThxgQkWVMFWdHW77WzzbgbmZL2dmtXVVrm'
const SOLSCAN_MINT_URL = `https://solscan.io/token/${CONTRACT_ADDRESS}`

const jupSwapUrl = (mint) =>
  `https://jup.ag/swap/SOL-${mint}?inputMint=So11111111111111111111111111111111111111112&outputMint=${mint}&theme=dark`

// ---- Robust clipboard helper (handles blocked Clipboard API) ----
async function safeCopy(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch (_) {}
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '-1000px'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch (_) {}
  try { window.prompt('Copy to clipboard:', text) } catch (_) {}
  return false
}

export default function VaultCoinHome() {
  return (
    <div className='min-h-screen scroll-smooth bg-neutral-950 text-neutral-100'>
      <BackgroundDecor />
      <Navbar />
      <main className='relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <Hero />
        <SectionDivider />
        <FeatureStrip />
        <SectionDivider subtle />
        <QuickActions />
        <HowToBuy />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`${scrolled ? 'border-white/15 bg-neutral-950/80 shadow-[0_4px_24px_rgba(0,0,0,0.25)]' : 'border-white/10 bg-neutral-950/70'} sticky top-0 z-20 border-b backdrop-blur`}>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        <a href='/' className='font-semibold tracking-wide'>Vault Coin</a>
        <div className='flex items-center gap-2'>
          <a
            href={SOLSCAN_MINT_URL}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10'
          >
            <ExternalLink className='h-4 w-4'/> Solscan
          </a>
          <a
            href={jupSwapUrl(CONTRACT_ADDRESS)}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20'
          >
            <Wallet className='h-4 w-4'/> Swap
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className='relative overflow-hidden py-20 sm:py-28'>
      {/* subtle orb behind content */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10'>
        <div className='absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-yellow-400/15 via-amber-300/10 to-transparent blur-3xl' />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='mx-auto max-w-3xl text-center'
      >
        <h1 className='text-balance text-5xl font-extrabold tracking-tight sm:text-6xl'>
          <span className='bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent'>
            $VAULT on Solana
          </span>
        </h1>
        <p className='mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/80'>
          Minimal, fast, effortless. Instant swaps, tiny fees, and live market data—designed with a sleek, Apple-like feel.
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
          <a
            href={jupSwapUrl(CONTRACT_ADDRESS)}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 font-semibold text-neutral-900 shadow hover:bg-yellow-300'
          >
            Swap on Jupiter <ArrowRight className='h-4 w-4' />
          </a>
          <ContractPill />
        </div>
        <div className='mt-6 flex items-center justify-center gap-5 text-sm text-white/60'>
          <div className='rounded-full border border-white/15 px-3 py-1'>Zero clutter</div>
          <div className='rounded-full border border-white/15 px-3 py-1'>Fast finality</div>
          <div className='rounded-full border border-white/15 px-3 py-1'>Community-first</div>
        </div>
      </motion.div>
    </section>
  )
}

function SectionDivider({ subtle = false }) {
  return (
    <div className={`mx-auto my-8 h-px max-w-6xl ${subtle ? 'bg-white/5' : 'bg-white/10'}`} />
  )
}

function FeatureStrip() {
  const items = [
    { icon: <Zap className='h-4 w-4'/>, label: 'Ultra-fast finality' },
    { icon: <Shield className='h-4 w-4'/>, label: 'Fair-launch ethos' },
  ]
  return (
    <div className='mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2'>
      {items.map((it) => (
        <div key={it.label} className='flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80'>
          {it.icon}
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  )
}

function QuickActions() {
  return (
    <section id='buy' className='mx-auto mt-12 max-w-4xl rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-yellow-400/10 to-transparent p-6'>
      <div className='grid gap-4 sm:grid-cols-3'>
        <Card title='Ticker' value='$VAULT' />
        <Card title='Chain' value='Solana' />
        <Card title='Supply' value='1,000,000,000' />
      </div>
      <div className='mt-5 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <div className='text-xs uppercase tracking-wider text-white/60'>Contract Address</div>
          <ContractPill large />
        </div>
        <div className='flex items-center gap-2'>
          <a
            href={jupSwapUrl(CONTRACT_ADDRESS)}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-yellow-300'
          >
            Swap on Jupiter
          </a>
          <a
            href={SOLSCAN_MINT_URL}
            target='_blank'
            rel='noreferrer'
            className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10'
          >
            View on Solscan <ExternalLink className='h-4 w-4'/>
          </a>
        </div>
      </div>
    </section>
  )
}

function HowToBuy() {
  return (
    <section className='py-10'>
      <h2 className='mb-4 text-center text-2xl font-bold'>How to Buy (1–2 minutes)</h2>
      <div className='mx-auto grid max-w-4xl gap-4 md:grid-cols-3'>
        <Step href='https://phantom.app' title='Install Phantom' desc='Create a Solana wallet.' />
        <Step href='https://www.coinbase.com/' title='Fund with SOL' desc='Buy or transfer SOL.' />
        <Step href={jupSwapUrl(CONTRACT_ADDRESS)} title='Swap for $VAULT' desc='Swap on Jupiter (opens new tab).' />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className='border-t border-white/10 bg-neutral-950/60 py-10'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4'>
        <div className='text-sm text-white/60'>© {new Date().getFullYear()} Vault. All rights reserved.</div>
        <div className='flex items-center gap-2'>
          <IconLink href='https://twitter.com/' label='Twitter'><Twitter className='h-4 w-4'/></IconLink>
          <IconLink href='#' label='Website'><Globe className='h-4 w-4'/></IconLink>
        </div>
      </div>
    </footer>
  )
}

// ========== Reusable Bits ==========

function Card({ title, value }) {
  return (
    <div className='rounded-xl border border-white/10 bg-white/5 p-4 text-center'>
      <div className='text-xs uppercase tracking-wider text-white/60'>{title}</div>
      <div className='mt-1 text-2xl font-semibold'>{value}</div>
    </div>
  )
}

function Step({ href, title, desc }) {
  return (
    <a href={href} target='_blank' rel='noreferrer' className='group rounded-xl border border-white/10 bg-white/5 p-5 text-center hover:bg-white/10'>
      <div className='text-base font-semibold'>{title}</div>
      <div className='mt-1 text-sm text-white/70'>{desc}</div>
    </a>
  )
}

function IconLink({ href, label, children }) {
  return (
    <a href={href} target='_blank' rel='noreferrer' aria-label={label} className='inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10'>
      {children}
    </a>
  )
}

function ContractPill({ large = false }) {
  const [status, setStatus] = React.useState('idle') // 'idle' | 'copied' | 'failed'
  const short = `${CONTRACT_ADDRESS.slice(0, 6)}…${CONTRACT_ADDRESS.slice(-6)}`

  async function handleCopy() {
    const ok = await safeCopy(CONTRACT_ADDRESS)
    setStatus(ok ? 'copied' : 'failed')
    setTimeout(() => setStatus('idle'), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 ${large ? 'text-base' : 'text-sm'} ${status === 'failed' ? 'bg-red-500/10 text-red-300' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
      aria-live='polite'
      data-testid='contract-copy'
    >
      {status === 'copied' ? <Check className='h-4 w-4'/> : status === 'failed' ? <AlertCircle className='h-4 w-4'/> : <Copy className='h-4 w-4'/>}
      <span className='font-mono'>{short}</span>
      <span className='sr-only'>{status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy address'}</span>
    </button>
  )
}

function BackgroundDecor() {
  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10'>
      <div className='absolute left-1/2 top-[-10%] h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-yellow-400/15 to-transparent blur-3xl' />
      <div className='absolute bottom-[-20%] right-[-10%] h-[50vh] w-[60vw] rounded-full bg-gradient-to-b from-amber-300/10 to-transparent blur-3xl' />
    </div>
  )
}
