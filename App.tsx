
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InternalMarksPage from './components/InternalMarksPage';
import TimetablePage from './components/TimetablePage';
import ContactPage from './components/ContactPage';
import NoticesPage from './components/NoticesPage';
import AttendancePage from './components/AttendancePage';
import DownloadPage from './components/DownloadPage';
import TeacherPortal from './components/TeacherPortal';
import StudentPortal from './components/StudentPortal';
import ParentsPortal from './components/ParentsPortal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [view, setView] = useState<'landing' | 'teacher' | 'student-portal' | 'parent-portal' | 'notices-page' | 'attendance-page' | 'marks-page' | 'timetable-page' | 'download-page' | 'contact-page'>('landing');

  // Navigate back to the main landing view (optional now, but kept for logic if needed)
  const closePortal = () => {
    setView('landing');
    setActiveSection('home');
    window.scrollTo(0, 0);
  };

  // View navigation handlers
  const navigateTo = (viewName: any, section: string) => {
    setView(viewName);
    setActiveSection(section);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (view) {
      case 'teacher':
        return <TeacherPortal onExit={closePortal} />;
      case 'student-portal':
        return <StudentPortal onExit={closePortal} />;
      case 'parent-portal':
        return <ParentsPortal onExit={closePortal} />;
      case 'notices-page':
        return <NoticesPage onExit={closePortal} />;
      case 'attendance-page':
        return <AttendancePage onExit={closePortal} />;
      case 'marks-page':
        return <InternalMarksPage onExit={closePortal} />;
      case 'timetable-page':
        return <TimetablePage onExit={closePortal} />;
      case 'download-page':
        return <DownloadPage onExit={closePortal} />;
      case 'contact-page':
        return <ContactPage onExit={closePortal} />;
      case 'landing':
      default:
        return (
          <Hero
            onStudentLogin={() => navigateTo('student-portal', 'student-portal')}
            onParentLogin={() => navigateTo('parent-portal', 'parent-portal')}
            onTeacherLogin={() => navigateTo('teacher', 'teacher')}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <Navbar
        activeSection={activeSection}
        onHomeClick={closePortal}
        onNoticesClick={() => navigateTo('notices-page', 'notices')}
        onAttendanceClick={() => navigateTo('attendance-page', 'attendance')}
        onMarksClick={() => navigateTo('marks-page', 'marks')}
        onTimetableClick={() => navigateTo('timetable-page', 'timetable')}
        onDownloadClick={() => navigateTo('download-page', 'download')}
        onContactClick={() => navigateTo('contact-page', 'contact')}
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24">
        {renderContent()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 py-6 text-center text-zinc-600 text-[8px] tracking-[0.4em] uppercase font-bold z-20 pointer-events-none">
        <p>© {new Date().getFullYear()} PESITM. Excellence in Innovation.</p>
      </footer>
    </div>
  );
};

export default App;
