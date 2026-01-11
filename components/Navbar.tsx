import React from 'react';

interface NavbarProps {
  activeSection: string;
  onHomeClick: () => void;
  onNoticesClick: () => void;
  onAttendanceClick: () => void;
  onMarksClick: () => void;
  onTimetableClick: () => void;
  onDownloadClick: () => void;
  onContactClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onHomeClick,
  onNoticesClick,
  onAttendanceClick,
  onMarksClick,
  onTimetableClick,
  onDownloadClick,
  onContactClick
}) => {
  const navItems = [
    { label: 'Home', id: 'home', onClick: onHomeClick },
    { label: 'Notice', id: 'notices', onClick: onNoticesClick },
    { label: 'Attendance', id: 'attendance', onClick: onAttendanceClick },
    { label: 'Marks', id: 'marks', onClick: onMarksClick },
    { label: 'Time Table', id: 'timetable', onClick: onTimetableClick },
    { label: 'Download', id: 'download', onClick: onDownloadClick },
    { label: 'Support', id: 'contact', onClick: onContactClick },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass border-b border-white/5 backdrop-blur-3xl">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <button onClick={onHomeClick} className="flex items-center group">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-black font-black text-lg shadow-2xl transition-transform group-hover:rotate-12">
              P
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="text-white font-black uppercase tracking-tighter text-lg italic font-brand">PESITM</span>
              <span className="text-zinc-600 text-[8px] font-black uppercase tracking-[0.3em]">Integrated Portal</span>
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            item.onClick ? (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`text-[9px] uppercase tracking-[0.2em] font-black transition-all relative group ${activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-white'
                  }`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full opacity-50"></span>
              </button>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-[9px] uppercase tracking-[0.2em] font-black transition-all relative group ${activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-white'
                  }`}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full opacity-50"></span>
              </a>
            )
          ))}
        </div>

        <div className="md:hidden">
          <button className="p-3 text-white glass rounded-xl border-white/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
