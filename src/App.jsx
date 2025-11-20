import Hero from './components/Hero'
import Features from './components/Features'
import Chat from './components/Chat'

function App() {
  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="text-lg font-semibold tracking-tight">Phoenix</div>
        <a href="/test" className="text-sm text-violet-200 hover:text-white">Check backend</a>
      </header>
      <Hero />
      <main className="px-6 max-w-6xl mx-auto">
        <Features />
        <Chat />
      </main>
      <footer className="mt-16 py-10 text-center text-xs text-violet-100/60">© Phoenix Assistant – Demo</footer>
    </div>
  )
}

export default App
