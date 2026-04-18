import { useState, useCallback, useEffect } from 'react';
import { useGame } from './GameContext';

type MiniGameId = 'hack' | 'reaction' | null;

function HackGame({ onFinish }: { onFinish: (success: boolean, reward: number) => void }) {
  const [sequence] = useState(() => Array.from({ length: 5 }, () => ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]));
  const [input, setInput] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(t); if (!done) { setDone(true); onFinish(false, 0); } return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [done, onFinish]);

  const press = useCallback((k: string) => {
    if (done) return;
    const next = [...input, k];
    setInput(next);
    if (next.length === sequence.length) {
      setDone(true);
      const correct = next.every((c, i) => c === sequence[i]);
      onFinish(correct, correct ? 500 : 0);
    }
  }, [input, sequence, done, onFinish]);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="font-orbitron text-xs text-white/50 tracking-widest">ВЗЛОМ СИСТЕМЫ</div>
      <div className="font-mono-tech text-xs text-white/30">Повтори последовательность</div>

      <div className="flex gap-3">
        {sequence.map((k, i) => (
          <div key={i} className={`w-10 h-10 flex items-center justify-center rounded border font-orbitron text-sm
            ${input[i] === k ? 'border-green-400 text-green-400' : input[i] !== undefined ? 'border-red-400 text-red-400' : 'border-cyan-400/40 text-cyan-400'}`}>
            {input.length > i ? input[i] : k}
          </div>
        ))}
      </div>

      <div className="font-mono-tech text-2xl text-yellow-400">{timeLeft}с</div>

      <div className="grid grid-cols-4 gap-3">
        {['A', 'B', 'C', 'D'].map(k => (
          <button key={k} onClick={() => press(k)}
            className="w-14 h-14 rounded border border-cyan-400/60 text-cyan-400 font-orbitron text-lg hover:bg-cyan-400/10 active:scale-95 transition-all">
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReactionGame({ onFinish }: { onFinish: (success: boolean, reward: number) => void }) {
  const [phase, setPhase] = useState<'wait' | 'ready' | 'done'>('wait');
  const [startTime, setStartTime] = useState(0);
  const [result, setResult] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delay = 2000 + Math.random() * 3000;
    const t = setTimeout(() => { setPhase('ready'); setStartTime(Date.now()); }, delay);
    return () => clearTimeout(t);
  }, []);

  const tap = useCallback(() => {
    if (done) return;
    if (phase === 'wait') { setDone(true); setPhase('done'); onFinish(false, 0); return; }
    const ms = Date.now() - startTime;
    setResult(ms);
    setDone(true);
    setPhase('done');
    const reward = ms < 300 ? 300 : ms < 500 ? 150 : 50;
    onFinish(true, reward);
  }, [phase, startTime, done, onFinish]);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="font-orbitron text-xs text-white/50 tracking-widest">РЕАКЦИЯ</div>
      <div className="font-mono-tech text-xs text-white/30">Нажми при появлении цели</div>

      <button
        onClick={tap}
        className={`w-40 h-40 rounded-full border-2 font-orbitron text-sm transition-all active:scale-95
          ${phase === 'wait' ? 'border-red-500 text-red-400 bg-red-500/5' :
            phase === 'ready' ? 'border-green-400 text-green-400 bg-green-400/10 animate-pulse' :
            'border-white/20 text-white/20'}`}
      >
        {phase === 'wait' ? 'ОЖИДАЙ...' : phase === 'ready' ? 'ЖМИ!' : `${result}мс`}
      </button>
    </div>
  );
}

