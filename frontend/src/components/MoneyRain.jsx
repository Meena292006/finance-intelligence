import React, { useMemo } from 'react';
import './MoneyRain.css';

const MoneyRain = ({ count = 8 }) => { // Reduced to 8 notes total
    const notes = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            // Distribute them somewhat evenly across the width
            left: `${(i * (100 / count)) + (Math.random() * 5)}%`,
            animationDuration: `${15 + Math.random() * 10}s`, // Even slower (15-25s)
            animationDelay: `${i * 1}s`, // Staggered entry for even flow
            rotation: `${Math.random() * 360}deg`,
            scale: 0.8 + Math.random() * 0.3,
        }));
    }, [count]);

    return (
        <div className="money-rain-container">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className="money-note"
                    style={{
                        left: note.left,
                        animationDuration: note.animationDuration,
                        animationDelay: note.animationDelay,
                        transform: `rotate(${note.rotation}) scale(${note.scale})`,
                    }}
                />
            ))}
        </div>
    );
};

export default MoneyRain;
