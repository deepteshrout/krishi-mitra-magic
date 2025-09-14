import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
];

interface LanguageSelectorProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
  variant?: 'compact' | 'full';
}

export const LanguageSelector = ({ 
  selectedLanguage = 'hi', 
  onLanguageChange,
  variant = 'compact'
}: LanguageSelectorProps) => {
  const [currentLang, setCurrentLang] = useState(selectedLanguage);
  
  const selectedLangData = languages.find(lang => lang.code === currentLang) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    onLanguageChange?.(langCode);
  };

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="card-organic border-2 border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <span className="text-lg mr-1">{selectedLangData.flag}</span>
            <span className="font-medium text-sm">{selectedLangData.code.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="card-organic border-primary/20 min-w-[160px]">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                cursor-pointer transition-all duration-200 rounded-lg
                ${currentLang === lang.code ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}
              `}
            >
              <span className="text-lg mr-2">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{lang.nativeName}</span>
                <span className="text-xs text-muted-foreground">{lang.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLang === lang.code ? "default" : "outline"}
          onClick={() => handleLanguageChange(lang.code)}
          className={`
            card-organic h-16 flex flex-col items-center justify-center
            transition-all duration-300 grow-entrance
            ${currentLang === lang.code 
              ? 'bg-primary text-primary-foreground shadow-glow' 
              : 'border-2 border-primary/20 hover:border-primary/40 hover:shadow-soft'
            }
          `}
        >
          <span className="text-2xl mb-1">{lang.flag}</span>
          <span className="text-xs font-medium">{lang.nativeName}</span>
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;