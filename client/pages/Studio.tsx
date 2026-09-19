import { useState, useEffect, useRef } from "react";
import { AudioLines, Languages, LogIn, Mail, Menu, Mic, Search, Sparkles, WandSparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

function Mark() { return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />; }
const sampleMemory = "My grandmother used to say that every recipe begins with a story. When the monsoon came, she would make a pot of khichdi and call every neighbour home.";

export default function Studio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [memory, setMemory] = useState("");
  const [interimMemory, setInterimMemory] = useState("");
  const [dialect, setDialect] = useState("English");
  const [recording, setRecording] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const closeMenu = () => setMenuOpen(false);

  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);

  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English works best for local accents

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            currentInterim += transcript;
          }
        }
        if (finalTranscript) {
          setMemory((prev) => prev + finalTranscript);
        }
        setInterimMemory(currentInterim);
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error("Speech recognition error", event.error);
          alert("Microphone error: " + event.error + ". Please ensure your microphone is connected and allowed.");
          isRecordingRef.current = false;
          setRecording(false);
          setInterimMemory("");
        }
      };

      recognition.onend = () => {
        if (isRecordingRef.current) {
          setTimeout(() => {
            try {
              recognition.start();
            } catch (e) {
              console.error(e);
            }
          }, 100);
        } else {
          setRecording(false);
          setInterimMemory("");
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Voice recording is not supported in your browser. Please try Chrome or Edge.");
      return;
    }
    
    if (recording) {
      isRecordingRef.current = false;
      recognitionRef.current.stop();
      setRecording(false);
    } else {
      if (memory === sampleMemory) setMemory("");
      try {
        isRecordingRef.current = true;
        recognitionRef.current.start();
        setRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const processStory = async () => {
    if (!memory.trim()) return;
    setIsProcessing(true);
    setProcessed(false);
    
    let result = memory;
    const isSample = memory.trim().toLowerCase() === sampleMemory.trim().toLowerCase();

    const translations: Record<string, string> = {
      Hindi: "मेरी दादी कहती थीं कि हर नुस्खा एक कहानी से शुरू होता है। जब मानसून आता था, तो वह खिचड़ी का एक बर्तन बनाती थी और हर पड़ोसी को घर बुलाती थी।",
      Odia: "ମୋ ଜେଜେମା କହୁଥିଲେ ଯେ ପ୍ରତ୍ୟେକ ରେସିପି ଏକ କାହାଣୀରୁ ଆରମ୍ଭ ହୁଏ | ଯେତେବେଳେ ମୌସୁମୀ ଆସେ, ସେ ଏକ ହାଣ୍ଡି ଖେଚୁଡି ତିଆରି କରୁଥିଲେ ଏବଂ ପ୍ରତ୍ୟେକ ପଡ଼ୋଶୀଙ୍କୁ ଘରକୁ ଡାକୁଥିଲେ |",
      Gujarati: "મારી દાદી કહેતા હતા કે દરેક રેસીપી વાર્તાથી શરૂ થાય છે. જ્યારે ચોમાસુ આવ્યું, ત્યારે તે ખીચડી બનાવતી અને દરેક પડોશીને ઘરે બોલાવતી.",
      Tamil: "ஒவ்வொரு சமையல்குறிப்பும் ஒரு கதையுடன் தொடங்குகிறது என்று என் பாட்டி சொல்வார். மழைக்காலம் வந்ததும், அவர் ஒரு பானை கிச்சடி செய்து எல்லா அண்டை வீட்டாரையும் வீட்டிற்கு அழைப்பார்.",
      Telugu: "ప్రతి వంటకం ఒక కథతో మొదలవుతుందని మా నానమ్మ చెప్పేది. వర్షాకాలం రాగానే, ఆవిడ ఒక కుండలో ఖిచ్డీ వండి పొరుగువారందరినీ ఇంటికి పిలిచేది.",
      Kannada: "ಪ್ರತಿಯೊಂದು ಪಾಕವಿಧಾನವು ಒಂದು ಕಥೆಯೊಂದಿಗೆ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ ಎಂದು ನನ್ನ ಅಜ್ಜಿ ಹೇಳುತ್ತಿದ್ದರು. ಮುಂಗಾರು ಬಂದಾಗ, ಅವರು ಒಂದು ಮಡಕೆ ಕಿಚಡಿಯನ್ನು ಮಾಡಿ ಎಲ್ಲ ನೆರೆಹೊರೆಯವರನ್ನು ಮನೆಗೆ ಕರೆಯುತ್ತಿದ್ದರು.",
      Malayalam: "ഓരോ പാചകക്കുറിപ്പും ഒരു കഥയോടെയാണ് ആരംഭിക്കുന്നതെന്ന് എൻ്റെ മുത്തശ്ശി പറയുമായിരുന്നു. മൺസൂൺ വന്നപ്പോൾ, അവൾ ഒരു പാത്രം കിച്ചടി ഉണ്ടാക്കി എല്ലാ അയൽക്കാരെയും വീട്ടിലേക്ക് വിളിക്കുമായിരുന്നു.",
      Haryanvi: "मेरी दादी कह्या करै थी कै हर नुस्खा एक कहानी ते शुरू होवै सै। जब सावण आवै था, तो वा एक पतीली खिचड़ी बणावै थी अर सारे गुहांडियां नै घर बुलावै थी।",
      Marathi: "माझी आजी म्हणायची की प्रत्येक रेसिपी एका कथेपासून सुरू होते. पावसाळा आला की ती एका भांड्यात खिचडी बनवायची आणि सर्व शेजाऱ्यांना घरी बोलवायची.",
      Assamese: "মোৰ আইতাই কৈছিল যে প্ৰতিটো ৰেচিপি এটা কাহিনীৰে আৰম্ভ হয়। বাৰিষা আহিলে তাই এপাচি খিচিৰি বনাই সকলো ওচৰ-চুবুৰীয়াক ঘৰলৈ মাতিছিল।",
      Urdu: "میری دادی کہتی تھیں کہ ہر ترکیب ایک کہانی سے شروع ہوتی ہے۔ جب مون سون آتا تو وہ ایک دیگچی کھچڑی بناتی اور ہر پڑوسی کو گھر بلاتی تھیں۔",
    };

    const langCodes: Record<string, string> = {
      Hindi: "hi", Odia: "or", Gujarati: "gu", Tamil: "ta", Telugu: "te",
      Kannada: "kn", Malayalam: "ml", Haryanvi: "hi", Marathi: "mr", Assamese: "as", Urdu: "ur"
    };

    if (dialect !== "English") {
      if (isSample && translations[dialect]) {
        result = translations[dialect];
        setTimeout(() => {
          setTranslatedText(result);
          setProcessed(true);
          setIsProcessing(false);
        }, 1500);
      } else {
        try {
          const code = langCodes[dialect] || "hi";
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: memory, lang: code })
          });
          const data = await res.json();
          if (data && data.translatedText) {
            result = data.translatedText;
          } else {
            result = `[Translated to ${dialect}] ${memory}`;
          }
        } catch (e) {
          result = `[Translated to ${dialect}] ${memory}`;
        }
        setTranslatedText(result);
        setProcessed(true);
        setIsProcessing(false);
      }
    } else {
      setTimeout(() => {
        setTranslatedText(result);
        setProcessed(true);
        setIsProcessing(false);
      }, 1000);
    }
  };
  return <main className="site-shell studio-page">
    <header className="site-header"><div className="container header-inner"><Link className="wordmark" to="/" onClick={closeMenu}><Mark /><span>VIRASYA</span></Link><nav className={menuOpen ? "main-nav is-open" : "main-nav"}><Link to="/stories" onClick={closeMenu}>Explore stories</Link><Link to="/hosts" onClick={closeMenu}>Meet the hosts</Link><Link className="nav-link-active" to="/studio" aria-current="page" onClick={closeMenu}>AI story studio</Link><Link to="/search" className="header-icon-button" onClick={closeMenu} aria-label="Search"><Search size={16} /></Link>{user ? <Link to="/dashboard" className="header-user-button" onClick={closeMenu}><span className="header-user-avatar">{user.avatar ? <img src={user.avatar} className="header-user-avatar-image" alt="Profile" /> : user.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}</span>{user.name.split(" ")[0]}</Link> : <Link to="/login" className="header-login-button" onClick={closeMenu}><LogIn size={14} strokeWidth={1.6} />Log in</Link>}<Link className="button button-small" to="/preserve" onClick={closeMenu}>Preserve a story ↗</Link></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></header>
    <section className="studio-hero container"><div><p className="eyebrow">The story studio · 04</p><h1>Keep the voice.<br /><em>Find the thread.</em></h1><p className="studio-hero-description">Bring a voice note or a memory in your own words. We’ll help you turn the raw telling into something you can return to.</p></div></section>
    <section className="container studio-workspace">
      <div className="studio-input-panel"><div className="panel-topline"><div><p className="eyebrow">Step 01 · Bring the memory</p><h2>Start with a voice.</h2></div><span className="mocked-badge"><Sparkles size={12} /> AI processing</span></div><div className="record-row"><button className={recording ? "record-button is-recording" : "record-button"} onClick={toggleRecording}><Mic size={18} />{recording ? "Stop recording" : "Record a memory"}</button><span>or write it below</span></div><label className="studio-textarea-label"><span className="sr-only">Your memory</span><textarea value={memory + interimMemory} onChange={(event) => { setMemory(event.target.value); setInterimMemory(""); setProcessed(false); }} placeholder="My grandmother used to say..." rows={9} /></label><div className="studio-input-footer"><button className="text-button" onClick={() => { setMemory(sampleMemory); setInterimMemory(""); setProcessed(false); }}>Use a sample memory</button><label className="dialect-field">Dialect<select value={dialect} onChange={(event) => setDialect(event.target.value)}><option>English</option><option>Hindi</option><option>Odia</option><option>Gujarati</option><option>Tamil</option><option>Telugu</option><option>Kannada</option><option>Malayalam</option><option>Haryanvi</option><option>Marathi</option><option>Assamese</option><option>Urdu</option></select></label></div><button className="button studio-process-button" onClick={processStory} disabled={!(memory + interimMemory).trim() || isProcessing}><WandSparkles size={16} />{isProcessing ? "Translating..." : "Transcribe this memory"}</button></div>
      <div className="studio-output-panel">
        <div className="panel-topline">
          <div><p className="eyebrow">Step 02 · Hold the thread</p><h2>Your story, clearer.</h2></div>
          <Languages className="panel-language-icon" size={20} />
        </div>
        {isProcessing ? (
          <div className="studio-empty">
            <div className="empty-orbit" style={{ animation: "pulse-ring 2s infinite" }}>
              <Sparkles size={28} />
            </div>
            <h3>Translating to {dialect}...</h3>
            <p>Our AI is preserving the cultural nuances of your story.</p>
          </div>
        ) : processed ? (
          <div className="studio-result">
            <p className="result-label">Translation · {dialect}</p>
            <p className="result-copy" style={{ fontSize: dialect !== 'English' ? '18px' : '14px', lineHeight: 1.6 }}>{translatedText}</p>
            <div className="result-divider" />
            <p className="result-label">Archive note</p>
            <p className="result-copy">A remembered ritual, held in the language of home. This story keeps the people, place, and feeling at its centre.</p>
          </div>
        ) : (
          <div className="studio-empty">
            <div className="empty-orbit"><AudioLines size={28} /></div>
            <h3>Nothing is lost here.</h3>
            <p>Your transcript and translated archive note will appear here, with the people and place kept at the centre.</p>
          </div>
        )}
      </div>
    </section>
    <footer className="site-footer">
  <div className="container footer-inner">
    <div className="footer-top">
      <div className="footer-brand">
        <Link className="wordmark" to="/"><Mark /><span>VIRASYA</span></Link>
        <p>Living heritage, carried forward.</p>
        <a className="footer-email" href="mailto:hello@virasya.org"><Mail size={14} />hello@virasya.org</a>
      </div>
      <div className="footer-columns">
        <div className="footer-col">
          <span className="footer-heading">Explore</span>
          <div className="footer-links">
            <Link to="/stories">Stories</Link>
            <Link to="/hosts">Hosts</Link>
            <Link to="/preserve">Preserve</Link>
            <Link to="/studio">Studio</Link>
          </div>
        </div>
        <div className="footer-col">
          <span className="footer-heading">Follow</span>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://twitter.com" aria-label="X (Twitter)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span className="footer-note">© 2026 Virasya · Made with care in India</span>
      <div className="footer-legal">
        <Link to="#">Privacy Policy</Link>
        <Link to="#">Terms of Service</Link>
      </div>
    </div>
  </div>
</footer>
  </main>;
}
