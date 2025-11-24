import React, { useState } from 'react';
import { Student } from '../types';
import { Upload, CheckCircle, AlertCircle, Users, Plus, FolderOpen, MoreHorizontal, UserPlus, Search, Edit2, Trash2, X, Save, Settings } from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ students, setStudents }) => {
  const [activeGroup, setActiveGroup] = useState<string>('Groep 3'); // Default active group
  const [importStep, setImportStep] = useState<'idle' | 'uploading' | 'mapping' | 'success'>('idle');
  const [dragActive, setDragActive] = useState(false);
  
  // Group Management States
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState<string | null>(null); // The group currently being edited
  const [editGroupName, setEditGroupName] = useState('');

  // Get unique groups and sort them
  const groups = [...new Set(students.map(s => s.group))].sort();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setImportStep('uploading');
    // Simulate processing time
    setTimeout(() => {
      // Simulate importing a new class: "Groep 1/2 B"
      const newClassGroup = "Groep 1/2 B";
      const newMockStudents: Student[] = [
        { id: `imp-${Date.now()}-1`, firstName: 'Sophie', lastName: 'Bakker', group: newClassGroup, parnassysId: 'P1001' },
        { id: `imp-${Date.now()}-2`, firstName: 'Mees', lastName: 'Kok', group: newClassGroup, parnassysId: 'P1002' },
        { id: `imp-${Date.now()}-3`, firstName: 'Lotte', lastName: 'Timmer', group: newClassGroup, parnassysId: 'P1003' },
        { id: `imp-${Date.now()}-4`, firstName: 'Bram', lastName: 'Jacobs', group: newClassGroup, parnassysId: 'P1004' },
      ];
      setStudents(prev => [...prev, ...newMockStudents]);
      setImportStep('success');
      setActiveGroup(newClassGroup); // Switch to the newly imported group
    }, 1500);
  };

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
        setActiveGroup(newGroupName.trim());
        setShowAddGroup(false);
        setNewGroupName('');
    }
  };

  const openEditGroupModal = (groupName: string, e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent switching active group
      setEditingGroup(groupName);
      setEditGroupName(groupName);
  };

  const handleRenameGroup = () => {
      if (editingGroup && editGroupName.trim() && editGroupName !== editingGroup) {
          // Update all students in this group to the new name
          setStudents(prev => prev.map(s => s.group === editingGroup ? { ...s, group: editGroupName.trim() } : s));
          
          // If the active group was the one edited, update the view
          if (activeGroup === editingGroup) {
              setActiveGroup(editGroupName.trim());
          }
          setEditingGroup(null);
      } else {
          setEditingGroup(null);
      }
  };

  const handleDeleteGroup = () => {
      if (editingGroup) {
          if (confirm(`Weet u zeker dat u "${editingGroup}" wilt verwijderen? Alle leerlingen in deze groep worden ook verwijderd.`)) {
              setStudents(prev => prev.filter(s => s.group !== editingGroup));
              
              // Reset active group if we deleted it
              if (activeGroup === editingGroup) {
                  const remaining = groups.filter(g => g !== editingGroup);
                  setActiveGroup(remaining.length > 0 ? remaining[0] : '');
              }
              setEditingGroup(null);
          }
      }
  };

  const displayedStudents = students.filter(s => s.group === activeGroup);

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col relative">
      <header className="mb-6 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Groepsoverzicht</h2>
            <p className="text-slate-500">Beheer uw groepen en importeer leerlinglijsten.</p>
        </div>
        <button
            onClick={() => {
                const fileInput = document.getElementById('parnassys-import');
                fileInput?.click();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium shadow-sm"
        >
            <Upload size={18} /> ParnasSys Import
            <input id="parnassys-import" type="file" className="hidden" accept=".csv,.xlsx" onChange={handleChange} />
        </button>
      </header>

      {importStep === 'uploading' && (
         <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
             <div className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-4">
                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                 <span className="font-medium text-slate-700">Bestand verwerken en klassen aanmaken...</span>
             </div>
         </div>
      )}

      {importStep === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle size={20} /></div>
                <div>
                    <h4 className="font-bold text-green-800 text-sm">Import Geslaagd!</h4>
                    <p className="text-green-700 text-xs">Nieuwe groep en leerlingen zijn toegevoegd.</p>
                </div>
            </div>
            <button onClick={() => setImportStep('idle')} className="text-green-600 hover:text-green-800 p-1"><Users size={18}/></button>
        </div>
      )}

      {/* Edit Group Modal */}
      {editingGroup && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-150">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                      <h3 className="font-bold text-lg text-slate-800">Groep Bewerken</h3>
                      <button onClick={() => setEditingGroup(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-full">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="p-6">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Groepsnaam</label>
                      <input 
                          type="text" 
                          value={editGroupName}
                          onChange={(e) => setEditGroupName(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium text-slate-800"
                      />
                      <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-sm rounded-lg flex gap-2 items-start">
                          <AlertCircle size={16} className="mt-0.5 shrink-0" />
                          <p>Wijzigingen in de naam worden direct doorgevoerd voor alle leerlingen in deze groep.</p>
                      </div>
                  </div>
                  <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-between">
                      <button 
                          onClick={handleDeleteGroup}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                      >
                          <Trash2 size={16} /> Verwijderen
                      </button>
                      <div className="flex gap-2">
                          <button onClick={() => setEditingGroup(null)} className="text-slate-600 hover:bg-slate-200 px-3 py-2 rounded-lg text-sm font-medium">
                              Annuleren
                          </button>
                          <button onClick={handleRenameGroup} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                              <Save size={16} /> Opslaan
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Sidebar: Group List */}
        <div className="w-64 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <FolderOpen size={18} className="text-slate-400" /> Groepen
                </h3>
                <button 
                    onClick={() => setShowAddGroup(!showAddGroup)}
                    className="p-1.5 hover:bg-blue-100 hover:text-blue-600 rounded text-slate-500 transition-colors"
                    title="Nieuwe groep"
                >
                    <Plus size={18} />
                </button>
            </div>

            {showAddGroup && (
                <div className="p-3 border-b border-slate-100 bg-blue-50 animate-in slide-in-from-top-2">
                    <input 
                        type="text" 
                        placeholder="Naam (bv. Groep 8)" 
                        className="w-full text-sm border border-blue-200 rounded p-2 mb-2 focus:outline-none focus:border-blue-400 shadow-sm"
                        autoFocus
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateGroup()}
                    />
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowAddGroup(false)}
                            className="flex-1 bg-white text-slate-600 border border-slate-200 text-xs py-1.5 rounded font-medium hover:bg-slate-50"
                        >
                            Annuleren
                        </button>
                        <button 
                            onClick={handleCreateGroup}
                            className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded font-medium hover:bg-blue-700 shadow-sm"
                        >
                            Aanmaken
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-y-auto flex-1 p-2 space-y-1">
                {groups.map(group => {
                    const count = students.filter(s => s.group === group).length;
                    return (
                        <div
                            key={group}
                            onClick={() => setActiveGroup(group)}
                            className={`group/item w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex justify-between items-center transition-all cursor-pointer ${
                                activeGroup === group 
                                    ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm' 
                                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                            }`}
                        >
                            <span className="truncate">{group}</span>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    activeGroup === group ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-400'
                                }`}>
                                    {count}
                                </span>
                                {/* Edit Button - only visible on hover or active */}
                                <button
                                    onClick={(e) => openEditGroupModal(group, e)}
                                    className={`p-1 rounded hover:bg-white hover:text-blue-600 transition-opacity ${
                                        activeGroup === group ? 'opacity-100' : 'opacity-0 group-hover/item:opacity-100'
                                    }`}
                                    title="Groep bewerken"
                                >
                                    <Settings size={14} />
                                </button>
                            </div>
                        </div>
                    )
                })}
                {/* Dynamically added empty group if strictly selected but no students yet */}
                {!groups.includes(activeGroup) && activeGroup && (
                     <div
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex justify-between items-center bg-blue-50 text-blue-700 border border-blue-100 shadow-sm cursor-pointer"
                    >
                        <span>{activeGroup}</span>
                        <div className="flex items-center gap-2">
                             <span className="text-xs px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">0</span>
                             <button
                                onClick={(e) => openEditGroupModal(activeGroup, e)}
                                className="p-1 rounded hover:bg-white hover:text-blue-600"
                            >
                                <Settings size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Main Content: Student List for Active Group */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-slate-800">{activeGroup}</h3>
                    <span className="text-sm text-slate-400">|</span>
                    <span className="text-sm text-slate-500">{displayedStudents.length} Leerlingen</span>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Zoeken in groep..." 
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                        <UserPlus size={16} /> <span className="hidden lg:inline">Leerling</span>
                    </button>
                </div>
            </div>

            {displayedStudents.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                    <Users size={48} className="mb-4 opacity-20" />
                    <p className="font-medium">Nog geen leerlingen in deze groep.</p>
                    <p className="text-sm">Importeer via ParnasSys of voeg handmatig toe.</p>
                </div>
            ) : (
                <div className="overflow-y-auto flex-1">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200 sticky top-0">
                            <tr>
                                <th className="p-4 w-1/3">Achternaam</th>
                                <th className="p-4 w-1/3">Voornaam</th>
                                <th className="p-4">ParnasSys ID</th>
                                <th className="p-4 text-right">Acties</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {displayedStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-slate-50 group">
                                    <td className="p-4 font-bold text-slate-700">{student.lastName}</td>
                                    <td className="p-4 text-slate-600">{student.firstName}</td>
                                    <td className="p-4 text-slate-400 font-mono text-xs">{student.parnassysId || '-'}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-slate-400 hover:text-blue-600 p-1 rounded hover:bg-blue-50 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};