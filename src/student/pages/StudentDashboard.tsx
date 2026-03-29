import React from 'react';
import { Leaf, Award, Utensils, Droplets } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const studentName = localStorage.getItem('studentName') || 'Aarav';
  const studentAvatar = localStorage.getItem('studentAvatar') || 'https://i.pravatar.cc/150?img=11';
  const studentMess = localStorage.getItem('studentMess') || 'Assigned';
  const points = parseInt(localStorage.getItem('studentPoints') || '0', 10);
  const totalSavedWeight = (points * 0.035).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, {studentName}</h2>
          <p className="text-slate-500 text-sm mt-1">Ready for breakfast?</p>
        </div>
        <div className="w-12 h-12 bg-sage-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
          <img src={studentAvatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Main Status Card */}
      <div className="bg-white rounded-[2rem] p-6 border border-stone-100 shadow-xl shadow-stone-200/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-sage-50 rounded-bl-[100px] z-0" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center mb-4 ring-4 ring-white shadow-sm">
            <Utensils size={24} />
          </div>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Current Meal</p>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">Breakfast</h3>
          <p className="text-sm font-medium text-sage-600 mt-2 bg-sage-50 px-3 py-1 rounded-full">{studentMess} Mess • 07:30 - 09:30 AM</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-100 rounded-3xl p-5 border border-stone-200/60 shadow-inner">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Leaf size={20} className="text-sage-500" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800 tracking-tight mb-1">{points}</p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Wastage Points</p>
        </div>

        <div className="bg-stone-100 rounded-3xl p-5 border border-stone-200/60 shadow-inner">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Droplets size={20} className="text-terracotta-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800 tracking-tight mb-1">{totalSavedWeight}<span className="text-lg text-slate-400">kg</span></p>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total Saved</p>
        </div>
      </div>

      {/* Action Banner */}
      <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl flex items-center justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-sage-800/40 to-transparent opacity-50 z-0" />
        <div className="relative z-10">
          <h4 className="text-lg font-bold mb-1 group-hover:text-sage-300 transition-colors">Half Plate Initiative</h4>
          <p className="text-slate-400 text-sm max-w-[200px] leading-snug">Earn +50 pts by opting for a half plate today.</p>
        </div>
        <div className="relative z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
          <Award className="text-sage-400" size={24} />
        </div>
      </div>
      
    </div>
  );
};

export default StudentDashboard;
