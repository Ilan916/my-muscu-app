'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Exercice = {
  id: string;
  name: string;
};

export default function SeancePage() {
  const { programmeId, seanceId } = useParams();
  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [exerciceName, setExerciceName] = useState('');

  // Charger les exercices depuis localStorage
  useEffect(() => {
    const savedExercices = localStorage.getItem(`exercices-${seanceId}`);
    if (savedExercices) {
      setExercices(JSON.parse(savedExercices));
    }
  }, [seanceId]);

  // Sauvegarder les exercices dans localStorage
  useEffect(() => {
    localStorage.setItem(`exercices-${seanceId}`, JSON.stringify(exercices));
  }, [exercices, seanceId]);

  const addExercice = (e: React.FormEvent) => {
    e.preventDefault();
    if (exerciceName.trim()) {
      const newExercice = { id: Date.now().toString(), name: exerciceName };
      setExercices([...exercices, newExercice]);
      setExerciceName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        Séance {seanceId} du programme {programmeId}
      </h1>

      {/* Formulaire pour ajouter un exercice */}
      <form
        onSubmit={addExercice}
        className="w-full max-w-md flex flex-col gap-4 mb-6"
      >
        <input
          type="text"
          value={exerciceName}
          onChange={(e) => setExerciceName(e.target.value)}
          placeholder="Nom de l'exercice"
          required
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Ajouter un exercice
        </button>
      </form>

      {/* Liste des exercices */}
      <div className="w-full max-w-md grid gap-4">
        {exercices.length > 0 ? (
          exercices.map((exercice) => (
            <Link
              key={exercice.id}
              href={`/programme/${programmeId}/seance/${seanceId}/exercice/${exercice.id}`}
              className="block p-4 rounded-md bg-gray-800 hover:bg-gray-700 transition shadow-md"
            >
              <h2 className="text-lg font-semibold">{exercice.name}</h2>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            Aucun exercice disponible.
          </p>
        )}
      </div>
    </div>
  );
}
