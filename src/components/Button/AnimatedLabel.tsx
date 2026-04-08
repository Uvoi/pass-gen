import { useEffect, useRef, useState } from 'react';

export const AnimatedLabel = ({ text }: { text: string }) => {
    const [displayed, setDisplayed] = useState(text);
    const [typing, setTyping] = useState(false);
    const targetRef = useRef(text);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (text === targetRef.current) return;
        targetRef.current = text;
        setTyping(true);

        const tick = (current: string, next: string) => {
            if (timerRef.current) clearTimeout(timerRef.current);

            if (current.length > 0) {
                timerRef.current = setTimeout(() => {
                    const trimmed = current.slice(0, -1);
                    setDisplayed(trimmed);
                    tick(trimmed, next);
                }, 40);
            } else {
                let i = 0;
                const type = () => {
                    if (i > next.length) { setTyping(false); return; }
                    setDisplayed(next.slice(0, i));
                    i++;
                    timerRef.current = setTimeout(type, 40);
                };
                type();
            }
        };

        setDisplayed((cur) => { tick(cur, text); return cur; });

        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [text]);

    return (
        <span>
            {displayed || '\u00A0'}
            {typing && <span style={{ animation: 'blink 0.2s step-start infinite' }}>|</span>}
            <style>{`@keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }`}</style>
        </span>
    );
};
