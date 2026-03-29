import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Trophy, ArrowRight, Medal, Briefcase } from 'lucide-react';

export default function LandingPage() {
  const [leaders, setLeaders] = useState<any[]>([]);
  
  // 3D Parallax Interactive Logic
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const fetchLeaderboard = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/leaderboard`);
      const data = await response.json();
      setLeaders(data);
    } catch (error) {
      console.error("Backend ecosystem sync pending...", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 3000);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInteract = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
       clientX = e.touches[0].clientX;
       clientY = e.touches[0].clientY;
    } else {
       clientX = (e as React.MouseEvent).clientX;
       clientY = (e as React.MouseEvent).clientY;
    }
    
    const x = (clientX / window.innerWidth - 0.5) * 30; // Max rotation 15deg
    const y = (clientY / window.innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  return (
    <div 
      className="min-h-screen bg-stone-50 font-sans selection:bg-sage-200 overflow-hidden"
      onMouseMove={handleInteract}
      onTouchMove={handleInteract}
    >
      
      {/* 1. Navigation Bar */}
      <nav className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200 fixed top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-sage-600 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
               <Leaf size={20} className="text-white" />
             </div>
             <span className="text-xl font-black text-slate-800 tracking-tight hidden sm:block">Aahar <span className="text-sage-600 font-medium">| Ecosystem</span></span>
             <span className="text-xl font-black text-slate-800 tracking-tight sm:hidden">Aahar</span>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/student/login" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">Student Login</Link>
             <Link to="/manager/login" className="text-sm font-bold bg-slate-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full hover:bg-slate-900 shadow-md transition-all active:scale-95 flex items-center gap-2">
               Management <Briefcase size={16} className="hidden sm:inline" />
             </Link>
          </div>
        </div>
      </nav>

      {/* 2. The Hero Section (The Hook) with Dynamic 3D Vibe */}
      <section className="min-h-screen pt-32 pb-20 px-6 relative flex flex-col justify-center items-center perspective-1000">
        
        {/* Interactive 3D Background Mesh */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center"
          style={{
            transform: `translate3d(${mousePos.x * -1}px, ${mousePos.y * -1 + scrollY * 0.2}px, -100px) rotateX(${mousePos.y * -0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Earthy Grid Lines */}
          <div className="absolute w-[200vw] h-[200vw] sm:w-[150vw] sm:h-[150vw]" style={{
            backgroundImage: `linear-gradient(to right, #849b8720 1px, transparent 1px), linear-gradient(to bottom, #849b8720 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) scale(1.5)',
            transformOrigin: 'center center'
          }} />
          
          {/* Glowing Atmospheric Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sage-300 rounded-full blur-[100px] opacity-40 mix-blend-multiply" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-300 rounded-full blur-[120px] opacity-50 mix-blend-multiply" />
        </div>
        
        <div 
          className="max-w-4xl mx-auto text-center relative z-10 w-full px-4"
          style={{
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3 - scrollY * 0.1}px, 0)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-sage-700 shadow-sm mb-8 animate-fade-in-up">
            <Trophy size={16} className="text-sage-500" /> The Unlimited Paradox is Solved.
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-800 tracking-tight leading-[1.1] mb-6 sm:mb-8 text-balance">
            Eat Well. Waste Nothing. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-sage-800 inline-block" style={{ filter: 'drop-shadow(0px 4px 12px rgba(132, 155, 135, 0.2))' }}>
              Top the Leaderboard.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 text-pretty px-2 sm:px-0">
            No apps at the dinner table. No complicated surveys. Just enjoy your meal, drop your completely clean plate at the Zero-Waste Counter, and let our passive security camera calculate and award your Eco-Points automatically.
          </p>
          
          <Link to="/student/login" className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-sage-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sage-700 shadow-xl shadow-sage-600/20 hover:-translate-y-1 transition-all active:scale-95">
            Join the Zero-Waste Movement <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-slate-400 z-10 hidden sm:flex">
          <span className="text-xs uppercase font-bold tracking-widest">Live Ranks</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent" />
        </div>
      </section>

      {/* 3. The Social Proof (Live Leaderboard) */}
      <section className="py-20 bg-stone-100 border-t border-stone-200 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight mb-3">Campus Champions: Live Ranks</h2>
            <p className="text-slate-500 font-medium text-sm sm:text-base">As plates are dropped, points are earned. Real-time ecosystem tracking.</p>
          </div>

          <div className="bg-white rounded-[2rem] sm:p-8 p-4 border border-stone-100 shadow-xl shadow-stone-200/50">
             {leaders.length === 0 ? (
               <div className="text-center py-12 text-slate-400 font-bold animate-pulse px-4">
                  Establishing secure neural link to Campus Database...
               </div>
             ) : (
               <div className="flex flex-col gap-3 sm:gap-4 w-full">
                 {leaders.map((student, index) => {
                   let rankStyle = "bg-stone-50 border-stone-100 text-slate-500 hover:bg-white";
                   let rankIcon = null;
                   
                   if (index === 0) {
                     rankStyle = "bg-gradient-to-r from-amber-50 to-white border-amber-200 text-amber-600 ring-4 ring-amber-50 shadow-md sm:scale-[1.02] z-10";
                     rankIcon = <Medal size={24} className="text-amber-500 hidden sm:block" />;
                   } else if (index === 1) {
                     rankStyle = "bg-gradient-to-r from-stone-100 to-white border-stone-200 text-slate-600 shadow-sm";
                     rankIcon = <Medal size={24} className="text-slate-400 hidden sm:block" />;
                   } else if (index === 2) {
                     rankStyle = "bg-gradient-to-r from-orange-50 to-white border-orange-200 text-orange-700 shadow-sm";
                     rankIcon = <Medal size={24} className="text-orange-500 hidden sm:block" />;
                   }

                   return (
                     <div key={index} className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all ${rankStyle}`}>
                       <div className="flex items-center gap-3 sm:gap-5">
                         <div className="font-black text-xl sm:text-2xl w-6 sm:w-8 text-center opacity-80">
                           #{index + 1}
                         </div>
                         <div className="h-8 w-[2px] bg-stone-200 rounded-full hidden sm:block" />
                         <span className="text-base sm:text-lg font-bold text-slate-800 line-clamp-1">{student.name}</span>
                         {rankIcon}
                       </div>
                       <div className="flex flex-col items-end shrink-0 pl-2">
                         <span className="text-lg sm:text-xl font-black text-sage-600">{student.points}</span>
                         <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-sage-400">Eco-Pts</span>
                       </div>
                     </div>
                   );
                 })}
               </div>
             )}
          </div>
        </div>
      </section>

      {/* 4. Minimal Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800 text-center relative z-10 break-words">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
           <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
               <Leaf size={24} className="text-sage-500" />
           </div>
           <p className="text-slate-400 font-medium text-xs sm:text-sm">
             Aahar Decentralized Ecology. <br className="sm:hidden" /> Engineering a sustainable college mess hall.
           </p>
         </div>
      </footer>
    </div>
  );
}
