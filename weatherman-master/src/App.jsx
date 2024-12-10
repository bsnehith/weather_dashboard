import './App.css';
import TopBar from './comps/topBar';
import RightBox from './comps/rightBox';
import LeftBox from './comps/leftBox';
import { useState, useEffect } from 'react';
import WelcomeBox from "./comps/welcomeBox";

const App = () => {
  const [dta, setDta] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to the body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode'); // Add dark mode to body
    } else {
      document.body.classList.remove('dark-mode'); // Remove dark mode from body
    }
  }, [isDarkMode]); // Re-run this effect whenever isDarkMode changes

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle the theme state
  };

  return (
    <>
      <button onClick={toggleTheme} className="btn btn-secondary toggle-theme-btn">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {dta ? (
        <div className="row bg-md-cm-light">
          <TopBar changeData={(dd) => setDta(dd)} classDetails="bg-white d-block d-lg-none" />

          <div className="col-lg-9 left-box">
            <TopBar changeData={(dd) => setDta(dd)} classDetails="d-none d-lg-block" />
            <div className="left-bottom-box">
              <LeftBox wthrData={dta} />
            </div>
          </div>

          <div className="col-lg-3 right-box">
            <RightBox wthrData={dta} />
          </div>
        </div>
      ) : (
        <WelcomeBox changeData={(dd) => setDta(dd)} />
      )}
    </>
  );
}

export default App;
