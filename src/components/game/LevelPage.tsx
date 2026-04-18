import { useGame } from './GameContext';

const LEVEL_REWARDS = [
  { level: 1, reward: 'Стартовый набор', icon: '🌟', color: 'text-white/60' },
  { level: 2, reward: '+5 кр/клик', icon: '⚡', color: 'text-cyan-400' },
  { level: 3, reward: 'Разблокировка Снайпера', icon: '🎯', color: 'text-cyan-400' },
  { level: 5, reward: '+1 tok/клик бонус', icon: '💎', color: 'text-fuchsia-400' },
  { level: 7, reward: 'Новый скин кнопки', icon: '🎨', color: 'text-yellow-400' },
  { level: 10, reward: '+20 токенов награда', icon: '🏆', color: 'text-yellow-400' },
  { level: 15, reward: 'Особый аватар', icon: '👑', color: 'text-orange-400' },
  { level: 20, reward: 'Мастер-чип (x2 клик)', icon: '🧠', color: 'text-fuchsia-400' },
  { level: 30, reward: 'Легендарный статус', icon: '🌌', color: 'text-cyan-400' },
  { level: 50, reward: 'НЕЙРО-БОГ', icon: '⚔️', color: 'text-yellow-400' },
];

export default function LevelPage() {
  const { state } = useGame();

  const xpPercent = (state.xp / state.xpToNextLevel) * 100;

  return (
    <div className="flex flex-col h-full page-enter overflow-y-auto">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-4">УРОВНИ</div>
      </div>

      {/* Current level card */}
      <div className="px-4 mb-4">
        <div className="cyber-card rounded-lg p-5 neon-border-yellow relative overflow-hidden">
          <div className="absolute right-4 top-4 font-orbitron text-6xl text-yellow-400/10 font-black">
            {state.level}
          </div>
          <div className="relative">
            <div className="font-mono-tech text-xs text-white/30 mb-1">ТЕКУЩИЙ УРОВЕНЬ</div>
            <div className="font-orbitron text-4xl text-yellow-400 font-black mb-1">{state.level}</div>
            <div className="font-rajdhani text-sm text-white/50 mb-4">
              {state.level < 5 ? 'НОВОБРАНЕЦ' : state.level < 10 ? 'ОПЕРАТИВНИК' : state.level < 20 ? 'ХАКЕР' : state.level < 30 ? 'ПРИЗРАК' : 'ЛЕГЕНДА'}
            </div>
            <div className="flex justify-between font-mono-tech text-xs text-white/30 mb-1">
              <span>XP: {state.xp}</span>
              <span>До ур.{state.level + 1}: {state.xpToNextLevel - state.xp} XP</span>
            </div>
            <div className="progress-bar h-2 rounded">
              <div className="progress-fill bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Level roadmap */}
      <div className="px-4 pb-4">
        <div className="font-orbitron text-xs text-white/30 tracking-widest mb-3">ПУТЬ УРОВНЕЙ</div>
        <div className="space-y-2">
          {LEVEL_REWARDS.map((lr) => {
            const reached = state.level >= lr.level;
            const current = state.level === lr.level;
            return (
              <div
                key={lr.level}
                className={`cyber-card rounded p-3 flex items-center gap-3 transition-all ${current ? 'neon-border-yellow' : reached ? 'border-cyan-500/30' : 'opacity-40'}`}
              >
                <div className={`text-2xl w-8 text-center flex-shrink-0 ${!reached ? 'grayscale opacity-50' : ''}`}>
                  {reached ? lr.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-orbitron text-xs ${current ? 'neon-text-yellow' : reached ? 'text-white/70' : 'text-white/30'}`}>
                      УР. {lr.level}
                    </span>
                    {current && <span className="font-mono-tech text-xs text-yellow-400 animate-pulse">◀ ВЫ ЗДЕСЬ</span>}
                  </div>
                  <div className={`font-rajdhani text-xs ${reached ? lr.color : 'text-white/20'}`}>{lr.reward}</div>
                </div>
                {reached && <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 6px #00ff88' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
