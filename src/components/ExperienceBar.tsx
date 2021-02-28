import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/components/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(props) {
  const { currentXp, xpToNextLevel } = useContext(ChallengesContext);
  const percentToNextLevel = Math.round((currentXp * 100) / xpToNextLevel);

  return (
    <div className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>{currentXp} xp</span>
      </div>
      <span>{xpToNextLevel} xp</span>
    </div>
  )
}