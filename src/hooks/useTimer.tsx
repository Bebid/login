import React, { useEffect, useState, useRef } from "react";

function useTimer(count: number): any[] {
    const [timerCount, setTimerCount] = useState(count);
    const timer = useRef<NodeJS.Timer | null>(null);

    const startTimer = () => {
        timer.current = setInterval(() => {
            setTimerCount((value) => value - 1);
        }, 1000);
    };

    const stopTimer = () => {
        timer.current && clearInterval(timer.current);
    };

    return [timerCount, startTimer, stopTimer];
}

export default useTimer;
