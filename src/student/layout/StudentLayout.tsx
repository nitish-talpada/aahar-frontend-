import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Clock, UserCircle, Bell, Trophy } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/student/dashboard', icon: Home },
  { name: 'Leaderboard', path: '/student/leaderboard', icon: Trophy },
  { name: 'History', path: '/student/history', icon: Clock },
  { name: 'Profile', path: '/student/profile', icon: UserCircle },
];

const StudentLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-[100dvh] bg-stone-50 max-w-md mx-auto shadow-2xl relative overflow-hidden font-sans border-x border-stone-200">
      
      {/* Mobile Top Header */}
      <header className="h-16 flex items-center justify-between px-5 bg-white shadow-sm z-20 relative sticky top-0">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Aahar</h1>
          <p className="text-[10px] font-semibold tracking-wider uppercase text-sage-600">Student Portal</p>
        </div>
        <button className="relative p-2 text-slate-400 hover:bg-stone-50 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-terracotta-500 ring-2 ring-white" />
        </button>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto pb-20 relative">
        <div className="p-5">
           <Outlet />
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-stone-200 pb-safe z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex justify-around items-center h-16 pointer-events-auto">
          {NAV_ITEMS.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 relative group"
              >
                {/* Active Indicator Top Pill */}
                {isActive && (
                  <div className="absolute top-0 w-8 h-1 bg-sage-500 rounded-b-full transition-all" />
                )}
                
                <item.icon 
                  className={`h-6 w-6 transition-all duration-300 ${
                    isActive 
                      ? 'text-sage-600 scale-110' 
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] transition-colors font-medium ${
                  isActive ? 'text-sage-700' : 'text-slate-500'
                }`}>
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>

    </div>
  );
};

export default StudentLayout;
