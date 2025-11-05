
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, X, Image, ClipboardCheck } from 'lucide-react';
import ConditionToggler, { Condition } from './ConditionToggler';
import ImageModal from './ImageModal';

interface InspectionsPageProps {
    data?: {
        noteSectionsVisible: boolean[];
        uploadedImages: (string | null)[];
        notes: string[];
        conditions: Condition[];
    };
    onChange?: (data: {
        noteSectionsVisible: boolean[];
        uploadedImages: (string | null)[];
        notes: string[];
        conditions: Condition[];
    }) => void;
}

export default function InspectionsPage({ data, onChange }: InspectionsPageProps) {
    const noteSectionsVisible = data?.noteSectionsVisible ?? Array.from({ length: 7 }, () => false);
    const uploadedImages = data?.uploadedImages ?? Array.from({ length: 7 }, () => null);
    const notes = data?.notes ?? Array.from({ length: 7 }, () => '');
    const conditions = data?.conditions ?? Array.from({ length: 7 }, () => 'poor' as Condition);
    


    const updateData = (updates: Partial<InspectionsPageProps['data']>) => {
        if (onChange) {
            const currentData = data ?? {
                noteSectionsVisible: Array.from({ length: 7 }, () => false),
                uploadedImages: Array.from({ length: 7 }, () => null),
                notes: Array.from({ length: 7 }, () => ''),
                conditions: Array.from({ length: 7 }, () => 'poor' as Condition),
            };
            onChange({ ...currentData, ...updates });
        }
    };

    const toggleNoteSection = (index: number) => {
        const newVisibility = [...noteSectionsVisible];
        newVisibility[index] = !newVisibility[index];
        updateData({ noteSectionsVisible: newVisibility });
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

    const handleNoteChange = (index: number, value: string) => {
        const newNotes = [...notes];
        newNotes[index] = value;
        updateData({ notes: newNotes });
    };

    const handleConditionChange = (index: number, condition: Condition) => {
        const newConditions = [...conditions];
        newConditions[index] = condition;
        updateData({ conditions: newConditions });
    };
    return (
    <>


<div className='w-full items-center justify-center flex flex-col gap-6'>
<div className='md:text-6xl text-4xl font-thin md:my-5 my-3 mx-auto text-center flex items-center justify-center md:gap-5 gap-3'>
    <ClipboardCheck className="md:w-14 md:h-14 w-10 h-10" />
    Report Inspector
</div>
<div className="w-full flex flex-col md:rounded-4xl rounded-3xl bg-white border-b-4 border-l-4 border-gray-300">
    
<div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Paint</div>
            <ConditionToggler value={conditions[0]} onChange={(condition) => handleConditionChange(0, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Paint</div>
        </div>


            <button
            onClick={() => toggleNoteSection(0)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[0] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[0] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>

        <AnimatePresence>
            {noteSectionsVisible[0] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[0] ? (
                            <>
                                <ImageModal src={uploadedImages[0] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(0)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-0" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-0"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(0, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[0]}
                            onChange={(e) => handleNoteChange(0, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
</div>



<div className="w-full flex flex-col rounded-4xl flex flex-col bg-white border-b-4 border-l-4 border-gray-300">


    <div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Windows</div>
            <ConditionToggler value={conditions[1]} onChange={(condition) => handleConditionChange(1, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Windows</div>
        </div>


            <button
            onClick={() => toggleNoteSection(1)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[1] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[1] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>
        <AnimatePresence>
            {noteSectionsVisible[1] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex md:flex-row flex-col rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full min-h-[120px] p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[1] ? (
                            <>
                                <ImageModal src={uploadedImages[1] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(1)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-1" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-1"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(1, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[1]}
                            onChange={(e) => handleNoteChange(1, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>


    <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-50 pt-1 "></div>


    <div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Windshield</div>
            <ConditionToggler value={conditions[2]} onChange={(condition) => handleConditionChange(2, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Windshield</div>
        </div>


            <button
            onClick={() => toggleNoteSection(2)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[2] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[2] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>
        <AnimatePresence>
            {noteSectionsVisible[2] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full min-h-[120px] p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[2] ? (
                            <>
                                <ImageModal src={uploadedImages[2] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(2)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-2" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-2"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(2, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[2]}
                            onChange={(e) => handleNoteChange(2, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>


    <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-50 pt-1 "></div>


    <div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Rear Window</div>
            <ConditionToggler value={conditions[3]} onChange={(condition) => handleConditionChange(3, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Rear Window</div>
        </div>


            <button
            onClick={() => toggleNoteSection(3)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[3] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[3] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>
        <AnimatePresence>
            {noteSectionsVisible[3] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full min-h-[120px] p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[3] ? (
                            <>
                                <ImageModal src={uploadedImages[3] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(3)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-3" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-3"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(3, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[3]}
                            onChange={(e) => handleNoteChange(3, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>



    <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-50 pt-1 "></div>


    <div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Mirrors</div>
            <ConditionToggler value={conditions[4]} onChange={(condition) => handleConditionChange(4, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Mirrors</div>
        </div>


            <button
            onClick={() => toggleNoteSection(4)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[4] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[4] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>
        <AnimatePresence>
            {noteSectionsVisible[4] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full min-h-[120px] p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[4] ? (
                            <>
                                <ImageModal src={uploadedImages[4] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(4)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-4" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-4"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(4, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[4]}
                            onChange={(e) => handleNoteChange(4, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
</div>



<div className="w-full flex flex-col rounded-4xl flex flex-col bg-white border-b-4 border-l-4 border-gray-300">

    <div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Wheels</div>
            <ConditionToggler value={conditions[5]} onChange={(condition) => handleConditionChange(5, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Wheels</div>
        </div>


            <button
            onClick={() => toggleNoteSection(5)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[5] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[5] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>
        <AnimatePresence>
            {noteSectionsVisible[5] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full min-h-[120px] p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[5] ? (
                            <>
                                <ImageModal src={uploadedImages[5] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(5)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-5" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-5"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(5, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[5]}
                            onChange={(e) => handleNoteChange(5, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>

    <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-50 pt-1 "></div>

    <div className="md:py-5 py-5 px-3 flex flex-col gap-4"> 
    <div className="flex flex-row items-end">
        <div className="flex md:flex-row flex-col">
            <div className="font-light w-full mx-2 mb-2 text-xl md:text-2xl md:hidden pb">Tires</div>
            <ConditionToggler value={conditions[6]} onChange={(condition) => handleConditionChange(6, condition)} />
            <div className="font-light w-full my-auto mx-3 text-xl md:text-2xl hidden md:block">Tires</div>
        </div>


            <button
            onClick={() => toggleNoteSection(6)}
            className={`w-fit md:w-[160px] py-1 md:py-2 pr-4 pl-3 rounded-xl hover:bg-gray-100 transition-colors ml-auto text-white flex items-center justify-center md:gap-1 gap-4 text-left h-fit ${
                noteSectionsVisible[6] ? 'bg-gray-600' : 'bg-slate-400'
            }`}
            type="button"
        >
            {noteSectionsVisible[6] ? (
                <>
                    <X size={24} />
                    <span className="md:ml-2">Cancel</span>
                </>
            ) : (
                <>
                    <StickyNote size={24} />
                    <span className="md:ml-2">Add Note</span>
                </>
            )}
        </button>

        </div>
        <AnimatePresence>
            {noteSectionsVisible[6] && (
                <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                >
                    <div className="flex flex-col md:flex-row rounded-xl bg-gray-200 p-2 gap-3">
                        <div className="md:w-1/2 w-full min-h-[120px] p-2 rounded-xl text-center flex flex-col justify-center items-center border-2 border-dashed border-gray-300 text-gray-400 md:flex-col flex-row gap-2 relative">
                        {uploadedImages[6] ? (
                            <>
                                <ImageModal src={uploadedImages[6] as string} alt="Uploaded" className="w-full h-auto rounded-md object-contain" />
                                <button
                                    onClick={() => removeImage(6)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <>
                                <label htmlFor="image-upload-6" className="cursor-pointer flex md:flex-col flex-row items-center gap-2">
                                    <Image className="md:mx-auto ml-auto md:w-12 md:h-12 w-8 h-8" />
                                    <span className="md:mx-auto mr-auto">Add image button</span>
                                </label>
                                <input
                                    id="image-upload-6"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(6, e)}
                                    className="hidden"
                                />
                            </>
                        )}
                        </div>
                        <textarea
                            placeholder="Add more details..."
                            className="md:w-1/2 w-full px-4 py-2 rounded-md resize-none overflow-auto bg-white"
                            rows={5}
                            wrap="soft"
                            value={notes[6]}
                            onChange={(e) => handleNoteChange(6, e.target.value)}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>

    
</div>

</div>

    
    </>
    );
}