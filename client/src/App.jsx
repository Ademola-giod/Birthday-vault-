import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Lock, PartyPopper, Heart, RefreshCw, ShieldCheck, PlusCircle, X } from 'lucide-react';
import { getFriendMessage, addFriend } from './services/api';

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  // Admin Form State
  const [formData, setFormData] = useState({ 
    name: '', 
    nicknames: '', 
    message: '', 
    whatTheyveBeenUpTo: '' 
  });

  // State initialization from Session Storage
  const [friend, setFriend] = useState(() => {
    const saved = sessionStorage.getItem('unlockedFriend');
    return saved ? JSON.parse(saved) : null;
  });

  // Secret Admin Trigger: Click title 5 times
  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 5) {
      setAdminMode(true);
      setClickCount(0);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      const data = await getFriendMessage(name.trim().toLowerCase());
      setFriend(data);
      sessionStorage.setItem('unlockedFriend', JSON.stringify(data));
      if (data.name !== "Friend") {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err) {
      alert("Vault Access Error. Ensure backend is running.");
    } finally { setLoading(false); }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        nicknames: formData.nicknames.split(',').map(n => n.trim().toLowerCase())
      };
      await addFriend(payload);
      alert("Success! Entry added to the Vault.");
      setFormData({ name: '', nicknames: '', message: '', whatTheyveBeenUpTo: '' });
      setAdminMode(false);
    } catch (err) {
      alert("Failed to save to database.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <div className="max-w-md w-full">
        
        {/* HEADER - Clickable for Admin Mode */}
        <div className="text-center mb-12 select-none" onClick={handleTitleClick}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-full mb-6 border border-blue-500/20">
            <Lock className="text-blue-500" size={28} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2 cursor-pointer active:scale-95 transition-transform">
            THE BIRTHDAY VAULT 🎉<span className="text-blue-600">.</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <ShieldCheck size={14} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Identity Verification Required</p>
          </div>
        </div>

        {/* ADMIN MODAL OVERLAY */}
        {adminMode && (
          <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-blue-500/30 w-full max-w-sm p-8 rounded-3xl shadow-2xl space-y-4 relative">
              <button onClick={() => setAdminMode(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white">
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold flex items-center gap-2"><PlusCircle className="text-blue-500" /> Admin Access</h2>
              <input 
                placeholder="Real Name" 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-blue-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                placeholder="Nicknames (comma separated)" 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-blue-500 outline-none"
                value={formData.nicknames}
                onChange={e => setFormData({...formData, nicknames: e.target.value})}
              />
              <textarea 
                placeholder="Birthday Message" 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-blue-500 outline-none h-24"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
              <textarea 
                placeholder="What they've been up to" 
                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl focus:border-blue-500 outline-none h-20"
                value={formData.whatTheyveBeenUpTo}
                onChange={e => setFormData({...formData, whatTheyveBeenUpTo: e.target.value})}
              />
              <button 
                onClick={handleAdminSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all disabled:bg-slate-800"
              >
                {loading ? "Encrypting..." : "Save to Vault"}
              </button>
            </div>
          </div>
        )}

        {/* MAIN VIEW LOGIC */}
        {!friend ? (
          <form onSubmit={handleSearch} className="space-y-4 animate-in fade-in zoom-in duration-1000">
            <input
              type="text"
              placeholder="Enter your name..."
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-5 px-6 text-xl text-center focus:outline-none focus:border-blue-600 transition-all text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoFocus
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]"
            >
              {loading ? <RefreshCw className="animate-spin" /> : "Access Data"}
            </button>
          </form>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl animate-in slide-in-from-top-12 duration-1000">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600/10 p-5 rounded-full border border-blue-500/10">
                {friend.name === "Friend" ? <Heart className="text-blue-500" size={32} /> : <PartyPopper className="text-blue-400" size={32} />}
              </div>
            </div>
            
            <div className="space-y-6 text-center">
              <h2 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em]">
                {friend.name === "Friend" ? "Guest Access" : "Classified Message"}
              </h2>
              <p className="text-white text-2xl font-medium leading-tight italic px-2">"{friend.message}"</p>
              <div className="pt-8 border-t border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-3">Status Update</span>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[280px] mx-auto italic">{friend.whatTheyveBeenUpTo}</p>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-slate-800/50 text-center">
               <p className="text-slate-600 text-[9px] uppercase tracking-[0.3em] font-bold">Session Locked • End of File</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;