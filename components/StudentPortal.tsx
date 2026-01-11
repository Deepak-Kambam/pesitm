
import React, { useState } from 'react';

interface StudentPortalProps {
  onExit: () => void;
}

const StudentPortal: React.FC<StudentPortalProps> = ({ onExit }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [studentId, setStudentId] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (studentId === 'PES123' && rollNumber === 'ROLL456' && password === 'pass123') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid Student Credentials. Use PES123 / ROLL456 / pass123');
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-black">
        <div className="glass-card w-full max-w-sm rounded-[1.5rem] overflow-hidden p-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <div className="w-full h-16 mb-4 mx-auto flex items-center justify-center overflow-hidden">
              <img src="logo.png" alt="PESITM Logo" className="h-full w-auto object-contain" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Student Portal</h2>
            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em] mt-2">PESITM Attendance System</p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Student ID</label>
              <input
                type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required
                className="w-full glass border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700 text-sm"
                placeholder="PES123"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Roll Number</label>
              <input
                type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required
                className="w-full glass border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700 text-sm"
                placeholder="ROLL456"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full glass border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700 text-sm"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <p className="text-red-500 text-[9px] font-bold text-center uppercase tracking-wide leading-relaxed">{error}</p>
              </div>
            )}
            <button className="w-full bg-white text-black py-3 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all active:scale-95">
              Login to Workspace
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
          <div className="h-12 w-auto">
            <img src="logo.png" alt="PESITM Logo" className="h-full w-auto object-contain" />
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="glass-button text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest active:scale-95">
            Sign Out
          </button>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="glass-card p-6 rounded-[2rem] md:col-span-2 flex items-center group hover:border-white/20 transition-all">
            <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-white text-2xl font-black mr-6 group-hover:scale-110 transition-transform">
              RK
            </div>
            <div>
              <h2 className="text-xl font-black text-white leading-none">Ravi Kumar</h2>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-zinc-500 font-mono text-xs">USN: <span className="text-white font-bold">PES123</span></p>
                <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                <p className="text-zinc-500 font-mono text-xs">Roll: <span className="text-white font-bold">ROLL456</span></p>
              </div>
              <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest mt-2 px-3 py-1 glass rounded-full inline-block">Computer Science Engineering</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-[2rem] relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">Current Attendance</h3>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-black">86.2%</div>
                <div className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest mb-1">Good Standing</div>
              </div>
              <div className="mt-6 h-2 w-full glass rounded-full overflow-hidden">
                <div className="h-full w-[86%] bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div>
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">Detailed Attendance Log</h3>
              <p className="text-white font-bold text-base mt-1">January 2026 Records</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Absent</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Date Index</th>
                  <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Academic Course</th>
                  <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {attendanceData.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5 text-zinc-600 font-mono text-xs">{row.date}</td>
                    <td className="px-8 py-5 uppercase tracking-tight font-bold text-white text-sm">{row.subject}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border ${row.status === 'Present' ? 'glass bg-white text-black' : 'glass-button text-zinc-600'
                        }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-black text-white">{row.percentage}</span>
                        <div className="w-16 h-1.5 glass rounded-full overflow-hidden hidden sm:block">
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

export default StudentPortal;