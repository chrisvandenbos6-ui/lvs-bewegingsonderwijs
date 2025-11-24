import React, { useState, useEffect } from 'react';
import { Student, Skill, SkillProgress, LevelColor, LevelDescription } from '../types';
import { Check, ChevronDown, PlayCircle, Image as ImageIcon, X, Activity } from 'lucide-react';

interface MovementSkillsViewProps {
  students: Student[];
  skills: Skill[];
  progress: SkillProgress[];
  setProgress: React.Dispatch<React.SetStateAction<SkillProgress[]>>;
}

export const MovementSkillsView: React.FC<MovementSkillsViewProps> = ({ students, skills, progress, setProgress }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('Groep 5/6');
  
  // States for the 3-layer hierarchy
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('');
  
  const [showMediaModal, setShowMediaModal] = useState(false);

  // Initialize selection defaults
  useEffect(() => {
    if (skills.length > 0 && !selectedDomain) {
        const firstDomain = skills[0].domain;
        setSelectedDomain(firstDomain);
        
        const firstTheme = skills.find(s => s.domain === firstDomain)?.theme || '';
        setSelectedTheme(firstTheme);

        const firstSkill = skills.find(s => s.domain === firstDomain && s.theme === firstTheme);
        if (firstSkill) setSelectedSkillId(firstSkill.id);
    }
  }, [skills]);

  // Derived lists for dropdowns
  const availableGroups = [...new Set(students.map(s => s.group))];
  const availableDomains = [...new Set(skills.map(s => s.domain))];
  const availableThemes = [...new Set(skills.filter(s => s.domain === selectedDomain).map(s => s.theme))];
  const availableSkills = skills.filter(s => s.domain === selectedDomain && s.theme === selectedTheme);

  const filteredStudents = students.filter(s => s.group === selectedGroup);
  const currentSkill = skills.find(s => s.id === selectedSkillId);

  // Handlers for cascading selects
  const handleDomainChange = (domain: string) => {
      setSelectedDomain(domain);
      // Reset child selections
      const newTheme = skills.find(s => s.domain === domain)?.theme || '';
      setSelectedTheme(newTheme);
      const newSkill = skills.find(s => s.domain === domain && s.theme === newTheme)?.id || '';
      setSelectedSkillId(newSkill);
  };

  const handleThemeChange = (theme: string) => {
      setSelectedTheme(theme);
      const newSkill = skills.find(s => s.domain === selectedDomain && s.theme === theme)?.id || '';
      setSelectedSkillId(newSkill);
  };

  const handleLevelClick = (studentId: string, level: 0 | 1 | 2 | 3 | 4) => {
    setProgress(prev => {
      const filtered = prev.filter(p => !(p.studentId === studentId && p.skillId === selectedSkillId));
      return [...filtered, { studentId, skillId: selectedSkillId, level, lastUpdated: new Date().toISOString() }];
    });
  };

  const getStudentLevel = (studentId: string) => {
    return progress.find(p => p.studentId === studentId && p.skillId === selectedSkillId)?.level || 0;
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return LevelColor.PURPLE;
      case 2: return LevelColor.YELLOW;
      case 3: return LevelColor.GREEN;
      case 4: return LevelColor.BLUE;
      default: return LevelColor.GRAY;
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
            <Activity size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Bewegingsvaardigheden</h2>
      </div>

      {/* Top Filters - 3 Layers */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Groep</label>
                <div className="relative">
                <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 pr-8"
                >
                    {availableGroups.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
                </div>
            </div>

            {/* Separator */}
            <div className="h-10 w-px bg-slate-200 mx-2 hidden md:block"></div>

            <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Beweegdomein</label>
                <div className="relative">
                <select
                    value={selectedDomain}
                    onChange={(e) => handleDomainChange(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 pr-8"
                >
                    {availableDomains.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
                </div>
            </div>

            <div>
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Bewegingsthema</label>
                <div className="relative">
                <select
                    value={selectedTheme}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5 pr-8"
                >
                    {availableThemes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="flex-1">
                <label className="block text-xs text-slate-500 font-bold uppercase mb-1">Leerlijn (Vaardigheid)</label>
                <div className="relative">
                <select
                    value={selectedSkillId}
                    onChange={(e) => setSelectedSkillId(e.target.value)}
                    className="appearance-none bg-white border border-blue-300 text-blue-900 font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 shadow-sm"
                >
                    {availableSkills.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-3 text-blue-500 pointer-events-none" size={16} />
                </div>
            </div>

             {currentSkill?.mediaUrl && (
                <button
                    onClick={() => setShowMediaModal(true)}
                    className="mb-[1px] flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium border border-blue-200"
                >
                    {currentSkill.mediaType === 'video' ? <PlayCircle size={18} /> : <ImageIcon size={18} />}
                    <span className="hidden lg:inline">Voorbeeld</span>
                </button>
            )}
          </div>
      </div>

      {/* Content Grid */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex overflow-hidden">
         {/* Sidebar with Levels info */}
         <div className="w-1/3 min-w-[350px] border-r border-slate-200 p-6 overflow-y-auto bg-slate-50">
            <h2 className="text-xl font-bold text-slate-800 mb-1">{currentSkill?.name}</h2>
            <div className="flex gap-2 mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded font-medium border border-blue-200">{selectedDomain}</span>
                <span className="inline-block bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded font-medium border border-slate-300">{selectedTheme}</span>
            </div>

            <div className="space-y-4">
                {currentSkill?.levels.map((levelDesc: LevelDescription) => (
                    <div key={levelDesc.level} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold mb-2 ${getLevelColor(levelDesc.level)}`}>
                            {levelDesc.level}
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {levelDesc.description}
                        </p>
                    </div>
                ))}
            </div>
         </div>

         {/* Student Scoring Matrix */}
         <div className="flex-1 overflow-y-auto p-6">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left pb-4 text-slate-500 font-medium">Leerling</th>
                        <th className="text-center pb-4 text-slate-500 font-medium">Niveau 1</th>
                        <th className="text-center pb-4 text-slate-500 font-medium">Niveau 2</th>
                        <th className="text-center pb-4 text-slate-500 font-medium">Niveau 3</th>
                        <th className="text-center pb-4 text-slate-500 font-medium">Niveau 4</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map(student => {
                        const currentLevel = getStudentLevel(student.id);
                        return (
                            <tr key={student.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="py-3 font-medium text-slate-800">
                                    {student.firstName} {student.lastName}
                                </td>
                                {[1, 2, 3, 4].map(lvl => (
                                    <td key={lvl} className="py-2 px-2">
                                        <button
                                            onClick={() => handleLevelClick(student.id, lvl as any)}
                                            className={`w-full h-10 rounded-md transition-all duration-200 flex items-center justify-center border ${
                                                currentLevel >= lvl
                                                    ? `${getLevelColor(lvl)} border-transparent shadow-sm`
                                                    : 'bg-white border-slate-200 text-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            {currentLevel >= lvl && <Check size={16} strokeWidth={3} />}
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
         </div>
      </div>

      {/* Media Modal */}
      {showMediaModal && currentSkill && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Voorbeeld: {currentSkill.name}</h3>
                    <button onClick={() => setShowMediaModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 bg-slate-900 flex justify-center items-center min-h-[300px]">
                    <img src={currentSkill.mediaUrl} alt={currentSkill.name} className="max-h-[400px] rounded-lg shadow-lg" />
                </div>
            </div>
        </div>
      )}
    </div>
  );
};