import { useGame } from './GameContext';

const FAKE_PLAYERS = [
  { name: 'НЕЙРО_КИБЕР_777', credits: 8420000, tokens: 3200, level: 42 },
  { name: 'XAOS_RUNNER', credits: 5100000, tokens: 1800, level: 35 },
  { name: 'GHOST_IN_SHELL', credits: 3200000, tokens: 990, level: 28 },
  { name: 'MATRIX_HACKER', credits: 1900000, tokens: 650, level: 22 },
  { name: 'CYBER_SAMURAI', credits: 980000, tokens: 420, level: 17 },
  { name: 'NEON_SHADOW', credits: 450000, tokens: 180, level: 12 },
  { name: 'GRID_WALKER', credits: 120000, tokens: 55, level: 8 },
  { name: 'DATA_PUNK', credits: 35000, tokens: 12, level: 5 },
];

export default function Rating() {
  const { state } = useGame();

  const formatNum = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toLocaleString();
  };

  const allPlayers = [
    ...FAKE_PLAYERS,
    { name: state.playerName, credits: state.totalCreditsEarned, tokens: state.totalTokensEarned, level: state.level, isMe: true },
  ].sort((a, b) => b.credits - a.credits);

  const myRank = allPlayers.findIndex(p => 'isMe' in p && p.isMe) + 1;

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-1">РЕЙТИНГ</div>
        <div className="font-mono-tech text-xs text-white/30 mb-3">Мировые лидеры по кредитам</div>
        <div className="cyber-card rounded p-3 mb-3 neon-border-cyan">
          <div className="font-mono-tech text-xs text-white/40 mb-1">ТВОЯ ПОЗИЦИЯ</div>
          <div className="font-orbitron text-2xl neon-text-yellow">#{myRank}</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {allPlayers.map((p, i) => {
          const isMe = 'isMe' in p && p.isMe;
          return (
            <div
              key={i}
              className={`cyber-card rounded p-3 flex items-center gap-3 transition-all ${isMe ? 'neon-border-yellow' : ''}`}
              style={isMe ? { background: 'rgba(255,255,0,0.03)' } : {}}
            >
              <div className="w-8 text-center font-orbitron text-sm flex-shrink-0">
                {i < 3 ? medals[i] : <span className="text-white/30">#{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-orbitron text-xs truncate ${isMe ? 'neon-text-yellow' : 'text-white/80'}`}>
                  {isMe ? '▶ ' : ''}{p.name}
                </div>
                <div className="font-mono-tech text-xs text-white/30">
                  ур.{p.level} · ⚡{formatNum(p.tokens)} ток
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-orbitron text-sm text-cyan-400">{formatNum(p.credits)}</div>
                <div className="font-mono-tech text-xs text-white/30">кредитов</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
