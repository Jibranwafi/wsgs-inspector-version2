'use client';

import { useState } from 'react';
import { StickyNote, X, Image, CarFront } from 'lucide-react';
import ImageModal from './ImageModal';

interface CarOverviewProps {
    data?: {
        uploadedImages: (string | null)[];
    };
    onChange?: (data: {
        uploadedImages: (string | null)[];
    }) => void;
}

export default function CarOverview({ data, onChange }: CarOverviewProps) {
    const defaultData = {
        uploadedImages: Array.from({ length: 4 }, () => null),
    };

    const currentData = data ?? defaultData;
    const uploadedImages = currentData.uploadedImages;

    const updateData = (updates: Partial<typeof currentData>) => {
        if (onChange) {
            onChange({ ...currentData, ...updates });
        }
    };

    const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...uploadedImages];
                newImages[index] = reader.result as string;
                updateData({ uploadedImages: newImages });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...uploadedImages];
        newImages[index] = null;
        updateData({ uploadedImages: newImages });
    };

    const triggerFileInput = (index: number) => {
        const input = document.querySelector(`input[data-index="${index}"]`) as HTMLInputElement;
        if (input) {
            input.click();
        }
    };


    return (
    <>
    
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 rounded-2xl " >
        <div className="md:col-span-2 text-center font-thin md:text-6xl text-4xl md:my-10 my-5 flex items-center justify-center md:gap-5 gap-3">
            <CarFront className="md:w-12 md:h-12 w-10 h-10" />
            Car Overview
        </div>


            <div className="rounded-2xl h-72 bg-white flex md:flex-row flex-col p-3 shadow-lg ">
                <div className="md:w-1/3 md:text-right text-left flex flex-col justify-center p-5 gap-3">
                <div className="text-2xl font-light">Front image</div>
                </div>
                <div className="bg-slate-200 md:w-2/3 w-full md:p-4 p-2 rounded-lg shadow-lg flex-1">
                    <div className="border-2 h-full border-dashed border-gray-400 flex flex-row justify-center rounded-lg relative">
                        {uploadedImages[0] ? (
                            <>
                                <ImageModal src={uploadedImages[0] as string} alt="Front view" className="w-full h-full rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(0)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div 
                                    onClick={() => triggerFileInput(0)} 
                                    className="cursor-pointer flex flex-col items-center justify-center h-full"
                                >
                                    <Image size={46} className='mx-auto text-gray-400'/>
                                    <div className='text-gray-400'>Insert image</div>
                                </div>
                                <input
                                    data-index="0"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(0, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="rounded-2xl h-72 bg-white flex md:flex-row flex-col p-3 shadow-lg ">
                <div className="md:w-1/3 textmd:-right text-left flex flex-col justify-center p-5 gap-3">
                    <div className="text-2xl font-light">Back image</div>
                </div>
                <div className="bg-slate-200 md:w-2/3 w-full md:p-4 p-2 rounded-lg shadow-lg flex-1">
                    <div className="border-2 h-full border-dashed border-gray-400 flex flex-row justify-center rounded-lg relative">
                        {uploadedImages[1] ? (
                            <>
                                <ImageModal src={uploadedImages[1] as string} alt="Front view" className="w-full h-full rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(1)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div 
                                    onClick={() => triggerFileInput(1)} 
                                    className="cursor-pointer flex flex-col items-center justify-center h-full"
                                >
                                    <Image size={46} className='mx-auto text-gray-400'/>
                                    <div className='text-gray-400'>Insert image</div>
                                </div>
                                <input
                                    data-index="1"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(1, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl h-72 bg-white flex md:flex-row flex-col p-3 shadow-lg ">
                <div className="md:w-1/3 textmd:-right text-left flex flex-col justify-center p-5 gap-3">
                    <div className="text-2xl font-light">Side B image</div>
                </div>
                <div className="bg-slate-200 md:w-2/3 w-full md:p-4 p-2 rounded-lg shadow-lg flex-1">
                    <div className="border-2 h-full border-dashed border-gray-400 flex flex-row justify-center rounded-lg relative">
                        {uploadedImages[2] ? (
                            <>
                                <ImageModal src={uploadedImages[2] as string} alt="Front view" className="w-full h-full rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(2)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div 
                                    onClick={() => triggerFileInput(2)} 
                                    className="cursor-pointer flex flex-col items-center justify-center h-full"
                                >
                                    <Image size={46} className='mx-auto text-gray-400'/>
                                    <div className='text-gray-400'>Insert image</div>
                                </div>
                                <input
                                    data-index="2"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(2, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl h-72 bg-white flex md:flex-row flex-col p-3 shadow-lg ">
                <div className="md:w-1/3 textmd:-right text-left flex flex-col justify-center p-5 gap-3">
                    <div className="text-2xl font-light">Side A image</div>
                </div>
                <div className="bg-slate-200 md:w-2/3 w-full md:p-4 p-2 rounded-lg shadow-lg flex-1">
                    <div className="border-2 h-full border-dashed border-gray-400 flex flex-row justify-center rounded-lg relative">
                        {uploadedImages[3] ? (
                            <>
                                <ImageModal src={uploadedImages[3] as string} alt="Front view" className="w-full h-full rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(3)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <div 
                                    onClick={() => triggerFileInput(3)} 
                                    className="cursor-pointer flex flex-col items-center justify-center h-full"
                                >
                                    <Image size={46} className='mx-auto text-gray-400'/>
                                    <div className='text-gray-400'>Insert image</div>
                                </div>
                                <input
                                    data-index="3"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(3, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

        </div>

        
    </>
        );
    }