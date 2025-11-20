import { useEffect, useRef, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Chat() {
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    // Create a session on mount
    const createSession = async () => {
      try {
        const r = await fetch(`${BASE_URL}/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: 'Phoenix Session' })
        })
        const data = await r.json()
        setSessionId(data.id)
      } catch (e) {
        console.error(e)
      }
    }
    createSession()
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return
    const text = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)
    try {
      const r = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text })
      })
      const data = await r.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.assistant_reply }
      ])
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'There was an error reaching the assistant.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <section className="relative z-10 -mt-16">
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl overflow-hidden">
        <div ref={listRef} className="h-[46vh] md:h-[50vh] overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-center text-sm text-violet-100/70">
              Say hello to Phoenix and ask anything. It remembers the session.
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${m.role === 'user' ? 'bg-violet-500 text-white' : 'bg-white/80 backdrop-blur text-slate-800'} px-4 py-2 rounded-2xl max-w-[80%] shadow`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="text-left text-xs text-violet-100/80">Thinking…</div>
          )}
        </div>
        <div className="border-t border-white/10 p-3 flex items-end gap-2 bg-gradient-to-br from-white/10 to-white/5">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message…"
            className="flex-1 resize-none rounded-xl bg-white/80 text-slate-900 placeholder-slate-500 p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 min-h-[44px] max-h-[120px]"
          />
          <button onClick={sendMessage} disabled={!sessionId || loading}
            className="shrink-0 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium disabled:opacity-50">
            Send
          </button>
        </div>
      </div>
      <div className="mt-4 text-center text-xs text-violet-100/60">Demo only – LLM response is stubbed in backend.</div>
    </section>
  )
}

export default Chat
