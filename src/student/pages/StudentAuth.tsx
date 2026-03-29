import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Upload, Leaf } from 'lucide-react';

const MESS_OPTIONS = ["Jaiswal", "Bhopal", "Mohini", "Rgouras"];

interface Props {
  mode: 'login' | 'signup';
}

const StudentAuth: React.FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [messName, setMessName] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!photoFile) {
          setError('Please securely upload your facial pass photo.');
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('branch', branch);
        formData.append('roll_number', rollNumber);
        formData.append('password', password);
        formData.append('mess_name', messName);
        formData.append('image', photoFile);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/student/register`, {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          setSuccessMsg(data.message);
          setTimeout(() => navigate('/student/login'), 2000);
        } else {
          setError(data.detail || data.message || 'Registration failed.');
        }

      } else {
        // Login
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/student/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roll_number: rollNumber, password: password })
        });
        
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('studentName', data.message.replace('Welcome back, ', '').replace('.', ''));
          localStorage.setItem('studentId', data.student_id);
          localStorage.setItem('studentRoll', data.roll_number || '');
          localStorage.setItem('studentBranch', data.branch || '');
          localStorage.setItem('studentMess', data.mess_name || '');
          localStorage.setItem('studentPoints', data.points || 0);

          if (data.profile_pic) {
             localStorage.setItem('studentAvatar', `data:image/jpeg;base64,${data.profile_pic}`);
          }
          navigate('/student/dashboard');
        } else {
          setError(data.message || 'Invalid credentials');
        }
      }
    } catch (err) {
      setError('Could not connect to the backend server.');
    } finally {
      if (mode === 'login') {
         setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4 py-8 relative">
      <div className="absolute inset-0 z-0 bg-sage-50" style={{ backgroundImage: 'radial-gradient(#849b87 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.15 }} />

      <div className="z-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 mb-4">
             <Leaf size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Aahar</h1>
          <p className="text-sage-600 font-medium">Student Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-stone-100 flex flex-col gap-5">
          <h2 className="text-xl font-bold text-slate-800 text-center mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

          {error && <div className="p-3 bg-terracotta-100 text-terracotta-700 rounded-xl text-sm font-semibold">{error}</div>}
          {successMsg && <div className="p-3 bg-sage-100 text-sage-700 rounded-xl text-sm font-semibold">{successMsg}</div>}

          {mode === 'signup' && (
            <>
              {/* Photo Upload for Facial Rec */}
              <div className="flex flex-col items-center gap-3">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center w-full">Facial Pass Photo</label>
                <div className="relative group cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-sage-300 hover:border-sage-500 bg-stone-50 overflow-hidden flex items-center justify-center transition-all">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-sage-500 transition-colors" />
                  )}
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handlePhotoUpload} required />
                </div>
              </div>

              {/* Full Name */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Full Name" className="block w-full rounded-xl border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-slate-700 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 transition-all text-sm" />
              </div>

              {/* Branch */}
              <div className="flex gap-3">
                <input type="text" value={branch} onChange={e => setBranch(e.target.value)} required placeholder="Branch (e.g. CSE)" className="block w-1/2 rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-slate-700 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 transition-all text-sm uppercase placeholder:normal-case" />
                <input type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required placeholder="Roll Number" className="block w-1/2 rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-slate-700 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 transition-all text-sm uppercase placeholder:normal-case" />
              </div>

              {/* Mess Selection */}
              <select required value={messName} onChange={e => setMessName(e.target.value)} className="block w-full rounded-xl border-stone-200 bg-stone-50 px-4 py-3 text-slate-700 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 transition-all text-sm appearance-none">
                <option value="" disabled>Select Default Mess...</option>
                {MESS_OPTIONS.map(mess => <option key={mess} value={mess}>{mess} Mess</option>)}
              </select>
            </>
          )}

          {/* Email / Roll Num & Password */}
          {mode === 'login' && (
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
               </div>
               <input type="text" value={rollNumber} onChange={e => setRollNumber(e.target.value)} required placeholder="Roll Number / Email" className="block w-full rounded-xl border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-slate-700 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 transition-all text-sm" />
            </div>
          )}

          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
             </div>
             <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Secure Password" className="block w-full rounded-xl border-stone-200 bg-stone-50 pl-10 pr-4 py-3 text-slate-700 focus:border-sage-500 focus:bg-white focus:ring-2 focus:ring-sage-500/20 transition-all text-sm" />
          </div>

          <button disabled={loading} type="submit" className="mt-2 w-full bg-slate-800 text-stone-50 font-bold py-3.5 rounded-xl shadow-md shadow-slate-800/20 hover:bg-slate-900 active:scale-[0.98] transition-all disabled:opacity-50">
             {loading ? 'Processing...' : (mode === 'login' ? 'Enter Portal' : 'Register Identity')}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-8">
           {mode === 'login' ? "Don't have a profile yet? " : "Already registered? "}
           <Link to={mode === 'login' ? '/student/signup' : '/student/login'} className="font-semibold text-sage-600 hover:text-sage-700 transition-colors">
             {mode === 'login' ? 'Create one' : 'Sign in'}
           </Link>
        </p>
      </div>
    </div>
  );
};

export default StudentAuth;
