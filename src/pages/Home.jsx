import React from 'react';
import { useNavigate } from 'react-router-dom';
import MapDirectory from '../components/MapDirectory';
import SearchOverlay from '../components/SearchOverlay';
import BusinessSheet from '../components/BusinessSheet';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#080A0F]">
      {/* Topbar */}
      <div className="fixed top-0 inset-x-0 z-[3000] flex justify-between items-center px-6 py-4 pointer-events-none">
        <div 
          className="text-xl font-syne font-extrabold text-white tracking-tighter pointer-events-auto cursor-pointer"
          onClick={() => window.location.reload()}
        >
          TOBLI
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-black px-4 py-2 rounded-full font-sans font-bold text-xs tracking-tight hover:bg-neutral-200 transition-colors pointer-events-auto shadow-xl"
        >
          + Add
        </button>
      </div>

      {/* Main Map */}
      <MapDirectory />

      {/* Interactivity Layers */}
      <SearchOverlay />
      <BusinessSheet />
    </div>
  );
}
