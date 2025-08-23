import React from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, ArrowRight, Twitter, Globe, Wallet } from 'lucide-react'

// === QUICK SETUP ===
// 1) Replace CONTRACT_ADDRESS with your final value.
// 2) Deploy on Netlify/Vercel.

const CONTRACT_ADDRESS = 'So1anaAddr3ssGoesHereReplaceMexxxxxxxxxxxxxxxxxxxx' // placeholder

export default function VaultCoinHome() {
  return (
    <div className='min-h-screen bg-neutral-950 text-neutral-100'>
      <BackgroundDecor />
      <Navbar />
      <main className='relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
        <Hero />
        <QuickActions />
        <HowToBuy />
      </main>
      <Footer />
    </div>
  )
}

function Navbar() {
  return (
    <header className='sticky top-0 z-20 border-b border-white/10 bg-neutral-950/70 backdrop-blur'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-4 py-3'>
        <span className='text-lg font-semibold tracking-wide'>Vault Coin</span>
        <a href='#buy' className='inline-flex items-center gap-2 rounded-2xl border border-yellow-500/30 bg-yellow-400/10 px-3 py-2 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20'>
          <Wallet className='h-4 w-4'/> Buy $VAULT
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className='relative py-16 sm:py-20'>
      <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className='text-center'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          $VAULT — The Token of <span className='bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-300 bg-clip-text text-transparent'>Vault</span>
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-white/80'>
          Launching on <span className='font-semibold'>Solana</span>. Low fees, fast finality, clean brand. Built for the AI-trading era.
        </p>
        <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
          <a href='#buy' className='inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-5 py-3 font-semibold text-neutral-900 shadow hover:bg-yellow-300'>
            Buy on DEX <ArrowRight className='h-4 w-4'/>
          </a>
          <ContractPill />
        </div>
      </motion.div>
    </section>
  )
}

function QuickActions() {
  return (
    <section id='buy' className='mx-auto mt-8 max-w-3xl rounded-3xl border border-yellow-400/20 bg-gradient-to-b from-yellow-400/10 to-transparent p-6'>
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
        <a href='#' className='inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-4 py-2.5 font-semibold text-neutral-900 hover:bg-yellow-300'>
          Open DEX (soon)
        </a>
      </div>
    </section>
  )
}

function HowToBuy() {
  return (
    <section className='py-14'>
      <h2 className='mb-4 text-center text-2xl font-bold'>How to Buy (1-2 minutes)</h2>
      <div className='mx-auto grid max-w-3xl gap-4 md:grid-cols-3'>
        <Step href='https://phantom.app' title='Install Phantom' desc='Create a Solana wallet.' />
        <Step href='https://www.coinbase.com/' title='Fund with SOL' desc='Buy or transfer SOL.' />
        <Step href='#' title='Swap for $VAULT' desc='Use any supported DEX when live.' />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className='border-t border-white/10 bg-neutral-950/60 py-10'>
      <div className='mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4'>
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
    <div className='rounded-2xl border border-white/10 bg-white/5 p-4 text-center'>
      <div className='text-xs uppercase tracking-wider text-white/60'>{title}</div>
      <div className='mt-1 text-2xl font-semibold'>{value}</div>
    </div>
  )
}

function Step({ href, title, desc }) {
  return (
    <a href={href} target='_blank' rel='noreferrer' className='group rounded-2xl border border-white/10 bg-white/5 p-5 text-center hover:bg-white/10'>
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
  const [copied, setCopied] = React.useState(false)
  const short = `${CONTRACT_ADDRESS.slice(0, 6)}…${CONTRACT_ADDRESS.slice(-6)}`
  const copy = async () => {
    await navigator.clipboard.writeText(CONTRACT_ADDRESS)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10 ${large ? 'text-base' : 'text-sm'}`}
    >
      {copied ? <Check className='h-4 w-4'/> : <Copy className='h-4 w-4'/>}
      <span className='font-mono'>{short}</span>
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
