// File: ThemeContext.js
import { createContext } from 'react';

export const ThemeContext = createContext(); 

// File: LanguageContext.js

export const LanguageContext = createContext();

// File: ThemedGreeting.js
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { ThemeContext } from './ThemeContext';

function ThemedGreeting() {
  // Uses useContext to access theme and language
  const theme = useContext(ThemeContext); // Access the current theme
  const language = useContext(LanguageContext); // Access the current language

  // Determines the greeting message based on the language
  const greetingMessage = language === 'en' ? 'Welcome!' : '¡Bienvenido!';
  
  // Dynamically styles the component based on the theme
  const style = {
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    color: theme === 'dark' ? '#fff' : '#333',
    padding: '10px',
    textAlign: 'center',
  };

  return <h2 style={style}>{greetingMessage}</h2>;
}

export default ThemedGreeting;

// File: App.js
import { useState } from 'react';
import ThemedGreeting from './ThemedGreeting';

function App() {
  // Manages theme and language states
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [language, setLanguage] = useState('en'); // 'en' or 'es'

  // Defines functions to toggle the theme and language
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'es' : 'en'));

  return (
    // Wraps child components with ThemeContext.Provider
    // and LanguageContext.Provider, passing down the respective values
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={language}>
        <div>
          <h1>Theme and Language Example</h1>
          <ThemedGreeting />
          <button onClick={toggleTheme}>Toggle Theme</button>
          <button onClick={toggleLanguage}>Toggle Language</button>
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;