
import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useSafety, ReportType } from '../contexts/SafetyContext';

const TAG_RULES = [
  { tag: 'Poor lighting', keywords: ['dark', 'light', 'bulb', 'dim', 'lamp', 'night', 'visibility', 'blackout', 'shadow'] },
  { tag: 'Isolated area', keywords: ['alone', 'empty', 'quiet', 'hidden', 'corner', 'shortcut', 'deserted', 'alley'] },
  { tag: 'Suspicious activity', keywords: ['following', 'watching', 'strange', 'creep', 'person', 'acting', 'guy', 'lurking', 'stalking'] },
  { tag: 'Unsafe Entry', keywords: ['door', 'lock', 'window', 'broken', 'gate', 'fence', 'open', 'ajar'] },
];

const ReportScreen: React.FC = () => {
  const navigate = useNavigate();
  const { submitReport, trustScore } = useSafety();
  const [reportType, setReportType] = useState<ReportType>('Personal');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const userEmail = localStorage.getItem('userEmail') || 'user@campus.edu';

  const suggestions = useMemo(() => {
    if (description.length < 3) return [];
    const lowerDesc = description.toLowerCase();
    return TAG_RULES.filter(rule => {
      if (selectedTags.includes(rule.tag)) return false;
      return rule.keywords.some(keyword => lowerDesc.includes(keyword));
    }).map(rule => rule.tag);
  }, [description, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitReport({
      userId: userEmail,
      userEmail: userEmail,
      type: reportType,
      category: category,
      location: location,
      description: description
    });

    alert(`Report submitted. Your trust score is vital—admin will verify this case.`);
    navigate('/home');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] animate-screen-entry">
      <Header title="New Report" showBack />
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
        
        {/* Anti-misuse Warning */}
        <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start space-x-3">
          <div className="w-6 h-6 text-amber-500 mt-0.5"><svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg></div>
          <div>
            <p className="text-[11px] font-black text-amber-800 uppercase tracking-widest">Misuse Policy</p>
            <p className="text-[10px] text-amber-700 font-medium leading-tight">Fake reports will result in a -20 point deduction to your Trust Score ({trustScore}). Consecutive fake reports lead to account suspension.</p>
          </div>
        </div>

        {/* Categorization Type */}
        <div className="space-y-3">
          <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.25em] px-1">1. Report Type</label>
          <div className="flex space-x-2">
            {(['Personal', 'Social'] as ReportType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setReportType(t)}
                className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                  reportType === t 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                    : 'bg-white border-sky-100 text-stone-600'
                }`}
              >
                {t === 'Personal' ? 'Personal (Secure)' : 'Social (Official)'}
              </button>
            ))}
          </div>
          <p className="text-[9px] text-slate-400 italic px-2">
            {reportType === 'Personal' 
              ? 'Private matters: Harassment, Stalking, Personal Threats.' 
              : 'Official/Public matters: Maintenance, Poor Lighting, Facility Damage.'}
          </p>
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.25em] mb-4 px-1">2. Choose Category</label>
          <div className="grid grid-cols-2 gap-2">
            {(reportType === 'Personal' 
              ? ['Harassment', 'Stalking', 'Suspicious Contact', 'Assault'] 
              : ['Lighting', 'Infrastructure', 'Vandalism', 'Public Nuisance']
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`py-4 px-2 rounded-2xl text-[10px] font-black uppercase tracking-tight border-2 transition-all ${
                  category === cat 
                    ? 'bg-slate-900 border-slate-900 text-white' 
                    : 'bg-white border-sky-100 text-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.25em] mb-3 px-1">3. Pin Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Campus area (e.g. Science Quad)"
              className="w-full px-5 py-4 rounded-2xl border-2 border-sky-100 bg-white focus:border-indigo-600 outline-none font-semibold shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-stone-400 uppercase tracking-[0.25em] mb-3 px-1">4. Narrative & Tags</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Be descriptive. Accurate details increase verification speed."
              className="w-full px-5 py-4 rounded-2xl border-2 border-sky-100 bg-white focus:border-indigo-600 outline-none resize-none font-semibold shadow-sm"
              required
            />
          </div>
        </div>

        {/* Smart Tags */}
        {suggestions.length > 0 && (
          <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-fadeIn">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3">Suggested Tags</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="bg-white text-indigo-600 border border-indigo-100 px-3 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>

      <div className="p-6 bg-white border-t border-sky-100">
        <button
          onClick={handleSubmit}
          disabled={!description || !location || !category}
          className="w-full bg-indigo-600 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-indigo-100 active:scale-95 disabled:opacity-30 transition-all text-xl tracking-tight"
        >
          Submit Verified Report
        </button>
      </div>
    </div>
  );
};

export default ReportScreen;
