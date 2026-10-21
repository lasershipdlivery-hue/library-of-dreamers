'use client'
import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import Link from 'next/link'

function DreamContent() {
  const [dream, setDream] = useState<any>(null)
  const params = useParams()
  const supabase = createClient()

  useEffect(() => { 
    if (params.id) fetchDream() 
  }, [params.id])

  async function fetchDream() {
    const { data } = await supabase.from('dreams').select('*').eq('id', params.id).single()
    if (data) setDream(data)
  }

  if (!dream) return <div className="p-10 text-center">Loading dream...</div>

  return (
    <div className="min-h-screen bg-[#FFFEF7] text-[#0A1931] p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm font-bold border px-4 py-2 rounded-full">← Back to Library</Link>
        <div className="bg-white mt-8 p-8 rounded-2xl border">
          <div className="flex gap-2 mb-4">
            <span className="text-xs px-3 py-1 border rounded-full font-bold">{dream.category}</span>
            <span className="text-xs px-3 py-1 bg-green-50 border rounded-full">🌍 Public</span>
          </div>
          <h1 className="text-4xl font-black">{dream.title}</h1>
          <p className="mt-2 font-bold">By {dream.dreamer_name} • {new Date(dream.created_at).toLocaleDateString()}</p>
          <p className="mt-6 text-lg leading-relaxed whitespace-pre-wrap">{dream.story}</p>
          
          <div className="mt-8 p-6 bg-[#0A1931] text-white rounded-xl">
            <p className="text-sm opacity-70">Funding Goal</p>
            <p className="text-3xl font-black">₦{dream.funding_goal?.toLocaleString() || 0}</p>
            <button onClick={()=>alert('Paystack coming next! Contact: ' + dream.dreamer_name)} className="mt-4 w-full bg-white text-[#0A1931] py-3 rounded-full font-black">
              Fund This Dream 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DreamDetail() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <DreamContent />
    </Suspense>
  )
}