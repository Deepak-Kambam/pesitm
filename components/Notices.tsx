
import React from 'react';

interface NoticesProps {
  onViewAll?: () => void;
}

const Notices: React.FC<NoticesProps> = ({ onViewAll }) => {
  const announcements = [
    { date: 'MAY 15', type: 'URGENT', title: 'Internal Assessment Schedule Revised', desc: 'Revised timetable for 4th and 6th semester IA-2 exams is now live.' },
    { date: 'MAY 12', type: 'GENERAL', title: 'Tech Fest 2024 Registration', desc: 'Registrations are open for the annual flagship event.' },
    { date: 'MAY 10', type: 'INFO', title: 'Central Library Timings', desc: 'Library hours extended to 10 PM for the upcoming IA period.' }
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-4">Bulletins</div>
          <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-tight">Recent Notices</h2>
          <p className="text-zinc-500 font-medium text-lg max-w-xl leading-relaxed">Critical campus alerts and official announcements.</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all"
        >
          Archive
        </button>
      </div>

      <div className="grid gap-6 overflow-hidden p-2">
        {announcements.map((item, i) => {
          const animationClass = i % 2 === 0 ? 'animate-collide-left' : 'animate-collide-right';
          return (
            <div 
              key={i} 
              onClick={onViewAll}
              className={`glass p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all group cursor-none opacity-0 fill-mode-both ${animationClass}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-10">
                <div className="flex flex-col items-center justify-center bg-white w-20 h-20 rounded-2xl shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{item.date.split(' ')[0]}</span>
                  <span className="text-xl font-black text-black">{item.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[9px] font-bold px-3 py-1 rounded-full ${
                      item.type === 'URGENT' ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 border border-white/10'
                    } uppercase tracking-widest`}>
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-zinc-300 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500 text-base font-normal leading-relaxed">{item.desc}</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notices;
