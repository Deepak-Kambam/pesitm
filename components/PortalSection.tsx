
import React from 'react';

interface PortalSectionProps {
  onStudentLogin: () => void;
  onParentLogin: () => void;
}

const PortalSection: React.FC<PortalSectionProps> = ({ onStudentLogin, onParentLogin }) => {
  return (
    <div className="w-full py-20">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-4">Gateways</div>
        <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tighter italic">Academic Portal</h2>
        <p className="text-zinc-500 max-w-xl mx-auto font-light text-lg">
          Select your portal to access specialized academic tools and personal records.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="glass p-12 rounded-[3rem] border border-white/5 text-center group hover:border-white/20 transition-all">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white text-3xl mb-8 mx-auto group-hover:bg-white group-hover:text-black transition-all">
            🎓
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Student Login</h3>
          <p className="text-zinc-500 mb-8 text-sm">Access attendance, internal marks, and your personalized timetable.</p>
          <button 
            onClick={onStudentLogin}
            className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all active:scale-95"
          >
            Enter Workspace
          </button>
        </div>

        <div className="glass p-12 rounded-[3rem] border border-white/5 text-center group hover:border-indigo-500/20 transition-all">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-white text-3xl mb-8 mx-auto group-hover:bg-indigo-600 transition-all">
            👪
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Parents Portal</h3>
          <p className="text-zinc-500 mb-8 text-sm">Monitor ward performance, attendance metrics, and campus alerts.</p>
          <button 
            onClick={onParentLogin}
            className="w-full border border-indigo-500/30 bg-indigo-600/10 text-indigo-400 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
          >
            Guardian Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalSection;
