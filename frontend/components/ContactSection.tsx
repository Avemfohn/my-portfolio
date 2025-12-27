'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, Twitter, ArrowRight, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Email kopyalama fonksiyonu (Küçük ama etkili UX)
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("mertcan@example.com"); // Kendi mailini yaz
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simülasyon (İleride buraya API isteği gelecek)
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 2000);
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="contact">

      {/* --- ARKA PLAN EFEKTLERİ (Aurora Lights) --- */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse [animation-delay:2s]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="max-w-6xl mx-auto bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* --- SOL TARAFI: BİLGİ KARTI --- */}
            <div className="p-10 md:p-14 bg-gradient-to-br from-slate-900/80 to-slate-800/80 flex flex-col justify-between relative overflow-hidden">
              {/* Dekoratif Çizgiler */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />

              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
                >
                  {t.contact.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-400 text-lg mb-12 leading-relaxed"
                >
                  {t.contact.subtitle}
                </motion.p>

                {/* İletişim Bilgileri */}
                <div className="space-y-6">

                  {/* Mail Kutusu (İnteraktif) */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-colors group cursor-pointer"
                    onClick={handleCopyEmail}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400 mb-1">{t.contact.info.email}</p>
                      <p className="text-white font-medium">mertcan@example.com</p>
                    </div>
                    <div className="text-slate-500">
                      {copiedEmail ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 group-hover:text-white" />}
                    </div>
                  </motion.div>

                  {/* Konum */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 mb-1">{t.contact.info.location}</p>
                      <p className="text-white font-medium">Istanbul, Turkiye</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Sosyal Medya */}
              <div className="mt-12">
                <p className="text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider">{t.contact.info.social}</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/mertcanercan" }, // Linkleri kendine göre ayarla
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" }
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.href}
                      whileHover={{ y: -5 }}
                      className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-all"
                    >
                      <item.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* --- SAĞ TARAFI: FORM ALANI --- */}
            <div className="p-10 md:p-14 bg-slate-800/20 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={4}
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      placeholder="..."
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300
                      ${formStatus === 'success'
                        ? 'bg-green-500 text-white shadow-green-500/25'
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white shadow-blue-500/25'
                      }`}
                  >
                    {formStatus === 'idle' && (
                      <>
                        {t.contact.form.btnSend}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                    {formStatus === 'sending' && (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {formStatus === 'success' && (
                      <>
                        {t.contact.form.success}
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>

              </form>
            </div>

          </div>
        </div>

        {/* Footer Benzeri Alt Yazı */}
        <div className="text-center mt-12 text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Mertcan Ercan. Built with Next.js & Django.</p>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;