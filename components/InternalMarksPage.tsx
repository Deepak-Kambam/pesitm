import React from 'react';

interface InternalMarksPageProps {
  onExit: () => void;
}

const InternalMarksPage: React.FC<InternalMarksPageProps> = ({ onExit }) => {
  // Comprehensive list of initiated subjects for the current semester with credits
  const marksData = [
    { name: 'Machine Learning', code: 'CS501', ia1: 19, ia2: 18, ia3: 20, total: 57, max: 60, grade: 'O', credits: 4, status: 'Initiated' },
    { name: 'Cloud Computing', code: 'CS502', ia1: 15, ia2: 16, ia3: 15, total: 46, max: 60, grade: 'A', credits: 4, status: 'Initiated' },
    { name: 'Cyber Security', code: 'CS503', ia1: 17, ia2: 15, ia3: 18, total: 50, max: 60, grade: 'A+', credits: 4, status: 'Initiated' },
    { name: 'Blockchain Tech', code: 'CS504', ia1: 14, ia2: 17, ia3: 16, total: 47, max: 60, grade: 'A', credits: 3, status: 'Initiated' },
    { name: 'VLSI Design', code: 'CS505', ia1: 18, ia2: 19, ia3: 17, total: 54, max: 60, grade: 'A+', credits: 3, status: 'Initiated' },
    { name: 'Robotics & AI', code: 'CS506', ia1: 16, ia2: 14, ia3: 15, total: 45, max: 60, grade: 'A', credits: 3, status: 'Initiated' },
    { name: 'Digital Signal Proc', code: 'CS507', ia1: 20, ia2: 19, ia3: 19, total: 58, max: 60, grade: 'O', credits: 3, status: 'Initiated' },
    { name: 'Universal Values', code: 'HS101', ia1: 18, ia2: 18, ia3: 18, total: 54, max: 60, grade: 'A+', credits: 1, status: 'Initiated' },
  ];

  const stats = [
    { label: 'Current SGPA', val: '8.42', sub: 'Semester V | Verified' },
    { label: 'Credits Earned', val: '25', sub: 'Target: 24/Sem' },
    { label: 'Performance', val: 'Distinction', sub: 'Agg. > 80%' },
    { label: 'Sync Status', val: 'LIVE', sub: 'Last Update: 2m ago' },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-12 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl animate-in zoom-in duration-700">
              📊
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Marks Ledger</h1>
              <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">PESITM PORTAL • Continuous Evaluation</p>
            </div>
          </div>
        </header>

        {/* Dynamic Analytics Node */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-center group hover:border-white/20 transition-all opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">{stat.label}</div>
              <div className="text-2xl font-black text-white group-hover:scale-110 transition-transform">{stat.val}</div>
              <div className="mt-2 text-[8px] font-bold text-zinc-500 bg-white/5 inline-block px-2 py-0.5 rounded-full">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* The Performance Ledger Table */}
        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5 mb-10 opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div>
              <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Detailed Records</h3>
              <p className="text-white font-black text-xl mt-1 tracking-tighter">Marks Repository</p>
            </div>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="w-2 h-2 rounded-full bg-zinc-800"></span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] w-24">Code</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Subject Title</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">Status</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">IA-1</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">IA-2</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">IA-3</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {marksData.map((sub, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-zinc-500 font-bold text-xs uppercase tracking-widest">{sub.code}</td>
                    <td className="px-6 py-4">
                      <div className="font-black text-white text-base uppercase tracking-tight group-hover:text-zinc-200 transition-colors">{sub.name}</div>
                      <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Verified Instance</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[8px] font-black uppercase tracking-[0.2em]">
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-zinc-400 text-sm">{sub.ia1}</td>
                    <td className="px-6 py-4 text-center font-black text-zinc-400 text-sm">{sub.ia2}</td>
                    <td className="px-6 py-4 text-center font-black text-zinc-400 text-sm">{sub.ia3}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-black text-white text-xl tracking-tighter leading-none">{sub.total}</span>
                        <span className="text-[8px] text-zinc-700 font-black mt-1">/{sub.max}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-20 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] pb-12">
          PESITM PORTAL SERVICES • ACADEMIC RECORD
        </footer>
      </div>
    </div>
  );
};

export default InternalMarksPage;
