import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<any[]>([]);

  // This function fetches the latest data from your Python backend
  const fetchLeaderboard = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/leaderboard`);
      const data = await response.json();
      setLeaders(data);
    } catch (error) {
      console.error("Backend not running yet...", error);
    }
  };

  useEffect(() => {
    // 1. Fetch data immediately when the page loads
    fetchLeaderboard();

    // 2. Set up the Polling: Fetch data every 3 seconds (3000 milliseconds)
    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 3000);

    // 3. Clean up the timer if the user leaves the page
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Leaderboard</h2>
        <p className="text-slate-500 text-sm mt-1">Zero-Waste Champions across the ecosystem.</p>
      </div>
      
      <div className="bg-white rounded-[2rem] p-6 border border-stone-100 shadow-sm relative overflow-hidden">
        <ul className="space-y-4">
          {leaders.map((student, index) => (
            <li key={student.name + index} className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl border border-stone-100 transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-slate-300 w-6">#{index + 1}</span>
                <span className="text-lg font-bold text-slate-700">{student.name}</span>
              </div>
              <span className="bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">{student.points} pts</span>
            </li>
          ))}
          
          {leaders.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-medium">Fetching leaderboard logic from the backend...</div>
          )}
        </ul>
      </div>
    </div>
  );
}
