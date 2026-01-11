
import React from 'react';

interface AttendanceProps {
  onViewDetailed?: () => void;
}

const Attendance: React.FC<AttendanceProps> = ({ onViewDetailed }) => {
  const records = [
    { date: 'Oct 24, 2023', subject: 'Machine Learning', code: 'CS501', status: 'Present' },
    { date: 'Oct 24, 2023', subject: 'Database Management', code: 'DB402', status: 'Present' },
    { date: 'Oct 23, 2023', subject: 'Network Security', code: 'CS505', status: 'Absent' },
    { date: 'Oct 23, 2023', subject: 'Cloud Computing', code: 'CS508', status: 'Late' },
    { date: 'Oct 22, 2023', subject: 'Machine Learning', code: 'CS501', status: 'Present' },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div className="max-w-xl">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-3">Analytics</div>
          <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tight">Attendance Record</h2>
          <p className="text-zinc-500 font-normal text-base mb-6">Comprehensive log of your lecture attendance for the current semester.</p>
          <button 
            onClick={onViewDetailed}
            className="text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all"
          >
            View Detailed Report
          </button>
        </div>
        <div className="flex items-center space-x-6 glass p-6 rounded-3xl border border-white/10">
          <div className="text-right">
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Aggregate</p>
            <p className="text-4xl font-extrabold text-white">85.4%</p>
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-white/5 flex items-center justify-center relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-zinc-900" />
              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="2" fill="transparent" strokeDasharray="151" strokeDashoffset="22" className="text-white" />
            </svg>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5 cursor-none" onClick={onViewDetailed}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Course Title</th>
                <th className="px-8 py-5 text-[9px] font-bold text-zinc-500 uppercase tracking-widest text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {records.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-8 py-5 text-zinc-500 font-medium text-sm">{row.date}</td>
                  <td className="px-8 py-5">
                    <div className="font-bold text-zinc-200 text-sm">{row.subject}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-white/5 text-zinc-600 rounded text-[8px] font-bold tracking-widest uppercase">{row.code}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                      row.status === 'Present' ? 'bg-zinc-100 text-black' :
                      row.status === 'Absent' ? 'border border-white/10 text-zinc-500' :
                      'bg-zinc-800 text-zinc-300'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
