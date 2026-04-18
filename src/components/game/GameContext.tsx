import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  costCurrency: 'credits' | 'tokens';
  effect: string;
  multiplier: number;
  owned: number;
  maxOwned?: number;
  icon: string;
  category: 'click' | 'passive' | 'special';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  condition: (state: GameState) => boolean;
  reward: string;
}

export interface GameState {
  credits: number;
  tokens: number;
  totalCreditsEarned: number;
  totalTokensEarned: number;
  totalClicks: number;
  clicksPerSecond: number;
  creditsPerClick: number;
  tokensPerClick: number;
  creditsPerSecond: number;
  tokensPerSecond: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
  playTime: number;
  upgrades: Upgrade[];
  achievements: Achievement[];
  rank: number;
  playerName: string;
}

const INITIAL_UPGRADES: Upgrade[] = [
  { id: 'u1', name: 'Нейрочип', description: '+1 кредит за клик', cost: 50, costCurrency: 'credits', effect: '+1 cr/клик', multiplier: 1, owned: 0, icon: '🧠', category: 'click' },
  { id: 'u2', name: 'Кибер-рука', description: '+3 кредита за клик', cost: 200, costCurrency: 'credits', effect: '+3 cr/клик', multiplier: 3, owned: 0, icon: '🦾', category: 'click' },
  { id: 'u3', name: 'Нано-боты', description: '+1 кредит/сек автоматически', cost: 100, costCurrency: 'credits', effect: '+1 cr/сек', multiplier: 1, owned: 0, icon: '🤖', category: 'passive' },
  { id: 'u4', name: 'Взлом сети', description: '+5 кредитов/сек', cost: 500, costCurrency: 'credits', effect: '+5 cr/сек', multiplier: 5, owned: 0, icon: '💻', category: 'passive' },
  { id: 'u5', name: 'Токен-майнер', description: '+1 токен за 10 кликов', cost: 20, costCurrency: 'tokens', effect: '+0.1 tok/клик', multiplier: 0.1, owned: 0, icon: '⚡', category: 'click' },
  { id: 'u6', name: 'Квантовый ядро', description: '+1 токен/сек', cost: 50, costCurrency: 'tokens', effect: '+1 tok/сек', multiplier: 1, owned: 0, icon: '🔮', category: 'passive' },
  { id: 'u7', name: 'ИИ-ассистент', description: '+10 cr/сек и +1 tok/сек', cost: 1000, costCurrency: 'credits', effect: '+10 cr/сек', multiplier: 10, owned: 0, icon: '🌐', category: 'special' },
  { id: 'u8', name: 'Матрица данных', description: '+50 cr/сек', cost: 5000, costCurrency: 'credits', effect: '+50 cr/сек', multiplier: 50, owned: 0, icon: '🔷', category: 'passive' },
  { id: 'u9', name: 'Плазма-пушка', description: '+20 cr/клик', cost: 10, costCurrency: 'tokens', effect: '+20 cr/клик', multiplier: 20, owned: 0, icon: '🔥', category: 'click' },
  { id: 'u10', name: 'Нео-город', description: '+100 cr/сек', cost: 20000, costCurrency: 'credits', effect: '+100 cr/сек', multiplier: 100, owned: 0, icon: '🏙️', category: 'passive' },
];

const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', name: 'Первый шаг', description: 'Сделай первый клик', icon: '👆', unlocked: false, condition: (s) => s.totalClicks >= 1, reward: '+10 кредитов' },
  { id: 'a2', name: 'Кликер', description: '100 кликов', icon: '⚡', unlocked: false, condition: (s) => s.totalClicks >= 100, reward: '+50 кредитов' },
  { id: 'a3', name: 'Кибер-воин', description: '1000 кликов', icon: '🤖', unlocked: false, condition: (s) => s.totalClicks >= 1000, reward: '+5 токенов' },
  { id: 'a4', name: 'Богатей', description: '1000 кредитов', icon: '💰', unlocked: false, condition: (s) => s.totalCreditsEarned >= 1000, reward: '+2 токена' },
  { id: 'a5', name: 'Токен-мастер', description: '100 токенов', icon: '🔮', unlocked: false, condition: (s) => s.totalTokensEarned >= 100, reward: '+500 кредитов' },
  { id: 'a6', name: 'Апгрейд', description: 'Купи первое улучшение', icon: '🧠', unlocked: false, condition: (s) => s.upgrades.some(u => u.owned > 0), reward: 'Опыт x2 на 1 мин' },
  { id: 'a7', name: '10-й уровень', description: 'Достигни 10 уровня', icon: '🌟', unlocked: false, condition: (s) => s.level >= 10, reward: '+20 токенов' },
  { id: 'a8', name: 'Миллионер', description: '1 000 000 кредитов', icon: '💎', unlocked: false, condition: (s) => s.totalCreditsEarned >= 1000000, reward: '+100 токенов' },
];

const defaultState: GameState = {
  credits: 0,
  tokens: 0,
  totalCreditsEarned: 0,
  totalTokensEarned: 0,
  totalClicks: 0,
  clicksPerSecond: 0,
  creditsPerClick: 1,
  tokensPerClick: 0,
  creditsPerSecond: 0,
  tokensPerSecond: 0,
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  playTime: 0,
  upgrades: INITIAL_UPGRADES,
  achievements: ACHIEVEMENTS,
  rank: 0,
  playerName: 'НЕЙРО-БРОДЯГА',
};

