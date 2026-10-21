'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) alert(error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="w-96 p-8 border border-zinc-800 rounded-2xl space-y-4">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-3 rounded bg-zinc-900 border border-zinc-800" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button disabled={loading} className="w-full p-3 bg-white text-black rounded font-bold">{loading ? '...' : 'Login'}</button>
        <p className="text-sm text-zinc-400">No account? <a href="/register" className="underline">Register</a></p>
      </form>
    </div>
  )
}