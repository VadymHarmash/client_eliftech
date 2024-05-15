import React, { useEffect, useContext } from 'react'
import styles from './styles/index.module.scss'
import EventCard from './EventCard'
import { EventContext } from '../../context/Context'

export default function EventCards() {

    const eventContext = useContext(EventContext)

    useEffect(() => {
        eventContext?.eventsInit()
    }, [])

    return (
        <div className={styles.eventCards}>
            <EventCard eventsData={eventContext.eventsData} setEventsData={eventContext.setEventsData} styles={styles} />
        </div>
    )
}
