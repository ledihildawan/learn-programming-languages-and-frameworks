// File: LanguageContext.js
import { createContext } from 'react';

export const LanguageContext = createContext();  

// File: Greeting.js
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

// Accesses the current language using useContext
// and displays the appropriate greeting message
function Greeting() {
  const language = useContext(LanguageContext);

  return <h1>{language === 'en' ? 'Welcome!' : '¡Bienvenido!'}</h1>;
}

export default Greeting;

// File: App.js
import { useState } from 'react';
import Greeting from './Greeting';

function App() {
  const [language, setLanguage] = useState('en'); // Current language

  // Manages the language state (en for English, es for Spanish)
  const toggleLanguage = () =>
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'es' : 'en'));

  return (
  // Provides the language value to the LanguageContext.Provider
  <LanguageContext.Provider value={language}>
    <div>
      <Greeting />
      <button onClick={toggleLanguage}>Toggle language</button>
    </div>
  </LanguageContext.Provider>
  );
}

export default App;