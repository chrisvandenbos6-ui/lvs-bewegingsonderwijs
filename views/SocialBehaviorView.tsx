import React, { useState, useEffect } from 'react';
import { Student, BehaviorObservation, LevelColor } from '../types';
import { Heart, Users, AlertTriangle, ChevronDown, Check } from 'lucide-react';

interface SocialBehaviorViewProps {
  students: Student[];
}

const BEHAVIOR_ASPECTS = [
  'Samenwerken',
  'Fair Play & Eerlijkheid',
  'Omgaan met verlies/winst',
  'Hulpverlenen',
  'Zelfstandigheid'
];

export const SocialBehaviorView: React.FC<SocialBehaviorViewProps> = ({ students }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('Groep 5/6');
  const [selectedAspect, setSelectedAspect] = useState<string>(BEHAVIOR_ASPECTS[0]);
  
  const [observations, setObservations] = useState<BehaviorObservation[]>(() => {
    const saved = localStorage.getItem('lvs_behavior');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lvs_behavior', JSON.stringify(observations));
  }, [observations]);

  const availableGroups = [...new Set(students.map(s => s.group))];
  const filteredStudents = students.filter(s => s.group === selectedGroup);

  const handleObservation = (studentId: string, level: 1 | 2 | 3 | 4) => {
    const newObs: BehaviorObservation = {
        studentId,
        aspect: selectedAspect,
        level
    };
    setObservations(prev => {
        const filtered = prev.filter(o => !(o.studentId === studentId && o.aspect === selectedAspect));
        return [...filtered, newObs];
    });
  };

  const getLevel = (studentId: string) => {
      return observations.find(o => o.studentId === studentId && o.aspect === selectedAspect)?.level;
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return LevelColor.PURPLE;
      case 2: return LevelColor.YELLOW;
      case 3: return LevelColor.GREEN;
      case 4: return LevelColor.BLUE;
      default: return 'bg-white border border-slate-200 text-slate-300';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Speelgedrag & Sociale Vaardigheden</h2>
          <p className="text-slate-500">Observaties omtrent de sociaal-emotionele ontwikkeling.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4">
        <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">Groep</label>
            <div className="relative">
                <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 pr-8"
                >
                {availableGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
            </div>
        </div>
        <div>
            <label className="block text-xs text-slate-500 font-medium mb-1">Observatie Aspect</label>
            <div className="relative">
                <select
                value={selectedAspect}
                onChange={(e) => setSelectedAspect(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pr-8"
                >
                {BEHAVIOR_ASPECTS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200">
             <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <span className="font-medium text-slate-700">Observatielijst</span>
                <div className="flex gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-fuchsia-800 text-white">N1: Ontwikkeling nodig</span>
                    <span className="px-2 py-1 rounded bg-emerald-500 text-white">N3: Voldoende</span>
                </div>
             </div>
             <div className="divide-y divide-slate-100">
                {filteredStudents.map(student => {
                    const currentLevel = getLevel(student.id);
                    return (
                        <div key={student.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                             <div className="font-medium text-slate-800 w-1/3">{student.firstName} {student.lastName}</div>
                             <div className="flex gap-2">
                                {[1, 2, 3, 4].map(lvl => (
                                    <button
                                        key={lvl}
                                        onClick={() => handleObservation(student.id, lvl as any)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                            currentLevel === lvl ? getLevelColor(lvl) : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                                        }`}
                                        title={`Niveau ${lvl}`}
                                    >
                                        {lvl}
                                    </button>
                                ))}
                             </div>
                        </div>
                    );
                })}
             </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 h-fit">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Heart size={18} /> Rubric: {selectedAspect}
            </h3>
            <div className="space-y-4 text-sm">
                <div className="p-3 bg-white rounded border border-blue-100">
                    <span className="font-bold text-fuchsia-800 block mb-1">Niveau 1</span>
                    <p className="text-slate-600">Laat vaak egocentrisch gedrag zien, moeite met delen of regels accepteren.</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-100">
                    <span className="font-bold text-yellow-600 block mb-1">Niveau 2</span>
                    <p className="text-slate-600">Heeft soms sturing nodig, maar probeert positief mee te doen.</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-100">
                    <span className="font-bold text-emerald-600 block mb-1">Niveau 3</span>
                    <p className="text-slate-600">Werkt goed samen, houdt zich aan regels en is respectvol.</p>
                </div>
                <div className="p-3 bg-white rounded border border-blue-100">
                    <span className="font-bold text-cyan-600 block mb-1">Niveau 4</span>
                    <p className="text-slate-600">Voorbeeldfunctie, helpt anderen en lost conflicten zelfstandig op.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};