'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Tech')
  const [story, setStory] = useState('')
  const [dreamerName, setDreamerName] = useState('charly')
  const [fundingGoal, setFundingGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [myDreams, setMyDreams] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => { fetchMyDreams() }, [])

  async function fetchMyDreams() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }
    const { data } = await supabase.from('dreams').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) setMyDreams(data)
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    
    const { error } = await supabase.from('dreams').insert({
      user_id: user?.id,
      title,
      category,
      story,
      dreamer_name: dreamerName,
      funding_goal: parseInt(fundingGoal) || 0,
      is_public: isPublic,
      status: 'pending'
    })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert(isPublic ? 'Dream submitted & PUBLIC! 🎉' : 'Dream saved as PRIVATE 🔒')
      setTitle(''); setStory(''); setFundingGoal(''); setIsPublic(false)
      fetchMyDreams()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FFFEF7] p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl border">
          <h2 className="text-2xl font-black mb-4">Share Your Dream</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Dream title e.g. website" className="w-full border p-3 rounded-lg" required />
            <div className="flex gap-2">
              <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-3 rounded-lg flex-1">
                <option>Tech</option><option>Education</option><option>Business</option><option>Health</option><option>Art</option><option>Agriculture</option>
              </select>
              <input value={dreamerName} onChange={e=>setDreamerName(e.target.value)} placeholder="Your name" className="border p-3 rounded-lg flex-1" />
            </div>
            <input value={fundingGoal} onChange={e=>setFundingGoal(e.target.value)} placeholder="Funding goal e.g. 50000" type="number" className="w-full border p-3 rounded-lg" />
            <textarea value={story} onChange={e=>setStory(e.target.value)} placeholder="build a coffee website..." className="w-full border p-3 rounded-lg h-32" required />

            {/* THIS IS THE NEW PUBLIC/PRIVATE SWITCH */}
            <label className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg border cursor-pointer">
              <input type="checkbox" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)} className="w-5 h-5" />
              <span className="text-sm font-bold">{isPublic ? '🌍 Public - Everyone can see' : '🔒 Private - Only you can see'}</span>
            </label>

            <button disabled={loading} className="w-full bg-[#0A1931] text-white p-3 rounded-lg font-black">
              {loading ? 'Submitting...' : 'Submit Dream'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="font-black text-xl mb-4">My Dreams ({myDreams.length})</h3>
          <div className="space-y-3">
            {myDreams.map(d=>(
              <div key={d.id} className="bg-white p-4 rounded-xl border">
                <div className="flex justify-between">
                  <span className="font-bold">{d.title} - {d.category}</span>
                  <span className="text-xs">{d.is_public ? '🌍 Public' : '🔒 Private'}</span>
                </div>
                <p className="text-sm text-zinc-600 mt-1">{d.story}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}