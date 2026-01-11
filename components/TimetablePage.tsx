
import React from 'react';

interface TimetablePageProps {
  onExit: () => void;
}

const TimetablePage: React.FC<TimetablePageProps> = ({ onExit }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const periods = [
    { time: '09:00 - 10:00', label: 'P1' },
    { time: '10:00 - 11:00', label: 'P2' },
    { time: '11:15 - 12:15', label: 'P3' },
    { time: '12:15 - 01:15', label: 'P4' },
    { time: '01:15 - 02:00', label: 'Break', isSpecial: true },
    { time: '02:00 - 03:00', label: 'P5' },
    { time: '03:00 - 04:00', label: 'P6' },
  ];

  const subjectsRegistry = [
    { name: 'Machine Learning', code: 'CS501', credits: 4, type: 'Core' },
    { name: 'Cloud Computing', code: 'CS502', credits: 4, type: 'Core' },
    { name: 'Cyber Security', code: 'CS503', credits: 4, type: 'Elective' },
    { name: 'Blockchain Tech', code: 'CS504', credits: 3, type: 'Core' },
    { name: 'VLSI Design', code: 'CS505', credits: 3, type: 'Core' },
    { name: 'Robotics & AI', code: 'CS506', credits: 3, type: 'Laboratory' },
    { name: 'Digital Signal Proc', code: 'CS507', credits: 3, type: 'Core' },
    { name: 'Universal Values', code: 'HS101', credits: 1, type: 'Institutional' },
  ];

  const schedule: Record<string, string[]> = {
    'Mon': ['ML', 'Cloud', 'Cyber', 'Library', 'Lunch', 'VLSI', 'Robotics'],
    'Tue': ['Cloud', 'ML', 'ML', 'Workshop', 'Lunch', 'Cyber', 'Values'],
    'Wed': ['Cyber', 'VLSI', 'DSP', 'DSP', 'Lunch', 'Cloud', 'Sports'],
    'Thu': ['Blockchain', 'EVS', 'ML', 'DSP Lab', 'Lunch', 'DSP Lab', 'Cyber'],
    'Fri': ['VLSI', 'DSP', 'ML', 'Soft Skills', 'Lunch', 'Blockchain', 'Blockchain'],
    'Sat': ['Library', 'Seminar', 'Seminar', 'Club Act', 'Lunch', 'Free', 'Free'],
  };

  const getStyle = (subject: string) => {
    if (subject === 'Lunch') return 'bg-white/5 text-zinc-800 border-white/5 opacity-30';
    if (subject.includes('Lab')) return 'bg-white text-black border-white font-black shadow-3xl';
    return 'bg-transparent text-white border-white/10 hover:border-white/30 hover:bg-white/[0.04]';
  };

  const stats = [
    { label: 'Current Term', val: 'V Sem 2026', sub: 'Even Cycle Engagement' },
    { label: 'Base Node', val: 'CR-304', sub: 'Institutional Core Block' },
    { label: 'Weekly Intensity', val: '32 Hours', sub: 'Optimized Workload' },
    { label: 'Portal Group', val: 'CSE - A', sub: 'Computer Science Division', highlight: true },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-12 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl animate-in zoom-in duration-700">
              📅
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Remote Time Table</h1>
              <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">Department of Computer Science • Semester VI</p>
            </div>
          </div>
          <div className="flex gap-5">
            <button
              onClick={() => window.print()}
              className="bg-zinc-900 text-white border border-white/10 px-12 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-white/5"
            >
              Export PDF
            </button>
          </div>
        </header>

        {/* Tactical Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-center group hover:border-white/20 transition-all opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">{stat.label}</div>
              <div className="text-2xl font-black text-white group-hover:scale-110 transition-transform">{stat.val}</div>
              <div className="mt-2 text-[8px] font-bold text-zinc-500 bg-white/5 inline-block px-2 py-0.5 rounded-full">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Initiating Subject Registry Table */}
        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5 mb-10 opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div>
              <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Master Schedule</h3>
              <p className="text-white font-black text-xl mt-1 tracking-tighter">Academic Registry</p>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/20"></span>
              <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
              <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Time Index</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Mon</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Tue</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Wed</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Thu</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-right">Fri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { time: '09:00 - 10:00', mon: 'CS501', tue: 'CS502', wed: 'CS503', thu: 'CS504', fri: 'LAB-A' },
                  { time: '10:00 - 11:00', mon: 'CS502', tue: 'CS501', wed: 'LAB-B', thu: 'CS503', fri: 'LAB-A' },
                  { time: '11:00 - 11:30', mon: 'BREAK', tue: 'BREAK', wed: 'BREAK', thu: 'BREAK', fri: 'BREAK' },
                  { time: '11:30 - 12:30', mon: 'CS503', tue: 'CS504', wed: 'CS501', thu: 'CS502', fri: 'CS503' },
                  { time: '12:30 - 01:30', mon: 'LUNCH', tue: 'LUNCH', wed: 'LUNCH', thu: 'LUNCH', fri: 'LUNCH' },
                  { time: '02:00 - 04:00', mon: 'LAB-A', tue: 'LAB-B', wed: 'CS504', thu: 'CS501', fri: 'CS502' }
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-zinc-500 font-bold text-xs whitespace-nowrap">{row.time}</td>
                    {['mon', 'tue', 'wed', 'thu', 'fri'].map((day, idx) => {
                      const subject = (row as any)[day];
                      const isBreak = subject === 'BREAK' || subject === 'LUNCH';
                      return (
                        <td key={day} className={`px-6 py-4 ${idx === 4 ? 'text-right' : ''}`}>
                          {isBreak ? (
                            <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">{subject}</span>
                          ) : (
                            <div className="group-hover:translate-x-1 transition-transform duration-300">
                              <div className="text-white font-black text-base uppercase tracking-tight">{subject}</div>
                              <div className="text-[8px] text-zinc-600 uppercase tracking-wider mt-0.5">Hall {101 + idx}</div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-6 border border-white/5 overflow-hidden animate-in fade-in slide-in-from-bottom duration-1200 delay-1500 fill-mode-both opacity-0 shadow-2xl mb-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Weekly Engagement Nexus</h2>
            <div className="h-[1px] w-16 bg-zinc-900 mx-auto mt-4"></div>
          </div>
          <div className="overflow-x-auto pb-4">
            <table className="w-full border-separate border-spacing-2">
              <thead>
                <tr>
                  <th className="p-2 w-16"></th>
                  {days.map((day, dIdx) => (
                    <th key={day} className="p-4 text-white font-black text-base bg-white/[0.04] rounded-2xl uppercase tracking-[0.2em] text-center animate-in fade-in duration-1000" style={{ animationDelay: `${dIdx * 120 + 1800}ms` }}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {periods.map((period, pIdx) => (
                  <tr key={pIdx}>
                    <td className="p-2">
                      <div className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">{period.label}</div>
                      <div className="text-[9px] text-zinc-700 font-bold whitespace-nowrap tracking-tighter">{period.time}</div>
                    </td>
                    {days.map((day, dIdx) => {
                      const sub = schedule[day][pIdx];
                      return (
                        <td key={day} className="p-0">
                          <div
                            className={`h-20 p-2 rounded-2xl border flex flex-col justify-center items-center text-center transition-all duration-700 hover:scale-[1.05] group animate-in slide-in-from-bottom duration-1000 ${getStyle(sub)} shadow-glow shadow-white/0 hover:shadow-white/5`}
                            style={{ animationDelay: `${(pIdx + dIdx) * 60 + 2000}ms` }}
                          >
                            <span className="font-black text-xs uppercase tracking-tighter leading-none">{sub}</span>
                            {sub !== 'Lunch' && sub !== 'Free' && sub !== 'Library' && (
                              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">B-304</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subject Registry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-2000 fill-mode-both opacity-0">
          {subjectsRegistry.map((sub, i) => (
            <div key={i} className="glass-card p-4 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-colors group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{sub.code}</span>
                <span className="px-2 py-0.5 bg-zinc-900 rounded-md text-[7px] font-bold text-zinc-500 uppercase tracking-wider">{sub.type}</span>
              </div>
              <div className="text-white font-black text-sm uppercase tracking-tight leading-tight group-hover:text-zinc-200 transition-colors">{sub.name}</div>
              <div className="mt-2 h-0.5 w-4 bg-zinc-800 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Interaction Legend */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-1000 delay-2500 fill-mode-both opacity-0">
          {[
            { label: 'Theory Engagement', color: 'border-white/10' },
            { label: 'Practical Labs', color: 'bg-white text-black' },
            { label: 'Synchronized Breaks', color: 'bg-white/5 opacity-20' },
            { label: 'Strategic Modules', color: 'border-white/50' },
          ].map((legend, i) => (
            <div key={i} className="flex items-center space-x-3 p-4 glass rounded-xl border border-white/5 hover:border-white/20 transition-all">
              <div className={`w-4 h-4 rounded-md border transition-transform group-hover:rotate-12 ${legend.color}`}></div>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">{legend.label}</span>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] pb-12">
          PESITM PORTAL SERVICES • ROUTINE MASTER VERIFIED • 2026-X7
        </footer>
      </div>
    </div>
  );
};

export default TimetablePage;
