<<<<<<< HEAD
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Phone, Instagram, Send, ExternalLink, Loader2 } from 'lucide-react';
=======
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Navigation,
  CheckCircle2,
  X,
  Instagram,
  Twitter,
  MessageCircle,
  Globe,
  Tag,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
>>>>>>> 29214ca (update)
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store/useStore';

export default function BusinessSheet() {
  const { selectedBusiness, setSelectedBusiness, searchResults, userLocation } = useStore();

<<<<<<< HEAD
  useQuery({
    queryKey: ['business-details', selectedBusiness?.business_id],
=======
  const { data: details, isLoading } = useQuery({
    queryKey: ['business-details', selectedBusiness?.business_id || selectedBusiness?.id],
=======
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Phone, Instagram, Send, ExternalLink, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useStore } from '../store/useStore';

export default function BusinessSheet() {
  const { selectedBusiness, setSelectedBusiness, searchResults, userLocation } = useStore();

  useQuery({
    queryKey: ['business-details', selectedBusiness?.business_id],
>>>>>>> 5a556e1 (Describe what you changed)
>>>>>>> 29214ca (update)
    queryFn: async () => {
      const res = await fetch(`/api/businesses/${selectedBusiness.business_id}`);
      return res.json();
    },
    enabled: !!selectedBusiness?.business_id,
  });

  if (!selectedBusiness) return null;

<<<<<<< HEAD
  // construct business info from selectedBusiness (which came from search_results)
  const business = {
    business_name: selectedBusiness.business_name || selectedBusiness.name,
    sector: selectedBusiness.sector,
    description: selectedBusiness.description,
    whatsapp: selectedBusiness.whatsapp,
    phone: selectedBusiness.phone,
    instagram: selectedBusiness.instagram,
    x_handle: selectedBusiness.x_handle,
    lat: selectedBusiness.lat,
    lng: selectedBusiness.lng,
  };

=======
<<<<<<< HEAD
  const openWhatsApp = () => {
    if (!cardBusiness?.whatsapp) return;
    window.open(`https://wa.me/${cardBusiness.whatsapp}`, '_blank');
  };

  const callGemini = async (prompt, systemInstruction, retries = 3) => {
    if (!GEMINI_API_KEY) {
      return null;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
    };

    for (let i = 0; i < retries; i += 1) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
      } catch (err) {
        if (i === retries - 1) throw err;
        // simple backoff
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, Math.pow(2, i) * 500));
      }
    }
    return null;
  };

  const improveDescription = async () => {
    if (!cardBusiness) return;

    if (!GEMINI_API_KEY) {
      setShowToast(true);
      return;
    }

    setAiLoading(true);
    const systemPrompt =
      'You are a world-class copywriter. Rewrite the business description to be more punchy, professional, and persuasive. Keep it under 150 characters.';

    try {
      const result = await callGemini(cardBusiness.description, systemPrompt);
      if (result) {
        setCardBusiness((prev) =>
          prev ? { ...prev, description: result.trim() } : prev,
        );
        setShowToast(true);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to improve description with Gemini', err);
    } finally {
      setAiLoading(false);
    }
  };
=======
  // construct business info from selectedBusiness (which came from search_results)
  const business = {
    business_name: selectedBusiness.business_name || selectedBusiness.name,
    sector: selectedBusiness.sector,
    description: selectedBusiness.description,
    whatsapp: selectedBusiness.whatsapp,
    phone: selectedBusiness.phone,
    instagram: selectedBusiness.instagram,
    x_handle: selectedBusiness.x_handle,
    lat: selectedBusiness.lat,
    lng: selectedBusiness.lng,
  };

>>>>>>> 29214ca (update)
  // all items matching this business from the last search
  const items = searchResults
    .filter((r) => r.business_id === selectedBusiness.business_id)
    .map((r) => ({ id: r.item_id, name: r.item_name, type: r.type, price: r.price }));
<<<<<<< HEAD
=======
>>>>>>> 5a556e1 (Describe what you changed)
>>>>>>> 29214ca (update)

  return (
    <AnimatePresence>
      {selectedBusiness && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 inset-x-0 z-[2000] bg-neutral-900/95 backdrop-blur-2xl border-t border-neutral-800 rounded-t-[32px] max-h-[85vh] overflow-y-auto no-scrollbar shadow-2xl"
        >
<<<<<<< HEAD
          <div className="sticky top-0 p-6 pb-2 bg-neutral-900/50 backdrop-blur-md flex justify-between items-start z-10">
            <div>
              <h2 className="text-xl font-syne font-bold tracking-tight text-white mb-1">
                {business.business_name || business.name}
              </h2>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-sans uppercase tracking-widest text-neutral-400">
                {business.sector}
=======
          <div className="relative w-full max-w-sm bg-[#111111] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBusiness(null)}
              className="absolute top-6 right-6 z-20 bg-black/40 text-white p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>

<<<<<<< HEAD
            {/* Hero Pricing / Main Offer */}
            <div className="p-8 pt-16 pb-10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] relative">
              <Tag className="absolute -right-8 -top-8 w-40 h-40 text-white/[0.03] -rotate-12" />

              <div className="relative z-10">
                <h1 className="text-3xl font-black text-white leading-tight mb-2 tracking-tighter uppercase">
                  {cardBusiness?.mainProduct || 'Featured Offer'}
                </h1>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-black text-white leading-none tracking-tight">
                    {cardBusiness?.price || 'Contact for price'}
                  </span>
                </div>

                {/* Business Name */}
                <div className="flex items-center gap-3 py-3 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-black text-[10px]">
                    {(cardBusiness?.name || 'BIZ')
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <p className="text-[10px] font-bold text-white tracking-widest uppercase">
                    {cardBusiness?.name || 'Business'}
                  </p>
                </div>
              </div>
=======
          <div className="px-6 pb-12">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 my-6">
              {business.phone && (
                <a href={`tel:${business.phone}`} className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-sans font-bold text-sm hover:bg-neutral-200 transition-colors">
                  <Phone size={18} /> Call
                </a>
              )}
              {business.whatsapp && (
                <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-sans font-bold text-sm hover:opacity-90 transition-opacity">
                  <Send size={18} /> WhatsApp
                </a>
              )}
              {(business.lat != null && business.lng != null && userLocation) && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${business.lat},${business.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-sans font-bold text-sm hover:bg-neutral-200 transition-colors"
                >
                  <ExternalLink size={18} /> Directions
                </a>
              )}
>>>>>>> 5a556e1 (Describe what you changed)
            </div>

            {/* Content Area */}
            <div className="px-8 pb-10 pt-6">
              {/* AI Enhanced Description */}
              <div className="relative group mb-10">
                <p className="text-sm text-neutral-400 leading-relaxed italic border-l-2 border-white/10 pl-4">
                  “{cardBusiness?.description}”
                </p>
                <button
                  onClick={improveDescription}
                  disabled={aiLoading}
                  className="absolute -top-2 -right-2 bg-blue-600 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title={
                    GEMINI_API_KEY
                      ? 'Improve with AI'
                      : 'AI description refinement coming soon'
                  }
                >
                  {aiLoading ? (
                    <Loader2 size={12} className="animate-spin text-white" />
                  ) : (
                    <Sparkles size={12} className="text-white" />
                  )}
                </button>
              </div>

              {/* Core Actions */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-neutral-200 transition-all active:scale-[0.98]"
                  onClick={() => {
                    if (!details?.business?.lat || !details?.business?.lng) return;
                    const { lat, lng } = details.business;
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                    window.open(url, '_blank');
                  }}
                >
                  <Navigation size={18} />
                  Start Navigation
                </button>

                {cardBusiness?.phone && (
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `tel:${cardBusiness.phone}`;
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-white/5 text-white border border-white/10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all"
                  >
                    <Phone size={18} />
                    Call Business
                  </button>
                )}
              </div>
            </div>

            {/* Link Hub Footer */}
            <div className="px-8 py-6 bg-white/5 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-neutral-400">
                  {cardBusiness?.socials.instagram && (
                    <a
                      href={cardBusiness.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                      title="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {cardBusiness?.socials.x && (
                    <a
                      href={cardBusiness.socials.x}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white transition-colors"
                      title="X (Twitter)"
                    >
                      <Twitter size={20} />
                    </a>
                  )}
                  {cardBusiness?.whatsapp && (
                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="hover:text-[#25D366] transition-colors"
                      title="WhatsApp"
                    >
                      <MessageCircle size={20} />
                    </button>
                  )}
                  {cardBusiness?.website && (
                    <a
                      href={
                        cardBusiness.website.startsWith('http')
                          ? cardBusiness.website
                          : `https://${cardBusiness.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-400 transition-colors"
                      title="Website"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[9px] text-neutral-500 font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Offer Active
                </div>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl shadow-2xl z-[2100]">
              <CheckCircle2 size={18} className="text-green-600" />
              <span className="text-xs font-bold uppercase tracking-widest">
                {GEMINI_API_KEY
                  ? 'Description Refined'
                  : 'AI refinement coming soon'}
>>>>>>> 29214ca (update)
              </span>
            </div>
            <button 
              onClick={() => setSelectedBusiness(null)}
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="px-6 pb-12">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 my-6">
              {business.phone && (
                <a href={`tel:${business.phone}`} className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-sans font-bold text-sm hover:bg-neutral-200 transition-colors">
                  <Phone size={18} /> Call
                </a>
              )}
              {business.whatsapp && (
                <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-sans font-bold text-sm hover:opacity-90 transition-opacity">
                  <Send size={18} /> WhatsApp
                </a>
              )}
              {(business.lat != null && business.lng != null && userLocation) && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${business.lat},${business.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[120px] flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-sans font-bold text-sm hover:bg-neutral-200 transition-colors"
                >
                  <ExternalLink size={18} /> Directions
                </a>
              )}
            </div>

            {/* Socials */}
            {(business.instagram || business.x_handle) && (
              <div className="flex gap-4 mb-8">
                {business.instagram && (
                  <a href={`https://instagram.com/${business.instagram}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <Instagram size={18} className="text-white" />
                  </a>
                )}
                {business.x_handle && (
                  <a href={`https://x.com/${business.x_handle}`} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
              </div>
            )}

            {/* Items List */}
            <div className="space-y-4">
              <h3 className="font-syne text-xl font-bold text-white/50 uppercase tracking-widest text-sm">Offerings</h3>
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div>
                      <div className="text-white font-medium mb-1 font-sans">{item.name}</div>
                      <div className="text-neutral-500 text-xs uppercase tracking-tighter">{item.type}</div>
                    </div>
                    <div className="text-white font-mono font-medium">
                      {item.price ? `UGX ${item.price.toLocaleString()}` : 'Contact for price'}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-neutral-600 italic font-sans">No items listed yet</div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
