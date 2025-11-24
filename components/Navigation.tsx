import React from 'react';
import { LayoutDashboard, Users, Activity, Dumbbell, Smile, Trophy, BookOpen, X } from 'lucide-react';
import { ComponentType } from '../types';

interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onNavigate, isOpen, onClose }) => {
  const handleNavClick = (viewName: string) => {
    onNavigate(viewName);
    onClose(); // Close menu on mobile after selection
  };

  const navItemClass = (viewName: string) =>
    `flex items-center w-full p-3 my-1 rounded-lg transition-colors cursor-pointer ${
      activeView === viewName
        ? 'bg-blue-100 text-blue-700 font-semibold'
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Navigation Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 h-screen flex flex-col
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:inset-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
              LVS
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-800 uppercase tracking-wide leading-tight">Bewegings<br/>Onderwijs</h1>
              <span className="text-[10px] text-slate-500">Haarlemmermeer 5.0</span>
            </div>
          </div>
          {/* Close button for mobile */}
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2 px-3">Algemeen</p>
            <button onClick={() => handleNavClick('dashboard')} className={navItemClass('dashboard')}>
              <LayoutDashboard size={20} className="mr-3" /> Dashboard
            </button>
            <button onClick={() => handleNavClick('students')} className={navItemClass('students')}>
              <Users size={20} className="mr-3" /> Leerlingen & Import
            </button>
          </div>

          <div className="mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2 px-3">Componenten</p>
            <button onClick={() => handleNavClick(ComponentType.BEWEGINGSVAARDIGHEDEN)} className={navItemClass(ComponentType.BEWEGINGSVAARDIGHEDEN)}>
              <Activity size={20} className="mr-3" /> Bewegingsvaardigheden
            </button>
            <button onClick={() => handleNavClick(ComponentType.MOTORIEK)} className={navItemClass(ComponentType.MOTORIEK)}>
              <Dumbbell size={20} className="mr-3" /> Motoriek
            </button>
            <button onClick={() => handleNavClick(ComponentType.SPEELGEDRAG)} className={navItemClass(ComponentType.SPEELGEDRAG)}>
              <Smile size={20} className="mr-3" /> Speelgedrag
            </button>
            <button onClick={() => handleNavClick(ComponentType.SPORTPARTICIPATIE)} className={navItemClass(ComponentType.SPORTPARTICIPATIE)}>
              <Trophy size={20} className="mr-3" /> Sportparticipatie
            </button>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-2 px-3">Beheer</p>
            <button onClick={() => handleNavClick('curriculum')} className={navItemClass('curriculum')}>
              <BookOpen size={20} className="mr-3" /> Methode & Media
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
           <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs">VL</div>
              <div className="text-sm">
                  <p className="font-medium">Vakleerkracht</p>
                  <p className="text-xs text-slate-500">Gymzaal A</p>
              </div>
           </div>
        </div>
      </aside>
    </>
  );
};