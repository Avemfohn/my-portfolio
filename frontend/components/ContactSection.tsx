'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, ArrowRight, Check } from 'lucide-react'; // Mail, MapPin, Copy sildik
import { useLanguage } from '@/context/LanguageContext';
import { sendContactMessage } from '@/lib/api';

const ContactSection = () => {
  const { t } = useLanguage();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    try {
      await sendContactMessage(data);
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (error) {
      console.error("Hata:", error);
      setFormStatus('idle');
    }
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" id="contact">

      {/* --- Background Effects --- */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse [animation-delay:2s]" />

      <div className="container mx-auto px-6 relative z-10">

        <div className="max-w-6xl mx-auto bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* --- LEFT SIDE: MARKETING & SOCIAL MEDIA --- */}
            <div className="p-10 md:p-14 bg-gradient-to-br from-slate-900/90 to-slate-800/90 flex flex-col justify-center relative overflow-hidden">

              {/* Decorative Background Lines */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                  {t.contact.title}
                  <span className="text-blue-500">.</span>
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-400 text-lg mb-12 leading-relaxed max-w-md"
                >
                  {t.contact.subtitle}
                </motion.p>

                {/* --- SOCIAL MEDIA AREA --- */}
                <div>
                  <p className="text-sm text-slate-500 mb-6 font-medium uppercase tracking-widest">
                    {t.contact.info.social}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {/* GITHUB BUTTON */}
                    <motion.a
                      href="https://github.com/AvemFohn"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-800 hover:border-white/20 transition-all cursor-pointer shadow-lg hover:shadow-xl"
                    >
                      <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white text-white group-hover:text-black transition-colors">
                         <Github className="w-6 h-6" />
                      </div>
                      <span className="text-slate-300 font-medium group-hover:text-white">GitHub</span>
                    </motion.a>

                    {/* LINKEDIN BUTTON */}
                    <motion.a
                      href="https://www.linkedin.com/in/mertcanercan/"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex items-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all cursor-pointer shadow-lg hover:shadow-blue-500/25"
                    >
                      <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-white text-blue-400 group-hover:text-blue-600 transition-colors">
                         <Linkedin className="w-6 h-6" />
                      </div>
                      <span className="text-slate-300 font-medium group-hover:text-white">LinkedIn</span>
                    </motion.a>
                  </div>
                </div>

              </div>
            </div>

            {/* --- RIGHT SIDE --- */}
            <div className="p-10 md:p-14 bg-slate-800/20 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-6">
                  {/* Name */}
                  <div className="group">
                    <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="group">
                    <label className="block text-sm font-medium text-slate-400 mb-2 group-focus-within:text-blue-400 transition-colors">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      rows={4}
                      name='message'
                      required
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                      placeholder="..."
                    />
                  </div>

                  {/* Honeypot (Hidden Input) */}
                  <input
                    type="text"
                    name="website_url_honeypot"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
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
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white shadow-blue-500/25 cursor-pointer'
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

        {/* Footer */}
        <div className="text-center mt-12 pb-8 text-slate-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Mertcan Ercan
            <span className="hidden md:inline">|</span>
            <span>{t.contact.craftedWith}</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;