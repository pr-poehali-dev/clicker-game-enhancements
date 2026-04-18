import { useGame } from './GameContext';
import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function Upgrades() {
  const { state, buyUpgrade } = useGame();
  const [filter, setFilter] = useState<'all' | 'click' | 'passive' | 'special'>('all');

  const formatNum = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toString();
  };

  const filtered = state.upgrades.filter(u => filter === 'all' || u.category === filter);

  const getScaledCost = (cost: number, owned: number) => Math.floor(cost * Math.pow(1.15, owned));

  const canAfford = (u: typeof state.upgrades[0]) => {
    const cost = getScaledCost(u.cost, u.owned);
    return u.costCurrency === 'credits' ? state.credits >= cost : state.tokens >= cost;
  };

  return (
    <div className="flex flex-col h-full page-enter">
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-1">УЛУЧШЕНИЯ</div>
        <div className="flex gap-2 mb-3">
          <div className="cyber-card rounded px-3 py-1">
            <span className="font-mono-tech text-xs text-cyan-400">⬡ {formatNum(state.credits)}</span>
          </div>
          <div className="cyber-card rounded px-3 py-1">
            <span className="font-mono-tech text-xs text-fuchsia-400">⚡ {formatNum(state.tokens)}</span>
          </div>
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1">
          {(['all', 'click', 'passive', 'special'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-orbitron text-xs px-3 py-1 rounded border transition-all ${filter === f ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' : 'border-cyan-900 text-white/30 hover:border-cyan-700'}`}
            >
              {f === 'all' ? 'ВСЕ' : f === 'click' ? 'КЛИК' : f === 'passive' ? 'ПАСС' : 'СПЕЦ'}
            </button>
          ))}
        </div>
      </div>

      {/* Upgrades list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {filtered.map(u => {
          const cost = getScaledCost(u.cost, u.owned);
          const affordable = canAfford(u);
          return (
            <div
              key={u.id}
              className={`cyber-card rounded p-3 flex items-center gap-3 transition-all ${affordable ? 'hover:border-cyan-500/50' : 'opacity-60'}`}
            >
              <div className="text-3xl w-10 text-center flex-shrink-0">{u.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-orbitron text-xs text-white/90 truncate">{u.name}</div>
                  <div className="font-mono-tech text-xs px-2 py-0.5 rounded border border-cyan-900 text-white/40 ml-2 flex-shrink-0">x{u.owned}</div>
                </div>
                <div className="font-rajdhani text-xs text-white/40 mb-1">{u.description}</div>
                <div className="font-mono-tech text-xs text-green-400">{u.effect}</div>
              </div>
              <button
                onClick={() => buyUpgrade(u.id)}
                disabled={!affordable}
                className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded border font-orbitron text-xs transition-all ${
                  affordable
                    ? u.costCurrency === 'credits'
                      ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 active:scale-95'
                      : 'border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400/10 active:scale-95'
                    : 'border-white/10 text-white/20 cursor-not-allowed'
                }`}
              >
                <span>{formatNum(cost)}</span>
                <span className="text-[9px] opacity-70">{u.costCurrency === 'credits' ? '⬡ CR' : '⚡ TOK'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
