import { useGame } from '@/components/game/GameContext';
import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function Settings() {
  const { resetGame } = useGame();
  const [sounds, setSounds] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [particles, setParticles] = useState(true);
  const [scanLines, setScanLines] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirmReset) {
      resetGame();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 4000);
    }
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-all ${value ? 'bg-cyan-500/30 border border-cyan-400' : 'bg-white/5 border border-white/10'}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${value ? 'left-6 bg-cyan-400' : 'left-0.5 bg-white/20'}`}
        style={value ? { boxShadow: '0 0 8px var(--neon-cyan)' } : {}}
      />
    </button>
  );

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest">НАСТРОЙКИ</div>
        <div className="font-mono-tech text-xs text-white/30 mb-4">Конфигурация системы</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {/* Graphics */}
        <div className="cyber-card rounded p-4">
          <div className="font-orbitron text-xs text-cyan-400/70 mb-3 tracking-widest flex items-center gap-2">
            <Icon name="Monitor" size={12} />
            ГРАФИКА
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-rajdhani text-sm text-white/80">Частицы</div>
                <div className="font-mono-tech text-xs text-white/30">Эффекты при клике</div>
              </div>
              <Toggle value={particles} onChange={setParticles} />
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-rajdhani text-sm text-white/80">Сканлинии</div>
                <div className="font-mono-tech text-xs text-white/30">Эффект ретро-монитора</div>
              </div>
              <Toggle value={scanLines} onChange={setScanLines} />
            </div>
          </div>
        </div>

        {/* Sound */}
        <div className="cyber-card rounded p-4">
          <div className="font-orbitron text-xs text-cyan-400/70 mb-3 tracking-widest flex items-center gap-2">
            <Icon name="Volume2" size={12} />
            ЗВУК И ВИБРАЦИЯ
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-rajdhani text-sm text-white/80">Звуки</div>
                <div className="font-mono-tech text-xs text-white/30">Звуковые эффекты</div>
              </div>
              <Toggle value={sounds} onChange={setSounds} />
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <div>
                <div className="font-rajdhani text-sm text-white/80">Вибрация</div>
                <div className="font-mono-tech text-xs text-white/30">Тактильный отклик</div>
              </div>
              <Toggle value={vibration} onChange={setVibration} />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="cyber-card rounded p-4">
          <div className="font-orbitron text-xs text-cyan-400/70 mb-3 tracking-widest flex items-center gap-2">
            <Icon name="Info" size={12} />
            О СИСТЕМЕ
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-mono-tech text-xs text-white/30">Версия</span>
              <span className="font-mono-tech text-xs text-cyan-400">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono-tech text-xs text-white/30">Движок</span>
              <span className="font-mono-tech text-xs text-cyan-400">NEON ENGINE</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono-tech text-xs text-white/30">Протокол</span>
              <span className="font-mono-tech text-xs text-cyan-400">CYBERPUNK-2077</span>
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className={`w-full py-3 rounded font-orbitron text-sm tracking-widest transition-all ${
            saved ? 'border border-green-400 text-green-400 bg-green-400/10' : 'cyber-btn-cyan'
          }`}
        >
          {saved ? '✓ СОХРАНЕНО' : 'СОХРАНИТЬ'}
        </button>

        {/* Danger zone */}
        <div className="cyber-card rounded p-4 border border-red-900/50">
          <div className="font-orbitron text-xs text-red-400/70 mb-3 tracking-widest flex items-center gap-2">
            <Icon name="AlertTriangle" size={12} />
            ОПАСНАЯ ЗОНА
          </div>
          <button
            onClick={handleReset}
            className={`w-full py-2 rounded font-orbitron text-xs tracking-widest border transition-all ${
              confirmReset
                ? 'border-red-400 text-red-400 bg-red-400/10 animate-pulse'
                : 'border-red-900 text-red-400/50 hover:border-red-700 hover:text-red-400'
            }`}
          >
            {confirmReset ? '⚠ НАЖМИ ЕЩЁ РАЗ — ВСЁ СОТРЁТСЯ!' : 'СБРОСИТЬ ПРОГРЕСС'}
          </button>
        </div>
      </div>
    </div>
  );
}
