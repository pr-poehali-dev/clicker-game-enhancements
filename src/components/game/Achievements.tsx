import { useGame } from './GameContext';

export default function Achievements() {
  const { state } = useGame();
  const unlocked = state.achievements.filter(a => a.unlocked).length;

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-1">ДОСТИЖЕНИЯ</div>
        <div className="font-mono-tech text-xs text-white/30 mb-3">
          Разблокировано: <span className="text-cyan-400">{unlocked}</span> / {state.achievements.length}
        </div>
        <div className="progress-bar mb-4">
          <div className="progress-fill bg-gradient-to-r from-cyan-500 to-fuchsia-500" style={{ width: `${(unlocked / state.achievements.length) * 100}%` }} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {state.achievements.map(a => (
          <div
            key={a.id}
            className={`cyber-card rounded p-3 flex items-center gap-3 transition-all ${a.unlocked ? 'border-cyan-500/40' : 'opacity-40'}`}
            style={a.unlocked ? { boxShadow: '0 0 10px rgba(0,255,255,0.1)' } : {}}
          >
            <div className={`text-3xl w-10 text-center flex-shrink-0 ${!a.unlocked ? 'grayscale' : ''}`}>
              {a.unlocked ? a.icon : '🔒'}
            </div>
            <div className="flex-1">
              <div className={`font-orbitron text-xs mb-1 ${a.unlocked ? 'text-cyan-400' : 'text-white/40'}`}>{a.name}</div>
              <div className="font-rajdhani text-xs text-white/40">{a.description}</div>
              {a.unlocked && (
                <div className="font-mono-tech text-xs text-yellow-400 mt-1">✓ {a.reward}</div>
              )}
            </div>
            {a.unlocked && (
              <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" style={{ boxShadow: '0 0 6px var(--neon-cyan)' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