interface GameContextType {
  state: GameState;
  click: () => void;
  buyUpgrade: (upgradeId: string) => void;
  setPlayerName: (name: string) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};

function calcUpgradeStats(upgrades: Upgrade[]) {
  let creditsPerClick = 1;
  let tokensPerClick = 0;
  let creditsPerSecond = 0;
  let tokensPerSecond = 0;

  upgrades.forEach(u => {
    if (u.owned === 0) return;
    const total = u.owned * u.multiplier;
    if (u.category === 'click') {
      if (u.costCurrency === 'credits') creditsPerClick += total;
      else tokensPerClick += total;
    } else if (u.category === 'passive') {
      if (u.costCurrency === 'credits') creditsPerSecond += total;
      else tokensPerSecond += total;
    } else if (u.category === 'special') {
      creditsPerSecond += total;
      tokensPerSecond += u.owned * 1;
    }
  });

  return { creditsPerClick, tokensPerClick, creditsPerSecond, tokensPerSecond };
}

function calcXpToNextLevel(level: number) {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('neonclick_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed, achievements: ACHIEVEMENTS.map(a => ({ ...a, unlocked: parsed.achievements?.find((pa: Achievement) => pa.id === a.id)?.unlocked || false })) };
      }
    } catch (e) {
      console.warn('load save failed', e);
    }
    return defaultState;
  });

  const click = useCallback(() => {
    setState(prev => {
      const newCredits = prev.credits + prev.creditsPerClick;
      const newTokens = prev.tokens + prev.tokensPerClick;
      const newTotalCredits = prev.totalCreditsEarned + prev.creditsPerClick;
      const newTotalTokens = prev.totalTokensEarned + prev.tokensPerClick;
      const newTotalClicks = prev.totalClicks + 1;
      const xpGained = 1 + Math.floor(prev.creditsPerClick / 10);
      let newXp = prev.xp + xpGained;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;
      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel++;
        newXpToNext = calcXpToNextLevel(newLevel);
      }
      const newAchievements = prev.achievements.map(a => {
        if (a.unlocked) return a;
        const tempState = { ...prev, totalClicks: newTotalClicks, totalCreditsEarned: newTotalCredits, totalTokensEarned: newTotalTokens, level: newLevel };
        return { ...a, unlocked: a.condition(tempState) };
      });
      return { ...prev, credits: newCredits, tokens: newTokens, totalCreditsEarned: newTotalCredits, totalTokensEarned: newTotalTokens, totalClicks: newTotalClicks, xp: newXp, level: newLevel, xpToNextLevel: newXpToNext, achievements: newAchievements };
    });
  }, []);

  const buyUpgrade = useCallback((upgradeId: string) => {
    setState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade) return prev;
      const currency = upgrade.costCurrency === 'credits' ? prev.credits : prev.tokens;
      const scaledCost = Math.floor(upgrade.cost * Math.pow(1.15, upgrade.owned));
      if (currency < scaledCost) return prev;
      const newUpgrades = prev.upgrades.map(u => u.id === upgradeId ? { ...u, owned: u.owned + 1 } : u);
      const stats = calcUpgradeStats(newUpgrades);
      const newAchievements = prev.achievements.map(a => {
        if (a.unlocked) return a;
        const tempState = { ...prev, upgrades: newUpgrades };
        return { ...a, unlocked: a.condition(tempState) };
      });
      if (upgrade.costCurrency === 'credits') {
        return { ...prev, credits: prev.credits - scaledCost, upgrades: newUpgrades, ...stats, achievements: newAchievements };
      } else {
        return { ...prev, tokens: prev.tokens - scaledCost, upgrades: newUpgrades, ...stats, achievements: newAchievements };
      }
    });
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setState(prev => ({ ...prev, playerName: name }));
  }, []);

  const resetGame = useCallback(() => {
    localStorage.removeItem('neonclick_save');
    setState(defaultState);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.creditsPerSecond === 0 && prev.tokensPerSecond === 0) return { ...prev, playTime: prev.playTime + 1 };
        const newCredits = prev.credits + prev.creditsPerSecond;
        const newTokens = prev.tokens + prev.tokensPerSecond;
        const newTotalCredits = prev.totalCreditsEarned + prev.creditsPerSecond;
        const newTotalTokens = prev.totalTokensEarned + prev.tokensPerSecond;
        const xpGained = Math.floor(prev.creditsPerSecond / 10);
        let newXp = prev.xp + xpGained;
        let newLevel = prev.level;
        let newXpToNext = prev.xpToNextLevel;
        while (newXp >= newXpToNext) {
          newXp -= newXpToNext;
          newLevel++;
          newXpToNext = calcXpToNextLevel(newLevel);
        }
        return { ...prev, credits: newCredits, tokens: newTokens, totalCreditsEarned: newTotalCredits, totalTokensEarned: newTotalTokens, xp: newXp, level: newLevel, xpToNextLevel: newXpToNext, playTime: prev.playTime + 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const save = setTimeout(() => {
      localStorage.setItem('neonclick_save', JSON.stringify(state));
    }, 2000);
    return () => clearTimeout(save);
  }, [state]);

  return (
    <GameContext.Provider value={{ state, click, buyUpgrade, setPlayerName, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}