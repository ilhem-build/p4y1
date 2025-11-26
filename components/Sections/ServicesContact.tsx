import React, { ReactElement, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { SERVICES_DATA } from '../../constants';

export const ServicesContact: React.FC = () => {
  // --- Form State ---
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Appraisal & Valuation',
    message: ''
  });

  // ===========================================================
  // CONFIGURATION: Web3Forms Access Key
  // 1. Go to https://web3forms.com/
  // 2. Enter your email to receive your Access Key.
  // 3. Paste the key inside the quotes below.
  // ===========================================================
  const ACCESS_KEY = "6d1a8bef-72c9-41a6-8129-607d246f8afa";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // WEB3FORMS SUBMISSION LOGIC
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `New Consultation: ${formData.interest}`,
          message: formData.message,
          // Optional Customizations
          from_name: "Phila4You Website",
          botcheck: false // Hidden field to prevent spam
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          interest: 'Appraisal & Valuation',
          message: ''
        });
      } else {
        console.error("Web3Forms Error:", result);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Network Error:", error);
      setFormStatus('error');
    }
  };

  // --- Mouse Interaction for Footer Placeholder ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [15, -15]);
  const rotateY = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-15, 15]);
  
  const glareX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [30, 70]);
  const glareY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [30, 70]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.6) 0%, transparent 60%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="expertise" className="relative py-32 px-4 md:px-12 min-h-screen flex flex-col justify-center bg-heritage-cream dark:bg-black transition-colors duration-700">
      
      {/* Services Grid (Flip Cards) */}
      <div className="max-w-7xl mx-auto w-full mb-32">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-serif text-heritage-800 dark:text-heritage-cream mb-4">Our Expertise</h2>
          <div className="w-24 h-1 bg-heritage-gold mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-[500px]">
          {SERVICES_DATA.map((service, index) => (
            <div 
              key={index}
              className="group relative w-full h-[400px] md:h-full perspective-1000"
              data-hoverable="true"
            >
              <div className="w-full h-full relative preserve-3d transition-transform duration-700 group-hover:rotate-y-180 shadow-xl shadow-heritage-800/5 dark:shadow-black/50 rounded-xl">
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white/50 dark:bg-heritage-800/40 backdrop-blur-lg border border-heritage-800/10 dark:border-white/10 rounded-xl p-8">
                  <div className="w-16 h-16 rounded-full bg-heritage-gold/10 flex items-center justify-center text-heritage-gold mb-8">
                    {React.cloneElement(service.icon as ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-heritage-800 dark:text-heritage-cream text-center">
                    {service.title}
                  </h3>
                  <div className="absolute bottom-8 text-heritage-gold text-sm uppercase tracking-widest opacity-50">
                    Hover to Reveal
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-heritage-900 border border-heritage-gold/30 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                   <h3 className="text-xl font-serif text-heritage-gold mb-6">{service.title}</h3>
                   <p className="text-heritage-cream/80 leading-relaxed font-light text-lg">
                     {service.description}
                   </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="max-w-3xl mx-auto w-full bg-heritage-900 text-heritage-cream p-8 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background Texture for Form */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-serif mb-2">Begin the Conversation</h2>
          <p className="text-heritage-cream/60 mb-8 font-light">Consultations are by appointment only.</p>

          {formStatus === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-heritage-gold/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-heritage-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-heritage-gold mb-2">Request Received</h3>
              <p className="text-heritage-cream/80">We will be in touch shortly.</p>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-heritage-gold">Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border-b border-white/20 focus:border-heritage-gold px-0 py-2 outline-none transition-colors" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-heritage-gold">Email</label>
                  <input 
                    required 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border-b border-white/20 focus:border-heritage-gold px-0 py-2 outline-none transition-colors" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-heritage-gold">Interest</label>
                <select 
                  name="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border-b border-white/20 focus:border-heritage-gold px-0 py-2 outline-none transition-colors text-heritage-cream/80"
                >
                  <option className="bg-heritage-900">Appraisal & Valuation</option>
                  <option className="bg-heritage-900">Sourcing Strategy</option>
                  <option className="bg-heritage-900">Asset Management</option>
                  <option className="bg-heritage-900">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-heritage-gold">Message</label>
                <textarea 
                  required 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border-b border-white/20 focus:border-heritage-gold px-0 py-2 outline-none transition-colors h-24 resize-none" 
                  placeholder="Tell us about your collection..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={formStatus === 'sending'}
                className="mt-8 px-8 py-4 bg-heritage-gold text-heritage-900 font-bold uppercase tracking-widest hover:bg-white transition-colors w-full md:w-auto disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2" 
                data-hoverable="true"
              >
                {formStatus === 'sending' ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-heritage-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </>
                ) : formStatus === 'error' ? 'Error - Try Again' : 'Request Consultation'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* CUSTOMIZATION: FOOTER SEAL / SECONDARY IMAGE */}
      <div className="flex justify-center mt-24 mb-8 perspective-1000">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="w-24 h-24 relative rounded-full aspect-square shadow-xl cursor-default"
        >
             <div className="absolute inset-0 rounded-full overflow-hidden bg-black ring-1 ring-white/10 aspect-square">
                <img
                    src="https://res.cloudinary.com/dhpqnaqgd/image/upload/v1764060859/file_d9qt9h.png"
                    alt="Official Seal"
                    className="w-full h-full object-cover scale-110"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] z-10 pointer-events-none mix-blend-multiply"></div>
                <motion.div 
                    style={{ background: glareBackground }}
                    className="absolute inset-0 rounded-full z-20 pointer-events-none mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 rounded-full border border-white/20 border-t-white/40 pointer-events-none z-30"></div>
             </div>
        </motion.div>
      </div>

      <footer className="mt-8 text-center text-heritage-800/40 dark:text-heritage-cream/30 text-xs font-sans uppercase tracking-widest">
        &copy; 2024 Phila4You. All Rights Reserved. Heritage Knowledge Service.
      </footer>
    </section>
  );
};