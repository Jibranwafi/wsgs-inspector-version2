'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Condition = 'poor' | 'fair' | 'good';

export interface ConditionTogglerProps {
    value?: Condition;
    onChange?: (condition: Condition) => void;
}

export function ConditionToggler({ value, onChange }: ConditionTogglerProps) {
    const conditions: { key: Condition; label: string; bgColor: string }[] = [
        { key: 'poor', label: 'Poor', bgColor: 'bg-red-400' },
        { key: 'fair', label: 'Fair', bgColor: 'bg-orange-300' },
        { key: 'good', label: 'Good', bgColor: 'bg-green-400' },
    ];

    const [internalValue, setInternalValue] = useState<Condition>(value ?? 'poor');
    const selected = value ?? internalValue;
    const currentIndex = conditions.findIndex((c) => c.key === selected);

    const [buttonWidth, setButtonWidth] = useState(70);

    useEffect(() => {
        const updateButtonWidth = () => {
            setButtonWidth(window.innerWidth >= 768 ? 70 : 60);
        };
        updateButtonWidth();
        window.addEventListener('resize', updateButtonWidth);
        return () => window.removeEventListener('resize', updateButtonWidth);
    }, []);

    const colorMap: Record<Condition, string> = {
        poor: '#f87171',
        fair: '#fdba74',
        good: '#4ade80',
    };

    return (
        <div className="bg-gray-300 shadow-lg flex flex-row p-1 w-fit rounded-full relative">
            <motion.div
                className="absolute md:w-[70px] w-[60px] h-[calc(100%-8px)] rounded-full"
                initial={false}
                animate={{
                    x: currentIndex * buttonWidth,
                    backgroundColor: colorMap[selected],
                }}
                transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    backgroundColor: { duration: 0.3, ease: 'easeInOut' },
                }}
            />
            {conditions.map((condition) => (
                <button
                    key={condition.key}
                    onClick={() => {
                        if (onChange) onChange(condition.key);
                        else setInternalValue(condition.key);
                    }}
                    className="md:w-[70px] w-[60px] rounded-full text-center flex flex-col justify-center relative z-10 text-sm md:text-base"
                    type="button"
                >
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`${condition.key}-${selected === condition.key ? 'active' : 'inactive'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={selected === condition.key ? 'text-white font-bold' : 'text-gray-700'}
                        >
                            {condition.label}
                        </motion.span>
                    </AnimatePresence>
                </button>
            ))}
        </div>
    );
}

export default ConditionToggler;


