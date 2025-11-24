import React, { useState, useEffect } from 'react';
import { Student, SportParticipationEntry } from '../types';
import { Trophy, Medal, ChevronDown } from 'lucide-react';

interface SportParticipationViewProps {
  students: Student[];
}

export const SportParticipationView: React.FC<SportParticipationViewProps> = ({ students }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('Groep 5/6');
  
  const [participationData, setParticipationData] = useState<SportParticipationEntry[]>(() => {
    const saved = localStorage.getItem('lvs_participation');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lvs_participation', JSON.stringify(participationData));
  }, [participationData]);

  const availableGroups = [...new Set(students.map(s => s.group))];
  const filteredStudents = students.filter(s => s.group === selectedGroup);

  const updateEntry = (studentId: string, field: keyof SportParticipationEntry, value: any) => {
    setParticipationData(prev => {
        const existing = prev.find(p => p.studentId === studentId);
        if (existing) {
            return prev.map(p => p.studentId === studentId ? { ...p, [field]: value } : p);
        } else {
            return [...prev, { studentId, hasSwimmingDiploma: false, [field]: value }];
        }
    });
  };

  const getEntry = (studentId: string) => {
      return participationData.find(p => p.studentId === studentId) || { hasSwimmingDiploma: false, sportClub: '', clubName: '', frequency: '' };
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sportparticipatie</h2>
          <p className="text-slate-500">Buitenschoolse sportactiviteiten en zwemdiploma's.</p>
        </div>
      </div>

      <div className="mb-6">
          <div className="relative inline-block">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="appearance-none bg-white border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 pr-8 shadow-sm"
            >
              {availableGroups.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                    <th className="p-4 w-1/4">Leerling</th>
                    <th className="p-4 w-1/6">Zwemdiploma</th>
                    <th className="p-4 w-1/4">Sport(en)</th>
                    <th className="p-4 w-1/4">Vereniging</th>
                    <th className="p-4 w-1/6">Frequentie</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {filteredStudents.map(student => {
                    const data = getEntry(student.id);
                    return (
                        <tr key={student.id} className="hover:bg-slate-50">
                            <td className="p-4 font-medium text-slate-800">{student.firstName} {student.lastName}</td>
                            <td className="p-4">
                                <button
                                    onClick={() => updateEntry(student.id, 'hasSwimmingDiploma', !data.hasSwimmingDiploma)}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                        data.hasSwimmingDiploma ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400'
                                    }`}
                                >
                                    <Medal size={14} />
                                    {data.hasSwimmingDiploma ? 'Ja, behaald' : 'Nog niet'}
                                </button>
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    placeholder="Bijv. Voetbal"
                                    className="w-full border-none bg-transparent focus:ring-0 placeholder-slate-300 text-slate-700"
                                    value={data.sportClub}
                                    onChange={(e) => updateEntry(student.id, 'sportClub', e.target.value)}
                                />
                            </td>
                            <td className="p-4">
                                <input
                                    type="text"
                                    placeholder="Vereniging..."
                                    className="w-full border-none bg-transparent focus:ring-0 placeholder-slate-300 text-slate-700"
                                    value={data.clubName}
                                    onChange={(e) => updateEntry(student.id, 'clubName', e.target.value)}
                                />
                            </td>
                            <td className="p-4">
                                <select
                                    className="bg-transparent border-none focus:ring-0 text-slate-600 text-xs"
                                    value={data.frequency}
                                    onChange={(e) => updateEntry(student.id, 'frequency', e.target.value)}
                                >
                                    <option value="">Kies...</option>
                                    <option value="1x">1x p/w</option>
                                    <option value="2x">2x p/w</option>
                                    <option value="3x+">3x of meer</option>
                                    <option value="Wedstrijd">Alleen wedstrijd</option>
                                </select>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
         </table>
      </div>
    </div>
  );
};