'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Seance = {
  id: string;
  name: string;
};

export default function ProgrammePage() {
  const { programmeId } = useParams();
  const [seances, setSeances] = useState<Seance[]>([]);
  const [seanceName, setSeanceName] = useState('');

  // Charger les séances depuis localStorage
  useEffect(() => {
    const savedSeances = localStorage.getItem(`seances-${programmeId}`);
    if (savedSeances) {
      setSeances(JSON.parse(savedSeances));
    }
  }, [programmeId]);

  // Sauvegarder les séances dans localStorage
  useEffect(() => {
    localStorage.setItem(`seances-${programmeId}`, JSON.stringify(seances));
  }, [seances, programmeId]);

  const addSeance = (e: React.FormEvent) => {
    e.preventDefault();
    if (seanceName.trim()) {
      const newSeance = { id: Date.now().toString(), name: seanceName };
      setSeances([...seances, newSeance]);
      setSeanceName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Programme {programmeId}</h1>

      {/* Formulaire pour ajouter une séance */}
      <form
        onSubmit={addSeance}
        className="w-full max-w-md flex flex-col gap-4 mb-6"
      >
        <input
          type="text"
          value={seanceName}
          onChange={(e) => setSeanceName(e.target.value)}
          placeholder="Nom de la séance"
          required
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter une séance
        </button>
      </form>

      {/* Liste des séances */}
      <div className="w-full max-w-md grid gap-4">
        {seances.length > 0 ? (
          seances.map((seance) => (
            <Link
              key={seance.id}
              href={`/programme/${programmeId}/seance/${seance.id}`}
              className="block p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition shadow-md"
            >
              <h2 className="text-lg font-semibold">{seance.name}</h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center">Aucune séance disponible.</p>
        )}
      </div>
    </div>
  );
}
