import React, { createContext, useState } from 'react'

export const EventContext = createContext(null)

export default function Context({ children }) {
    const [eventsData, setEventsData] = useState([])

    const eventsInit = async () => {
        try {
            await fetch(`https://eliftech-server-f72u.onrender.com/events`, {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => setEventsData(data))
        } catch (error) {
            console.error(error)
        }
    }

    const value = {
        eventsInit,
        eventsData,
        setEventsData
    }
    
    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    )
}
