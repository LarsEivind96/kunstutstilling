import React, { useState } from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import Gallery from "./pages/Gallery";
import Favorites from "./pages/Favorites";
import { ThemeContext, themes, AppContextInterface } from "./constants/Themes";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import ThemeButtonContainer from "./components/ThemeButton/ThemeButtonContainer";

function App() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const selectedTheme = sessionStorage.getItem("theme");
  const startTheme = selectedTheme ? JSON.parse(selectedTheme) : themes.dark;
  const [theme, setTheme] = useState(startTheme);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  const context: AppContextInterface = {
    theme: theme,
    toggleTheme: (val) => setTheme(val),
  };

  return (
    <ThemeContext.Provider value={context}>
      <Router>
        <div
          className="App"
          style={{
            background: context.theme.bgImage,
          }}
        >
          <Toolbar drawerClickHandler={drawerToggleClickHandler} />
          <SideDrawer show={sideDrawerOpen} />
          {sideDrawerOpen && <Backdrop click={backdropClickHandler} />}
          <div className="moodContainer">
            <ThemeButtonContainer />
          </div>
          <AudioPlayer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/favorites" component={Favorites} />
            {/* Make sure this route is at the bottom */}
            <Route exact path="/:index" component={Home} />
          </Switch>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
