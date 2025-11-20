function Features() {
  const items = [
    {
      title: 'Contextual Memory',
      desc: 'Maintains multi-turn context with session tracking for continuity.',
    },
    {
      title: 'RAG-Ready',
      desc: 'Ingest documents and ground answers with your own knowledge base.',
    },
    {
      title: 'Multimodal',
      desc: 'Built to extend with voice and vision for natural interactions.',
    },
    {
      title: 'Personalization',
      desc: 'Adapts tone and responses to preferences and sentiment.',
    },
  ]

  return (
    <section className="py-14">
      <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2">
        {items.map((f) => (
          <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow p-6">
            <h3 className="text-white font-semibold text-lg">{f.title}</h3>
            <p className="text-violet-100/80 text-sm mt-2">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
