import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Camera, MessageSquare, Sprout, CloudRain, Sun, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import VoiceButton from '@/components/VoiceButton';
import LanguageSelector from '@/components/LanguageSelector';
import FloatingActionBubble from '@/components/FloatingActionBubble';
import SeasonalBackground from '@/components/SeasonalBackground';
import krishiMitraMascot from '@/assets/krishi-mitra-mascot.png';

const Landing = () => {
  const navigate = useNavigate();
  const [currentGreeting, setCurrentGreeting] = useState('नमस्ते किसान भाई!');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi');

  const greetings = {
    hi: 'नमस्ते किसान भाई!',
    en: 'Hello Farmer Friend!',
    ml: 'നമസ്കാരം കർഷകരേ!'
  };

  const welcomeMessages = {
    hi: 'आपके खेत की हर समस्या का समाधान',
    en: 'Solution for every farming problem',
    ml: 'നിങ്ങളുടെ കൃഷിയുടെ എല്ലാ പ്രശ്നങ്ങൾക്കും പരിഹാരം'
  };

  const askQuestionText = {
    hi: 'अपना सवाल पूछें',
    en: 'Ask Your Question',
    ml: 'നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക'
  };

  useEffect(() => {
    setCurrentGreeting(greetings[selectedLanguage as keyof typeof greetings]);
  }, [selectedLanguage]);

  const handleVoiceStart = () => {
    setIsVoiceActive(true);
  };

  const handleVoiceEnd = (transcript: string) => {
    setIsVoiceActive(false);
    if (transcript.trim()) {
      navigate('/query', { state: { query: transcript, type: 'voice' } });
    }
  };

  const handleVoiceError = (error: string) => {
    setIsVoiceActive(false);
    console.error('Voice error:', error);
  };

  const floatingActions = [
    { icon: CloudRain, label: 'Weather', position: { x: 15, y: 25 }, color: 'accent' as const },
    { icon: Sprout, label: 'Crop Guide', position: { x: 85, y: 35 }, color: 'primary' as const },
    { icon: Sun, label: 'Season Tips', position: { x: 20, y: 70 }, color: 'harvest' as const },
    { icon: Settings, label: 'Settings', position: { x: 80, y: 75 }, color: 'secondary' as const },
  ];

  return (
    <SeasonalBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        
        {/* Language Selector - Top Right */}
        <div className="absolute top-6 right-6 z-40">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            variant="compact"
          />
        </div>

        {/* Floating Action Bubbles */}
        {floatingActions.map((action, index) => (
          <FloatingActionBubble
            key={index}
            icon={action.icon}
            label={action.label}
            position={action.position}
            color={action.color}
            onClick={() => console.log(`${action.label} clicked`)}
          />
        ))}

        {/* Main Content */}
        <div className="text-center space-y-8 max-w-lg w-full">
          
          {/* Mascot and Brand */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-glow animate-breathe">
                <img 
                  src={krishiMitraMascot} 
                  alt="KrishiMitra Mascot" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Mascot glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary-glow/20 animate-pulse-gentle" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-nature animate-leaf-sway">
                KrishiMitra
              </h1>
              <p className="text-xl font-medium text-foreground/80">
                {currentGreeting}
              </p>
              <p className="text-base text-muted-foreground">
                {welcomeMessages[selectedLanguage as keyof typeof welcomeMessages]}
              </p>
            </div>
          </div>

          {/* Main Action Card */}
          <Card className="card-organic p-8 space-y-6 animate-grow-from-seed hover:shadow-float transition-all duration-300">
            
            {/* Voice Button - Main CTA */}
            <div className="space-y-4">
              <VoiceButton
                onVoiceStart={handleVoiceStart}
                onVoiceEnd={handleVoiceEnd}
                onVoiceError={handleVoiceError}
                isListening={isVoiceActive}
                size="xl"
                variant="primary"
              />
              
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {askQuestionText[selectedLanguage as keyof typeof askQuestionText]}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedLanguage === 'hi' ? 'बोलें या टाइप करें' : 
                   selectedLanguage === 'en' ? 'Speak or Type' : 
                   'സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക'}
                </p>
              </div>
            </div>

            {/* Alternative Input Methods */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/query', { state: { type: 'text' } })}
                className="card-leaf h-16 flex flex-col items-center justify-center space-y-1 hover:shadow-soft transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 icon-nature" />
                <span className="text-xs">
                  {selectedLanguage === 'hi' ? 'टेक्स्ट' : 
                   selectedLanguage === 'en' ? 'Text' : 'ടെക്സ്റ്റ്'}
                </span>
              </Button>
              
              <Button
                variant="outline" 
                onClick={() => navigate('/query', { state: { type: 'image' } })}
                className="card-leaf h-16 flex flex-col items-center justify-center space-y-1 hover:shadow-soft transition-all duration-300"
              >
                <Camera className="w-5 h-5 icon-nature" />
                <span className="text-xs">
                  {selectedLanguage === 'hi' ? 'फोटो' : 
                   selectedLanguage === 'en' ? 'Photo' : 'ഫോട്ടോ'}
                </span>
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: CloudRain, label: selectedLanguage === 'hi' ? 'मौसम' : selectedLanguage === 'en' ? 'Weather' : 'കാലാവസ്ഥ' },
              { icon: Sprout, label: selectedLanguage === 'hi' ? 'फसल' : selectedLanguage === 'en' ? 'Crops' : 'വിള' },
              { icon: MessageSquare, label: selectedLanguage === 'hi' ? 'चैट' : selectedLanguage === 'en' ? 'Chat' : 'ചാറ്റ്' },
            ].map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-16 flex flex-col items-center justify-center space-y-1 card-organic hover:shadow-soft transition-all duration-300 grow-entrance"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <action.icon className="w-6 h-6 icon-nature" />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-2 h-2 bg-primary-glow rounded-full animate-pulse-gentle" />
            <span className="text-xs">
              {selectedLanguage === 'hi' ? 'आपका डिजिटल कृषि मित्र' : 
               selectedLanguage === 'en' ? 'Your Digital Farm Assistant' : 
               'നിങ്ങളുടെ ഡിജിറ്റൽ കാർഷിക സഹായി'}
            </span>
          </div>
        </div>
      </div>
    </SeasonalBackground>
  );
};

export default Landing;