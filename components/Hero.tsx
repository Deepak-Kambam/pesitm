
import React from 'react';

interface HeroProps {
  onStudentLogin?: () => void;
  onTeacherLogin?: () => void;
  onParentLogin?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStudentLogin, onTeacherLogin, onParentLogin }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="z-10 max-w-5xl py-10">
        <div className="inline-block px-4 py-1.5 mb-8 text-[9px] font-black tracking-[0.4em] text-zinc-500 uppercase glass rounded-full animate-in fade-in slide-in-from-top duration-1000">
          Integrated Academic Governance Node
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.85] mb-8 tracking-tighter uppercase overflow-hidden">
          <span className="block animate-collide-left font-brand italic">PESITM</span>
          <span className="block text-zinc-800 animate-collide-right font-brand">PORTAL</span>
        </h1>

        <p className="text-zinc-500 max-w-2xl mx-auto mb-12 text-base md:text-lg font-medium leading-relaxed tracking-tight animate-in fade-in duration-1000 delay-500 fill-mode-both">
          The next-generation digital ecosystem for the Computer Science department.
          Synchronizing student records, faculty evaluation, and parental oversight in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 overflow-hidden p-2">
          {/* Student Workspace */}
          <div className="animate-collide-left [animation-delay:800ms] fill-mode-both opacity-0">
            <button
              onClick={onStudentLogin}
              className="w-full sm:w-auto bg-white text-black px-10 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-all active:scale-95 shadow-3xl shadow-white/10"
            >
              Student Workspace
            </button>
          </div>

          {/* Parents Node */}
          <div className="animate-collide-bottom [animation-delay:1000ms] fill-mode-both opacity-0">
            <button
              onClick={onParentLogin}
              className="w-full sm:w-auto glass border-white/20 text-white px-10 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all active:scale-95"
            >
              Guardian Entry
            </button>
          </div>

          {/* Faculty Gateway */}
          <div className="animate-collide-right [animation-delay:1200ms] fill-mode-both opacity-0">
            <button
              onClick={onTeacherLogin}
              className="w-full sm:w-auto glass border-white/5 text-zinc-700 px-10 py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-all active:scale-95"
            >
              Faculty Gateway
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        <span className="text-[10px] uppercase tracking-[1.5em] font-black italic">Initiate Session</span>
      </div>
    </div>
  );
};

export default Hero;
