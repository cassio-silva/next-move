import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
  minutes: number,
  seconds: number,
  hasFinished: boolean,
  isActive: boolean,
  startCountdown: () => void,
  resetCountdown: () => void,
  setClockTimer: ( value: string ) => void
}

interface CountdownProviderProps {
  children: ReactNode,
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }:CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [ min, setMin ] = useState(5)
  const [ time, setTime ] = useState(min * 60);
  const [ isActive, setIsActive] = useState(false);
  const [ hasFinished, setHasFinished ] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  useEffect(() => {
    resetCountdown();
  }, [min])

  function setClockTimer (value) {
    setMin(value);
  }

  function startCountdown () {
    setIsActive(true);
  }
  
  function resetCountdown () {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(min * 60);
    setHasFinished(false);
  }

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
      setClockTimer
    }}>
      {children}
    </CountdownContext.Provider>
  )
}