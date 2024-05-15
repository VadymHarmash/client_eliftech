import React from 'react'
import styles from './styles/index.module.scss'
import EventCards from '../EventCards'

export default function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <div className="container">
                <div className={styles.dashboard__wrapper}>
                    <h2>Events</h2>
                    <EventCards />
                </div>
            </div>
        </div>
    )
}
