import React, { useState } from 'react';
import { Skill, LevelDescription } from '../types';
import { Plus, Save, Image, Film, X, Layers, Grid, Target, Trash2, Edit2, Link as LinkIcon } from 'lucide-react';

interface CurriculumEditorProps {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const EMPTY_SKILL: Partial<Skill> = {
  name: '',
  domain: '',
  theme: '',
  mediaUrl: '',
  mediaType: 'image',
  levels: [
    { level: 1, description: '' },
    { level: 2, description: '' },
    { level: 3, description: '' },
    { level: 4, description: '' }
  ]
};

export const CurriculumEditor: React.FC<CurriculumEditorProps> = ({ skills, setSkills }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Skill>>(EMPTY_SKILL);

  const handleAddNew = () => {
    setFormData(JSON.parse(JSON.stringify(EMPTY_SKILL))); // Deep copy to avoid reference issues
    setEditingId(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setFormData(JSON.parse(JSON.stringify(skill)));
    setEditingId(skill.id);
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Weet u zeker dat u deze vaardigheid wilt verwijderen?')) {
      setSkills(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.domain || !formData.theme) {
      alert('Vul in ieder geval Domein, Thema en Naam in.');
      return;
    }

    if (editingId) {
      // Update existing
      setSkills(prev => prev.map(s => s.id === editingId ? { ...formData, id: editingId } as Skill : s));
    } else {
      // Create new
      const newId = `custom-${Date.now()}`;
      setSkills(prev => [...prev, { ...formData, id: newId, groupCategory: 'All' } as Skill]);
    }
    setIsEditorOpen(false);
  };

  const handleLevelChange = (index: number, val: string) => {
    const updatedLevels = [...(formData.levels || [])];
    updatedLevels[index] = { ...updatedLevels[index], description: val };
    setFormData({ ...formData, levels: updatedLevels });
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Methode & Media Editor</h2>
            <p className="text-slate-500">Beheer leerlijnen, bewegingsdomeinen, thema's en media.</p>
        </div>
        <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium shadow-sm transition-all"
        >
            <Plus size={18} /> Nieuwe Vaardigheid
        </button>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-xl">
                    <h3 className="text-xl font-bold text-slate-800">
                        {editingId ? 'Vaardigheid Bewerken' : 'Nieuwe Vaardigheid Toevoegen'}
                    </h3>
                    <button onClick={() => setIsEditorOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 max-h-[75vh] overflow-y-auto">
                    {/* Basis Gegevens */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                <Layers size={14}/> Beweegdomein
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-300"
                                placeholder="Bijv. Turnen"
                                value={formData.domain}
                                onChange={e => setFormData({...formData, domain: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                <Grid size={14} /> Bewegingsthema
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-300"
                                placeholder="Bijv. Balanceren"
                                value={formData.theme}
                                onChange={e => setFormData({...formData, theme: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                <Target size={14} /> Leerlijn (Naam)
                            </label>
                            <input
                                type="text"
                                className="w-full border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-300 font-medium"
                                placeholder="Bijv. Handstand"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* Media Sectie */}
                    <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <LinkIcon size={16} /> Media Koppeling
                        </label>
                        <div className="flex gap-4 items-start">
                             <div className="flex-1">
                                <input
                                    type="text"
                                    className="w-full border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 mb-2"
                                    placeholder="Plak hier een URL van een afbeelding of video..."
                                    value={formData.mediaUrl}
                                    onChange={e => setFormData({...formData, mediaUrl: e.target.value})}
                                />
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mediaType"
                                            checked={formData.mediaType === 'image'}
                                            onChange={() => setFormData({...formData, mediaType: 'image'})}
                                        />
                                        <Image size={16} /> Afbeelding
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mediaType"
                                            checked={formData.mediaType === 'video'}
                                            onChange={() => setFormData({...formData, mediaType: 'video'})}
                                        />
                                        <Film size={16} /> Video
                                    </label>
                                </div>
                             </div>
                             {/* Preview */}
                             <div className="w-24 h-24 bg-white border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                {formData.mediaUrl ? (
                                    <img src={formData.mediaUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
                                ) : (
                                    <span className="text-xs text-slate-400 text-center px-1">Geen voorbeeld</span>
                                )}
                             </div>
                        </div>
                    </div>

                    {/* Niveau Beschrijvingen */}
                    <div className="space-y-4 mb-6">
                        <h4 className="font-bold text-slate-700 border-b border-slate-200 pb-2">Niveau Beschrijvingen</h4>
                        {[0, 1, 2, 3].map((idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 mt-1
                                    ${idx === 0 ? 'bg-fuchsia-800' : idx === 1 ? 'bg-yellow-400' : idx === 2 ? 'bg-emerald-500' : 'bg-cyan-500'}`}>
                                    {idx + 1}
                                </div>
                                <textarea
                                    className="flex-1 border border-slate-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[60px]"
                                    placeholder={`Beschrijving voor niveau ${idx + 1}`}
                                    value={formData.levels?.[idx]?.description || ''}
                                    onChange={(e) => handleLevelChange(idx, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-xl flex justify-end gap-3">
                    <button onClick={() => setIsEditorOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md transition-colors font-medium">
                        Annuleren
                    </button>
                    <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 font-medium shadow-sm transition-all">
                        <Save size={18} /> Opslaan
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Lijst weergave */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
        <div className="p-4 bg-slate-50 border-b border-slate-100 font-medium text-slate-700 flex justify-between">
            <span>Bestaande Leerstof</span>
            <span className="text-xs text-slate-400 font-normal">{skills.length} items</span>
        </div>
        <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {skills.map(skill => (
                <div key={skill.id} className="p-4 flex items-center justify-between hover:bg-slate-50 group transition-colors">
                    <div className="flex items-center gap-4">
                        {skill.mediaUrl ? (
                            <img src={skill.mediaUrl} alt={skill.name} className="w-12 h-12 rounded object-cover bg-slate-200 border border-slate-200" />
                        ) : (
                            <div className="w-12 h-12 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                <Image size={20} />
                            </div>
                        )}
                        <div>
                            <h4 className="font-bold text-slate-800">{skill.name}</h4>
                            <div className="flex gap-2 text-xs mt-1">
                                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded border border-blue-200">{skill.domain}</span>
                                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{skill.theme}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => handleEdit(skill)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                            title="Bewerken"
                        >
                            <Edit2 size={16} /> <span className="hidden md:inline">Bewerken</span>
                        </button>
                        <button
                             onClick={() => handleDelete(skill.id)}
                             className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                             title="Verwijderen"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};