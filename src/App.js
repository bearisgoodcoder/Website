import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rnd } from "react-rnd";
import "./App.css";
import folderIconPng from "./assets/folder-icon.png";
import snakeIconPng from "./assets/snake-icon.png";
import pongIconPng from "./assets/pong-icon.png";
import tetrisIconPng from "./assets/tetris-icon.png";
import { ReactComponent as GithubIconSvg } from "./assets/github-icon.svg";
import { ReactComponent as LinkedinIconSvg } from "./assets/linkedin-icon.svg";
import { ReactComponent as EmailIconSvg } from "./assets/email-icon.svg";
import Snake from "./games/Snake";
import Pong from "./games/Pong";
import Tetris from "./games/Tetris";

const FolderIcon = ({ label, onClick, index, icon, isGameIcon }) => (
  <div
    className="desktop-icon"
    onClick={onClick}
    style={{
      position: "absolute",
      ...(isGameIcon
        ? {
            right: `${(index % 3) * 100 + 20}px`,
            top: `${Math.floor(index / 3) * 100 + 20}px`,
          }
        : {
            left: `${(index % 5) * 100 + 20}px`,
            top: `${Math.floor(index / 5) * 100 + 20}px`,
          }),
    }}
  >
    <img src={icon} alt={label} width="48" height="48" />
    <span>{label}</span>
  </div>
);

const Window = ({
  title,
  children,
  onClose,
  initialPosition,
  zIndex,
  onFocus,
}) => {
  return (
    <Rnd
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
        width: 400,
        height: 300,
      }}
      minWidth={200}
      minHeight={100}
      bounds="window"
      z={zIndex}
      onMouseDown={onFocus}
    >
      <div className="window">
        <div className="window-header">
          <div className="window-title">{title}</div>
          <button className="window-close" onClick={onClose}>
            X
          </button>
        </div>
        <div className="window-content">{children}</div>
      </div>
    </Rnd>
  );
};

const AboutSection = () => (
  <div>
    <h2>About Me</h2>
    <p>
      Hey! I’m Logan, a software developer who loves diving into cool tech
      projects. My interest in technology started with video games, and it’s
      been a big part of my life ever since. Besides coding, I play ACHA D1
      Hockey at TCNJ and run the fundraising for my fraternity, Kappa
      Sigma.
    </p>
  </div>
);

const ProjectsSection = () => (
  <div>
    <h2>My Projects</h2>
    <ul>
      <li><strong>Project 1: Complimentary Colors</strong> </li>
      <p>
        Project that shows basic knowledge of JavaScript, HTML, CSS that was
        submitted for Hackdown 2022 on Devpost. Utilized Manifest V3 which is
        used for Chrome extensions. Winning Submission for Social Justice
        Category. Allows users to select multiple filters for Chrome and sets to
        their liking.
      </p>
      <li><strong>Project 2: Amazon Review Bot Checker </strong></li>
      <p>
        Amazon Web Scraper using selenium and python to check if a review is
        created by a bot using a natural language toolkit and other
        characterizations of the users' profile. It scrapes the profiles and all
        review pages of any amazon product that the user chooses and goes
        through numerous calculations to see if it is a bot or not.
      </p>
      <li><strong>Project 3: Personal Website </strong></li>
      <p>
        You're looking at it! This was coded with React, with a lot of other
        components.
      </p>
      <li><strong>Research Topics: Web 3.0 Development, Cryptocurrency</strong></li>
      <p>
        Research done with professors which allowed for a more in-depth
        understanding of many different topics & working in a team environment
        and deepening the understanding of many prevalent future-based topics
      </p>
    </ul>
  </div>
);

const SkillsSection = () => (
  <div>
    <h2>Skills</h2>
    <ul>
      <li>
        <strong> Front End: </strong>HTML, Javascript, CSS
      </li>
      <li>
        <strong> Back End: </strong>Java, Python, C++, Solidity
      </li>
      <li>
        <strong> Other: </strong>GitHub, Visual Studio Code, Matplotlib,
        Networkx, Wireshark, Algorithms, Data Structures, Computer Networking,
        API, React, Tkinter, Computer Architecture, Beautiful Soup, Flask
      </li>
    </ul>
  </div>
);

