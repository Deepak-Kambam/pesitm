import React from 'react';

interface DownloadPageProps {
  onExit: () => void;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ onExit }) => {
  const archives = [
    { name: 'Semester V Syllabus', size: '2.4 MB', date: 'Jan 10, 2026' },
    { name: 'Machine Learning Lab Manual', size: '14.2 MB', date: 'Jan 12, 2026' },
    { name: 'Exam Regulation 2025', size: '1.1 MB', date: 'Dec 05, 2025' },
    { name: 'Placement Brochure', size: '8.5 MB', date: 'Nov 20, 2025' },
  ];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl animate-in zoom-in duration-700">
              📥
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Resource Hub</h1>
              <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">PESITM PORTAL • Digital Assets</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[
            { title: 'Academic Syllabus', desc: 'Complete 2026 Curriculum Scheme', icon: '📚' },
            { title: 'Lab Manuals', desc: 'Technical Operations Guide', icon: '🧪' }
          ].map((item, i) => (
            <div key={i} className="glass-card p-8 h-48 rounded-[2rem] relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 hover:border-white/20 animate-in fade-in slide-in-from-bottom fill-mode-both" style={{ animationDelay: `${i * 200 + 200}ms` }}>
              <div className="absolute top-0 right-0 p-6 opacity-10 text-7xl grayscale group-hover:scale-110 transition-transform duration-700 group-hover:rotate-12">{item.icon}</div>
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-white group-hover:text-black transition-colors">{item.icon}</div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-2">{item.title}</h3>
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{item.desc}</p>
                </div>
                <button className="w-full py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 shadow-lg shadow-white/10 mt-auto">
                  Initiate Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-[2.5rem] p-10 border border-white/5 animate-in fade-in slide-in-from-bottom duration-1000 delay-500 fill-mode-both">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b border-white/5 pb-8">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Question Papers</h3>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-2">Previous Year Archives</p>
                </div>
                <div className="flex gap-3">
                  {['2025', '2024', '2023'].map((year) => (
                    <button key={year} className="px-5 py-2.5 glass rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {archives.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-5 glass rounded-2xl hover:bg-white/[0.05] transition-colors group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 text-xl group-hover:text-white transition-colors">
                        📄
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base uppercase tracking-tight">{file.name}</h4>
                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{file.size} • {file.date}</p>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 bg-white text-black rounded-xl text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 shadow-lg">
                      Download
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 text-center">
                <button className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">
                  Access Full Archive Index
                </button>
              </div>
            </div>

            {/* Mobile App Banner Compact */}
            <div className="glass-card p-6 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-2">Mobile Ecosystem</h3>
                  <p className="text-zinc-500 text-xs font-medium leading-relaxed tracking-tight mb-4">
                    Stay connected with the PESITM digital twin from any device.
                  </p>
                  <div className="flex gap-3">
                    <button className="bg-white text-black px-4 py-2 rounded-lg font-black uppercase text-[8px] tracking-widest hover:scale-105 active:scale-95 transition-all">App Store</button>
                    <button className="glass-button text-white px-4 py-2 rounded-lg font-black uppercase text-[8px] tracking-widest hover:bg-white hover:text-black transition-all active:scale-95">Play Store</button>
                  </div>
                </div>
                <div className="w-24 h-24 bg-zinc-900/50 rounded-xl border border-white/5 flex flex-col items-center justify-center relative group">
                  <div className="text-2xl text-white mb-1 animate-pulse">QR</div>
                  <div className="text-[6px] font-black text-zinc-600 uppercase tracking-widest">Scan</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Quick Tools */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-right duration-700 delay-500 fill-mode-both">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">Tools</h3>
              <div className="space-y-4">
                {[
                  { label: 'CGPA Predictor', icon: '🧮' },
                  { label: 'Exam Form Gen', icon: '📑' },
                  { label: 'Library Node', icon: '📚' },
                  { label: 'Digital Identity', icon: '💳' },
                ].map((tool, i) => (
                  <button
                    key={i}
                    className="w-full p-5 rounded-2xl glass border border-white/5 flex items-center space-x-5 hover:bg-white hover:text-black hover:scale-[1.02] transition-all group"
                  >
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{tool.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Box */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-right duration-700 delay-700 fill-mode-both">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">Support</h3>
              <p className="text-zinc-500 text-sm font-medium mb-6 leading-relaxed tracking-tight">Encryption verified. Facing issues within the portal?</p>
              <button className="text-white text-[10px] font-black uppercase tracking-[0.3em] border-b border-white/20 pb-1.5 hover:border-white transition-all">User Manual v4.0</button>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] pb-12">
          PESITM PORTAL SERVICES • DIGITAL ASSETS
        </footer>
      </div>
    </div>
  );
};

export default DownloadPage;
