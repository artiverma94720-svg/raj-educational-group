import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ChevronRight, GraduationCap, BookOpen, Users, 
  Award, HeartPulse, FlaskConical, Settings, Bot, Send, 
  Sparkles, Phone, Mail, MapPin, CheckCircle2, ArrowRight
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- CONFIGURATION ---
// Replace these with your actual keys from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Replace with your key from Google AI Studio (https://aistudio.google.com/)
const GEMINI_API_KEY = ""; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Namaste! I am the Raj Educational Group AI Counselor. How can I help you with your career path today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      course: formData.get('course'),
      timestamp: serverTimestamp()
    };

    try {
      // NOTE: This requires your Firebase Config to be valid
      // await addDoc(collection(db, 'registrations'), data);
      alert("Registration Successful! Our counselor will call you within 24 hours.");
      e.target.reset();
    } catch (error) {
      console.error("Error saving to database:", error);
      alert("Registration sent! (Note: Connect your Firebase keys to save data permanently)");
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newMsg = { role: 'user', text: userInput };
    setChatMessages(prev => [...prev, newMsg]);
    setUserInput('');
    setIsTyping(true);

    // Mock AI response for now (to avoid API errors if key is missing)
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        text: `That's a great question about ${userInput}! Our ${userInput.includes('Nursing') ? 'Nursing' : 'Pharmacy'} department is one of the best in Bihar. Would you like me to help you register for a campus visit?` 
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-yellow-200 selection:text-[#002147]">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#002147]/95 backdrop-blur-xl py-3 shadow-2xl' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl flex items-center h-14">
            <img 
              src="/cropped-FINAL-LOGO-CROPED-NO-BG-2-300x100.png" 
              alt="Logo" 
              className="h-10 w-auto object-contain"
              onError={(e) => e.target.src = "https://via.placeholder.com/200x50?text=RAJ+GROUP"} 
            />
          </div>

          <div className="hidden xl:flex items-center space-x-1 bg-white/5 backdrop-blur-md rounded-full p-1 border border-white/10">
            {['Home', 'About Us', 'Institutes', 'Curriculum', 'Gallery'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} 
                 className="text-white font-bold uppercase text-[11px] tracking-widest px-5 py-3 rounded-full hover:bg-white/10 transition-all">
                {item}
              </a>
            ))}
            <a href="#registration" className="bg-yellow-400 text-[#002147] px-6 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all ml-2 shadow-lg shadow-yellow-400/20">
              Apply Now
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden text-white bg-white/10 p-2.5 rounded-xl border border-white/20">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#001f3f]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920')] bg-cover bg-center opacity-30 transform scale-110"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#002147]/95 via-[#001530]/85 to-[#002147]/95"></div>
          
          {/* Animated Blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-black tracking-[0.3em] uppercase text-[10px] md:text-xs">
              Mata Vaishnavi Educational Trust
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
            Build a career<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">with us.</span>
          </h1>

          <div className="bg-white/5 backdrop-blur-lg p-6 md:p-8 rounded-[2.5rem] border border-white/10 max-w-3xl mx-auto mb-12">
            <p className="text-base md:text-xl text-blue-50 font-medium leading-relaxed">
              Empowering Minds in rural Bihar. Raj Educational Group provides relevant, professional education for the future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#registration" className="group bg-yellow-400 text-[#002147] px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl shadow-yellow-400/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
              Start Application <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button onClick={() => setIsChatOpen(true)} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-[#002147] transition-all flex items-center justify-center gap-3">
              <Bot className="w-5 h-5 text-yellow-400" /> AI Counselor
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Enrollments', val: '2K+', color: 'text-blue-600' },
            { label: 'Colleges', val: '3', color: 'text-yellow-600' },
            { label: 'Years Excellence', val: '12+', color: 'text-emerald-600' },
            { label: 'Acres Campus', val: '10+', color: 'text-purple-600' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <h4 className={`text-4xl md:text-5xl font-black mb-2 transition-transform group-hover:scale-110 ${stat.color}`}>{stat.val}</h4>
              <p className="text-[10px] md:text-xs uppercase font-black text-slate-400 tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Institutions Section */}
      <section id="institutes" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#002147] uppercase tracking-tighter mb-4">Our Institutions</h2>
            <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Raj Nursing Institute', 
                icon: HeartPulse, 
                color: 'bg-pink-500', 
                desc: 'A.N.M, G.N.M, and B.Sc. Nursing programs with in-house hospital training.',
                img: '/Raj-Nursing-Institute_Logo_No-BG_Square.png'
              },
              { 
                name: 'Raj College of Pharmacy', 
                icon: FlaskConical, 
                color: 'bg-blue-600', 
                desc: 'Excellence in pharmaceutical sciences with D.Pharm and B.Pharm courses.',
                img: '/Raj-College-of-Pharmacy_Logo_NO-BG_Square.png'
              },
              { 
                name: 'Raj Private ITI', 
                icon: Settings, 
                color: 'bg-emerald-600', 
                desc: 'Technical skill development in Electrician and Fitter trades for industry readiness.',
                img: 'https://via.placeholder.com/150?text=ITI'
              }
            ].map((inst, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-all">
                <div className={`${inst.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-current/20 group-hover:rotate-6 transition-transform`}>
                  <inst.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-[#002147] uppercase mb-4">{inst.name}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8">{inst.desc}</p>
                <button className="flex items-center gap-2 text-[#002147] font-black uppercase text-xs tracking-widest group/btn">
                  View Details <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Portal */}
      <section id="registration" className="py-32 bg-[#001f3f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-tight">
                Your Future<br/>Starts <span className="text-yellow-400">Here.</span>
              </h2>
              <div className="space-y-6">
                {[
                  'Scholarships for meritorious students',
                  '100% Placement assistance support',
                  'Modern labs and smart classrooms',
                  'Expert faculty from top universities'
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="bg-yellow-400/20 p-1 rounded-full">
                      <CheckCircle2 className="text-yellow-400 w-6 h-6" />
                    </div>
                    <span className="text-lg font-bold text-blue-100">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <h3 className="text-2xl font-black text-[#002147] uppercase mb-8 flex items-center gap-3">
                <GraduationCap className="text-yellow-500" /> Admission Form
              </h3>
              <form onSubmit={handleRegistration} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                  <input name="name" type="text" required placeholder="Ex: Rahul Kumar" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-yellow-400 outline-none font-bold text-[#002147] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone Number</label>
                  <input name="phone" type="tel" required placeholder="Ex: +91 9876543210" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-yellow-400 outline-none font-bold text-[#002147] transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Desired Course</label>
                  <select name="course" required className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-yellow-400 outline-none font-bold text-[#002147] transition-all appearance-none cursor-pointer">
                    <option value="">-- Select Your Interest --</option>
                    <option>B.Sc Nursing</option>
                    <option>G.N.M Nursing</option>
                    <option>B.Pharmacy</option>
                    <option>D.Pharmacy</option>
                    <option>ITI - Electrician</option>
                  </select>
                </div>
                <button className="w-full bg-[#002147] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-blue-900 hover:-translate-y-1 transition-all">
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating AI Widget */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-700 ${isChatOpen ? 'translate-y-20 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-yellow-400 text-[#002147] p-5 rounded-full shadow-2xl shadow-yellow-400/30 border-4 border-white hover:scale-110 active:scale-95 transition-all group flex items-center gap-4"
        >
          <div className="relative">
            <Bot size={32} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
          </div>
          <span className="font-black uppercase tracking-widest text-sm hidden lg:inline-block">AI Counselor</span>
        </button>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-[101] w-[90vw] md:w-[450px] h-[70vh] bg-white rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.4)] border border-slate-200 flex flex-col overflow-hidden transition-all duration-500 ease-out origin-bottom-right ${
        isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-[#002147] p-8 text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-yellow-400 p-3 rounded-2xl text-[#002147]">
              <Bot size={24} />
            </div>
            <div>
              <h4 className="font-black uppercase tracking-widest text-sm">Counseling AI</h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Online Now</span>
              </div>
            </div>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="bg-white/10 hover:bg-white/20 p-2.5 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow p-8 space-y-6 overflow-y-auto bg-slate-50/50">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-3xl font-medium text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-[#002147] text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              type="text" 
              placeholder="Ask about admissions..." 
              className="w-full pl-6 pr-16 py-4 bg-slate-100 rounded-2xl outline-none font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-yellow-400/20 transition-all text-sm"
            />
            <button 
              onClick={sendMessage}
              className="absolute right-2 p-3 bg-yellow-400 text-[#002147] rounded-xl shadow-lg active:scale-90 transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#001f3f] text-slate-400 pt-32 pb-16 border-t-8 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="bg-white inline-block px-8 py-4 rounded-3xl mb-8">
                <img src="/cropped-FINAL-LOGO-CROPED-NO-BG-2-300x100.png" alt="Logo" className="h-10" />
              </div>
              <p className="text-xl text-blue-100/60 font-medium max-w-md leading-relaxed">
                Dedicated to providing high-quality professional education in rural areas, fostering a generation of skilled leaders.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Contact Us</h5>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
                  <Phone size={18} className="text-yellow-400" /> +91 91552 23201
                </a>
                <a href="#" className="flex items-center gap-3 hover:text-yellow-400 transition-colors">
                  <Mail size={18} className="text-yellow-400" /> info@rajeducationalgroup.org
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-yellow-400 shrink-0" /> 
                  <span>Village- Odar, Bhabua, Kaimur, Bihar</span>
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-white font-black uppercase tracking-widest text-xs mb-8">Quick Links</h5>
              <div className="grid grid-cols-2 gap-4">
                {['About Us', 'Apply Now', 'Gallery', 'Courses', 'Admin Portal', 'Privacy'].map(link => (
                  <a key={link} href="#" className="hover:text-yellow-400 transition-colors text-sm font-bold uppercase tracking-tight">{link}</a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-200/40">
              © 2026 Raj Educational Group | Operated by Mata Vaishnavi Educational Trust
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
