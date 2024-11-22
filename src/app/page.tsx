'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Programme = {
  id: string;
  name: string;
};

export default function HomePage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [programmeName, setProgrammeName] = useState('');

  // Charger les programmes depuis localStorage
  useEffect(() => {
    const savedProgrammes = localStorage.getItem('programmes');
    if (savedProgrammes) {
      setProgrammes(JSON.parse(savedProgrammes));
    }
  }, []);

  // Sauvegarder les programmes dans localStorage
  useEffect(() => {
    localStorage.setItem('programmes', JSON.stringify(programmes));
  }, [programmes]);

  const addProgramme = (e: React.FormEvent) => {
    e.preventDefault();
    if (programmeName.trim()) {
      const newProgramme = { id: Date.now().toString(), name: programmeName };
      setProgrammes([...programmes, newProgramme]);
      setProgrammeName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Programmes</h1>

      {/* Formulaire pour ajouter un programme */}
      <form onSubmit={addProgramme} className="w-full max-w-md mb-6 flex flex-col gap-4">
        <input
          type="text"
          value={programmeName}
          onChange={(e) => setProgrammeName(e.target.value)}
          placeholder="Nom du programme"
          required
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Créer un programme
        </button>
      </form>

      {/* Liste des programmes */}
      <div className="w-full max-w-md grid gap-4">
        {programmes.length > 0 ? (
          programmes.map((programme) => (
            <Link
              key={programme.id}
              href={`/programme/${programme.id}`}
              className="block p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition shadow-md"
            >
              <h2 className="text-lg font-semibold">{programme.name}</h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center">Aucun programme disponible.</p>
        )}
      </div>
    </div>
  );
}
