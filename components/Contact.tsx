
import React from 'react';

interface ContactProps {
  onViewDetailed?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onViewDetailed }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-6">Support</div>
        <h2 className="text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Reach Out</h2>
        <p className="text-zinc-500 text-xl font-light mb-12 leading-relaxed">
          The PESITM portal is maintained by the institutional IT desk. 
          For technical grievances, please submit the form or visit the admin wing.
        </p>
        
        <div className="space-y-10 mb-12">
          {[
            { label: 'Campus Address', val: 'PESITM Campus, NH-206, Shivamogga', icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            )},
            { label: 'Official Mail', val: 'support@pesitm.edu.in', icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            )}
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white shrink-0 border border-white/5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
              </div>
              <div>
                <div className="font-black text-[10px] uppercase tracking-widest text-white mb-1">{item.label}</div>
                <div className="text-zinc-600 text-sm">{item.val}</div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={onViewDetailed}
          className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-white/5 px-10 py-4 rounded-xl hover:bg-white hover:text-black transition-all"
        >
          View Detailed Contact Info
        </button>
      </div>

      <div className="glass p-10 md:p-14 rounded-[3.5rem] border border-white/5 relative overflow-hidden">
        <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">First</label>
              <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-light" placeholder="John" />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Last</label>
              <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-light" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">ID / Enrollment</label>
            <input type="text" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/20 transition-all font-light" placeholder="PES12024XX" />
          </div>
          <div className="space-y-3">
            <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-1">Description</label>
            <textarea rows={3} className="w-full bg-white/5 border border-white/5 rounded-[2rem] px-6 py-5 text-white focus:outline-none focus:border-white/20 transition-all font-light resize-none" placeholder="Details of your inquiry..."></textarea>
          </div>
          <button className="w-full bg-white text-black py-4 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all active:scale-95">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
