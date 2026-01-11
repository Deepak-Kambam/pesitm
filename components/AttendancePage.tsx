
import React from 'react';

interface AttendancePageProps {
  onExit: () => void;
}

const AttendancePage: React.FC<AttendancePageProps> = ({ onExit }) => {
  // Comprehensive mock data for the detailed view
  const records = [
    { date: 'Oct 24, 2023', subject: 'Machine Learning', code: 'CS501', status: 'Present', type: 'Lecture', room: 'B-304' },
    { date: 'Oct 24, 2023', subject: 'Database Management', code: 'DB402', status: 'Present', type: 'Lecture', room: 'B-201' },
    { date: 'Oct 23, 2023', subject: 'Network Security', code: 'CS505', status: 'Absent', type: 'Lab', room: 'L-102' },
    { date: 'Oct 23, 2023', subject: 'Cloud Computing', code: 'CS508', status: 'Late', type: 'Lecture', room: 'B-304' },
    { date: 'Oct 22, 2023', subject: 'Machine Learning', code: 'CS501', status: 'Present', type: 'Lecture', room: 'B-304' },
    { date: 'Oct 21, 2023', subject: 'Aptitude Training', code: 'APT101', status: 'Present', type: 'Seminar', room: 'Auditorium' },
    { date: 'Oct 20, 2023', subject: 'Data Structures', code: 'CS301', status: 'Present', type: 'Lab', room: 'L-204' },
    { date: 'Oct 19, 2023', subject: 'Operating Systems', code: 'CS303', status: 'Absent', type: 'Lecture', room: 'B-304' },
    { date: 'Oct 18, 2023', subject: 'Design & Analysis', code: 'CS401', status: 'Present', type: 'Lecture', room: 'B-202' },
    { date: 'Oct 17, 2023', subject: 'System Software', code: 'CS405', status: 'Present', type: 'Lab', room: 'L-101' },
  ];

  const attendedClasses = records.filter(r => r.status === 'Present' || r.status === 'Late');
  const absentedClasses = records.filter(r => r.status === 'Absent');

  const stats = [
    { label: 'Total Lectures', val: '124', sub: 'Semester V | Section A' },
    { label: 'Attended', val: '106', sub: 'Verified Records' },
    { label: 'Absent', val: '18', sub: 'Needs Medical Justification' },
    { label: 'Percentage', val: '85.4%', sub: 'Standing: Distinction', highlight: true },
  ];

  // Mock data for subject-wise breakdown
  const subjects = [
    { code: 'CS501', name: 'Machine Learning', status: 'Active', attended: 18, total: 20, percentage: 90 },
    { code: 'DB402', name: 'Database Management', status: 'Active', attended: 15, total: 18, percentage: 83 },
    { code: 'CS505', name: 'Network Security', status: 'Active', attended: 12, total: 15, percentage: 80 },
    { code: 'CS508', name: 'Cloud Computing', status: 'Active', attended: 17, total: 20, percentage: 85 },
    { code: 'CS301', name: 'Data Structures', status: 'Active', attended: 19, total: 20, percentage: 95 },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl animate-in zoom-in duration-700">
              📊
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Attendance Log</h1>
              <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">PESITM PORTAL • Session Analytics</p>
            </div>
          </div>
        </header>

        {/* Animated Stats Grid with Sliding Collision Effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 overflow-hidden p-2">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`glass-card p-6 rounded-2xl text-center group hover:border-white/20 transition-all opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000`}
              style={{ animationDelay: `${i * 150 + 200}ms` }}
            >
              <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3">{stat.label}</div>
              <div className="text-3xl font-black text-white group-hover:scale-110 transition-transform">{stat.val}</div>
              <div className="text-[8px] font-bold text-zinc-500 mt-2 bg-white/5 inline-block px-2 py-0.5 rounded-full">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Specialized Attended & Absented Lists with Collision Animation */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 overflow-hidden p-2">
          {/* Attended Classes List */}
          <div className="glass-card rounded-[2rem] p-8 animate-collide-left opacity-0 fill-mode-both" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Verified Presence</h3>
              <span className="bg-white text-black px-3 py-1 rounded-full text-[8px] font-black uppercase">{attendedClasses.length} Sessions</span>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {attendedClasses.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl glass bg-white/[0.02] border-white/5 group hover:border-white/20 transition-all">
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-tight">{item.subject}</p>
                    <p className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{item.date} • {item.code}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">{item.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Absented Classes List */}
          <div className="glass-card rounded-[2rem] p-8 animate-collide-right opacity-0 fill-mode-both" style={{ animationDelay: '900ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Missing Sessions</h3>
              <span className="bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-[8px] font-black uppercase">{absentedClasses.length} Absences</span>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {absentedClasses.length > 0 ? (
                absentedClasses.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl glass border-red-500/5 hover:border-red-500/20 transition-all">
                    <div>
                      <p className="text-red-400 font-bold text-sm uppercase tracking-tight">{item.subject}</p>
                      <p className="text-[7px] text-zinc-700 font-bold uppercase tracking-widest mt-1">{item.date} • {item.code}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[7px] font-black text-red-500/40 uppercase tracking-widest">Marked Absent</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-zinc-800 font-black uppercase tracking-[0.2em] text-[9px] py-8">
                  Perfect Attendance This Week
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Chronological Log */}
        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5 mb-10 opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div>
              <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Detailed Records</h3>
              <p className="text-white font-black text-xl mt-1 tracking-tighter">Subject Wise Breakdown</p>
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
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-center">Sessions</th>
                  <th className="px-6 py-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] text-right">Performace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {subjects.map((sub, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-zinc-500 font-bold text-xs uppercase tracking-widest">{sub.code}</td>
                    <td className="px-6 py-4">
                      <div className="font-black text-white text-base uppercase tracking-tight group-hover:text-zinc-200 transition-colors">{sub.name}</div>
                      <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Core Module</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[8px] font-black uppercase tracking-[0.2em]">
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-zinc-400 text-sm">
                      {sub.attended}/{sub.total}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-black text-white text-2xl tracking-tighter leading-none">{sub.percentage}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chronological Session History (Restored) */}
        <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5 mb-10 opacity-0 fill-mode-both animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em]">Session History</h3>
            <p className="text-white font-black text-lg mt-1 tracking-tighter">Chronological Log</p>
          </div>
          <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-black/80 backdrop-blur-md z-10">
                <tr className="border-b border-white/5">
                  <th className="px-6 py-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Subject</th>
                  <th className="px-6 py-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest">Type</th>
                  <th className="px-6 py-3 text-[9px] font-black text-zinc-600 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {records.map((rec, i) => (
                  <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{rec.date}</td>
                    <td className="px-6 py-3 font-bold text-white text-xs uppercase tracking-tight">{rec.subject} <span className="text-zinc-600 ml-1">{rec.code}</span></td>
                    <td className="px-6 py-3 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{rec.type}</td>
                    <td className="px-6 py-3 text-right">
                      <span className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest ${rec.status === 'Present' ? 'bg-green-500/10 text-green-500' :
                          rec.status === 'Absent' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-20 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] pb-12">
          PESITM PORTAL SERVICES • ATTENDANCE VERIFIED
        </footer>
      </div>
    </div>
  );
};

export default AttendancePage;
