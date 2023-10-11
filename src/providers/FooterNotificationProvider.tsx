import React from 'react';

const NotificationContext = React.createContext(null);

export const useFooterNotification = () => {
	return React.useContext(NotificationContext);
};

export const FooterNotificationProvider = ({ children }) => {
	const [activeNotification, setActiveNotification] = React.useState<any>(null);
	const notificationQueue = React.useRef<any>([]);
	const notificationTimeoutRef = React.useRef<any>(null);

	const processQueue = () => {
		if (notificationQueue.current.length > 0) {
			setActiveNotification(notificationQueue.current.shift());
			notificationTimeoutRef.current = setTimeout(() => {
				setActiveNotification(null);
				processQueue();
			}, 2500);
		}
	};

	const queueFooterNotification = (message: any) => {
		notificationQueue.current.push(message);
		if (!activeNotification) {
			processQueue();
		}
	};

	React.useEffect(() => {
		return () => {
			if (notificationTimeoutRef.current) {
				clearTimeout(notificationTimeoutRef.current);
			}
		};
	}, []);

	return (
		<NotificationContext.Provider value={{ activeNotification, queueFooterNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};
