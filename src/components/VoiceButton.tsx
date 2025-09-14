import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Type declarations for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface VoiceButtonProps {
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onVoiceError?: (error: string) => void;
  isListening?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'floating';
}

export const VoiceButton = ({ 
  onVoiceStart, 
  onVoiceEnd, 
  onVoiceError,
  isListening = false,
  disabled = false,
  size = 'lg',
  variant = 'primary'
}: VoiceButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN'; // Default to Hindi

      recognition.onstart = () => {
        setIsRecording(true);
        onVoiceStart?.();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onVoiceEnd?.(transcript);
      };

      recognition.onerror = (event: any) => {
        onVoiceError?.(event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, [onVoiceStart, onVoiceEnd, onVoiceError]);

  const toggleRecording = () => {
    if (!recognition) {
      onVoiceError?.('Speech recognition not supported');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-base',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-xl',
    xl: 'w-24 h-24 text-2xl'
  };

  const baseClasses = variant === 'floating' 
    ? 'float-bubble fixed bottom-6 right-6 z-50' 
    : 'voice-button';

  return (
    <Button
      onClick={toggleRecording}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${isRecording || isListening ? 'listening' : ''}
        touch-friendly relative overflow-hidden
        transition-all duration-300 ease-out
        ${isRecording ? 'animate-pulse-gentle' : ''}
      `}
      aria-label={isRecording ? 'बंद करें' : 'अपना सवाल बोलें'}
    >
      <div className="relative z-10 flex items-center justify-center">
        {isRecording ? (
          <MicOff className="icon-nature" />
        ) : (
          <Mic className="icon-nature" />
        )}
      </div>
      
      {/* Voice ripple effect */}
      {(isRecording || isListening) && (
        <div className="absolute inset-0 rounded-full bg-primary-glow/20 animate-voice-ripple" />
      )}
      
      {/* Breathing glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-glow/10 to-primary-glow/20 animate-breathe" />
    </Button>
  );
};

export default VoiceButton;