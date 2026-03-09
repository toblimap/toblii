import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function SearchOverlay() {
  const [text, setText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fullText = "What are you looking for?";
  
  const { userLocation, setSelectedBusiness } = useStore();

  useEffect(() => {
    let currentPos = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, currentPos + 1));
      currentPos++;
      if (currentPos === fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsTypingDone(true);
          setTimeout(() => {
            setShowSearchInput(true);
          }, 1200);
        }, 55);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['search', searchTerm, userLocation],
    queryFn: async () => {
      if (!searchTerm || searchTerm.length < 2) return { results: [] };
      const lat = userLocation?.lat || 0.3476;
      const lng = userLocation?.lng || 32.5825;
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm, lat, lng })
      });
      return res.json();
    },
    enabled: searchTerm.length >= 2,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="fixed inset-0 z-[1000] pointer-events-none flex flex-col items-center">
      <AnimatePresence>
        {!showSearchInput && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-screen w-full bg-[#080A0F]/50 backdrop-blur-sm pointer-events-auto"
          >
            <h1 className="text-xl md:text-3xl font-syne font-extrabold text-white tracking-tighter">
              {text}
              <span className="animate-pulse">|</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {showSearchInput && (
        <motion.div 
          layoutId="searchBar"
          initial={{ y: "45vh", scale: 1.2, opacity: 0 }}
          animate={{ y: 80, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl px-4 pointer-events-auto"
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-neutral-500 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Search products or services..."
              className="w-full bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-full py-3 pl-10 pr-4 text-white text-sm font-sans focus:outline-none focus:border-white transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            {/* Results Dropdown */}
            {(searchTerm.length >= 2 && (isLoading || data?.results)) && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto no-scrollbar"
              >
                {isLoading ? (
                  <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-white" /></div>
                ) : data?.results?.length > 0 ? (
                  data.results.map((res) => (
                    <button
                      key={`${res.business_id}-${res.item_id}`}
                      onClick={() => {
                        setSelectedBusiness(res);
                        setSearchTerm('');
                      }}
                      className="w-full p-4 flex items-center justify-between hover:bg-white/5 border-b border-white/5 last:border-0 transition-colors text-left"
                    >
                      <div>
                        <div className="text-white font-medium">{res.item_name}</div>
                        <div className="text-neutral-500 text-sm">{res.business_name} • {res.sector}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-mono">{res.price ? `UGX ${res.price.toLocaleString()}` : '—'}</div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center text-neutral-500 font-sans">Nothing found nearby</div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
