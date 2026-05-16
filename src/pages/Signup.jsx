import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import store from '../store'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await store.registerUser(name, email, password)
      await store.loginUser(email, password)
      navigate('/account')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen pt-36 pb-20 bg-swa-gray/30 px-4">
      <div className="max-w-md mx-auto p-8 bg-white border border-gray-200 shadow-sm animate-fade">
        <h2 className="text-3xl font-display uppercase tracking-widest text-center mb-8 text-swa-dark">Create Account</h2>
        {error && <div className="bg-swa-gray border border-swa-dark text-swa-dark font-bold px-4 py-3 text-[10px] tracking-widest uppercase mb-6 text-center">{error}</div>}
      <form onSubmit={handleSignup} className="flex flex-col gap-5">
        <div>
          <label className="block text-[9px] uppercase tracking-[.2em] text-swa-dark font-bold mb-2">Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full border border-gray-300 px-4 py-3.5 text-[11px] font-bold tracking-widest uppercase font-body text-swa-dark outline-none focus:border-swa-dark transition-colors placeholder:text-gray/50"
            required 
          />
        </div>
        <div>
          <label className="block text-[9px] uppercase tracking-[.2em] text-swa-dark font-bold mb-2">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full border border-gray-300 px-4 py-3.5 text-[11px] font-bold tracking-widest uppercase font-body text-swa-dark outline-none focus:border-swa-dark transition-colors placeholder:text-gray/50"
            required 
          />
        </div>
        <div>
          <label className="block text-[9px] uppercase tracking-[.2em] text-swa-dark font-bold mb-2">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full border border-gray-300 px-4 py-3.5 text-[11px] font-bold tracking-widest uppercase font-body text-swa-dark outline-none focus:border-swa-dark transition-colors placeholder:text-gray/50"
            required 
          />
        </div>
        <button type="submit" className="w-full mt-2 bg-swa-dark text-white py-4 flex items-center justify-center text-[10px] font-bold uppercase tracking-[.2em] hover:bg-black transition-colors">
          Sign Up
        </button>
      </form>
      <div className="mt-8 text-center text-[11px] tracking-widest uppercase text-gray">
        <span>Already have an account? </span>
        <Link to="/login" className="text-swa-dark font-bold underline hover:opacity-70 ml-1">Login</Link>
      </div>
    </div>
    </div>
  )
}
