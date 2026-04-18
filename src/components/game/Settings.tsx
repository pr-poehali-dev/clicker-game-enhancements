import { useState } from 'react';
import { useGame } from './GameContext';

export default function Settings() {
  const { resetGame } = useGame();
  const [sfx, setSfx] = useState(true);
  const [scanlines, setScanlines] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [confirmReset, setConfirmReset] = useState(false);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full border transition-all relative ${value ? 'border-cyan-400 bg-cyan-400/20' : 'border-white/20 bg-white/5'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${value ? 'left-6 bg-cyan-400' : 'left-0.5 bg-white/30'}`}
        style={value ? { boxShadow: '0 0 8px var(--neon-cyan)' } : {}} />
    </button>
  );

  return (
    <div className="flex flex-col h-full page-enter overflow-y-auto">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-4">НАСТРОЙКИ</div>
      </div>

      <div className="px-4 pb-4 space-y-2">
        {/* Audio */}
        <div className="font-orbitron text-xs text-white/30 tracking-widest mb-2 pl-1">АУДИО</div>
        <div className="cyber-card rounded p-3 flex items-center justify-between">
          <div>
            <div className="font-rajdhani text-sm text-white/80">Звуковые эффекты</div>
            <div className="font-mono-tech text-xs text-white/30">Клики и события</div>
          </div>
          <Toggle value={sfx} onChange={() => setSfx(!sfx)} />
        </div>

        {/* Visual */}
        <div className="font-orbitron text-xs text-white/30 tracking-widest mb-2 mt-4 pl-1">ВИЗУАЛ</div>
        <div className="cyber-card rounded p-3 flex items-center justify-between">
          <div>
            <div className="font-rajdhani text-sm text-white/80">Линии сканирования</div>
            <div className="font-mono-tech text-xs text-white/30">CRT-эффект</div>
          </div>
          <Toggle value={scanlines} onChange={() => setScanlines(!scanlines)} />
        </div>

        {/* Notifications */}
        <div className="font-orbitron text-xs text-white/30 tracking-widest mb-2 mt-4 pl-1">УВЕДОМЛЕНИЯ</div>
        <div className="cyber-card rounded p-3 flex items-center justify-between">
          <div>
            <div className="font-rajdhani text-sm text-white/80">Достижения</div>
            <div className="font-mono-tech text-xs text-white/30">Всплывающие уведомления</div>
          </div>
          <Toggle value={notifications} onChange={() => setNotifications(!notifications)} />
        </div>

        {/* Language */}
        <div className="font-orbitron text-xs text-white/30 tracking-widest mb-2 mt-4 pl-1">ЯЗЫК</div>
        <div className="cyber-card rounded p-3 flex items-center justify-between">
          <div className="font-rajdhani text-sm text-white/80">Язык интерфейса</div>
          <div className="flex gap-1">
            {(['ru', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`px-3 py-1 rounded font-orbitron text-xs transition-all ${lang === l ? 'bg-cyan-400/20 border border-cyan-400 text-cyan-400' : 'border border-white/10 text-white/30'}`}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="font-orbitron text-xs text-red-400/60 tracking-widest mb-2 mt-6 pl-1">ОПАСНАЯ ЗОНА</div>
        <div className="cyber-card rounded p-3 border-red-500/20">
          <div className="font-rajdhani text-sm text-white/80 mb-1">Сброс прогресса</div>
          <div className="font-mono-tech text-xs text-white/30 mb-3">Весь прогресс будет удалён навсегда</div>
          {confirmReset ? (
            <div className="flex gap-2">
              <button onClick={() => { resetGame(); setConfirmReset(false); }}
                className="border border-red-400 text-red-400 rounded px-4 py-1 font-orbitron text-xs hover:bg-red-400/10 transition-all">
                ПОДТВЕРДИТЬ
              </button>
              <button onClick={() => setConfirmReset(false)}
                className="border border-white/20 text-white/30 rounded px-4 py-1 font-orbitron text-xs">
                ОТМЕНА
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)}
              className="border border-red-500/40 text-red-400/60 rounded px-4 py-1 font-orbitron text-xs hover:border-red-400 hover:text-red-400 transition-all">
              СБРОСИТЬ
            </button>
          )}
        </div>

        {/* Version */}
        <div className="text-center mt-6">
          <div className="font-mono-tech text-xs text-white/20">NEON CLICK v1.0 · poehali.dev</div>
        </div>
      </div>
    </div>
  );
}
