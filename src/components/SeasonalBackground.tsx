import React, { useEffect, useState } from 'react';
import farmHeroBg from '@/assets/farm-hero-bg.jpg';

interface SeasonalBackgroundProps {
  children: React.ReactNode;
  season?: 'spring' | 'summer' | 'monsoon' | 'winter' | 'auto';
  timeOfDay?: 'dawn' | 'day' | 'dusk' | 'night' | 'auto';
}

export const SeasonalBackground = ({ 
  children, 
  season = 'auto',
  timeOfDay = 'auto'
}: SeasonalBackgroundProps) => {
  const [currentSeason, setCurrentSeason] = useState<string>('summer');
  const [currentTime, setCurrentTime] = useState<string>('day');

  useEffect(() => {
    if (season === 'auto') {
      const month = new Date().getMonth();
      if (month >= 2 && month <= 4) setCurrentSeason('spring');
      else if (month >= 5 && month <= 7) setCurrentSeason('summer');
      else if (month >= 8 && month <= 10) setCurrentSeason('monsoon');
      else setCurrentSeason('winter');
    } else {
      setCurrentSeason(season);
    }

    if (timeOfDay === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) setCurrentTime('dawn');
      else if (hour >= 8 && hour < 17) setCurrentTime('day');
      else if (hour >= 17 && hour < 20) setCurrentTime('dusk');
      else setCurrentTime('night');
    } else {
      setCurrentTime(timeOfDay);
    }
  }, [season, timeOfDay]);

  const seasonClass = `season-${currentSeason}`;
  
  const timeGradients = {
    dawn: 'from-sky-dawn via-sunrise-orange/20 to-harvest-gold/30',
    day: 'from-sky-day via-sky-dawn/30 to-background',
    dusk: 'from-sky-dusk via-sunrise-orange/40 to-harvest-gold/50',
    night: 'from-soil-dark via-soil-rich/60 to-earth-warm/40'
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${seasonClass}`}>
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${farmHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Dynamic Time-based Overlay */}
      <div className={`
        absolute inset-0 z-10
        bg-gradient-to-br ${timeGradients[currentTime as keyof typeof timeGradients]}
        opacity-60 transition-all duration-1000 ease-in-out
      `} />
      
      {/* Seasonal Particles Effect */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {currentSeason === 'monsoon' && (
          <div className="rain-effect">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-12 bg-sky-day/30 animate-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}
        
        {currentSeason === 'spring' && (
          <div className="petals-effect">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-flower-pink/60 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content Layer */}
      <div className="relative z-30">
        {children}
      </div>
      
      {/* Ambient Sound Indicator (Visual) */}
      <div className="fixed top-4 right-4 z-40 opacity-30">
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-primary-glow rounded-full animate-pulse-gentle"
              style={{
                height: `${12 + Math.random() * 8}px`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonalBackground;