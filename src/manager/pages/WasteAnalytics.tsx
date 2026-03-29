import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { ChevronDown, Check } from 'lucide-react';

const WasteAnalytics: React.FC = () => {
  const [wasteData, setWasteData] = useState<any[]>([]);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedTool, setSelectedTool] = useState("Power BI Connector");
  const [aggregates, setAggregates] = useState({ 
    total_staff_waste_kg: 805, 
    total_student_waste_kg: 340, 
    wastage_per_capita_g: 112 
  });

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${API_URL}/api/manager/dashboard/Jaiswal`)
      .then(res => res.json())
      .then(data => {
        if (data.chart_data) {
          setWasteData(data.chart_data);
          setAggregates(data.aggregates);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-center">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Staff Overpreparation</span>
          <div className="flex items-end gap-3">
             <span className="text-4xl font-bold text-slate-800">{aggregates.total_staff_waste_kg} <span className="text-xl text-slate-400 font-normal">kg</span></span>
             <span className="text-sm text-sage-600 font-medium mb-1.5 flex items-center">-12% this week</span>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-terracotta-200 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-terracotta-50 rounded-bl-full -z-0"></div>
          <span className="text-sm font-semibold text-terracotta-700 uppercase tracking-wider mb-2 relative z-10">Student Plate Scraps</span>
          <div className="flex items-end gap-3 relative z-10">
             <span className="text-4xl font-bold text-terracotta-600">{aggregates.total_student_waste_kg} <span className="text-xl opacity-70 font-normal">kg</span></span>
             <span className="text-sm text-terracotta-600 font-medium mb-1.5 flex items-center">+5% alert</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-center">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Wastage Per Capita</span>
          <div className="flex items-end gap-3">
             <span className="text-4xl font-bold text-slate-800">{aggregates.wastage_per_capita_g} <span className="text-xl text-slate-400 font-normal">g</span></span>
             <span className="text-sm text-slate-500 font-medium mb-1.5 mt-1">Avg/Student</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm h-96 flex flex-col">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Staff vs Student Waste</h3>
            <p className="text-sm text-slate-500">Weekly tracking of staff overpreparation versus student plate scrapings.</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm"
            >
              {selectedTool}
              <ChevronDown size={16} />
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 overflow-hidden py-2 animate-fade-in-up">
                <button onClick={() => { setSelectedTool("Power BI Connector"); setShowExportMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${selectedTool === 'Power BI Connector' ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'}`}>
                  {selectedTool === "Power BI Connector" && <Check size={18} strokeWidth={3} className="text-[#0B5CFF]" />}
                  <span className={selectedTool !== "Power BI Connector" ? "pl-[30px]" : ""}>Power BI Connector</span>
                </button>
                <button onClick={() => { setSelectedTool("Tableau Connector"); setShowExportMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${selectedTool === 'Tableau Connector' ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'}`}>
                  {selectedTool === "Tableau Connector" && <Check size={18} strokeWidth={3} className="text-[#0B5CFF]" />}
                  <span className={selectedTool !== "Tableau Connector" ? "pl-[30px]" : ""}>Tableau Connector</span>
                </button>
                <button onClick={() => { setSelectedTool("JDBC Driver"); setShowExportMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${selectedTool === 'JDBC Driver' ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'}`}>
                  {selectedTool === "JDBC Driver" && <Check size={18} strokeWidth={3} className="text-[#0B5CFF]" />}
                  <span className={selectedTool !== "JDBC Driver" ? "pl-[30px]" : ""}>JDBC Driver</span>
                </button>
                <button onClick={() => { setSelectedTool("ODBC Driver"); setShowExportMenu(false); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors ${selectedTool === 'ODBC Driver' ? 'font-bold text-slate-900' : 'text-slate-700 font-medium'}`}>
                  {selectedTool === "ODBC Driver" && <Check size={18} strokeWidth={3} className="text-[#0B5CFF]" />}
                  <span className={selectedTool !== "ODBC Driver" ? "pl-[30px]" : ""}>ODBC Driver</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wasteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                cursor={{fill: '#f5f5f4'}} 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '14px', color: '#475569'}} />
              <Bar dataKey="staff" name="Staff Waste (kg)" fill="#849b87" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Bar dataKey="student" name="Student Waste (kg)" fill="#e2725b" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default WasteAnalytics;
