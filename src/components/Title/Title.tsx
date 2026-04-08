import { useEffect, useState } from 'react';
import { AnimatedLabel } from '../Button/AnimatedLabel';

const PHRASES = 
[
  "same input, same key",
  "nothing random here",
  "deterministic magic",
  "reproducible result",
  "your key, always",
  "no storage needed",
]

type TitleProps = 
{
    trigger: number;
}

export const Title = ({ trigger }: TitleProps) =>
{
    const [text, setText] = useState('pass-gen');

    useEffect(() => {
        if (trigger === 0) return;
        const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
        setText(phrase);
        const timer = setTimeout(() => setText('pass-gen'), 3000);
        return () => clearTimeout(timer);
    }, [trigger]);

    return <AnimatedLabel 
        text={text} 
        className='text-text text-3xl absolute top-[5%] left-1/2 -translate-x-1/2 lg:text-5xl' 
        splitColor 
    />;
}