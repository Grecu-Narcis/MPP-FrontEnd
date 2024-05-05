export type ConnectionStatusProps = {
    isOnline: boolean,
    setIsOnline: (newStatus: boolean) => void,
    isServerOnline: boolean,
    setIsServerOnline: (newStatus: boolean) => void
}