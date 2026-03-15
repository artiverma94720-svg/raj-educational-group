import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Settings, HeartPulse, Activity, FlaskConical, ChevronRight, ChevronDown, Calendar, MapPin, Phone, Mail, ArrowRight, Quote, Trophy, Users, MonitorPlay, Briefcase, Sparkles, Send, Loader2, Bot, CheckCircle2, AlertCircle, LayoutDashboard, Database, Clock, Trash2, Star, ArrowLeft, Facebook, Twitter, Instagram, Linkedin, Check, UserCheck } from 'lucide-react';
// --- Firebase Imports ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Paste your Firebase Config object below.
 * 2. Paste your Gemini API Key in the apiKey variable.
 * 3. Place your 3 logo images in the /public folder of your React project.
 */
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// --- Gemini API Configuration ---
// --- API Helper Function with Exponential Backoff ---

const callGemini = async (userPrompt, systemPrompt) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `${systemPrompt}\n\n${userPrompt}`
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw error;
  }
};
  
// --- Custom CSS Injections for Premium Animations ---
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }

    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 15s ease infinite;
    }

    .glass-panel {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .course-card-gradient::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 24px;
      padding: 3px;
      background: linear-gradient(45deg, transparent, transparent, #eab308, #3b82f6);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .group:hover .course-card-gradient::before { opacity: 1; }

    /* Hide scrollbar for step transitions */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

// --- Animation Components ---
const RevealOnScroll = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-x-0 translate-y-0 scale-100 opacity-100";
    switch (direction) {
      case "up": return "translate-y-16 scale-95 opacity-0";
      case "down": return "-translate-y-16 scale-95 opacity-0";
      case "left": return "translate-x-16 scale-95 opacity-0";
      case "right": return "-translate-x-16 scale-95 opacity-0";
      default: return "translate-y-16 scale-95 opacity-0";
    }
  };

  return (
    <div ref={ref} className={`transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${getTransform()} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const AnimatedCounter = ({ end, suffix = "", duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) { setCount(end); clearInterval(timer); } 
        else { setCount(Math.ceil(start)); }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Testimonials Data ---
const testimonials = [
  { id: 1, name: "Priya Sharma", role: "B.Sc. Nursing Student", text: "Raj Educational Group transformed my career. The practical training in the nursing institute gave me the confidence to work in top hospitals immediately after graduation.", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces" },
  { id: 2, name: "Rahul Verma", role: "B.Pharm Graduate", text: "The state-of-the-art laboratories and expert faculty at the Pharmacy college are unmatched in the region. I highly recommend this institution.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces" },
  { id: 3, name: "Amit Kumar", role: "ITI Electrical", text: "The field training and hands-on experience I received here helped me secure a job before my course even finished. The management is incredibly supportive.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces" }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState('');
  const [user, setUser] = useState(null);
  const [view, setView] = useState('home'); // 'home' or 'admin'
  
  // AI Counselor State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'ai', text: 'Namaste! I am your Raj Educational Group AI Assistant. How can I help you today?' }]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Multi-step Registration states
  const [regStep, setRegStep] = useState(1);
  const [regData, setRegData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', email: '', phone: '', course: '', address: '', interests: ''
  });
  const [isSuggestingCourse, setIsSuggestingCourse] = useState(false);
  const [regStatus, setRegStatus] = useState({ loading: false, success: false, error: null });

  // Admin Dashboard States
  const [registrations, setRegistrations] = useState([]);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  // Testimonial Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { name: 'Home', link: 'home' },
    { name: 'About Us', link: 'about-us' },
    { name: 'Raj Nursing Institute', dropdown: [{ name: 'Overview', link: 'curriculum' }, { name: 'Approvals', link: 'about-us' }] },
    { name: 'Raj College of Pharmacy', dropdown: [{ name: 'Overview', link: 'curriculum' }, { name: 'Laboratories', link: 'curriculum' }, { name: 'List of Faculties', link: 'management' }, { name: 'Approvals', link: 'about-us' }] },
    { name: 'Contact', link: 'footer' }
  ];

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch(e) { console.error("Auth Error", e); }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || view !== 'admin') return;
    setIsAdminLoading(true);
    const registrationsRef = collection(db, 'artifacts', appId, 'public', 'data', 'registrations');
    const unsubscribe = onSnapshot(registrationsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0));
      setRegistrations(data);
      setIsAdminLoading(false);
    });
    return () => unsubscribe();
  }, [user, view]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (view === 'admin') setView('home');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: "smooth" });
      setMobileMenuOpen(false);
      setOpenMobileDropdown('');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (regStep < 3) {
      setRegStep(regStep + 1);
      return;
    }
    setRegStatus({ loading: true, success: false, error: null });
    try {
      const registrationsRef = collection(db, 'artifacts', appId, 'public', 'data', 'registrations');
      await addDoc(registrationsRef, { ...regData, submittedAt: serverTimestamp(), userId: user?.uid || 'anonymous' });
      setRegStatus({ loading: false, success: true, error: null });
      setRegStep(1);
      setRegData({ firstName: '', lastName: '', dob: '', gender: '', email: '', phone: '', course: '', address: '', interests: '' });
    } catch (err) { setRegStatus({ loading: false, success: false, error: "Submission failed." }); }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const newMsgs = [...chatMessages, { role: 'user', text: userInput }];
    setChatMessages(newMsgs);
    setUserInput('');
    setIsTyping(true);
    try {
      const resp = await callGemini(userInput, "You are the AI Admissions Counselor for Raj Educational Group, Bihar. Tone: Professional, helpful, brief.");
      setChatMessages([...newMsgs, { role: 'ai', text: resp }]);
    } catch (err) { setChatMessages([...newMsgs, { role: 'ai', text: "Service temporarily unavailable." }]); }
    finally { setIsTyping(false); }
  };

  const suggestCourse = async () => {
    if (!regData.interests.trim()) return;
    setIsSuggestingCourse(true);
    try {
      const suggested = await callGemini(`Interests: ${regData.interests}`, "Suggest one exact key: iti_electrical, iti_fitter, nursing_anm, nursing_gnm, nursing_bsc, pharm_d, pharm_b. Return key only.");
      setRegData({ ...regData, course: suggested.trim().toLowerCase() });
    } catch (err) { console.error(err); } finally { setIsSuggestingCourse(false); }
  };

  const deleteEntry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this registration?")) return;
    await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registrations', id));
  };

  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="bg-[#002147] text-white p-4 shadow-xl sticky top-0 z-50 bg-opacity-95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-500 p-2 rounded-xl shadow-inner"><LayoutDashboard className="w-6 h-6 text-[#002147]" /></div>
              <h1 className="text-xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">Management Dashboard</h1>
            </div>
            <button onClick={() => setView('home')} className="bg-white/10 border border-white/20 px-6 py-2 rounded-xl font-bold uppercase hover:bg-yellow-500 hover:text-[#002147] hover:border-yellow-500 transition-all flex items-center gap-2 shadow-lg">
               Exit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto p-6 md:p-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex justify-between items-center mb-4"><p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Entries</p><Database className="text-blue-500 w-6 h-6" /></div>
              <h3 className="relative z-10 text-5xl font-black text-[#002147]">{registrations.length}</h3>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex justify-between items-center mb-4"><p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Medical Courses</p><HeartPulse className="text-pink-500 w-6 h-6" /></div>
              <h3 className="relative z-10 text-5xl font-black text-[#002147]">{registrations.filter(r => r.course?.includes('nursing') || r.course?.includes('pharm')).length}</h3>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 flex justify-between items-center mb-4"><p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Last 24 Hours</p><Clock className="text-green-500 w-6 h-6" /></div>
              <h3 className="relative z-10 text-5xl font-black text-[#002147]">{registrations.filter(r => { if (!r.submittedAt) return false; return (Date.now() - r.submittedAt.seconds * 1000) < 86400000; }).length}</h3>
            </div>
          </div>
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              {isAdminLoading ? (
                <div className="p-20 text-center"><Loader2 className="animate-spin w-12 h-12 text-[#002147] mx-auto mb-4" /><p className="font-bold text-slate-500 tracking-widest uppercase">Querying Database...</p></div>
              ) : registrations.length === 0 ? (
                <div className="p-20 text-center"><Database className="w-12 h-12 text-slate-200 mx-auto mb-4" /><p className="font-bold text-slate-500 tracking-widest uppercase">No registrations found.</p></div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Student Info</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Course</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Contact</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Date</th>
                      <th className="p-6 text-xs font-black uppercase tracking-widest text-slate-400">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg) => (
                      <tr key={reg.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                        <td className="p-6"><p className="font-black text-slate-900 text-lg">{reg.firstName} {reg.lastName}</p><p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium"><MapPin className="w-3 h-3 text-blue-400" /> {reg.address?.substring(0, 30)}...</p></td>
                        <td className="p-6"><span className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase shadow-sm border border-blue-100">{reg.course?.replace('_', ' ')}</span></td>
                        <td className="p-6"><p className="text-sm font-bold text-slate-700">{reg.email}</p><p className="text-xs text-slate-500 font-medium mt-1">{reg.phone}</p></td>
                        <td className="p-6"><p className="text-sm font-bold text-slate-600">{reg.submittedAt ? new Date(reg.submittedAt.seconds * 1000).toLocaleDateString() : 'Pending'}</p><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{reg.submittedAt ? new Date(reg.submittedAt.seconds * 1000).toLocaleTimeString() : ''}</p></td>
                        <td className="p-6"><button onClick={() => deleteEntry(reg.id)} className="text-red-300 hover:text-red-600 hover:bg-red-50 p-3 rounded-xl transition-all"><Trash2 className="w-5 h-5" /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden selection:bg-yellow-400 selection:text-[#002147]">
      <CustomStyles />
      
      {/* Navigation Layer */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'bg-[#002147]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,33,71,0.2)] py-3 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl h-14 md:h-16 flex items-center cursor-pointer transform hover:scale-105 transition-all duration-300" onClick={() => scrollTo('home')}>
            <img src="/cropped-FINAL-LOGO-CROPED-NO-BG-2-300x100.png" alt="Raj Educational Group Logo" className="h-10 md:h-12 w-auto object-contain" />
          </div>
          
          <div className="hidden xl:flex space-x-2 items-center bg-white/5 backdrop-blur-md rounded-full px-4 py-1 border border-white/10">
            {menuItems.map((item, index) => (
              item.dropdown ? (
                <div key={index} className="relative group">
                  <button className="text-white font-bold uppercase text-[11px] tracking-[0.15em] flex items-center gap-1.5 px-4 py-3 rounded-full hover:bg-white/10 transition-all">
                    {item.name} <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 w-64 z-50">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden flex flex-col p-2">
                      {item.dropdown.map((sub, subIdx) => (
                        <button key={subIdx} onClick={() => scrollTo(sub.link)} className="text-left px-5 py-3.5 text-xs font-black tracking-wider text-[#002147] hover:bg-yellow-50 hover:text-yellow-600 transition-colors w-full rounded-xl">
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button key={index} onClick={() => scrollTo(item.link)} className="text-white font-bold uppercase text-[11px] tracking-[0.15em] px-4 py-3 rounded-full hover:bg-white/10 transition-all relative overflow-hidden group">
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-1/2 transition-all duration-300"></div>
                </button>
              )
            ))}
            <button onClick={() => scrollTo('registration')} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#002147] px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-105 transition-all ml-2">
              Apply Now
            </button>
          </div>

          <div className="xl:hidden flex items-center">
            <button className="text-white focus:outline-none p-2.5 rounded-xl glass-panel hover:bg-white/20 transition-all" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Accordion */}
        <div className={`xl:hidden absolute top-full left-0 w-full bg-[#001f3f]/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out z-50 ${mobileMenuOpen ? 'max-h-screen opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-6 space-y-2 overflow-y-auto max-h-[70vh] no-scrollbar">
            {menuItems.map((item, index) => (
              item.dropdown ? (
                <div key={index} className="flex flex-col">
                  <button onClick={() => setOpenMobileDropdown(openMobileDropdown === item.name ? '' : item.name)} className="text-white flex justify-between items-center px-4 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all hover:bg-white/10 w-full">
                    {item.name} <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openMobileDropdown === item.name ? 'rotate-180 text-yellow-400' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 ${openMobileDropdown === item.name ? 'max-h-96 opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col space-y-1 border-l-2 border-yellow-400/30 pl-4 py-2">
                      {item.dropdown.map((sub, subIdx) => (
                        <button key={subIdx} onClick={() => scrollTo(sub.link)} className="text-slate-300 hover:text-white hover:translate-x-2 text-xs font-bold uppercase tracking-wider text-left py-3 transition-all">
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button key={index} onClick={() => scrollTo(item.link)} className="text-white block px-4 py-4 rounded-2xl text-sm font-black tracking-widest w-full text-left uppercase transition-all hover:bg-white/10 hover:translate-x-2">
                  {item.name}
                </button>
              )
            ))}
            <div className="pt-6 mt-4 border-t border-white/10">
               <button onClick={() => scrollTo('registration')} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#002147] w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all">
                 Student Registration
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#001f3f]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920')] bg-cover bg-center opacity-30 transform scale-110 motion-safe:animate-[pulse_20s_ease-in-out_infinite]"></div>
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/90 via-[#001530]/80 to-[#002147]/90 animate-gradient-x mix-blend-multiply"></div>
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto mt-20">
          <RevealOnScroll delay={100} direction="down">
            <div className="inline-block glass-panel px-6 py-2 rounded-full mb-8">
              <h2 className="text-yellow-400 font-black tracking-[0.3em] uppercase text-xs md:text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Mata Vaishnavi Educational Trust
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={300}>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black mb-8 uppercase tracking-tighter leading-[1.1] animate-float drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-yellow-100">
              Build a career<br />with us.
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={500}>
            <div className="glass-panel p-6 md:p-8 rounded-[2.5rem] max-w-4xl mx-auto backdrop-blur-xl shadow-2xl border-t border-white/20 mb-12">
              <p className="text-lg md:text-xl text-blue-50 font-medium leading-relaxed">
                Empowering Minds in rural Bihar. <span className="font-black text-yellow-400">Raj Educational Group</span> provides relevant, professional education for the future. Develop the moral fiber and practical skills necessary to leave your mark on the world.
              </p>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={700}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button onClick={() => scrollTo('registration')} className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#002147] px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-[0_0_30px_rgba(250,204,21,0.3)] hover:shadow-[0_0_40px_rgba(250,204,21,0.5)] transform hover:-translate-y-1 transition-all w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-3">Student Registration <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></span>
                <div className="absolute inset-0 h-full w-0 bg-white/30 skew-x-[45deg] group-hover:w-[150%] transition-all duration-500 ease-out -left-10"></div>
              </button>
              <button onClick={() => setChatOpen(true)} className="group glass-panel px-10 py-5 rounded-full font-black text-white hover:bg-white hover:text-[#002147] transition-all uppercase tracking-widest flex items-center gap-3 justify-center shadow-lg w-full sm:w-auto transform hover:-translate-y-1">
                <Bot className="w-5 h-5 text-yellow-400 group-hover:text-[#002147]" /> AI Counselor
              </button>
            </div>
          </RevealOnScroll>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-2 glass-panel">
            <div className="w-1.5 h-3 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Premium Stats Section */}
      <section className="relative z-20 -mt-16 mx-4 max-w-7xl lg:mx-auto">
        <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,33,71,0.1)] border border-white grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x border-[#002147]/5">
          {[
            {e:2, s:"K+", l:"Enrollments", bg:"from-blue-50 to-indigo-50", c:"text-blue-600"}, 
            {e:3, s:"", l:"Colleges", bg:"from-yellow-50 to-orange-50", c:"text-yellow-600"}, 
            {e:12, s:"+", l:"Years Excellence", bg:"from-green-50 to-emerald-50", c:"text-green-600"}, 
            {e:10, s:"+", l:"Acres Campus", bg:"from-pink-50 to-rose-50", c:"text-pink-600"}
          ].map((s, i) => (
            <RevealOnScroll key={i} delay={i * 100} direction="up" className="px-4">
              <div className={`bg-gradient-to-br ${s.bg} p-6 rounded-3xl h-full flex flex-col items-center justify-center transform hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md border border-white`}>
                <h4 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-3 ${s.c} drop-shadow-sm`}><AnimatedCounter end={s.e} suffix={s.s} /></h4>
                <div className="w-12 h-1 bg-black/10 rounded-full mb-3"></div>
                <p className="text-[10px] md:text-xs uppercase font-black text-slate-600 tracking-[0.2em] text-center">{s.l}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-[120px] opacity-60 -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100 to-transparent rounded-full blur-[100px] opacity-60 -z-10 transform -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 w-full">
              <RevealOnScroll direction="right">
                <div className="relative group perspective-1000">
                  <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform transition-transform duration-700 group-hover:rotate-y-2 group-hover:rotate-x-2">
                    <div className="absolute inset-0 bg-[#002147]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800" alt="Campus" className="w-full h-[600px] object-cover transform transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                  
                  {/* Floating Identity Badge */}
                  <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl z-20 border border-slate-100 transform transition-transform duration-500 group-hover:-translate-y-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4">
                      <Trophy className="w-8 h-8 text-yellow-600" />
                    </div>
                    <p className="font-black uppercase tracking-[0.2em] text-xs text-slate-400 mb-1">Registered Trust</p>
                    <h3 className="text-xl md:text-2xl font-black text-[#002147] leading-tight">Mata Vaishnavi<br/>Educational Trust</h3>
                    <div className="mt-4 pt-4 border-t border-slate-100"><p className="text-slate-500 text-xs font-bold">Reg No. - 2323 (2011 - 2012)</p></div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:w-1/2 space-y-10 w-full">
              <RevealOnScroll delay={100} direction="left">
                <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-2">
                  <h4 className="text-blue-700 font-black tracking-[0.2em] uppercase text-xs">About Us</h4>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#002147] uppercase tracking-tighter leading-[1.1] mb-6">Our Aim & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">Mission</span></h2>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  Established in village Odar, district Bhabua (Kaimur), a historic region of Bihar, to impart high-quality technical & scientific knowledge with ethics so as to serve society and mankind with full devotion.
                </p>
              </RevealOnScroll>
              
              <RevealOnScroll delay={200} direction="left">
                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-lg border border-slate-100 relative overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002147] to-blue-500"></div>
                  <h3 className="text-2xl font-black text-[#002147] mb-6 uppercase tracking-wider flex items-center gap-3"><MonitorPlay className="text-blue-500 w-6 h-6" /> Our Mission</h3>
                  <ul className="space-y-5">
                    {[
                      "A high-quality education through a skill-based curriculum providing breadth and enriched opportunities.",
                      "A focus on personal development, building resilient, determined and confident students.",
                      "Provide field training so our students are prepared for the workforce after completing their degrees."
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <div className="bg-slate-100 p-1.5 rounded-full mr-4 mt-0.5 group-hover/item:bg-blue-100 transition-colors">
                          <Check className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Institutes (Logos) Section */}
      <section id="institutes" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h4 className="text-yellow-500 font-black tracking-[0.2em] uppercase text-sm mb-4">Our Colleges</h4>
              <h2 className="text-4xl md:text-5xl font-black text-[#002147] uppercase tracking-tight">Institutes Under Our Umbrella</h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-200 mx-auto mt-8 rounded-full"></div>
            </div>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Nursing Card */}
            <RevealOnScroll delay={100} direction="up">
              <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] shadow-sm hover:shadow-[0_20px_50px_rgba(22,163,74,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center group h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="w-48 h-48 mb-8 p-4 bg-white rounded-[2rem] shadow-md group-hover:scale-105 transition-transform duration-500 group-hover:shadow-xl">
                  <img src="/Raj-Nursing-Institute_Logo_No-BG_Square.png" alt="Raj Nursing Institute Logo" className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#002147] mb-4 uppercase tracking-wider">Raj Nursing Institute</h3>
                <p className="text-slate-600 leading-relaxed font-medium">Providing top-tier nursing education including A.N.M., G.N.M., and B.Sc. Nursing to build compassionate, skilled healthcare professionals.</p>
              </div>
            </RevealOnScroll>
            
            {/* Pharmacy Card */}
            <RevealOnScroll delay={200} direction="up">
               <div className="bg-slate-50 p-10 md:p-14 rounded-[3rem] shadow-sm hover:shadow-[0_20px_50px_rgba(59,130,246,0.15)] transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 flex flex-col items-center text-center group h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                <div className="w-48 h-48 mb-8 p-4 bg-white rounded-[2rem] shadow-md group-hover:scale-105 transition-transform duration-500 group-hover:shadow-xl">
                  <img src="/Raj-College-of-Pharmacy_Logo_NO-BG_Square.png" alt="Raj College of Pharmacy Logo" className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#002147] mb-4 uppercase tracking-wider">Raj College of Pharmacy</h3>
                <p className="text-slate-600 leading-relaxed font-medium">Delivering excellence in pharmaceutical education through our D.Pharm and B.Pharm programs to innovate the future of medicine.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Premium Course Cards Section */}
      <section id="curriculum" className="py-32 bg-[#001f3f] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h4 className="text-yellow-400 font-black tracking-[0.2em] uppercase text-sm mb-4">Curriculum</h4>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Programs We Offer</h2>
              <p className="text-blue-100 text-lg leading-relaxed font-light max-w-2xl mx-auto">
                A broad and well-rounded curriculum designed to prepare all of our students for the best social and professional life possible.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: "I.T.I", s: "Electrical & Fitter", i: <Settings/>, d: "2 Years", e: "10th Pass", color: "from-gray-500 to-slate-700" },
              { t: "A.N.M.", s: "Auxiliary Nurse & Midwife", i: <HeartPulse/>, d: "2 Years", e: "12th Pass", color: "from-pink-500 to-rose-600" },
              { t: "G.N.M.", s: "General Nursing", i: <Activity/>, d: "3 Years", e: "12th Science", color: "from-green-500 to-emerald-600" },
              { t: "B.Sc. Nursing", s: "Bachelor of Science", i: <Activity/>, d: "4 Years", e: "12th Science (PCB)", color: "from-teal-500 to-teal-700" },
              { t: "D.Pharm", s: "Diploma in Pharmacy", i: <FlaskConical/>, d: "2 Years", e: "12th Science", color: "from-blue-500 to-indigo-600" },
              { t: "B.Pharm", s: "Bachelor of Pharmacy", i: <FlaskConical/>, d: "4 Years", e: "12th Science", color: "from-violet-500 to-purple-700" }
            ].map((prog, index) => (
              <RevealOnScroll key={index} delay={index * 100} direction="up">
                <div className="group relative h-full course-card-gradient">
                  <div className="bg-[#0a2540] p-8 rounded-3xl h-full flex flex-col relative z-10 border border-white/10 hover:bg-[#0d2f50] transition-colors duration-300">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prog.color} text-white flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {React.cloneElement(prog.i, { className: "w-8 h-8" })}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-wider">{prog.t}</h3>
                    <p className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-6">{prog.s}</p>
                    
                    <div className="space-y-3 mb-8 flex-grow">
                      <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl">
                        <Clock className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-bold tracking-wider uppercase">Duration: {prog.d}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300 bg-white/5 p-3 rounded-xl">
                        <UserCheck className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-bold tracking-wider uppercase">Eligibility: {prog.e}</span>
                      </div>
                    </div>

                    <button onClick={() => scrollTo('registration')} className="flex items-center gap-2 text-white font-black uppercase text-xs tracking-[0.2em] group-hover:text-yellow-400 transition-colors mt-auto">
                      Learn More <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* NEW Testimonials Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h4 className="text-yellow-500 font-black tracking-[0.2em] uppercase text-sm mb-4">Student Voices</h4>
            <h2 className="text-4xl md:text-5xl font-black text-[#002147] uppercase tracking-tight">Success Stories</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-slate-50 p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100 min-h-[300px] flex items-center justify-center">
              <Quote className="absolute top-10 left-10 w-24 h-24 text-slate-200 opacity-50" />
              
              {testimonials.map((t, idx) => (
                <div key={t.id} className={`transition-all duration-700 absolute w-full px-10 md:px-20 ${idx === currentTestimonial ? 'opacity-100 translate-y-0 relative z-10' : 'opacity-0 translate-y-10 absolute z-0 pointer-events-none'}`}>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-xl md:text-2xl text-slate-700 font-medium italic mb-10 leading-relaxed">"{t.text}"</p>
                    <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white mb-4" />
                    <h4 className="text-lg font-black text-[#002147] uppercase tracking-wider">{t.name}</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-6 flex gap-3">
                {testimonials.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentTestimonial(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentTestimonial ? 'bg-[#002147] w-8' : 'bg-slate-300'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-step Registration Portal */}
      <section id="registration" className="py-32 bg-slate-100 relative overflow-hidden">
        <div className="absolute top-0 w-full h-1/2 bg-[#002147]"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-200">
              
              {/* Header */}
              <div className="bg-gradient-to-r from-[#002147] to-[#0a2540] p-10 md:p-14 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[80px] transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">Admission Portal</h2>
                  <p className="font-black text-yellow-400 uppercase tracking-[0.2em] text-xs">Join the legacy of excellence</p>
                </div>
                {/* Progress Bar Header */}
                {!regStatus.success && (
                  <div className="relative z-10 mt-10">
                    <div className="flex justify-between mb-2">
                      <span className={`text-xs font-bold uppercase tracking-widest ${regStep >= 1 ? 'text-yellow-400' : 'text-slate-500'}`}>Step 1: Info</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${regStep >= 2 ? 'text-yellow-400' : 'text-slate-500'}`}>Step 2: Course</span>
                      <span className={`text-xs font-bold uppercase tracking-widest ${regStep >= 3 ? 'text-yellow-400' : 'text-slate-500'}`}>Step 3: Review</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full transition-all duration-500 rounded-full" style={{ width: `${(regStep / 3) * 100}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 md:p-16 bg-white min-h-[500px] flex flex-col justify-center">
                {regStatus.success ? (
                  <div className="text-center animate-in zoom-in duration-500">
                    <div className="bg-green-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                      <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-[#002147] uppercase tracking-tight mb-4">Application Successful!</h3>
                    <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed mb-8">Your registration details have been securely saved. Our admissions office will reach out to you shortly.</p>
                    <button onClick={() => setRegStatus({ ...regStatus, success: false })} className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors">
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegistration} className="relative">
                    
                    {/* STEP 1: AI & Personal Info */}
                    <div className={`transition-all duration-500 ${regStep === 1 ? 'opacity-100 translate-x-0 relative' : 'opacity-0 -translate-x-10 absolute pointer-events-none hidden'}`}>
                      <div className="mb-10 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 relative shadow-sm">
                        <Sparkles className="absolute -top-4 -left-4 text-yellow-500 w-10 h-10 bg-white p-2 rounded-full shadow-lg" />
                        <h3 className="text-[#002147] font-black uppercase tracking-widest flex items-center gap-3 mb-3 text-lg">AI Course Match</h3>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">Describe your career goals, and let our AI recommend the perfect course.</p>
                        <div className="flex flex-col md:flex-row gap-3">
                          <input type="text" className="flex-grow px-6 py-4 rounded-xl border border-white shadow-sm focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium" placeholder="e.g. I want to build circuits..." value={regData.interests} onChange={(e) => setRegData({...regData, interests: e.target.value})} />
                          <button type="button" onClick={suggestCourse} disabled={isSuggestingCourse} className="bg-[#002147] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-md active:scale-95 disabled:opacity-50">
                            {isSuggestingCourse ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />} Suggest
                          </button>
                        </div>
                        {regData.course && !isSuggestingCourse && (
                           <div className="mt-4 text-sm font-bold text-green-600 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Course selected: {regData.course.replace('_', ' ')}</div>
                        )}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">First Name *</label><input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-[#002147] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-700" required value={regData.firstName} onChange={e => setRegData({...regData, firstName: e.target.value})} /></div>
                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Last Name *</label><input type="text" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-[#002147] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-700" required value={regData.lastName} onChange={e => setRegData({...regData, lastName: e.target.value})} /></div>
                        <button type="button" onClick={() => setRegStep(2)} className="md:col-span-2 bg-[#002147] text-white py-5 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-900 transition-all shadow-xl active:scale-[0.98] mt-4 flex justify-center items-center gap-2">Next Step <ArrowRight className="w-4 h-4" /></button>
                      </div>
                    </div>

                    {/* STEP 2: Course & Contact */}
                    <div className={`transition-all duration-500 ${regStep === 2 ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-10 absolute pointer-events-none hidden'}`}>
                      <div className="grid md:grid-cols-2 gap-6 text-left">
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Academic Program *</label>
                          <select className="w-full px-6 py-4 bg-slate-50 rounded-xl border-2 border-slate-100 focus:border-[#002147] outline-none transition-all cursor-pointer font-black text-[#002147] text-lg" required value={regData.course} onChange={e => setRegData({...regData, course: e.target.value})}>
                            <option value="">-- Select a Program --</option>
                            <option value="iti_electrical">I. T. I. in Electrical</option>
                            <option value="iti_fitter">I. T. I. in Fitter</option>
                            <option value="nursing_anm">Auxiliary Nurse and Midwife (A.N.M.)</option>
                            <option value="nursing_gnm">G. N. M. (General Nursing and Midwifery)</option>
                            <option value="nursing_bsc">B. Sc. Nursing</option>
                            <option value="pharm_d">Diploma in Pharmacy (D. Pharm)</option>
                            <option value="pharm_b">Bachelor of Pharmacy (B. Pharm)</option>
                          </select>
                        </div>
                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Email Address *</label><input type="email" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-[#002147] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-700" required value={regData.email} onChange={e => setRegData({...regData, email: e.target.value})} /></div>
                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Phone Number *</label><input type="tel" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-[#002147] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-slate-700" required value={regData.phone} onChange={e => setRegData({...regData, phone: e.target.value})} /></div>
                        <div className="md:col-span-2 flex gap-4 mt-4">
                          <button type="button" onClick={() => setRegStep(1)} className="bg-slate-100 text-slate-600 px-8 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
                          <button type="button" onClick={() => setRegStep(3)} className="flex-grow bg-[#002147] text-white py-5 rounded-xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-900 transition-all shadow-xl active:scale-[0.98] flex justify-center items-center gap-2">Next Step <ArrowRight className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>

                    {/* STEP 3: Review & Submit */}
                    <div className={`transition-all duration-500 ${regStep === 3 ? 'opacity-100 translate-x-0 relative' : 'opacity-0 translate-x-10 absolute pointer-events-none hidden'}`}>
                      <div className="grid grid-cols-1 gap-6 text-left">
                        <div className="space-y-2"><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Complete Residential Address *</label><textarea className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:border-[#002147] focus:ring-4 focus:ring-blue-50 outline-none transition-all h-32 resize-none font-bold text-slate-700" required value={regData.address} onChange={e => setRegData({...regData, address: e.target.value})}></textarea></div>
                        
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Review Details</h4>
                          <ul className="text-sm font-bold text-slate-700 space-y-2">
                            <li>Name: {regData.firstName} {regData.lastName}</li>
                            <li>Course: <span className="text-blue-600 uppercase">{regData.course.replace('_', ' ')}</span></li>
                            <li>Contact: {regData.email} | {regData.phone}</li>
                          </ul>
                        </div>

                        {regStatus.error && <div className="bg-red-50 p-5 rounded-xl flex items-center gap-4 text-red-600 font-bold border border-red-100"><AlertCircle className="w-6 h-6 flex-shrink-0" /> {regStatus.error}</div>}
                        
                        <div className="flex gap-4 mt-4">
                          <button type="button" onClick={() => setRegStep(2)} className="bg-slate-100 text-slate-600 px-8 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center"><ArrowLeft className="w-4 h-4" /></button>
                          <button type="submit" disabled={regStatus.loading} className="flex-grow bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#002147] py-5 rounded-xl font-black text-lg uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all shadow-xl active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3">
                            {regStatus.loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Final Submit"}
                          </button>
                        </div>
                      </div>
                    </div>

                  </form>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* AI Counselor Floating Widget */}
      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ease-out ${chatOpen ? 'w-[90vw] md:w-[400px]' : 'w-auto'}`}>
        {!chatOpen ? (
          <button onClick={() => setChatOpen(true)} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#002147] p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3 group border-4 border-white">
            <Sparkles className="w-7 h-7 animate-pulse" />
            <span className="max-w-0 group-hover:max-w-[200px] transition-all duration-500 overflow-hidden whitespace-nowrap font-black uppercase tracking-widest text-sm">Admissions AI</span>
          </button>
        ) : (
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-gradient-to-r from-[#002147] to-[#0a2540] p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 p-2.5 rounded-xl text-[#002147] shadow-inner"><Bot className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm leading-tight">AI Counselor</h4>
                  <p className="text-[10px] text-green-400 uppercase tracking-wider font-bold flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full hover:bg-white/20"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-5 bg-slate-50 no-scrollbar">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-sm font-medium ${msg.role === 'ai' ? 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm' : 'bg-[#002147] text-white rounded-tr-sm'}`}>{msg.text}</div>
                </div>
              ))}
              {isTyping && <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-sm w-20 flex gap-1.5 shadow-sm border border-slate-100"><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-300"></span></div>}
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 border-t border-slate-100 flex gap-3 bg-white">
              <input type="text" value={userInput} onChange={e => setUserInput(e.target.value)} placeholder="Type your message..." className="flex-grow px-5 py-4 bg-slate-100 rounded-2xl outline-none text-[15px] font-bold text-slate-700 focus:ring-2 focus:ring-[#002147] transition-all" />
              <button className="bg-yellow-500 px-5 rounded-2xl text-[#002147] hover:scale-105 transition-transform shadow-md active:scale-95 flex items-center justify-center"><Send className="w-5 h-5" /></button>
            </form>
          </div>
        )}
      </div>

      {/* Premium Footer */}
      <footer id="footer" className="bg-[#001f3f] text-slate-400 pt-32 pb-16 relative overflow-hidden border-t-8 border-yellow-500">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            <div>
              <div className="bg-white inline-block px-8 py-4 rounded-[2rem] mb-8 shadow-2xl transform hover:scale-105 transition-transform">
                <img src="/cropped-FINAL-LOGO-CROPED-NO-BG-2-300x100.png" alt="Logo" className="h-10 md:h-12 object-contain" />
              </div>
              <p className="text-sm font-medium leading-relaxed text-blue-200/60 max-w-sm">Empowering Minds, Shaping Futures. Join a community dedicated to academic excellence and holistic development in rural Bihar.</p>
              <div className="flex gap-4 mt-8">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-[#002147] transition-colors"><Icon className="w-4 h-4" /></button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] mb-8">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'About Us', 'Curriculum', 'Student Registration', 'Contact Us'].map((link, i) => (
                  <li key={i}><button onClick={() => scrollTo(link === 'Student Registration' ? 'registration' : link.toLowerCase().replace(' ', '-'))} className="text-blue-200/60 hover:text-yellow-400 font-bold uppercase text-xs tracking-wider transition-colors">{link}</button></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] mb-8">Affiliations</h4>
              <ul className="space-y-4">
                <li><a href="https://bnrc.bihar.gov.in/" className="text-blue-200/60 hover:text-yellow-400 font-bold uppercase text-xs tracking-wider transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-yellow-500"/> BNRC BIHAR</a></li>
                <li><a href="http://buhs.ac.in" className="text-blue-200/60 hover:text-yellow-400 font-bold uppercase text-xs tracking-wider transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-yellow-500"/> BUHS BIHAR</a></li>
                <li><a href="https://www.pci.nic.in/" className="text-blue-200/60 hover:text-yellow-400 font-bold uppercase text-xs tracking-wider transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-yellow-500"/> PCI INDIA</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] md:text-[11px] font-medium text-blue-200/40 uppercase tracking-[0.2em] text-center md:text-left">
              Copyright © 2026 rajeducationalgroup.org<br/>Mata Vaishnavi Educational Trust (Reg No. 2323)
            </p>
            <button onClick={() => setView('admin')} className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10">
              <LayoutDashboard className="w-4 h-4" /> Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
