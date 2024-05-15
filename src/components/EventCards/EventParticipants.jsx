import React, { useState } from 'react';

export default function EventParticipants({ styles, participants, eventName, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredParticipants = participants.filter(participant => {
        const fullName = participant.name.toLowerCase();
        const email = participant.email.toLowerCase();
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || email.includes(query);
    });

    return (
        <div className={styles.eventCards__participants}>
            <div className={styles.eventCards__participants__header}>
                <h2 className={styles.eventCards__event}>{eventName}</h2>
                <span onClick={onClose}>X</span>
            </div>
            <div className={styles.eventCards__participants__search}>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className={styles.eventCards__participants__list}>
                {filteredParticipants.length > 0 ? (
                    filteredParticipants.map((participant) => (
                        <div className={styles.eventCards__participant} key={participant._id}>
                            <div className={styles.eventCards__participantInfo}>
                                <p>Name: {participant.name}</p>
                                <p>Email: {participant.email}</p>
                                <p>Date of Birth: {new Date(participant.dateOfBirth).toLocaleDateString()}</p>
                                <p>Where Heared: {participant.whereHeared}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.eventCards__participants__noone}>
                        <p>No participants found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
