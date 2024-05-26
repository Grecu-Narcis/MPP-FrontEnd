import { useEffect, useState } from 'react';

import './NotificationCard.css';

export default function NotificationCard({ children }: any) {
    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearInterval(timeout);
    }, []);

    return <div className={`notification-card ${!isVisible ? 'fade-out' : ''}`}>{children}</div>;
}
