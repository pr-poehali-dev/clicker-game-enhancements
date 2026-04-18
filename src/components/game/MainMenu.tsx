import { useGame } from './GameContext';
import Icon from '@/components/ui/icon';

export default function MainMenu({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { state } = useGame();

  const menuItems = [
    { id: 'clicker', label: 'КЛИКЕР', icon: 'Zap', color: 'var(--neon-cyan)', desc: 'Зарабатывай кредиты' },
    { id: 'upgrades', label: 'УЛУЧШЕНИЯ', icon: 'TrendingUp', color: 'var(--neon-magenta)', desc: 'Прокачай систему' },
    { id: 'minigames', label: 'МИНИ-ИГРЫ', icon: 'Gamepad2', color: 'var(--neon-yellow)', desc: 'Бонусные миссии' },
    { id: 'achievements', label: 'ДОСТИЖЕНИЯ', icon: 'Trophy', color: 'var(--neon-green)', desc: 'Разблокируй награды' },
    { id: 'stats', label: 'СТАТИСТИКА', icon: 'BarChart3', color: 'var(--neon-orange)', desc: 'Аналитика данных' },
    { id: 'rating', label: 'РЕЙТИНГ', icon: 'Crown', color: 'var(--neon-cyan)', desc: 'Мировые лидеры' },
    { id: 'profile', label: 'ПРОФИЛЬ', icon: 'User', color: 'var(--neon-magenta)', desc: 'Твой аватар' },
    { id: 'settings', label: 'НАСТРОЙКИ', icon: 'Settings', color: 'var(--neon-yellow)', desc: 'Конфигурация' },
  ];

  return (
    <div className="flex flex-col h-full page-enter">
      {/* Header */}
      <div className="text-center pt-8 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="relative">
          <div className="font-orbitron text-4xl font-black neon-text-cyan glitch tracking-widest mb-1">
            NEON CLICK
          </div>
          <div className="font-mono-tech text-xs text-cyan-400/60 tracking-[0.4em] uppercase">
            Cyberpunk Clicker v1.0
          </div>
          <div className="mt-3 flex justify-center gap-6">
            <div className="cyber-card px-4 py-2 rounded">
              <div className="font-mono-tech text-xs text-cyan-400/50">КРЕДИТЫ</div>
              <div className="font-orbitron text-lg neon-text-cyan">{Math.floor(state.credits).toLocaleString()}</div>
            </div>
            <div className="cyber-card px-4 py-2 rounded">
              <div className="font-mono-tech text-xs text-fuchsia-400/50">ТОКЕНЫ</div>
              <div className="font-orbitron text-lg neon-text-magenta">{Math.floor(state.tokens).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Level bar */}
      <div className="px-4 mb-4">
        <div className="cyber-card rounded p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-orbitron text-xs text-cyan-400">УР. {state.level}</span>
            <span className="font-mono-tech text-xs text-cyan-400/50">{state.xp} / {state.xpToNextLevel} XP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill bg-gradient-to-r from-cyan-500 to-fuchsia-500" style={{ width: `${(state.xp / state.xpToNextLevel) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="cyber-card rounded p-4 text-left transition-all duration-200 hover:scale-105 active:scale-95 group"
              style={{ '--hover-color': item.color } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 mb-2">
                <div style={{ color: item.color }} className="opacity-80 group-hover:opacity-100">
                  <Icon name={item.icon} size={18} />
                </div>
                <span className="font-orbitron text-xs font-bold" style={{ color: item.color }}>
                  {item.label}
                </span>
              </div>
              <div className="font-rajdhani text-xs text-white/40 group-hover:text-white/60 transition-colors">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="text-center pb-4">
        <button
          onClick={() => onNavigate('clicker')}
          className="cyber-btn-cyan rounded px-8 py-3 text-sm font-orbitron tracking-widest"
        >
          ▶ ИГРАТЬ
        </button>
      </div>
    </div>
  );
}
