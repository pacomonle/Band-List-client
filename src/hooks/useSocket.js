import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
    console.log('path', serverPath)
    const socket = useMemo(() => io.connect(serverPath, {
        transports: ['websocket']
    }), [serverPath]);

    console.log('socket', socket)
    const [online, setOnline] = useState(false);

    useEffect(() => {
        setOnline(socket.connected);
    }, [socket])

    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true);
        })

        return () => {
            // socket.disconnect()
        }

    }, [socket])

    useEffect(() => {

        socket.on('disconnect', () => {
            setOnline(false);
        })

        return () => {

        }

    }, [socket])

    return {
        socket,
        online
    }
}