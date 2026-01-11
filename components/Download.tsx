
import React from 'react';

interface DownloadProps {
  onViewDetailed?: () => void;
}

const Download: React.FC<DownloadProps> = ({ onViewDetailed }) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-4">Mobile Experience</div>
          <h2 className="text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
            The Campus <br />
            <span className="text-zinc-600">In Your Pocket</span>
          </h2>
          <p className="text-zinc-400 font-medium text-lg max-w-xl leading-relaxed mb-10">
            Download the official PESITM Mobile App to stay connected with campus life. 
            Get real-time alerts, check attendance on the go, and access your marks instantly.
          </p>

          <div className="grid gap-6 mb-12">
            {[
              { title: 'Instant Notifications', desc: 'Never miss a notice with push alerts.' },
              { title: 'Biometric Login', desc: 'Secure and fast access with FaceID/Fingerprint.' },
              { title: 'Offline Access', desc: 'View your timetable even without internet.' }
            ].map((feature, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">{feature.title}</h4>
                  <p className="text-zinc-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="flex items-center justify-center space-x-3 bg-white text-black px-8 py-4 rounded-2xl hover:bg-zinc-200 transition-all group">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.96.00-1.76-.56-2.62-.56-.85.00-1.63.54-2.52.56-1.42.04-2.73-.83-3.46-2.11-1.47-2.56-.38-6.39 1.05-8.45.71-1.03 1.77-1.66 2.92-1.68.87-.02 1.71.58 2.25.58.53.00 1.54-.73 2.59-.62.44.02 1.68.18 2.48 1.35-.06.04-1.49.87-1.47 2.61.02 2.09 1.8 2.78 1.83 2.79-.02.06-.29.98-.95 1.96-.58.84-1.18 1.68-2.1 1.69zM15.48 7.31c-.13-1.42.74-2.5 1.4-3.32 0 0 .15-.17.18-.21.05-.06.11-.12.16-.18.49-.6.98-1.11 1.67-1.11.02 0 .04 0 .06.00 0 .13-.01.26-.04.38-.13 1.35-1.02 2.41-1.6 3.14-.04.05-.08.10-.12.15-.05.06-.1.11-.15.17-.46.54-1.08 1.01-1.56.98z" />
              </svg>
              <div className="text-left">
                <p className="text-[8px] uppercase font-bold opacity-60 leading-none">Download on the</p>
                <p className="text-sm font-black leading-none">App Store</p>
              </div>
            </button>
            <button className="flex items-center justify-center space-x-3 border border-white/10 bg-white/5 text-white px-8 py-4 rounded-2xl hover:bg-white/10 transition-all group">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.986 1.986 0 0 1-.502-1.35V3.165c0-.52.192-.992.501-1.351zm11.33 1.314l3.142 1.796c.864.494.864 1.3 0 1.794l-3.313 1.894L11.53 14.26l-3.35 3.35-1.41-1.41 5.92-5.92-5.92-5.92 1.41-1.41 3.35 3.35 3.409-3.407zM14.61 12.82l3.46 3.46c.864.494.864 1.3 0 1.794l-3.142 1.796L11.53 14.26l3.08-1.44z" />
              </svg>
              <div className="text-left">
                <p className="text-[8px] uppercase font-bold opacity-60 leading-none">Get it on</p>
                <p className="text-sm font-black leading-none">Google Play</p>
              </div>
            </button>
          </div>

          <button 
            onClick={onViewDetailed}
            className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest border border-white/5 px-8 py-3 rounded-xl hover:bg-white hover:text-black transition-all"
          >
            Explore Resources Hub
          </button>
        </div>

        <div className="relative cursor-none" onClick={onViewDetailed}>
          {/* Abstract Phone Mockup */}
          <div className="relative z-10 mx-auto w-64 md:w-80 h-[500px] md:h-[600px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden glass">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-20"></div>
            
            {/* Screen Content Mockup */}
            <div className="p-6 pt-12 space-y-6">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-full bg-white/10"></div>
                <div className="w-24 h-4 bg-white/10 rounded-full"></div>
              </div>
              <div className="h-40 w-full bg-white/5 rounded-3xl p-6 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white rounded-xl mb-4"></div>
                <div className="w-2/3 h-4 bg-white/20 rounded-full"></div>
              </div>
              <div className="space-y-3">
                <div className="h-16 w-full bg-white/5 rounded-2xl"></div>
                <div className="h-16 w-full bg-white/5 rounded-2xl"></div>
                <div className="h-16 w-full bg-white/5 rounded-2xl"></div>
              </div>
            </div>
          </div>
          
          {/* Decorative Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/[0.02] blur-[80px] -z-10 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Download;