const ExperienceSection = () => (
  <div>
    <h2>Work Experience</h2>
    <h3>Senior Head Coach - Ice House, NJ</h3>
    <p>
      In charge of 70 youth hockey players, established groups for players and supervised camp counselors.
    </p>
    <p>2016 - 2024</p>

    <h2>Education</h2>
    <h3>Bachelor's in Computer Science - The College of New Jersey</h3>
    <p>2022 - 2026</p>
  </div>
);

const ContactSection = () => (
  <div>
    <h2>Contact Me</h2>
    <p><strong>Email: </strong> mayl2@tcnj.edu</p>
    <p><strong>LinkedIn: </strong>linkedin.com/in/loganmay08</p>
    <p><strong>GitHub: </strong>github.com/bearisgoodcoder</p>
  </div>
);

const HelpSection = () => (
  <div>
    <h2>Help</h2>
    <p>
      Welcome to my website! It's based off an old windows xp desktop. Here’s a
      quick guide on how to use it:
    </p>
    <ul>
      <li>
        <strong>Desktop Icons:</strong> Click on any folder icon on the desktop
        to open a window with more information. You can move and resize these
        windows.
      </li>
      <li>
        <strong>Start Menu:</strong> Click the "Start" button on the taskbar to
        open the Start Menu. From there, you can access various sections such as
        About Me, Projects, Skills, Experience, and Contact.
      </li>
      <li>
        <strong>Games:</strong> Click on any game icon to open and play the
        game. You can start or stop the game from within its window.
      </li>
      <li>
        <strong>Taskbar:</strong> Use the icons on the taskbar to visit GitHub,
        LinkedIn, or send an email. The current time is displayed on the right
        side of the taskbar.
      </li>
      <li>
        <strong>General:</strong> If the window is too small, resize it just as
        you normally would. Use the X in the top right to close the tab.
      </li>
    </ul>
  </div>
);


const StartMenu = ({ onClose, openWindow }) => (
  <motion.div
    className="start-menu"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
  >
    <div className="start-menu-header">
      <img src={folderIconPng} alt="User" width="48" height="48" />
      <span>Logan May</span>
    </div>
    <div className="start-menu-items">
      <div className="start-menu-column">
        <button onClick={() => openWindow(<AboutSection />, "About Me")}>
          About Me
        </button>
        <button onClick={() => openWindow(<ProjectsSection />, "Projects")}>
          Projects
        </button>
        <button onClick={() => openWindow(<SkillsSection />, "Skills")}>
          Skills
        </button>
        <button onClick={() => openWindow(<ExperienceSection />, "Experience")}>
          Experience
        </button>
        <button onClick={() => openWindow(<ContactSection />, "Contact")}>
          Contact
        </button>
        <button onClick={() => openWindow(<HelpSection />, "Help")}>
          Help
        </button>
      </div>
      <div className="start-menu-column">
        <button onClick={() => window.open("https://www.tcnj.edu/", "_blank")}>
          Visit TCNJ Website
        </button>
      </div>
    </div>
    <button className="start-menu-close" onClick={onClose}>
      Shut Down
    </button>
  </motion.div>
);

const GameWindow = ({ game, onClose, initialPosition, zIndex, onFocus }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startGame = () => setIsPlaying(true);
  const stopGame = () => setIsPlaying(false);

  return (
    <Rnd
      default={{
        x: initialPosition.x,
        y: initialPosition.y,
        width: 900,
        height: 700,
      }}
      minWidth={400}
      minHeight={400}
      bounds="window"
      z={zIndex}
      onMouseDown={onFocus}
    >
      <div className="window game-window">
        <div className="window-header">
          <div className="window-title">{game.title}</div>
          <button className="window-close" onClick={onClose}>
            X
          </button>
        </div>
        <div className="window-content game-content">
          {!isPlaying ? (
            <div className="game-start-menu">
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <button onClick={startGame}>Start Game</button>
            </div>
          ) : (
            <>
              {game.component}
              <button className="stop-game-btn" onClick={stopGame}>
                Stop Game
              </button>
            </>
          )}
        </div>
      </div>
    </Rnd>
  );
};

