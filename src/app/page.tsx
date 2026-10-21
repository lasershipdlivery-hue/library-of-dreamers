'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

type Dream = {
  id: string
  title: string
  category: string
  story: string
  dreamer_name: string
  funding_goal: number
  is_public: boolean
  created_at: string
}

export default function Home() {
  const [dreams, setDreams] = useState<Dream[]>([])
  const [filter, setFilter] = useState('All')
  const supabase = createClient()

  useEffect(() => { fetchDreams() }, [])
  async function fetchDreams() {
    const { data } = await supabase.from('dreams').select('*').eq('is_public', true).order('created_at', { ascending: false })
    if (data) setDreams(data)
  }

  const categories = ['All', 'Education', 'Business', 'Health', 'Tech', 'Art', 'Agriculture']
  const filtered = filter === 'All' ? dreams : dreams.filter(d => d.category === filter)

  return (
    <div className="min-h-screen bg-[#FFFEF7] text-[#0A1931]">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto border-b">
        <h1 className="text-2xl font-black">LIBRARY OF DREAMERS</h1>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 border rounded-full font-bold text-sm">Login</Link>
          <Link href="/register" className="px-5 py-2 bg-[#0A1931] text-white rounded-full font-bold text-sm">Share Dream</Link>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="text-5xl font-black leading-tight">Every Dream <br/> Deserves a Shelf</h2>
        <p className="text-zinc-600 mt-4">Click any dream to read & fund. Owners control privacy.</p>
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={()=>setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-bold border ${filter===cat ? 'bg-[#0A1931] text-white' : 'bg-white'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6">
        {filtered.map(dream => (
          <Link key={dream.id} href={`/dream/${dream.id}`} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-lg transition block">
            <div className="flex justify-between mb-3">
              <span className="text-xs px-3 py-1 bg-[#FFFEF7] border rounded-full font-bold">{dream.category}</span>
              <span className="text-xs">🌍 Public</span>
            </div>
            <h3 className="font-bold text-lg">{dream.title}</h3>
            <p className="text-sm text-zinc-600 mt-2 line-clamp-3">{dream.story}</p>
            <div className="mt-4 pt-4 border-t flex justify-between">
              <span className="text-sm font-bold">By {dream.dreamer_name}</span>
              {dream.funding_goal > 0 && <span className="text-sm font-black text-green-600">₦{dream.funding_goal.toLocaleString()}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}