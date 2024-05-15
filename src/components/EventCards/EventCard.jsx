import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import EventParticipants from './EventParticipants';

export default function EventCard({ eventsData, setEventsData, styles }) {
    const [isRegister, setIsRegister] = useState(false)
    const [selectedEventId, setSelectedEventId] = useState(null)
    const [viewParticipantsEventId, setViewParticipantsEventId] = useState(null)

    const handleRegisterClick = (eventId) => {
        setSelectedEventId(eventId)
        setIsRegister(true)
        setViewParticipantsEventId(null)
    }

    const handleViewParticipants = (eventId) => {
        setViewParticipantsEventId((prevEventId) => (prevEventId === eventId ? null : eventId))
    }

    const handleCloseParticipants = () => {
        setViewParticipantsEventId(null)
    }

    const sortByName = () => {
        setEventsData([...eventsData].sort((a, b) => a.title.localeCompare(b.title)))
    }
    const sortByDate = () => {
        setEventsData([...eventsData].sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
    const sortByOrg = () => {
        setEventsData([...eventsData].sort((a, b) => a.organizer.localeCompare(b.organizer)))
    }

    return (
        <>
            <div className={styles.eventCards__buttons}>
                <button onClick={sortByName}>Sort by name</button>
                <button onClick={sortByDate}>Sort by date</button>
                <button onClick={sortByOrg}>Sort by org</button>
            </div>
            {eventsData.map((cardData) => (
                <div className={styles.eventCards__card} key={cardData._id}>
                    <h3 className={styles.eventCards__card__title}>{cardData.title}</h3>
                    <p className={styles.eventCards__card__date}>{cardData.date.toString().slice(0, 10).replaceAll('-', '.')} (yyyy.mm.dd)</p>
                    <span className={styles.eventCards__card__description}>{cardData.description}</span>
                    <div className={styles.eventCards__card__buttons}>
                        <p className={styles.eventCards__card__buttons__register} onClick={() => handleRegisterClick(cardData._id)}>Register</p>
                        <p className={styles.eventCards__card__buttons__view} onClick={() => handleViewParticipants(cardData._id)}>View</p>
                    </div>
                    {isRegister && selectedEventId === cardData._id && (
                        <RegisterModal styles={styles} onClose={() => setIsRegister(false)} eventId={selectedEventId} />
                    )}
                    {viewParticipantsEventId === cardData._id && (
                        <EventParticipants styles={styles} participants={cardData.participants} eventName={cardData.title} onClose={handleCloseParticipants} />
                    )}
                </div>
            ))}
        </>
    );
}
