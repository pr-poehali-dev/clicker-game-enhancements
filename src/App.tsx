import { useState } from 'react';
import { GameProvider } from './components/game/GameContext';
import MainMenu from './components/game/MainMenu';
import Clicker from './components/game/Clicker';
import Upgrades from './components/game/Upgrades';
import MiniGames from './components/game/MiniGames';
import Achievements from './components/game/Achievements';
import Stats from './components/game/Stats';
import Rating from './components/game/Rating';
import Profile from './components/game/Profile';
import Settings from './components/game/Settings';
import LevelPage from './components/game/LevelPage';
import Icon from './components/ui/icon';

type Page = 'menu' | 'clicker' | 'upgrades' | 'minigames' | 'achievements' | 'stats' | 'rating' | 'profile' | 'settings' | 'level';

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: 'menu', label: 'МЕНЮ', icon: 'Home' },
  { id: 'clicker', label: 'КЛИКЕР', icon: 'Zap' },
  { id: 'upgrades', label: 'АПГРЕЙД', icon: 'TrendingUp' },
  { id: 'minigames', label: 'ИГРЫ', icon: 'Gamepad2' },
  { id: 'achievements', label: 'ТРОФЕИ', icon: 'Trophy' },
  { id: 'stats', label: 'СТАТ', icon: 'BarChart3' },
  { id: 'rating', label: 'ТОП', icon: 'Crown' },
  { id: 'profile', label: 'ПРОФ', icon: 'User' },
  { id: 'level', label: 'УРОВЕНЬ', icon: 'Star' },
  { id: 'settings', label: 'ОПЦИИ', icon: 'Settings' },
];

function AppContent() {
  const [page, setPage] = useState<Page>('menu');

  const renderPage = () => {
    switch (page) {
      case 'menu': return <MainMenu onNavigate={(p) => setPage(p as Page)} />;
      case 'clicker': return <Clicker />;
      case 'upgrades': return <Upgrades />;
      case 'minigames': return <MiniGames />;
      case 'achievements': return <Achievements />;
      case 'stats': return <Stats />;
      case 'rating': return <Rating />;
      case 'profile': return <Profile />;
      case 'settings': return <Settings />;
      case 'level': return <LevelPage />;
      default: return <MainMenu onNavigate={(p) => setPage(p as Page)} />;
    }
  };

  return (
    <div className="min-h-screen grid-bg flex items-start justify-center py-0">
      {/* Scan line effect */}
      <div className="scan-line" />
      <div className="scanline-moving" />

      {/* Game container — mobile-first */}
      <div className="w-full max-w-sm min-h-screen flex flex-col relative"
        style={{ background: 'var(--dark-bg)', borderLeft: '1px solid var(--dark-border)', borderRight: '1px solid var(--dark-border)' }}>

        {/* Top header bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-cyber-border flex-shrink-0">
          <div className="font-orbitron text-xs neon-text-cyan tracking-widest">NEON CLICK</div>
          <div className="font-mono-tech text-xs text-white/20 flicker">● ONLINE</div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-hidden flex flex-col" key={page}>
          {renderPage()}
        </div>

        {/* Bottom navigation */}
        <div className="border-t border-cyber-border flex-shrink-0"
          style={{ background: 'rgba(6,10,16,0.95)', backdropFilter: 'blur(10px)' }}>
          <div className="overflow-x-auto">
            <div className="flex min-w-max">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className={`nav-item ${page === item.id ? 'active' : ''}`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
