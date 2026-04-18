import { useGame } from '@/components/game/GameContext';
import { useState } from 'react';
import Icon from '@/components/ui/icon';

const RANK_TITLES = [
  'НОВОБРАНЕЦ', 'ХАКЕР', 'ОПЕРАТОР', 'АГЕНТ', 'КОРПОРАТ',
  'ПРИЗРАК', 'НЕЙРОМАНТ', 'АРХИТЕКТОР', 'НЕКСУС', 'БОГ МАТРИЦЫ'
];

const AVATARS = ['⚡', '🤖', '🧠', '💻', '🔮', '🦾', '🌐', '🔷', '🏙️', '💎'];

export default function Profile() {
  const { state, setPlayerName } = useGame();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(state.playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const rankTitle = RANK_TITLES[Math.min(Math.floor(state.level / 5), RANK_TITLES.length - 1)];
  const unlockedCount = state.achievements.filter(a => a.unlocked).length;

  const handleSave = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim().toUpperCase());
    }
    setEditing(false);
  };

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest">ПРОФИЛЬ</div>
        <div className="font-mono-tech text-xs text-white/30 mb-4">Идентификатор агента</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Avatar & Name */}
        <div className="cyber-card rounded p-6 text-center">
          <div className="text-6xl mb-3">{AVATARS[selectedAvatar]}</div>
          <div className="font-mono-tech text-xs text-cyan-400/40 mb-1 tracking-widest">ОБОЗНАЧЕНИЕ</div>
          {editing ? (
            <div className="flex gap-2 justify-center mt-2">
              <input
                className="font-orbitron text-sm bg-transparent border border-cyan-500/50 text-cyan-400 px-3 py-1 rounded outline-none focus:border-cyan-400 text-center uppercase w-48"
                value={nameInput}
                onChange={e => setNameInput(e.target.value.toUpperCase())}
                maxLength={20}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && handleSave()}
              />
              <button onClick={handleSave} className="cyber-btn-cyan px-3 py-1 rounded text-xs">
                <Icon name="Check" size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="font-orbitron text-xl neon-text-cyan">{state.playerName}</div>
              <button onClick={() => setEditing(true)} className="text-cyan-400/40 hover:text-cyan-400">
                <Icon name="Pencil" size={14} />
              </button>
            </div>
          )}
          <div className="font-mono-tech text-xs mt-2" style={{ color: 'var(--neon-yellow)' }}>{rankTitle}</div>
        </div>

        {/* Choose avatar */}
        <div className="cyber-card rounded p-4">
          <div className="font-orbitron text-xs text-cyan-400/60 mb-3 tracking-widest">ВЫБРАТЬ АВАТАР</div>
          <div className="grid grid-cols-5 gap-2">
            {AVATARS.map((av, i) => (
              <button
                key={i}
                onClick={() => setSelectedAvatar(i)}
                className={`text-2xl p-2 rounded border transition-all ${selectedAvatar === i ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyan-900 hover:border-cyan-700'}`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="cyber-card rounded p-3 text-center">
            <div className="font-orbitron text-2xl neon-text-yellow">{state.level}</div>
            <div className="font-mono-tech text-xs text-white/30 mt-1">УРОВЕНЬ</div>
          </div>
          <div className="cyber-card rounded p-3 text-center">
            <div className="font-orbitron text-2xl neon-text-green">{unlockedCount}</div>
            <div className="font-mono-tech text-xs text-white/30 mt-1">ДОСТИЖЕНИЙ</div>
          </div>
          <div className="cyber-card rounded p-3 text-center">
            <div className="font-orbitron text-lg neon-text-cyan">
              {state.totalClicks >= 1e6 ? (state.totalClicks / 1e6).toFixed(1) + 'M' : state.totalClicks >= 1e3 ? (state.totalClicks / 1e3).toFixed(1) + 'K' : state.totalClicks}
            </div>
            <div className="font-mono-tech text-xs text-white/30 mt-1">КЛИКОВ</div>
          </div>
          <div className="cyber-card rounded p-3 text-center">
            <div className="font-orbitron text-lg neon-text-magenta">
              {state.upgrades.reduce((s, u) => s + u.owned, 0)}
            </div>
            <div className="font-mono-tech text-xs text-white/30 mt-1">УЛУЧШЕНИЙ</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="cyber-card rounded p-4">
          <div className="flex justify-between mb-2">
            <span className="font-orbitron text-xs text-yellow-400">УР. {state.level}</span>
            <span className="font-mono-tech text-xs text-white/30">{state.xp}/{state.xpToNextLevel} XP</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill bg-gradient-to-r from-yellow-500 to-orange-500"
              style={{ width: `${(state.xp / state.xpToNextLevel) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
