import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';

const mockStudents = [
  { id: 1, name: 'Aarav Sharma', roll: '21CS101', status: 'checked-in', time: '08:14 AM' },
  { id: 2, name: 'Ananya Gupta', roll: '21ME145', status: 'skipped', time: '--' },
  { id: 3, name: 'Rohan Mehta', roll: '21EE089', status: 'pending', time: '--' },
  { id: 4, name: 'Priya Desai', roll: '21EC203', status: 'checked-in', time: '07:45 AM' },
  { id: 5, name: 'Karan Patel', roll: '21CH012', status: 'pending', time: '--' },
];

const LiveAttendance: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleStatus = (id: number, newStatus: string) => {
    setStudents(prev => 
      prev.map(s => s.id === id ? { ...s, status: newStatus, time: newStatus === 'checked-in' ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--' } : s)
    );
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.roll.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      
      {/* Header Controls */}
      <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Live Attendance</h2>
          <p className="text-sm text-slate-500 mt-1">Monitor breakfast check-ins in real-time.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search by name or roll no..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 w-full sm:w-64 transition-all"
          />
        </div>
      </div>

      {/* Embedded Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-stone-100 text-slate-600 font-semibold sticky top-0">
            <tr>
              <th className="px-6 py-4 border-b border-stone-200">Student Name</th>
              <th className="px-6 py-4 border-b border-stone-200">Roll Number</th>
              <th className="px-6 py-4 border-b border-stone-200">Meal Status</th>
              <th className="px-6 py-4 border-b border-stone-200 text-right">Manual Override</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-slate-700">
            {filtered.map((student) => (
              <tr key={student.id} className="hover:bg-stone-50/80 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{student.name}</td>
                <td className="px-6 py-4 font-mono text-slate-500">{student.roll}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                    ${student.status === 'checked-in' ? 'bg-sage-100 text-sage-800 border border-sage-200' : ''}
                    ${student.status === 'skipped' ? 'bg-terracotta-100 text-terracotta-800 border border-terracotta-200' : ''}
                    ${student.status === 'pending' ? 'bg-stone-100 text-slate-600 border border-stone-200' : ''}
                  `}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    {student.status === 'checked-in' && <span className="ml-1 text-[10px] tabular-nums">({student.time})</span>}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button 
                    onClick={() => toggleStatus(student.id, 'checked-in')}
                    className="p-1.5 text-sage-600 hover:bg-sage-50 rounded-md transition-colors"
                    title="Mark Checked-in"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => toggleStatus(student.id, 'skipped')}
                    className="p-1.5 text-terracotta-600 hover:bg-terracotta-50 rounded-md transition-colors"
                    title="Mark Skipped"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            
            {filtered.length === 0 && (
               <tr>
                 <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                   No students found matching your search.
                 </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default LiveAttendance;
