import { useGame } from '@/components/game/GameContext';

export default function Achievements() {
  const { state } = useGame();

  const unlocked = state.achievements.filter(a => a.unlocked);
  const locked = state.achievements.filter(a => !a.unlocked);

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest">ДОСТИЖЕНИЯ</div>
        <div className="flex items-center gap-3 mt-2">
          <div className="font-mono-tech text-xs text-white/30">
            Разблокировано:
          </div>
          <div className="font-orbitron text-sm neon-text-yellow">
            {unlocked.length} / {state.achievements.length}
          </div>
        </div>
        <div className="progress-bar mt-2">
          <div
            className="progress-fill bg-gradient-to-r from-yellow-500 to-orange-500"
            style={{ width: `${(unlocked.length / state.achievements.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 mt-3">
        {unlocked.length > 0 && (
          <>
            <div className="font-mono-tech text-xs text-green-400/60 tracking-widest mb-2">— РАЗБЛОКИРОВАНО —</div>
            {unlocked.map(a => (
              <div key={a.id} className="cyber-card rounded p-3 flex items-center gap-3 border-green-500/20">
                <div className="text-3xl w-10 text-center flex-shrink-0">{a.icon}</div>
                <div className="flex-1">
                  <div className="font-orbitron text-xs neon-text-green">{a.name}</div>
                  <div className="font-rajdhani text-xs text-white/50 mt-0.5">{a.description}</div>
                  <div className="font-mono-tech text-xs text-yellow-400/70 mt-1">🎁 {a.reward}</div>
                </div>
                <div className="text-green-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>
            ))}
          </>
        )}

        {locked.length > 0 && (
          <>
            <div className="font-mono-tech text-xs text-white/20 tracking-widest mb-2 mt-4">— ЗАБЛОКИРОВАНО —</div>
            {locked.map(a => (
              <div key={a.id} className="cyber-card rounded p-3 flex items-center gap-3 opacity-50">
                <div className="text-3xl w-10 text-center flex-shrink-0 grayscale">🔒</div>
                <div className="flex-1">
                  <div className="font-orbitron text-xs text-white/40">{a.name}</div>
                  <div className="font-rajdhani text-xs text-white/25 mt-0.5">{a.description}</div>
                  <div className="font-mono-tech text-xs text-yellow-400/30 mt-1">🎁 {a.reward}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
