import { useState } from 'react';
import { useGame } from './GameContext';

const AVATARS = ['🤖', '👾', '🦾', '🧠', '💀', '🌐', '⚡', '🔮', '🎭', '🚀'];

export default function Profile() {
  const { state, setPlayerName } = useGame();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(state.playerName);
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const formatNum = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toLocaleString();
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    if (h > 0) return `${h}ч ${m}м`;
    return `${m}м`;
  };

  const xpPercent = (state.xp / state.xpToNextLevel) * 100;

  return (
    <div className="flex flex-col h-full page-enter overflow-y-auto">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-4">ПРОФИЛЬ</div>
      </div>

      {/* Avatar & name */}
      <div className="px-4 mb-4">
        <div className="cyber-card rounded-lg p-5 text-center neon-border-cyan">
          <div className="text-6xl mb-3 float-anim">{AVATARS[selectedAvatar]}</div>

          {editing ? (
            <div className="mb-3">
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value.toUpperCase().slice(0, 16))}
                className="bg-transparent border border-cyan-400/50 rounded px-3 py-1 font-orbitron text-sm text-cyan-400 text-center w-full outline-none focus:border-cyan-400"
                placeholder="ТВОЙ НИК"
              />
            </div>
          ) : (
            <div className="font-orbitron text-lg neon-text-cyan mb-1">{state.playerName}</div>
          )}

          <div className="font-mono-tech text-xs text-yellow-400 mb-4">УРОВЕНЬ {state.level} · НЕЙРО-БРОДЯГА</div>

          {editing ? (
            <div className="flex gap-2 justify-center">
              <button onClick={() => { setPlayerName(nameInput); setEditing(false); }}
                className="cyber-btn-cyan rounded px-4 py-1 text-xs">СОХРАНИТЬ</button>
              <button onClick={() => setEditing(false)}
                className="border border-white/20 text-white/40 rounded px-4 py-1 text-xs font-orbitron">ОТМЕНА</button>
            </div>
          ) : (
            <button onClick={() => setEditing(true)}
              className="cyber-btn-cyan rounded px-4 py-1 text-xs">ИЗМЕНИТЬ НИК</button>
          )}
        </div>
      </div>

      {/* Avatar select */}
      {editing && (
        <div className="px-4 mb-4">
          <div className="font-orbitron text-xs text-white/40 mb-2 tracking-widest">АВАТАР</div>
          <div className="grid grid-cols-5 gap-2">
            {AVATARS.map((av, i) => (
              <button key={i} onClick={() => setSelectedAvatar(i)}
                className={`text-2xl py-2 rounded border transition-all ${selectedAvatar === i ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyber-border hover:border-cyan-400/40'}`}>
                {av}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* XP bar */}
      <div className="px-4 mb-4">
        <div className="cyber-card rounded p-3">
          <div className="flex justify-between font-mono-tech text-xs mb-2">
            <span className="text-yellow-400">XP: {state.xp}</span>
            <span className="text-white/30">До ур.{state.level + 1}: {state.xpToNextLevel - state.xp}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: `${xpPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        {[
          { label: 'Кредитов', value: formatNum(state.totalCreditsEarned), color: 'text-cyan-400' },
          { label: 'Токенов', value: formatNum(state.totalTokensEarned), color: 'text-fuchsia-400' },
          { label: 'Кликов', value: formatNum(state.totalClicks), color: 'text-orange-400' },
          { label: 'Время игры', value: formatTime(state.playTime), color: 'text-green-400' },
          { label: 'Достижений', value: state.achievements.filter(a => a.unlocked).length.toString(), color: 'text-yellow-400' },
          { label: 'Улучшений', value: state.upgrades.reduce((s, u) => s + u.owned, 0).toString(), color: 'text-fuchsia-400' },
        ].map((s, i) => (
          <div key={i} className="cyber-card rounded p-3 text-center">
            <div className="font-mono-tech text-xs text-white/30 mb-1">{s.label}</div>
            <div className={`font-orbitron text-base ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
