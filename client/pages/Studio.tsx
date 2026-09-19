import Header from "@/components/Header";
import { useState, useEffect, useRef } from "react";
import { AudioLines, Languages, LogIn, Mail, Menu, Mic, Search, Sparkles, WandSparkles, X, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function Mark() { return <img className="brand-logo" src="https://cdn.builder.io/api/v1/image/assets%2Fc0bee0de852d487fb3abccfc09a13758%2Fedc9c5030ad24ea5a6373f49e2efffc5?format=webp&width=800&height=1200" alt="VIRASYA" />; }

export default function Studio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [memory, setMemory] = useState("");
  const [dialect, setDialect] = useState("English");
  const [recording, setRecording] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasPendingTranscription, setHasPendingTranscription] = useState(false);
  const [user] = useState<{ name: string; email: string; avatar?: string } | null>(() => {
    try { return JSON.parse(localStorage.getItem("virasya-user") || "null"); } catch { return null; }
  });
  const closeMenu = () => setMenuOpen(false);

  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef(false);
  const hiddenTranscriptRef = useRef<string>("");
  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }
        if (finalTranscript) {
          hiddenTranscriptRef.current += finalTranscript;
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error("Speech recognition error", event.error);
          alert("Speech recognition error: " + event.error);
          isRecordingRef.current = false;
          setRecording(false);
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
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      const speechLangCodes: Record<string, string> = {
        English: "en-IN", Hindi: "hi-IN", Odia: "or-IN", Gujarati: "gu-IN", 
        Tamil: "ta-IN", Telugu: "te-IN", Kannada: "kn-IN", Malayalam: "ml-IN", 
        Haryanvi: "hi-IN", Marathi: "mr-IN", Assamese: "as-IN", Urdu: "ur-IN"
      };
      recognitionRef.current.lang = speechLangCodes[dialect] || 'en-IN';
    }
  }, [dialect]);

  const toggleRecording = async () => {
    if (!recognitionRef.current) {
      alert("Voice recording is not supported in your browser. Please try Chrome or Edge.");
      return;
    }
    
    if (recording) {
      isRecordingRef.current = false;
      recognitionRef.current.stop();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Reset state
        setAudioUrl(null);
        hiddenTranscriptRef.current = "";
        setHasPendingTranscription(false);
        audioChunksRef.current = [];
        
        // Setup MediaRecorder
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          setHasPendingTranscription(true);
        };
        
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();

        isRecordingRef.current = true;
        recognitionRef.current.start();
        setRecording(true);
      } catch (e) {
        console.error("Microphone error:", e);
        alert("Please allow microphone access to use this feature.");
      }
    }
  };

  const processStory = async () => {
    if (!memory.trim()) return;
    setIsProcessing(true);
    setProcessed(false);
    
    let result = memory;
    const langCodes: Record<string, string> = {
      English: "en", Hindi: "hi", Odia: "or", Gujarati: "gu", Tamil: "ta", Telugu: "te",
      Kannada: "kn", Malayalam: "ml", Haryanvi: "hi", Marathi: "mr", Assamese: "as", Urdu: "ur"
    };
    
    try {
      const code = langCodes[dialect] || "en";
      
      if (code === "en") {
        result = memory; // No translation needed
      } else {
        // Using Google Translate's public endpoint for client-side translation without a backend
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${code}&dt=t&q=${encodeURIComponent(memory)}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data && data[0]) {
          result = data[0].map((item: any) => item[0]).join('');
        }
      }
    } catch (e) {
      console.error("Translation error:", e);
      result = `[Translation Failed] ${memory}`;
    }
    
    setTranslatedText(result);
    setProcessed(true);
    setIsProcessing(false);
  };
  return <main className="site-shell studio-page">
    <Header />
    <section className="studio-hero container"><div><p className="eyebrow">The story studio · 04</p><h1>Keep the voice.<br /><em>Find the thread.</em></h1><p className="studio-hero-description">Bring a voice note or a memory in your own words. We’ll help you turn the raw telling into something you can return to.</p></div></section>
    <section className="container studio-workspace">
      <div className="studio-input-panel">
        <div className="panel-topline">
          <div><p className="eyebrow">Step 01 · Bring the memory</p><h2>Start with a voice.</h2></div>
          <span className="mocked-badge"><Sparkles size={12} /> AI processing</span>
        </div>
        
        <div className="record-row">
          <button className={recording ? "record-button is-recording" : "record-button"} onClick={toggleRecording}>
            <Mic size={18} />{recording ? "Stop recording" : "Record a voice note"}
          </button>
          <span>or write it below</span>
        </div>

        {audioUrl && (
          <div className="audio-player-container" style={{ marginBottom: "16px", marginTop: "16px", padding: "16px", background: "var(--background-secondary)", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <p className="eyebrow" style={{ marginBottom: "12px", color: "var(--text-secondary)" }}>Recorded Voice Note</p>
            <audio controls src={audioUrl} style={{ width: "100%", height: "40px" }} />
            {hasPendingTranscription && (
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                <button 
                  className="button" 
                  onClick={() => {
                    setAudioUrl(null);
                    setHasPendingTranscription(false);
                    hiddenTranscriptRef.current = "";
                  }}
                  style={{ flex: 1, background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)", display: "flex", justifyContent: "center", gap: "8px" }}
                >
                  <Trash2 size={16} /> Discard
                </button>
                <button 
                  className="button" 
                  onClick={() => {
                    setMemory(prev => prev + (prev ? " " : "") + hiddenTranscriptRef.current);
                    setHasPendingTranscription(false);
                  }}
                  style={{ flex: 2, background: "var(--text)", color: "var(--background)", display: "flex", justifyContent: "center", gap: "8px" }}
                >
                  <Sparkles size={16} /> Confirm & Transcribe
                </button>
              </div>
            )}
          </div>
        )}

        <label className="studio-textarea-label">
          <span className="sr-only">Your memory</span>
          <textarea value={memory} onChange={(event) => { setMemory(event.target.value); setProcessed(false); }} placeholder="My grandmother used to say..." rows={9} />
        </label>
        
        <div className="studio-input-footer">
          <label className="dialect-field" style={{ marginLeft: "auto" }}>Dialect
            <select value={dialect} onChange={(event) => setDialect(event.target.value)}>
              <option>English</option><option>Hindi</option><option>Odia</option><option>Gujarati</option><option>Tamil</option><option>Telugu</option><option>Kannada</option><option>Malayalam</option><option>Haryanvi</option><option>Marathi</option><option>Assamese</option><option>Urdu</option>
            </select>
          </label>
        </div>
        
        <button className="button studio-process-button" onClick={processStory} disabled={!memory.trim() || isProcessing}>
          <WandSparkles size={16} />{isProcessing ? "Translating..." : "Process & Translate"}
        </button>
      </div>
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
