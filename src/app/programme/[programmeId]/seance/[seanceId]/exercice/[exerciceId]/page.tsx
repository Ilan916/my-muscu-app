'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ExercicePage() {
  const { programmeId, seanceId, exerciceId } = useParams();
  const router = useRouter();
  const [details, setDetails] = useState({
    series: '',
    repetitions: '',
    charge: '',
    repos: '',
  });

  // Charger les données de l'exercice depuis localStorage
  useEffect(() => {
    const savedDetails = localStorage.getItem(`exercice-${exerciceId}`);
    if (savedDetails) {
      setDetails(JSON.parse(savedDetails));
    }
  }, [exerciceId]);

  // Sauvegarder les données de l'exercice dans localStorage
  useEffect(() => {
    localStorage.setItem(`exercice-${exerciceId}`, JSON.stringify(details));
  }, [details, exerciceId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Naviguer vers la page des exercices
    router.push(`/programme/${programmeId}/seance/${seanceId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        Exercice {exerciceId} (Séance {seanceId})
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-400">Nombre de séries</label>
          <input
            type="text"
            name="series"
            value={details.series}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-400">Nombre de répétitions</label>
          <input
            type="text"
            name="repetitions"
            value={details.repetitions}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-400">Charge (kg)</label>
          <input
            type="text"
            name="charge"
            value={details.charge}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-400">Temps de repos (sec)</label>
          <input
            type="text"
            name="repos"
            value={details.repos}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
