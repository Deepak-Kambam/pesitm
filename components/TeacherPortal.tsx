
import React, { useState } from 'react';

interface TeacherPortalProps {
  onExit: () => void;
}

const TeacherPortal: React.FC<TeacherPortalProps> = ({ onExit }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'notices' | 'attendance' | 'marks'>('notices');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="glass max-w-sm w-full p-8 rounded-[1.5rem] border border-white/10">
          <div className="text-center mb-8">
            <div className="w-full h-16 mb-4 mx-auto flex items-center justify-center overflow-hidden">
              <img src="logo.png" alt="PESITM Logo" className="h-full w-auto object-contain" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Faculty Authentication</h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Administrative Access Only</p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Staff ID</label>
              <input
                type="text" required
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                placeholder="PES-STAFF-XXX"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Secure Key</label>
              <input
                type="password" required
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium text-sm"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-white text-black py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all">
              Initialize Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/5 flex flex-col p-6 glass">
        <div className="flex items-center space-x-3 mb-8">
          <div className="h-8 w-auto flex items-center justify-center overflow-hidden">
            <img src="logo.png" alt="Logo" className="h-full w-auto object-contain" />
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {[
            { id: 'notices', label: 'Broadcasts' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'marks', label: 'Marks Management' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-5 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-black' : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
              {activeTab === 'notices' && 'Notice Management'}
              {activeTab === 'attendance' && 'Student Tracker'}
              {activeTab === 'marks' && 'Performance Entry'}
            </h1>
            <p className="text-zinc-500 text-xs mt-1 font-medium">System Role: HOD / Senior Faculty</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-white font-bold text-[10px]">Dr. Aris Thorne</p>
              <p className="text-zinc-600 text-[9px] uppercase font-bold tracking-widest">Dept of CSE</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 overflow-hidden">
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-white font-black text-xs">AT</div>
            </div>
          </div>
        </header>

        {activeTab === 'notices' && (
          <div className="glass p-8 rounded-[2rem] border border-white/5 max-w-2xl">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.4em] mb-6">Post New Notice</h3>
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Subject Title</label>
                <input className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none text-sm" placeholder="e.g. IA-3 Reschedule" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Priority</label>
                  <select className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none text-xs">
                    <option>General</option>
                    <option>Urgent</option>
                    <option>Examination</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Expiry Date</label>
                  <input type="date" className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none text-xs" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Content</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none resize-none text-sm" placeholder="Draft your announcement here..."></textarea>
              </div>
              <button className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-[9px] hover:bg-zinc-200 transition-all">
                Publish Broadcast
              </button>
            </form>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                <option>Section A - CSE</option>
                <option>Section B - CSE</option>
              </select>
              <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white">
                <option>Machine Learning (CS501)</option>
                <option>Operating Systems (CS502)</option>
              </select>
            </div>

            <div className="glass rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">USN</th>
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Student Name</th>
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { usn: 'PES12021001', name: 'Aaron Smith' },
                    { usn: 'PES12021002', name: 'Bella Thorne' },
                    { usn: 'PES12021003', name: 'Chris Evans' },
                    { usn: 'PES12021004', name: 'Diana Prince' }
                  ].map((student) => (
                    <tr key={student.usn} className="hover:bg-white/[0.01]">
                      <td className="px-6 py-4 font-mono text-[10px] text-zinc-400">{student.usn}</td>
                      <td className="px-6 py-4 font-bold text-xs text-white">{student.name}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button className="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase">Present</button>
                          <button className="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-black uppercase opacity-40">Absent</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-[9px]">
              Commit Attendance
            </button>
          </div>
        )}

        {activeTab === 'marks' && (
          <div className="space-y-6">
            <div className="glass rounded-xl border border-white/5 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">USN</th>
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">IA-1 (20)</th>
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">IA-2 (20)</th>
                    <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">IA-3 (20)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[1, 2, 3, 4].map((i) => (
                    <tr key={i}>
                      <td className="px-6 py-3 font-mono text-[10px] text-zinc-400">PES1202100{i}</td>
                      <td className="px-6 py-3"><input className="bg-white/5 border border-white/10 rounded-lg w-12 px-2 py-1.5 text-center text-xs font-bold text-white" defaultValue="18" /></td>
                      <td className="px-6 py-3"><input className="bg-white/5 border border-white/10 rounded-lg w-12 px-2 py-1.5 text-center text-xs font-bold text-white" defaultValue="15" /></td>
                      <td className="px-6 py-3"><input className="bg-white/5 border border-white/10 rounded-lg w-12 px-2 py-1.5 text-center text-xs font-bold text-white" placeholder="-" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-[9px]">
              Sync Marks Cloud
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherPortal;
