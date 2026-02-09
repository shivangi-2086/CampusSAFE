
import React from 'react';
import Header from '../components/Header';

interface Contact {
  name: string;
  number: string;
  type: string;
  isPrimary?: boolean;
}

const CONTACT_GROUPS = [
  {
    category: 'Security Units',
    contacts: [
      { name: 'Campus Security', number: '555-0199', type: 'Public Safety', isPrimary: true },
      { name: 'Night Escort', number: '555-0155', type: 'Support' },
    ],
  },
  {
    category: 'Local Support',
    contacts: [
      { name: 'Dr. Sarah Miller', number: '555-0210', type: 'Hostel A Warden' },
      { name: 'Alex Thompson', number: '555-0944', type: 'Trusted Friend' },
    ],
  },
];

const ContactsScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col animate-screen-entry pb-6">
      <Header title="Safe Contacts" showBack />
      
      <div className="p-6 flex-1 overflow-y-auto space-y-8 scrollbar-hide">
        {CONTACT_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            <h2 className="px-2 text-[11px] font-black uppercase text-indigo-600 tracking-[0.2em] opacity-80">
              {group.category}
            </h2>
            
            <div className="space-y-4">
              {group.contacts.map((contact, idx) => (
                <div 
                  key={idx} 
                  className={`relative p-6 rounded-[2rem] flex items-center justify-between border transition-all active:scale-[0.98] ${
                    contact.isPrimary 
                      ? 'bg-indigo-600 border-indigo-700 shadow-2xl shadow-indigo-200' 
                      : 'bg-white/80 backdrop-blur-md border-slate-100 shadow-xl shadow-slate-200/50'
                  }`}
                >
                  <div className="flex-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${contact.isPrimary ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {contact.type}
                    </span>
                    <h3 className={`text-xl font-extrabold tracking-tight mt-1 ${contact.isPrimary ? 'text-white' : 'text-slate-900'}`}>
                      {contact.name}
                    </h3>
                    <p className={`font-mono font-bold text-sm mt-1 ${contact.isPrimary ? 'text-indigo-100' : 'text-indigo-600'}`}>
                      {contact.number}
                    </p>
                  </div>

                  <a 
                    href={`tel:${contact.number}`}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-90 ${
                      contact.isPrimary 
                        ? 'bg-white text-indigo-600' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.812 4.812l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>  
        ))}

        <div className="mt-4 p-8 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem] flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
             </svg>
          </div>
          <p className="text-indigo-900 font-bold text-lg mb-1">Add Trusted Contact</p>
          <p className="text-indigo-500 text-sm font-medium leading-snug">Quickly alert someone you trust during an incident.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactsScreen;