export default function MiniGames() {
  const { state } = useGame();
  const [active, setActive] = useState<MiniGameId>(null);
  const [result, setResult] = useState<{ success: boolean; reward: number } | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});

  const handleFinish = useCallback((success: boolean, reward: number) => {
    setResult({ success, reward });
    setActive(null);
    if (success && reward > 0) {
      const key = active || 'game';
      setCooldowns(p => ({ ...p, [key]: 30 }));
    }
  }, [active]);

  useEffect(() => {
    const t = setInterval(() => {
      setCooldowns(p => {
        const next = { ...p };
        Object.keys(next).forEach(k => { if (next[k] > 0) next[k]--; });
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const games = [
    { id: 'hack' as MiniGameId, name: 'ВЗЛОМ СИСТЕМЫ', desc: 'Повтори код последовательности', reward: '500 кредитов', icon: '💻', color: 'var(--neon-cyan)' },
    { id: 'reaction' as MiniGameId, name: 'РЕАКЦИЯ', desc: 'Нажми в нужный момент', reward: '50–300 кредитов', icon: '⚡', color: 'var(--neon-yellow)' },
  ];

  if (active === 'hack') {
    return (
      <div className="flex flex-col h-full page-enter">
        <div className="p-4"><div className="font-orbitron text-lg neon-text-cyan tracking-widest">МИНИ-ИГРЫ</div></div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="cyber-card rounded-lg p-6 w-full max-w-sm neon-border-cyan">
            <HackGame onFinish={handleFinish} />
          </div>
        </div>
      </div>
    );
  }

  if (active === 'reaction') {
    return (
      <div className="flex flex-col h-full page-enter">
        <div className="p-4"><div className="font-orbitron text-lg neon-text-cyan tracking-widest">МИНИ-ИГРЫ</div></div>
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="cyber-card rounded-lg p-6 w-full max-w-sm neon-border-yellow">
            <ReactionGame onFinish={handleFinish} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full page-enter">
      <div className="p-4 pb-2">
        <div className="font-orbitron text-lg neon-text-cyan tracking-widest mb-1">МИНИ-ИГРЫ</div>
        <div className="font-mono-tech text-xs text-white/30">Выполняй миссии за бонусы</div>
      </div>

      {result && (
        <div className={`mx-4 mb-3 rounded p-3 border font-orbitron text-xs text-center ${result.success ? 'border-green-400 text-green-400 bg-green-400/5' : 'border-red-400 text-red-400 bg-red-400/5'}`}>
          {result.success ? `✓ УСПЕХ! +${result.reward} кредитов` : '✗ ПРОВАЛ'}
        </div>
      )}

      <div className="flex-1 px-4 pb-4 space-y-3">
        {games.map(g => (
          <button
            key={g.id}
            onClick={() => { setResult(null); setActive(g.id); }}
            disabled={cooldowns[g.id!] > 0}
            className="cyber-card rounded-lg p-4 w-full text-left transition-all hover:scale-102 active:scale-98 disabled:opacity-40"
            style={cooldowns[g.id!] ? {} : { borderColor: g.color + '40' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-3xl">{g.icon}</div>
              <div>
                <div className="font-orbitron text-sm" style={{ color: g.color }}>{g.name}</div>
                <div className="font-rajdhani text-xs text-white/40">{g.desc}</div>
              </div>
              {cooldowns[g.id!] > 0 && (
                <div className="ml-auto font-mono-tech text-xs text-white/30">{cooldowns[g.id!]}с</div>
              )}
            </div>
            <div className="font-mono-tech text-xs text-green-400">Награда: {g.reward}</div>
          </button>
        ))}

        <div className="cyber-card rounded-lg p-4 opacity-40 cursor-not-allowed">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">🎯</div>
            <div>
              <div className="font-orbitron text-sm text-fuchsia-400">СНАЙПЕР</div>
              <div className="font-rajdhani text-xs text-white/40">Уровень 5+</div>
            </div>
            <div className="ml-auto font-mono-tech text-xs text-white/30">🔒 ур.{state.level}/5</div>
          </div>
          <div className="font-mono-tech text-xs text-green-400/40">Награда: 1000 кредитов</div>
        </div>
      </div>
    </div>
  );
}
