
import React from 'react';

interface NoticesPageProps {
  onExit: () => void;
}

const NoticesPage: React.FC<NoticesPageProps> = ({ onExit }) => {
  const announcements = [
    { date: 'MAY 15', type: 'URGENT', title: 'Internal Assessment Schedule Revised', desc: 'Revised timetable for 4th and 6th semester IA-2 exams is now live on the portal.' },
    { date: 'MAY 12', type: 'GENERAL', title: 'Tech Fest 2024 Registration', desc: 'Registrations are open for the annual flagship event. Early bird ends on May 20.' },
    { date: 'MAY 10', type: 'INFO', title: 'Central Library Timings', desc: 'Library hours extended to 10 PM for the upcoming internal assessment period.' },
    { date: 'MAY 05', type: 'CAREER', title: 'Campus Recruitment Update', desc: 'New recruitment drive announced for final year students. Apply via Placement Cell.' },
    { date: 'APR 28', type: 'EXAM', title: 'Lab Record Submission Deadline', desc: 'All lab records for current cycle must be submitted to respective department heads by May 1st.' },
    { date: 'APR 22', type: 'SPORTS', title: 'Inter-College Athletic Meet', desc: 'PESITM will host the district-level athletics meet starting next Monday. Volunteers needed.' }
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white text-xl shadow-2xl animate-in zoom-in duration-700">
              📢
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">Official Notices</h1>
              <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.3em] mt-1">Institutional Communication Hub • PESITM</p>
            </div>
          </div>

        </header>

        <div className="grid gap-6 pb-12">
          {announcements.map((item, i) => {
            // Alternating collision animation logic
            const animationClass = i % 2 === 0 ? 'animate-collide-left' : 'animate-collide-right';

            return (
              <div
                key={i}
                className={`glass-card p-6 md:p-8 rounded-[1.5rem] hover:border-white/20 transition-all group opacity-0 fill-mode-both ${animationClass}`}
                style={{ animationDelay: `${i * 180 + 200}ms` }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Date Badge */}
                  <div className="flex flex-col items-center justify-center bg-white w-20 h-20 rounded-2xl shrink-0 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter leading-none mb-1">{item.date.split(' ')[0]}</span>
                    <span className="text-2xl font-black text-black leading-none">{item.date.split(' ')[1]}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-[9px] font-black px-4 py-1.5 rounded-full border ${item.type === 'URGENT'
                          ? 'glass bg-white text-black border-white shadow-lg shadow-white/10'
                          : 'glass-button text-zinc-500 border-white/5'
                        } uppercase tracking-[0.2em]`}>
                        {item.type}
                      </span>
                      <span className="h-[1px] w-6 bg-zinc-900"></span>
                      <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">ID: 2026-N{i + 102}</span>
                    </div>

                    <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-zinc-200 transition-colors leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-zinc-500 text-sm font-normal leading-relaxed max-w-3xl tracking-tight">
                      {item.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-4">
                      <button className="text-[8px] font-black text-white uppercase tracking-[0.2em] border-b border-white/20 pb-0.5 hover:border-white transition-all">
                        View Attachments
                      </button>
                      <button className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.2em] hover:text-white transition-all">
                        Mark as Read
                      </button>
                    </div>
                  </div>

                  {/* Decorative Arrow for hover state */}
                  <div className="hidden lg:flex w-10 h-10 rounded-full glass border-white/5 items-center justify-center opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <footer className="mt-8 mb-12 text-center">
          <div className="h-[1px] w-12 bg-zinc-900 mx-auto mb-4"></div>
          <p className="text-zinc-800 text-[9px] font-black uppercase tracking-[0.4em]">
            End of Bulletin Stream • Archive Accessible via Library Node
          </p>
        </footer>
      </div>
    </div>
  );
};

export default NoticesPage;
