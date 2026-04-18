import { useGame } from '@/components/game/GameContext';
import Icon from '@/components/ui/icon';

export default function Stats() {
  const { state } = useGame();

  const formatNum = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return Math.floor(n).toString();
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}ч ${m}м ${sec}с`;
    if (m > 0) return `${m}м ${sec}с`;
    return `${sec}с`;
  };

  const stats = [
    { label: 'Всего кредитов', value: formatNum(state.totalCreditsEarned), icon: 'Coins', color: 'var(--neon-cyan)' },
    { label: 'Всего токенов', value: formatNum(state.totalTokensEarned), icon: 'Zap', color: 'var(--neon-magenta)' },
    { label: 'Всего кликов', value: formatNum(state.totalClicks), icon: 'MousePointer', color: 'var(--neon-green)' },
    { label: 'Кредиты/клик', value: formatNum(state.creditsPerClick), icon: 'TrendingUp', color: 'var(--neon-cyan)' },
    { label: 'Токены/клик', value: state.tokensPerClick.toFixed(2), icon: 'Bolt', color: 'var(--neon-magenta)' },
    { label: 'Кредиты/сек', value: formatNum(state.creditsPerSecond), icon: 'Activity', color: 'var(--neon-green)' },
    { label: 'Токены/сек', value: state.tokensPerSecond.toFixed(2), icon: 'Radio', color: 'var(--neon-yellow)' },
    { label: 'Уровень', value: state.level.toString(), icon: 'Star', color: 'var(--neon-yellow)' },
    { label: 'Опыт', value: `${state.xp}/${state.xpToNextLevel}`, icon: 'BarChart2', color: 'var(--neon-orange)' },
    { label: 'Улучшений куплено', value: state.upgrades.reduce((s, u) => s + u.owned, 0).toString(), icon: 'Wrench', color: 'var(--neon-cyan)' },
    { label: 'Достижений', value: `${state.achievements.filter(a => a.unlocked).length}/${state.achievements.length}`, icon: 'Trophy', color: 'var(--neon-yellow)' },
    { label: 'Время в игре', value: formatTime(state.playTime), icon: 'Clock', color: 'var(--neon-green)' },
  ];

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-1">СТАТИСТИКА</div>
        <div className="font-mono-tech text-xs text-white/30 mb-4">Аналитика нейро-активности</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s, i) => (
            <div key={i} className="cyber-card rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <div style={{ color: s.color }}>
                  <Icon name={s.icon} size={14} />
                </div>
                <span className="font-mono-tech text-xs text-white/40 truncate">{s.label}</span>
              </div>
              <div className="font-orbitron text-sm font-bold" style={{ color: s.color }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 cyber-card rounded p-4">
          <div className="font-orbitron text-xs neon-text-cyan mb-3 tracking-widest">ПРОГРЕСС УРОВНЯ</div>
          <div className="flex justify-between font-mono-tech text-xs text-white/40 mb-2">
            <span>УР. {state.level}</span>
            <span>{state.xp} / {state.xpToNextLevel} XP</span>
            <span>УР. {state.level + 1}</span>
          </div>
          <div className="progress-bar h-2">
            <div
              className="progress-fill bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
              style={{ width: `${Math.min((state.xp / state.xpToNextLevel) * 100, 100)}%` }}
            />
          </div>
          <div className="font-mono-tech text-xs text-white/20 mt-2 text-center">
            {Math.floor((state.xp / state.xpToNextLevel) * 100)}% до следующего уровня
          </div>
        </div>
      </div>
    </div>
  );
}
