import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-violet-200 bg-clip-text text-transparent drop-shadow-lg">
          Phoenix – Your AI Assistant
        </h1>
        <p className="mt-4 max-w-2xl text-violet-100/80 text-sm md:text-base">
          A modern, multimodal, proactive assistant with memory, personalization, and a calming aura.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#09090b]" />
    </section>
  )
}

export default Hero
