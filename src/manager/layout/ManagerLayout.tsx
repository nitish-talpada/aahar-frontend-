import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Users, BarChart3, Settings, LogOut, Bell } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Live Attendance', path: '/manager/attendance', icon: Users },
  { name: 'Waste Analytics', path: '/manager/analytics', icon: BarChart3 },
];

const ManagerLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-stone-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-slate-900 text-stone-300 hidden md:flex flex-col flex-shrink-0 shadow-2xl relative z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-stone-50 tracking-wide">Aahar <span className="text-sage-400">Manager</span></span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-sage-600 font-medium text-white shadow-md' 
                    : 'hover:bg-slate-800 hover:text-stone-50'
                  }
                `}
              >
                <item.icon className={`h-5 w-5 mr-3 flex-shrink-0 ${isActive ? 'text-sage-100' : 'text-slate-500 group-hover:text-stone-300'}`} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center px-3 py-2.5 w-full text-left rounded-lg hover:bg-slate-800 hover:text-stone-50 transition-colors">
            <Settings className="h-5 w-5 mr-3 flex-shrink-0 text-slate-500" />
            Settings
          </button>
          <NavLink to="/manager/login" className="flex items-center px-3 py-2.5 w-full text-left rounded-lg text-terracotta-400 hover:bg-slate-800 hover:text-terracotta-300 transition-colors mt-1">
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
            Logout
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-6 shadow-sm sticky top-0 z-20">
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-bold text-slate-800 leading-tight">Bhopal Mess</h1>
            <span className="text-xs text-sage-600 font-medium tracking-wide">Serving Breakfast</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:bg-stone-50 rounded-full transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-2 block h-2 w-2 rounded-full bg-terracotta-500 ring-2 ring-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-sage-200 border border-sage-300 flex items-center justify-center text-sage-800 font-bold overflow-hidden">
               <span className="text-sm">AD</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto bg-stone-50 p-6 md:p-8 relative">
           {/* Soft background pattern */}
           <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #64748b 1px, transparent 0)', backgroundSize: '24px 24px' }} />
           
           <div className="relative z-10 max-w-6xl mx-auto h-full space-y-6">
              <Outlet />
           </div>
        </main>
      </div>

    </div>
  );
};

export default ManagerLayout;
