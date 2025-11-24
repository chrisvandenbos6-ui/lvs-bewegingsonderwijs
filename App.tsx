import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { StudentsView } from './views/StudentsView';
import { MovementSkillsView } from './views/MovementSkillsView';
import { CurriculumEditor } from './views/CurriculumEditor';
import { MotorView } from './views/MotorView';
import { SocialBehaviorView } from './views/SocialBehaviorView';
import { SportParticipationView } from './views/SportParticipationView';
import { INITIAL_STUDENTS, INITIAL_SKILLS } from './constants';
import { Student, Skill, SkillProgress, ComponentType } from './types';
import { Calendar, Activity, Trophy, Smile, Menu } from 'lucide-react';

const DashboardView = () => (
    <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Calendar size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Volgende Les</p>
                        <p className="font-bold text-slate-800">Groep 7/8 - Zwaaien</p>
                    </div>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Activity size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Vaardigheden</p>
                        <p className="font-bold text-slate-800">85% Ingevuld</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg"><Smile size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Gedrag</p>
                        <p className="font-bold text-slate-800">Alles op groen</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Trophy size={24} /></div>
                    <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">Sportclub</p>
                        <p className="font-bold text-slate-800">12 Leerlingen</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Update Voltooid</h3>
            <p className="text-blue-100 max-w-2xl leading-relaxed">
                De applicatie slaat uw wijzigingen nu lokaal op in uw browser. 
                Dit betekent dat uw data bewaard blijft als u de pagina ververst.
                Let op: Uw collega's zien hun eigen versie van de data.
            </p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Initialize state from localStorage if available, otherwise use defaults
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('lvs_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('lvs_skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [progress, setProgress] = useState<SkillProgress[]>(() => {
    const saved = localStorage.getItem('lvs_progress');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('lvs_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('lvs_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('lvs_progress', JSON.stringify(progress));
  }, [progress]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'students':
        return <StudentsView students={students} setStudents={setStudents} />;
      case ComponentType.BEWEGINGSVAARDIGHEDEN:
        return <MovementSkillsView students={students} skills={skills} progress={progress} setProgress={setProgress} />;
      case 'curriculum':
        return <CurriculumEditor skills={skills} setSkills={setSkills} />;
      case ComponentType.MOTORIEK:
        return <MotorView students={students} />;
      case ComponentType.SPEELGEDRAG:
        return <SocialBehaviorView students={students} />;
      case ComponentType.SPORTPARTICIPATIE:
        return <SportParticipationView students={students} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
      <Navigation 
        activeView={activeView} 
        onNavigate={setActiveView} 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-600 hover:text-blue-600">
                  <Menu size={24} />
              </button>
              <span className="font-bold text-slate-800">LVS Bewegingsonderwijs</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
              VL
          </div>
      </div>

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden overflow-y-auto h-[calc(100vh-65px)] md:h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;