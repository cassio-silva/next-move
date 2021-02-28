import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/components/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile () {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.container} >
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU" alt=""/>
      {/* <img src="https://github.com/cassio-silva.png" alt="cassio silva" /> */}
      <div>
        <span>Jhon Doe</span>
        {/* <span>Cássio Silva</span> */}
        <span>
          <img src="icons/level.svg" alt="nivel"/>
          Nível {level}
        </span>
      </div>
    </div>
  )
}