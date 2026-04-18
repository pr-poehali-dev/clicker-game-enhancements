import { useGame } from './GameContext';

export default function Stats() {
  const { state } = useGame();

  const formatNum = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toLocaleString();
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}ч ${m}м`;
    if (m > 0) return `${m}м ${s}с`;
    return `${s}с`;
  };

  const rows = [
    { label: 'Кредитов заработано', value: formatNum(state.totalCreditsEarned), color: 'text-cyan-400' },
    { label: 'Токенов заработано', value: formatNum(state.totalTokensEarned), color: 'text-fuchsia-400' },
    { label: 'Кредитов сейчас', value: formatNum(state.credits), color: 'text-cyan-400' },
    { label: 'Токенов сейчас', value: formatNum(state.tokens), color: 'text-fuchsia-400' },
    { label: 'Кредитов за клик', value: formatNum(state.creditsPerClick), color: 'text-yellow-400' },
    { label: 'Токенов за клик', value: state.tokensPerClick.toFixed(2), color: 'text-yellow-400' },
    { label: 'Кредитов в секунду', value: formatNum(state.creditsPerSecond), color: 'text-green-400' },
    { label: 'Токенов в секунду', value: state.tokensPerSecond.toFixed(2), color: 'text-green-400' },
    { label: 'Всего кликов', value: formatNum(state.totalClicks), color: 'text-orange-400' },
    { label: 'Уровень', value: state.level.toString(), color: 'text-yellow-400' },
    { label: 'Очки опыта', value: `${state.xp} / ${state.xpToNextLevel}`, color: 'text-yellow-400' },
    { label: 'Время игры', value: formatTime(state.playTime), color: 'text-cyan-400' },
    { label: 'Куплено улучшений', value: state.upgrades.reduce((s, u) => s + u.owned, 0).toString(), color: 'text-fuchsia-400' },
    { label: 'Достижений открыто', value: state.achievements.filter(a => a.unlocked).length.toString(), color: 'text-green-400' },
  ];

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-3">СТАТИСТИКА</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
        {rows.map((row, i) => (
          <div key={i} className="cyber-card rounded px-3 py-2 flex justify-between items-center">
            <span className="font-rajdhani text-sm text-white/50">{row.label}</span>
            <span className={`font-mono-tech text-sm ${row.color}`}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
