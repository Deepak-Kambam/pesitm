
import React from 'react';

interface InternalMarksProps {
  onViewDetailed?: () => void;
}

const InternalMarks: React.FC<InternalMarksProps> = ({ onViewDetailed }) => {
  const subjects = [
    { name: 'Data Structures', code: 'CS301', ia1: 18, ia2: 19, ia3: 17, total: 54, max: 60, grade: 'A+' },
    { name: 'Microprocessors', code: 'CS302', ia1: 15, ia2: 14, ia3: 16, total: 45, max: 60, grade: 'A' },
    { name: 'Operating Systems', code: 'CS303', ia1: 12, ia2: 18, ia3: 15, total: 45, max: 60, grade: 'A' },
    { name: 'Theory of Computation', code: 'CS304', ia1: 17, ia2: 17, ia3: 18, total: 52, max: 60, grade: 'A+' },
    { name: 'System Design', code: 'CS305', ia1: 14, ia2: 15, ia3: 14, total: 43, max: 60, grade: 'B+' },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-3">Academic Performance</div>
        <h2 className="text-5xl font-bold text-white mb-4 tracking-tight uppercase">Sessional Marks</h2>
        <p className="text-zinc-500 max-w-xl mx-auto font-normal text-base">
          Continuous internal evaluation summary for the current academic session.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {subjects.map((sub) => (
            <div key={sub.code} className="glass p-6 rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-none" onClick={onViewDetailed}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg text-white tracking-tight uppercase">{sub.name}</h3>
                  <p className="text-[9px] text-zinc-600 font-bold tracking-widest mt-1 uppercase">{sub.code}</p>
                </div>
                <div className="text-white text-2xl font-black">
                  {sub.grade}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 text-center">
                {['ia1', 'ia2', 'ia3', 'total'].map((key) => (
                  <div key={key} className={`p-3 rounded-2xl ${key === 'total' ? 'bg-white text-black' : 'bg-white/5 text-zinc-300 border border-white/5'}`}>
                    <div className={`text-[8px] uppercase font-bold mb-1 tracking-widest opacity-60`}>{key.toUpperCase()}</div>
                    <div className="font-bold text-base">{(sub as any)[key]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="glass p-8 rounded-[2.5rem] border border-white/10 sticky top-32">
            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-6">Aggregate Summary</h4>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest mb-2">
                  <span className="text-zinc-500">Global Standings</span>
                  <span className="text-white">83%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[83%] bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">Class Ranking</span>
                  <span className="text-white text-xs font-bold">#04</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-zinc-500 uppercase">Active Backlogs</span>
                  <span className="text-white text-xs font-bold">None</span>
                </div>
              </div>
              
              <button 
                onClick={onViewDetailed}
                className="w-full mt-4 bg-zinc-900 text-white border border-white/10 py-3 rounded-2xl font-bold uppercase tracking-widest text-[9px] hover:bg-white hover:text-black transition-all"
              >
                View Detailed Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalMarks;
