
import React, { useState } from 'react';

interface ParentsPortalProps {
  onExit: () => void;
}

const ParentsPortal: React.FC<ParentsPortalProps> = ({ onExit }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [parentId, setParentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (parentId === 'PARENT001' && password === 'pass123') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid Parent Credentials. Use PARENT001 / pass123');
    }
  };

  const attendanceData = [
    { date: '2026-01-09', subject: 'Machine Learning', status: 'Present', percentage: '92%' },
    { date: '2026-01-08', subject: 'Cloud Computing', status: 'Present', percentage: '88%' },
    { date: '2026-01-07', subject: 'Database Management', status: 'Absent', percentage: '75%' },
    { date: '2026-01-06', subject: 'Network Security', status: 'Present', percentage: '90%' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black">
        <div className="glass w-full max-w-sm rounded-[1.5rem] border border-white/10 overflow-hidden p-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <div className="w-full h-16 mb-4 mx-auto flex items-center justify-center overflow-hidden">
              <img src="logo.png" alt="PESITM Logo" className="h-full w-auto object-contain" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Parents Portal</h2>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-2">PESITM Guardian Access Interface</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Parent ID</label>
              <input
                type="text" value={parentId} onChange={(e) => setParentId(e.target.value)} required
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700 text-sm"
                placeholder="PARENT001"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700 text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-[9px] font-bold text-center uppercase tracking-wide">{error}</p>}

            <button className="w-full bg-white text-black py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/5">
              Login to Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-auto flex items-center justify-center overflow-hidden">
              <img src="logo.png" alt="PESITM Logo" className="h-full w-auto object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tight">Parent Dashboard</h1>
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Ravi Kumar | USN: PES123</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-zinc-900 text-white border border-white/10 px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Logout
          </button>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="glass p-6 rounded-[2rem] border border-white/5 md:col-span-2">
            <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-3">Student Insight</h3>
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white text-2xl font-black">
                RK
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Ravi Kumar</h2>
                <p className="text-zinc-600 font-mono text-xs">Computer Science Engineering</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-white text-black rounded-full text-[9px] font-black uppercase tracking-wide">
                  Verified Enrollment
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-xl text-black">
            <h3 className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-3">Current Attendance</h3>
            <div className="flex items-end justify-between">
              <div className="text-4xl font-black">86.2%</div>
            </div>
            <div className="mt-6 h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
              <div className="h-full w-[86%] bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Academic Session January 2026</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-4 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Course %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendanceData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-zinc-600 font-mono text-[10px]">{row.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-xs uppercase tracking-tight">{row.subject}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${row.status === 'Present'
                          ? 'bg-white text-black border-white'
                          : 'bg-transparent text-zinc-600 border-white/10'
                        }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs font-black text-white">{row.percentage}</span>
                        <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-white" style={{ width: row.percentage }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsPortal;
