'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ImageModal({ src, alt, className }: ImageModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={(className ?? '') + ' cursor-zoom-in'}
                onClick={() => setOpen(true)}
            />
            {open && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
                    <img src={src} alt={alt} className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
                    <button
                        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
                        onClick={() => setOpen(false)}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
            )}
        </>
    );
}


