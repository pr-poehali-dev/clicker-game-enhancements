import { useGame } from '@/components/game/GameContext';
import Icon from '@/components/ui/icon';

const MOCK_PLAYERS = [
  { name: 'NEO_ZERO', credits: 9842156, tokens: 4420, level: 87, avatar: '🔮' },
  { name: 'GHOST_X', credits: 7231900, tokens: 3110, level: 72, avatar: '👻' },
  { name: 'CIPHER_9', credits: 5980400, tokens: 2890, level: 65, avatar: '🧠' },
  { name: 'NEON_HAWK', credits: 4120000, tokens: 2200, level: 54, avatar: '🦾' },
  { name: 'RAZOR_V', credits: 3450100, tokens: 1750, level: 48, avatar: '⚡' },
  { name: 'DARK_OPS', credits: 2900000, tokens: 1400, level: 42, avatar: '🌐' },
  { name: 'DATA_WOLF', credits: 2100500, tokens: 990, level: 36, avatar: '🔷' },
  { name: 'PIXEL_RUN', credits: 1800200, tokens: 770, level: 31, avatar: '🏙️' },
  { name: 'MATRIX_9', credits: 1200000, tokens: 540, level: 25, avatar: '💻' },
  { name: 'CHROME_X', credits: 980400, tokens: 420, level: 20, avatar: '🤖' },
];

export default function Rating() {
  const { state } = useGame();

  const formatNum = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
    return n.toString();
  };

  const allPlayers = [
    ...MOCK_PLAYERS,
    { name: state.playerName, credits: Math.floor(state.totalCreditsEarned), tokens: Math.floor(state.totalTokensEarned), level: state.level, avatar: '⚡', isMe: true },
  ].sort((a, b) => b.credits - a.credits);

  const myPos = allPlayers.findIndex(p => (p as { isMe?: boolean }).isMe) + 1;

  const rankColor = (pos: number) => {
    if (pos === 1) return 'var(--neon-yellow)';
    if (pos === 2) return '#c0c0c0';
    if (pos === 3) return '#cd7f32';
    return 'var(--neon-cyan)';
  };

  const rankIcon = (pos: number) => {
    if (pos === 1) return '👑';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest">РЕЙТИНГ</div>
        <div className="font-mono-tech text-xs text-white/30 mb-3">Мировые нейроагенты</div>

        <div className="cyber-card rounded p-3 flex items-center justify-between">
          <div className="font-mono-tech text-xs text-white/40">ТВОЯ ПОЗИЦИЯ</div>
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} color="var(--neon-green)" />
            <span className="font-orbitron text-sm neon-text-green">#{myPos}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 mt-2">
        {allPlayers.map((p, i) => {
          const pos = i + 1;
          const isMe = (p as { isMe?: boolean }).isMe;
          return (
            <div
              key={p.name}
              className={`cyber-card rounded p-3 flex items-center gap-3 transition-all ${isMe ? 'border-cyan-400/60' : ''}`}
              style={isMe ? { boxShadow: '0 0 15px rgba(0,255,255,0.2)' } : {}}
            >
              <div
                className="font-orbitron text-sm w-8 text-center flex-shrink-0"
                style={{ color: rankColor(pos) }}
              >
                {rankIcon(pos)}
              </div>
              <div className="text-2xl flex-shrink-0">{p.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className={`font-orbitron text-xs ${isMe ? 'neon-text-cyan' : 'text-white/80'} truncate`}>
                  {p.name} {isMe && <span className="text-cyan-400/50">(ТЫ)</span>}
                </div>
                <div className="flex gap-3 mt-1">
                  <span className="font-mono-tech text-xs text-cyan-400/60">⬡ {formatNum(p.credits)}</span>
                  <span className="font-mono-tech text-xs text-fuchsia-400/60">⚡ {formatNum(p.tokens)}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-orbitron text-xs text-yellow-400">УР.{p.level}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
