export default function Home() {
  return (
    <main className="min-h-screen">
      {/* NAV */}
      <nav className="flex justify-between items-center px-8 py-6 border-b">
        <h1 className="text-2xl font-black tracking-tighter">LIBRARY OF DREAMERS</h1>
        <div className="flex gap-4">
          <a href="/dreams" className="px-4 py-2">Explore Dreams</a>
          <a href="/login" className="px-6 py-2 bg-[#0A1931] text-white rounded-full">Write Your Dream</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-8 py-24 text-center max-w-5xl mx-auto">
        <p className="text-[#D4AF37] tracking-[0.3em] text-sm mb-4">EST. 2026 • ABUJA, NIGERIA</p>
        <h2 className="text-7xl font-serif leading-[0.9] mb-6">
          Every Dream<br/>
          <span className="italic font-light">Deserves a</span><br/>
          Library.
        </h2>
        <p className="text-xl opacity-70 max-w-2xl mx-auto mb-10">
          A home for Nigerian dreamers to write, publish, and get supported. No likes. No algorithm. Just stories that matter.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/dreams" className="px-8 py-4 bg-[#0A1931] text-white rounded-full text-lg">Enter The Library →</a>
          <a href="/submit" className="px-8 py-4 border border-[#0A1931] rounded-full text-lg">Submit a Dream</a>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-3 border-y text-center">
        <div className="py-12 border-r">
          <p className="text-5xl font-serif">1,200+</p>
          <p className="opacity-60">Dreams Published</p>
        </div>
        <div className="py-12 border-r">
          <p className="text-5xl font-serif">₦4.2M</p>
          <p className="opacity-60">Supporter Contributions</p>
        </div>
        <div className="py-12">
          <p className="text-5xl font-serif">All 36</p>
          <p className="opacity-60">States Represented</p>
        </div>
      </section>
    </main>
  )
}