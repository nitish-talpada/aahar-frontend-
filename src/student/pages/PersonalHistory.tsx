import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, HandPlatter, History as HistoryIcon } from 'lucide-react';

const PersonalHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const studentName = localStorage.getItem('studentName') || '';
  const studentId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!studentId) return;
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const response = await fetch(`${API_URL}/api/student/${studentId}/history`);
        const data = await response.json();
        if (data.success) {
          setHistoryData(data.history);
        }
      } catch (err) {
        console.error("Failed to fetch history");
      }
    };

    // Initial Fetch
    fetchHistory();

    // Short Polling Sync
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, [studentId]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">History</h2>
        <p className="text-slate-500 text-sm mt-1">Your consumption and wastage timeline.</p>
      </div>

      {historyData.length === 0 ? (
        <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm flex flex-col items-center justify-center text-center mt-12 py-16">
          <div className="w-20 h-20 bg-stone-50 text-slate-300 rounded-full flex items-center justify-center border border-stone-200 shadow-inner mb-4">
             <HistoryIcon size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Timeline Clean</h3>
          <p className="text-sm font-medium text-slate-500 mt-2 max-w-[250px]">
            {studentName ? studentName : "You"}, you haven't visited the mess hall or tracked any meals yet. Ensure your Facial ID is scanned at the counter!
          </p>
        </div>
      ) : (
        <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-300 before:to-transparent">
          {historyData.map((item, index) => (
            <div key={item.date + index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
              
              {/* Timeline Icon */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-stone-50 bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10
                ${item.status === 'checked-in' ? 'text-sage-500' : 'text-slate-400'}
              `}>
                {item.status === 'checked-in' && item.detail === 'Half Plate Taken' ? <HandPlatter size={18} /> : 
                 item.status === 'checked-in' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col relative transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.date}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full 
                    ${item.pts > 0 ? 'bg-sage-100 text-sage-700' : 
                      item.pts < 0 ? 'bg-terracotta-100 text-terracotta-700' : 'bg-stone-100 text-slate-500'}`}>
                    {item.pts > 0 ? '+' : ''}{item.pts === 0 ? '--' : `${item.pts} pts`}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-800">{item.meal}</h4>
                <p className="text-sm font-medium text-slate-500 mt-1">{item.detail}</p>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalHistory;
