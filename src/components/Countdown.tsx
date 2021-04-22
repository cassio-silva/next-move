import React, { useContext } from 'react';
import { CountdownContext } from '../contexts/components/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown () {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown,
    setClockTimer
  } = useContext(CountdownContext);

  const [ minuteL, minuteR ] = String(minutes).padStart(2, '0').split('');
  const [ secondL, secondR ] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.optionsContainer}>
        <label htmlFor="time">Minutos:</label>
        <select name="time" onChange={(e) => {setClockTimer(e.target.value)}}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={25}>25</option>
        </select>
      </div>
      <div className={styles.container}>
        <div>
          <span>{minuteL}</span>
          <span>{minuteR}</span>
        </div>
        <span className={styles.dots}>:</span>
        <div>
          <span>{secondL}</span>
          <span>{secondR}</span>
        </div>
      </div >

      { hasFinished ? (
        <button className={styles.countdownButton}
          disabled
        >
          Ciclo Encerrado
        </button>
      ) : (
        <>
          {isActive ? (
              <button className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar Ciclo
              </button>
            ) : (
              <button className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar Ciclo
              </button>                
          )}
        </>
      )}   

    </div>
  )
}