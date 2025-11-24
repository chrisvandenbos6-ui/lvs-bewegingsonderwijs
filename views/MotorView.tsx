import React, { useState, useEffect } from 'react';
import { Student, MotorScore } from '../types';
import { Timer, ClipboardList, ChevronDown, Save, Gauge } from 'lucide-react';

interface MotorViewProps {
  students: Student[];
}

const TEST_TYPES = [
  'MQ Scan (Baan)',
  'Shuttle Run (Conditie)',
  'Balvaardigheid (Oog-hand)',
  'Vangen & Gooien',
  'Balanceren (Tijd)',
  'Lenigheid (Reiken)'
];

export const MotorView: React.FC<MotorViewProps> = ({ students }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('Groep 5/6');
  const [selectedTest, setSelectedTest] = useState<string>(TEST_TYPES[0]);
  
  const [scores, setScores] = useState<MotorScore[]>(() => {
    const saved = localStorage.getItem('lvs_motor_scores');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lvs_motor_scores', JSON.stringify(scores));
  }, [scores]);

  const availableGroups = [...new Set(students.map(s => s.group))];
  const filteredStudents = students.filter(s => s.group === selectedGroup);

  const handleScoreChange = (studentId: string, value: string) => {
    const newScore: MotorScore = {
      studentId,
      testName: selectedTest,
      value,
      date: new Date().toISOString().split('T')[0]
    };

    setScores(prev => {
      const filtered = prev.filter(s => !(s.studentId === studentId && s.testName === selectedTest));
      return [...filtered, newScore];
    });
  };

  // Zorgt voor de notatie met 2 decimalen bij de MQ Scan (tijd)
  const handleBlur = (studentId: string, value: string) => {
    if (selectedTest.includes('MQ Scan') && value) {
      // Vervang komma door punt voor conversie, rond af, en zet terug
      const floatVal = parseFloat(value.replace(',', '.'));
      if (!isNaN(floatVal)) {
        handleScoreChange(studentId, floatVal.toFixed(2));
      }
    }
  };

  const getScore = (studentId: string) => {
    return scores.find(s => s.studentId === studentId && s.testName === selectedTest)?.value || '';
  };

  const getPlaceholder = () => {
    if (selectedTest.includes('MQ Scan')) return '00.00 sec';
    if (selectedTest.includes('Shuttle')) return 'Trap';
    return 'Score...';
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Motoriek Monitor</h2>
          <p className="text-slate-500">Registreer meetbare resultaten van de MQ-scans en 4 S-en.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-slate-500 font-medium mb-1">Selecteer Groep</label>
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
          <label className="block text-xs text-slate-500 font-medium mb-1">Selecteer Test</label>
          <div className="relative">
            <select
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 pr-8"
            >
              {TEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-3 text-slate-500 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 grid grid-cols-12 gap-4 font-medium text-slate-500">
            <div className="col-span-4">Leerling</div>
            <div className="col-span-4">
                {selectedTest.includes('MQ Scan') ? 'Tijd (sec)' : 'Resultaat'}
            </div>
            <div className="col-span-4 text-right">Laatste meting</div>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredStudents.map(student => (
            <div key={student.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50">
              <div className="col-span-4 font-medium text-slate-800">
                {student.firstName} {student.lastName}
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder={getPlaceholder()}
                            value={getScore(student.id)}
                            onChange={(e) => handleScoreChange(student.id, e.target.value)}
                            onBlur={(e) => handleBlur(student.id, e.target.value)}
                            className={`w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${selectedTest.includes('MQ') ? 'font-mono' : ''}`}
                        />
                         {selectedTest.includes('MQ') && (
                            <div className="absolute right-3 top-2.5 text-xs text-slate-400 pointer-events-none">
                                sec
                            </div>
                        )}
                    </div>
                    {getScore(student.id) && <Save size={16} className="text-green-500 flex-shrink-0" />}
                </div>
              </div>
              <div className="col-span-4 text-right text-sm text-slate-400">
                {getScore(student.id) ? new Date().toLocaleDateString('nl-NL') : '-'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};