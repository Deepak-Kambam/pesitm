
import React from 'react';

interface TimetableProps {
  onViewDetailed?: () => void;
}

const Timetable: React.FC<TimetableProps> = ({ onViewDetailed }) => {
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

  const schedule: Record<string, string[]> = {
    'Mon': ['Maths', 'Physics', 'Python', 'Library', 'Lunch', 'Digital Sys', 'Aptitude'],
    'Tue': ['Physics', 'Engg Graph', 'Engg Graph', 'Workshop', 'Lunch', 'Maths', 'Ethics'],
    'Wed': ['Python', 'Digital Sys', 'Maths', 'Maths', 'Lunch', 'Physics', 'Sports'],
    'Thu': ['Chemistry', 'EVS', 'Maths', 'Physics Lab', 'Lunch', 'Physics Lab', 'Python'],
    'Fri': ['Digital Sys', 'Maths', 'Physics', 'Soft Skills', 'Lunch', 'Chemistry', 'Chemistry'],
    'Sat': ['Library', 'Seminar', 'Seminar', 'Club Act', 'Lunch', 'Free', 'Free'],
  };

  const getStyle = (subject: string) => {
    if (subject === 'Lunch') return 'bg-white/5 text-zinc-600 border-white/5 italic opacity-40';
    if (subject.includes('Lab')) return 'bg-white text-black border-white font-black';
    return 'bg-transparent text-white border-white/10 hover:border-white/30';
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-xl">
          <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-4">Routine</div>
          <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Timetable</h2>
          <p className="text-zinc-500 font-light text-lg mb-6">Your weekly roadmap to success. Sem 5 | Sec A.</p>
          <button 
            onClick={onViewDetailed}
            className="text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all"
          >
            View Full Schedule
          </button>
        </div>
      </div>

      <div className="glass rounded-[3rem] p-6 md:p-12 border border-white/5 overflow-hidden cursor-none" onClick={onViewDetailed}>
        {/* Mobile View */}
        <div className="md:hidden space-y-10">
          {days.map((day) => (
            <div key={day} className="space-y-4">
              <h3 className="font-black text-white text-xl tracking-widest border-l-4 border-white pl-4 italic uppercase">{day}</h3>
              <div className="grid grid-cols-1 gap-3">
                {schedule[day].map((sub, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${getStyle(sub)} flex justify-between items-center`}>
                    <span className="text-[10px] font-black opacity-60 uppercase">{periods[i].time}</span>
                    <span className="font-bold text-sm tracking-tight">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="p-4 w-32"></th>
                {days.map((day) => (
                  <th key={day} className="p-6 text-white font-black text-lg bg-white/5 rounded-3xl uppercase tracking-widest italic">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, pIdx) => (
                <tr key={pIdx}>
                  <td className="p-4">
                    <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{period.label}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1">{period.time}</div>
                  </td>
                  {days.map((day) => {
                    const sub = schedule[day][pIdx];
                    return (
                      <td key={day} className="p-0">
                        <div className={`h-28 p-5 rounded-3xl border flex flex-col justify-center items-center text-center transition-all duration-300 hover:-translate-y-1 ${getStyle(sub)}`}>
                          <span className="font-bold text-[13px] uppercase tracking-tighter leading-tight">{sub}</span>
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
    </div>
  );
};

export default Timetable;
