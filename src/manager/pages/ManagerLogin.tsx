import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Lock, ArrowRight } from 'lucide-react';

const MESS_OPTIONS = ["Jaiswal", "Bhopal", "Mohini", "Rgouras"];

const ManagerLogin: React.FC = () => {
  const [selectedMess, setSelectedMess] = useState(MESS_OPTIONS[0]);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/manager/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mess_name: selectedMess, password })
      });
      const data = await response.json();
      
      if (data.success) {
        navigate('/manager/attendance');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Could not connect to server.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
        <div className="p-8 bg-sage-800 text-stone-50 text-center">
          <div className="mx-auto w-16 h-16 bg-sage-700 rounded-full flex items-center justify-center mb-4">
            <ChefHat size={32} className="text-stone-50" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Manager Portal</h2>
          <p className="text-sage-200 mt-2 font-medium">Aahar Ecosystem</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && <div className="p-3 bg-terracotta-100 text-terracotta-700 rounded-xl text-sm font-semibold">{error}</div>}
            <div>
              <label htmlFor="mess" className="block text-sm font-semibold text-slate-700 mb-2">
                Select Mess
              </label>
              <div className="relative">
                <select
                  id="mess"
                  value={selectedMess}
                  onChange={(e) => setSelectedMess(e.target.value)}
                  className="block w-full appearance-none rounded-xl border-stone-300 bg-stone-50 px-4 py-3 text-slate-700 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 shadow-sm transition-all"
                >
                  {MESS_OPTIONS.map((mess) => (
                    <option key={mess} value={mess}>
                      {mess} Mess
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Manager Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border-stone-300 bg-stone-50 pl-11 pr-4 py-3 text-slate-700 placeholder-slate-400 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-500/20 shadow-sm transition-all"
                  placeholder="Enter manager password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-sage-600 px-4 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-sage-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-600 transition-all active:scale-[0.98]"
            >
              Secure Login <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerLogin;
