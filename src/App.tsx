import './App.css'

function App() {
  return (
    <main className="min-h-screen px-4 py-12 bg-slate-950 text-slate-100">
      <section className="w-full max-w-3xl p-8 mx-auto border shadow-2xl rounded-2xl border-slate-800 bg-slate-900/70 shadow-slate-950/40 backdrop-blur">
        <p className="badge">Tailwind is configured</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Btareeqak Frontend
        </h1>
        <p className="max-w-2xl mt-4 text-base leading-7 text-slate-300">
          This page is styled with Tailwind utility classes and @apply-based
          component styles, confirming your Tailwind installation is active.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <span className="chip">Vite</span>
          <span className="chip">React</span>
          <span className="chip">TypeScript</span>
          <span className="chip">Tailwind CSS v4</span>
        </div>
      </section>
    </main>
  )
}

export default App
