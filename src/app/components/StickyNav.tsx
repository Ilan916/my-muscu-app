import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { RiRobot2Fill } from "react-icons/ri";

export default function StickyNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full flex bg-gray-900 text-white z-10">
      {/* Bouton pour la Home */}
      <Link
        href="/"
        className="flex-1 flex items-center justify-center py-4 text-center hover:bg-gray-800 transition"
      >
        <TiHome size={24} />
      </Link>
      {/* Bouton pour le Chat */}
      <Link
        href="/chat"
        className="flex-1 flex items-center justify-center py-4 text-center hover:bg-gray-800 transition"
      >
        <RiRobot2Fill size={24} />
      </Link>
    </div>
  );
}
