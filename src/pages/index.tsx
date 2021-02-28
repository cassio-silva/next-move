import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React from 'react';

import styles from '../styles/index.module.css';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/components/CountdownContext';
import { ChallengesProvider } from '../contexts/components/ChallengesContext';

interface HomeProps {
  level: number,
  currentXp: number,
  completedChallenges: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentXp={props.currentXp}
      completedChallenges={props.completedChallenges}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move it</title>
        </Head>
        <ExperienceBar/>
        
        <CountdownProvider>
          <div className={styles.section}>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </div>
        </CountdownProvider>
      </div>
    </ChallengesProvider> 
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentXp, completedChallenges } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      completedChallenges: Number(completedChallenges)
    }
  }
}