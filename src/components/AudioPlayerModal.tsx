import React, { useState, useEffect } from 'react';
import { X, Volume2, Play, Pause, RotateCcw, CheckCircle2, Languages } from 'lucide-react';
import { AUDIO_SCRIPTS, type AudioScript } from '../data';

interface AudioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioPlayerModal: React.FC<AudioPlayerModalProps> = ({ isOpen, onClose }) => {
  const [selectedLang, setSelectedLang] = useState<'fr' | 'mina' | 'ewe'>('mina');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const activeScript: AudioScript = AUDIO_SCRIPTS.find(s => s.lang === selectedLang) || AUDIO_SCRIPTS[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 300);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      if ('speechSynthesis' in window && selectedLang === 'fr') {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(activeScript.text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.95;
        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
        };
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setProgress(0);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        maxWidth: '540px',
        boxShadow: 'var(--shadow-lg)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)'
      }}>
        {/* En-tête Modal */}
        <div style={{
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, var(--primary) 0%, #064e2b 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Volume2 size={22} color="#fbbf24" />
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>Canal d'Écoute Multimodal</h3>
              <p style={{ fontSize: '0.75rem', color: '#a7f3d0', margin: 0 }}>
                Inclusion financière en langues nationales (Mina & Éwé)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              handleReset();
              onClose();
            }}
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Corps */}
        <div style={{ padding: '1.5rem' }}>
          {/* Sélecteur de langue */}
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
            CHOISISSEZ LA LANGUE D'ÉCOUTE :
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {AUDIO_SCRIPTS.map(script => (
              <button
                type="button"
                key={script.lang}
                onClick={() => {
                  setSelectedLang(script.lang);
                  handleReset();
                }}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderRadius: '10px',
                  border: selectedLang === script.lang ? '2px solid var(--primary)' : '1px solid var(--border-light)',
                  background: selectedLang === script.lang ? 'var(--primary-light)' : '#ffffff',
                  color: selectedLang === script.lang ? 'var(--primary)' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.95rem' }}>{script.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{script.sublabel}</div>
              </button>
            ))}
          </div>

          {/* Lecteur Audio Visuel */}
          <div style={{
            background: 'var(--bg-light)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--dark)' }}>
                {activeScript.title}
              </div>
              <span style={{
                fontSize: '0.72rem',
                background: isPlaying ? '#dcfce7' : '#f1f5f9',
                color: isPlaying ? '#166534' : 'var(--text-muted)',
                padding: '0.2rem 0.5rem',
                borderRadius: '999px',
                fontWeight: 600
              }}>
                {isPlaying ? '● En cours de lecture' : 'En pause'}
              </span>
            </div>

            {/* Barre d'onde sonore animée */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '28px', marginBottom: '0.75rem' }}>
              {[18, 32, 14, 28, 40, 24, 36, 16, 28, 35, 20, 38, 15, 30, 26, 34, 18, 28, 36, 22].map((height, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: isPlaying && (i / 20) * 100 <= progress ? 'var(--primary)' : '#cbd5e1',
                    borderRadius: '2px',
                    height: isPlaying ? `${Math.max(6, (height * (1 + Math.sin((progress + i * 15) * 0.1))) / 1.5)}px` : `${height / 2.5}px`,
                    transition: 'all 0.15s ease'
                  }}
                />
              ))}
            </div>

            {/* Barre de progression */}
            <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: 'var(--primary)', transition: 'width 0.2s linear' }} />
            </div>

            {/* Contrôles */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }}
                title="Recommencer"
              >
                <RotateCcw size={16} />
              </button>

              <button
                type="button"
                onClick={handleTogglePlay}
                style={{
                  background: 'var(--primary)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '52px',
                  height: '52px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-glow)'
                }}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '3px' }} />}
              </button>
            </div>
          </div>

          {/* Retranscription écrite */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              <Languages size={15} />
              <span>Texte retranscrit :</span>
            </div>
            <div style={{
              fontSize: '0.88rem',
              color: 'var(--text-primary)',
              background: '#f8fafc',
              padding: '0.85rem 1rem',
              borderRadius: '8px',
              borderLeft: '3px solid var(--primary)',
              fontStyle: selectedLang !== 'fr' ? 'italic' : 'normal',
              lineHeight: 1.55
            }}>
              "{activeScript.text}"
            </div>
          </div>

          {/* Rassurance */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontSize: '0.78rem' }}>
            <CheckCircle2 size={16} />
            <span>Service gratuit d'information financière vocale sans engagement.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerModal;
