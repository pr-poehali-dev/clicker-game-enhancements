import { useGame } from './GameContext';
import { useState, useRef, useCallback } from 'react';

interface FloatText {
  id: number;
  x: number;
  y: number;
  value: string;
  color: string;
}

export default function Clicker() {
  const { state, click } = useGame();
  const [floats, setFloats] = useState<FloatText[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const floatId = useRef(0);
  const rippleId = useRef(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    click();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const id = floatId.current++;
    const texts: FloatText[] = [{ id, x: x - 15 + Math.random() * 30, y: y - 10, value: `+${state.creditsPerClick}`, color: 'var(--neon-cyan)' }];
    if (state.tokensPerClick > 0) {
      texts.push({ id: id + 0.5, x: x - 15 + Math.random() * 30, y: y - 30, value: `+${state.tokensPerClick.toFixed(1)}⚡`, color: 'var(--neon-magenta)' });
    }
    setFloats(prev => [...prev, ...texts]);
    setTimeout(() => setFloats(prev => prev.filter(f => f.id !== id && f.id !== id + 0.5)), 800);

    const rid = rippleId.current++;
    setRipples(prev => [...prev, { id: rid, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rid)), 600);
  }, [click, state.creditsPerClick, state.tokensPerClick]);

  const formatNum = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toString();
  };

  return (
    <div className="flex flex-col h-full page-enter overflow-hidden">
      {/* Currency bar */}
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="cyber-card rounded p-3">
          <div className="font-mono-tech text-xs text-cyan-400/50 mb-1">⬡ КРЕДИТЫ</div>
          <div className="font-orbitron text-xl neon-text-cyan">{formatNum(state.credits)}</div>
          <div className="font-mono-tech text-xs text-cyan-400/40">+{formatNum(state.creditsPerSecond)}/сек</div>
        </div>
        <div className="cyber-card rounded p-3">
          <div className="font-mono-tech text-xs text-fuchsia-400/50 mb-1">⚡ ТОКЕНЫ</div>
          <div className="font-orbitron text-xl neon-text-magenta">{formatNum(state.tokens)}</div>
          <div className="font-mono-tech text-xs text-fuchsia-400/40">+{state.tokensPerSecond.toFixed(1)}/сек</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex justify-around px-3 mb-2">
        <div className="text-center">
          <div className="font-mono-tech text-xs text-white/30">ЗА КЛИК</div>
          <div className="font-orbitron text-sm text-cyan-400">{formatNum(state.creditsPerClick)}</div>
        </div>
        <div className="w-px bg-cyber-border" />
        <div className="text-center">
          <div className="font-mono-tech text-xs text-white/30">КЛИКОВ</div>
          <div className="font-orbitron text-sm text-cyan-400">{formatNum(state.totalClicks)}</div>
        </div>
        <div className="w-px bg-cyber-border" />
        <div className="text-center">
          <div className="font-mono-tech text-xs text-white/30">УРОВЕНЬ</div>
          <div className="font-orbitron text-sm text-yellow-400">{state.level}</div>
        </div>
      </div>

      {/* XP bar */}
      <div className="px-3 mb-4">
        <div className="flex justify-between font-mono-tech text-xs text-white/30 mb-1">
          <span>XP</span>
          <span>{state.xp}/{state.xpToNextLevel}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: `${(state.xp / state.xpToNextLevel) * 100}%` }} />
        </div>
      </div>

      {/* Click area */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="relative">
          {/* Glow rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 scale-125 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-0 rounded-full border border-fuchsia-500/10 scale-150" />

          {/* Click button */}
          <button
            ref={btnRef}
            onClick={handleClick}
            className="click-btn relative"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {/* Ripples */}
            {ripples.map(r => (
              <span
                key={r.id}
                style={{
                  position: 'absolute',
                  left: r.x - 10,
                  top: r.y - 10,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: 'rgba(0,255,255,0.6)',
                  transform: 'scale(0)',
                  animation: 'ripple 0.6s ease-out forwards',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Float texts */}
            {floats.map(f => (
              <span key={f.id} className="click-float" style={{ left: f.x, top: f.y, color: f.color }}>
                {f.value}
              </span>
            ))}

            <div className="flex flex-col items-center">
              <div className="text-5xl mb-2 float-anim">⚡</div>
              <div className="font-orbitron text-xs tracking-widest">КЛИК</div>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom info */}
      <div className="px-3 pb-4">
        <div className="cyber-card rounded p-2 text-center">
          <div className="font-mono-tech text-xs text-white/30">
            Заработано всего: <span className="text-cyan-400">{formatNum(state.totalCreditsEarned)} кр</span> · <span className="text-fuchsia-400">{formatNum(state.totalTokensEarned)} ток</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          to { transform: scale(8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
