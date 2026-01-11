import React, { useState } from 'react';

interface ContactPageProps {
  onExit: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onExit }) => {
  const [formData, setFormData] = useState({
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const categories = ['General Inquiry', 'Technical Support', 'Academic Query', 'Grievance Redressal'];

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white text-2xl shadow-2xl animate-in zoom-in duration-700">
              💬
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Support Node</h1>
              <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] mt-2">PESITM PORTAL • Helpdesk</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-[2.5rem] p-10 border border-white/5 animate-in fade-in slide-in-from-bottom duration-1000 delay-200 fill-mode-both">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-3">Initiate Ticket</h2>
                <p className="text-zinc-500 text-sm font-medium tracking-tight">Submit your query to the relevant department node.</p>
              </div>

              <form className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-3 block">Query Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-3 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${formData.category === cat
                            ? 'bg-white text-black shadow-lg scale-105'
                            : 'glass text-zinc-500 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {cat.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-3 block">Subject</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700"
                    placeholder="Brief description of the issue..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1 mb-3 block">Message Payload</label>
                  <textarea
                    rows={6}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-white/20 transition-all font-medium placeholder-zinc-700 resize-none"
                    placeholder="Detailed explanation..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
                    Transmit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-right duration-700 delay-500 fill-mode-both">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-8">Direct Line</h3>
              <div className="space-y-5">
                {[
                  { label: 'Admin Office', val: '+91 8182 64000', icon: '📞' },
                  { label: 'Exam Section', val: '+91 8182 64001', icon: '📠' },
                  { label: 'System Admin', val: 'sysadmin@pesitm.edu', icon: '📧' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-5 p-5 rounded-2xl glass border border-white/5 hover:bg-white/[0.05] transition-colors">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</div>
                      <div className="text-white font-bold text-sm mt-1 tracking-tight">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2.5rem] border border-white/5 animate-in fade-in slide-in-from-right duration-700 delay-700 fill-mode-both">
              <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-6">FAQ Nexus</h3>
              <div className="space-y-4">
                {['Password Reset Protocol', 'Library Access Issues', 'Attendance Correction'].map((faq, i) => (
                  <button key={i} className="w-full text-left p-4 rounded-2xl hover:bg-white/5 text-[9px] font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-all flex justify-between items-center group border border-transparent hover:border-white/5">
                    {faq}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 text-center text-zinc-800 text-[10px] font-black uppercase tracking-[0.4em] pb-12">
          PESITM PORTAL SERVICES • SUPPORT NODE
        </footer>
      </div>
    </div>
  );
};

export default ContactPage;
