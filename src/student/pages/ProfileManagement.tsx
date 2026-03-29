import React, { useState } from 'react';
import { Camera, User, Mail, ShieldCheck, LogOut } from 'lucide-react';

const ProfileManagement: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const studentName = localStorage.getItem('studentName') || 'New Student';
  const studentBranch = localStorage.getItem('studentBranch') || 'B.Tech';
  const studentRoll = localStorage.getItem('studentRoll') || 'NOT_ASSIGNED';
  const studentMess = localStorage.getItem('studentMess') || 'No';
  const [avatar, setAvatar] = useState(localStorage.getItem('studentAvatar') || "https://i.pravatar.cc/150?img=11");

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const studentId = localStorage.getItem('studentId');
    if (!file || !studentId) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/student/${studentId}/profile_pic`, {
        method: 'PUT',
        body: formData
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        const newAvatar = `data:image/jpeg;base64,${data.profile_pic}`;
        localStorage.setItem('studentAvatar', newAvatar);
        setAvatar(newAvatar);
        alert("✨ Facial Security Pass perfectly updated!");
      } else {
        alert(data.message || "Failed to update. Ensure your face is clearly visible.");
      }
    } catch (err) {
      alert("Terminal Sync Error: Processing array unavailable.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Profile</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your identity and preferences.</p>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-sage-50" />
        
        <div className="relative group mt-8">
          <div className={`w-28 h-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-stone-100 flex items-center justify-center transition-opacity ${isUploading ? 'opacity-50' : ''}`}>
             <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label className={`absolute bottom-0 right-0 p-2 rounded-full text-white shadow-lg transition-all cursor-pointer ${isUploading ? 'bg-slate-400' : 'bg-sage-600 hover:bg-sage-700 hover:scale-105 active:scale-95'}`}>
             <Camera size={18} className={isUploading ? "animate-pulse" : ""} />
             <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={isUploading} />
          </label>
        </div>

        <div className="text-center mt-4">
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">{studentName}</h3>
          <p className="text-sm font-semibold text-sage-600 tracking-wider">
            {studentBranch} {studentRoll} • {studentMess} Mess
          </p>
        </div>
      </div>

      {/* Details Form */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-stone-200 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Personal Details</h4>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="text-xs font-bold text-sage-600 hover:text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit'}
          </button>
        </div>

        <div className="space-y-4 relative">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-stone-50 rounded-xl text-slate-400">
               <User size={20} />
             </div>
             <div className="flex-1">
               <label className="text-xs font-semibold text-slate-400 block mb-1">Full Name</label>
               <input 
                 type="text" 
                 defaultValue={studentName} 
                 disabled={!isEditing}
                 className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none focus:border-sage-500 border-b border-transparent disabled:opacity-100 transition-colors"
               />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="p-3 bg-stone-50 rounded-xl text-slate-400">
               <Mail size={20} />
             </div>
             <div className="flex-1">
               <label className="text-xs font-semibold text-slate-400 block mb-1">Roll / Contact ID</label>
               <input 
                 type="text" 
                 defaultValue={studentRoll} 
                 disabled={!isEditing}
                 className="w-full bg-transparent text-sm font-semibold text-slate-800 focus:outline-none focus:border-sage-500 border-b border-transparent disabled:opacity-100 transition-colors uppercase"
               />
             </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="p-3 bg-sage-50 rounded-xl text-sage-600">
               <ShieldCheck size={20} />
             </div>
             <div className="flex-1">
               <label className="text-xs font-semibold text-slate-400 block mb-1">Facial Auth Status</label>
               <p className="text-sm font-semibold text-sage-600">Verified & Active</p>
             </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => {
          localStorage.clear();
          window.location.href = '/student/login';
        }}
        className="w-full py-4 bg-terracotta-50 text-terracotta-600 rounded-[2rem] font-bold shadow-sm border border-terracotta-100 flex items-center justify-center gap-2 hover:bg-terracotta-100 active:scale-[0.98] transition-all">
        <LogOut size={18} /> Sign Out Of Portal
      </button>

    </div>
  );
};

export default ProfileManagement;