const App = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [highestZIndex, setHighestZIndex] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (content, title) => {
    let initialPosition;

    if (
      title === "Snake Game" ||
      title === "Pong Game" ||
      title === "Tetris Game"
    ) {
      initialPosition = {
        x: (window.innerWidth - 300) / 2,
        y: (window.innerHeight - 800) / 2,
      };
    } else {
      // Default position for non-game windows
      initialPosition = {
        x: Math.random() * (window.innerWidth - 400),
        y: Math.random() * (window.innerHeight - 300 - 50) + 50,
      };
    }

    setOpenWindows([
      ...openWindows,
      { content, title, initialPosition, zIndex: highestZIndex + 1 },
    ]);
    setHighestZIndex(highestZIndex + 1);
    setIsStartMenuOpen(false);
  };

  const closeWindow = (index) => {
    const newWindows = openWindows.filter((_, i) => i !== index);
    setOpenWindows(newWindows);
  };

  const bringToFront = (index) => {
    const newZIndex = highestZIndex + 1;
    const updatedWindows = openWindows.map((window, i) =>
      i === index ? { ...window, zIndex: newZIndex } : window
    );
    setOpenWindows(updatedWindows);
    setHighestZIndex(newZIndex);
  };

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const toggleStartMenu = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

const folderIcons = [
  { label: "About Me", content: <AboutSection />, icon: folderIconPng },
  { label: "Projects", content: <ProjectsSection />, icon: folderIconPng },
  { label: "Skills", content: <SkillsSection />, icon: folderIconPng },
  { label: "Experience", content: <ExperienceSection />, icon: folderIconPng },
  { label: "Contact", content: <ContactSection />, icon: folderIconPng },
  { label: "Help", content: <HelpSection />, icon: folderIconPng }, 
];


  const gameIcons = [
    {
      label: "Snake Game",
      content: {
        title: "Snake Game",
        description: "Classic Snake game. Use arrow keys to control the snake.",
        component: <Snake />,
      },
      icon: snakeIconPng,
    },
    {
      label: "Pong Game",
      content: {
        title: "Pong Game",
        description:
          "Classic Pong game. Use W/S for left paddle, Up/Down arrows for right paddle.",
        component: <Pong />,
      },
      icon: pongIconPng,
    },
    {
      label: "Tetris Game",
      content: {
        title: "Tetris Game",
        description:
          "Classic Tetris game. Use arrow keys to move and rotate pieces.",
        component: <Tetris />,
      },
      icon: tetrisIconPng,
    },
  ];

  return (
    <div className="app">
      <div className="desktop">
        {folderIcons.map((icon, index) => (
          <FolderIcon
            key={index}
            label={icon.label}
            onClick={() => openWindow(icon.content, icon.label)}
            index={index}
            icon={icon.icon}
            isGameIcon={false}
          />
        ))}
        {gameIcons.map((icon, index) => (
          <FolderIcon
            key={index + folderIcons.length}
            label={icon.label}
            onClick={() => openWindow(icon.content, icon.label)}
            index={index}
            icon={icon.icon}
            isGameIcon={true}
          />
        ))}
      </div>

      <AnimatePresence>
        {openWindows.map(
          ({ content, title, initialPosition, zIndex }, index) => {
            if (title.includes("Game")) {
              return (
                <GameWindow
                  key={index}
                  game={content}
                  onClose={() => closeWindow(index)}
                  initialPosition={initialPosition}
                  zIndex={zIndex}
                  onFocus={() => bringToFront(index)}
                />
              );
            } else {
              return (
                <Window
                  key={index}
                  title={title}
                  onClose={() => closeWindow(index)}
                  initialPosition={initialPosition}
                  zIndex={zIndex}
                  onFocus={() => bringToFront(index)}
                >
                  {content}
                </Window>
              );
            }
          }
        )}
      </AnimatePresence>
      <div className="taskbar">
        <button className="start-button" onClick={toggleStartMenu}>
          Start
        </button>
        <div className="taskbar-icons">
          <GithubIconSvg
            onClick={() => openLink("https://github.com/bearisgoodcoder")}
          />
          <LinkedinIconSvg
            onClick={() => openLink("https://linkedin.com/in/loganmay08")}
          />
          <EmailIconSvg onClick={() => openLink("mailto:mayl2@tcnj.edu")} />
        </div>
        <div className="taskbar-time">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <AnimatePresence>
        {isStartMenuOpen && (
          <StartMenu
            onClose={() => setIsStartMenuOpen(false)}
            openWindow={openWindow}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;