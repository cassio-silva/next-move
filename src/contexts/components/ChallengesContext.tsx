import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextData {
  level: number,  
  currentXp: number, 
  xpToNextLevel: number,
  completedChallenges: number, 
  activeChallenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currentXp: number,
  completedChallenges: number
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
} :ChallengesProviderProps) {
  const [ level, setLevel ] = useState(rest.level ?? 1);
  const [ currentXp, setCurrentXp ] = useState(rest.currentXp ?? 0);
  const [ completedChallenges, setCompletedChallenges ] = useState(rest.completedChallenges ?? 0);
  const [ activeChallenge, setActiveChallenge ] = useState(null);

  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);

  const xpToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []) 

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentXp', String(currentXp));
    Cookies.set('completedChallenges', String(completedChallenges));
  }, [level, currentXp, completedChallenges])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo Desafio 🎉', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge){
      return;
    }

    const { amount } = activeChallenge;

    let finalXP = currentXp + amount;

    if (finalXP >= xpToNextLevel) {
      finalXP = finalXP - xpToNextLevel;
      levelUp();
    }

    setCurrentXp(finalXP);
    setActiveChallenge(null);
    setCompletedChallenges(completedChallenges + 1);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  return (
    <ChallengesContext.Provider value={{ 
      level, 
      currentXp, 
      xpToNextLevel,
      completedChallenges, 
      activeChallenge,
      levelUp,
      startNewChallenge,
      resetChallenge, 
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}
      { isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}