// File: 4-TermsAndConditions.tsx

'use client';

import { useRef, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FileText } from 'lucide-react';

interface TermsAndConditionsProps {
    data?: {
        agreeTerms: boolean;
        signature: string | null;
    };
    onChange?: (data: {
        agreeTerms: boolean;
        signature: string | null;
    }) => void;
}

export default function TermsAndConditions({ data, onChange }: TermsAndConditionsProps) {
    const defaultData = {
        agreeTerms: false,
        signature: null as string | null,
    };

    const currentData = data ?? defaultData;
    const agreeTerms = currentData.agreeTerms;
    const signature = currentData.signature;

    const sigCanvasRef = useRef<SignatureCanvas>(null);

    const updateData = (updates: Partial<typeof currentData>) => {
        if (onChange) {
            onChange({ ...currentData, ...updates });
        }
    };

    const handleAgreeTermsChange = (checked: boolean) => {
        updateData({ agreeTerms: checked });
    };

    const handleSignatureEnd = () => {
        if (sigCanvasRef.current) {
            const isEmpty = sigCanvasRef.current.isEmpty();
            if (!isEmpty) {
                const dataURL = sigCanvasRef.current.toDataURL();
                updateData({ signature: dataURL });
            } else {
                updateData({ signature: null });
            }
        }
    };

    const handleClearSignature = () => {
        if (sigCanvasRef.current) {
            sigCanvasRef.current.clear();
            updateData({ signature: null });
        }
    };

    // Load signature if it exists when component mounts or signature changes
    useEffect(() => {
        if (signature && sigCanvasRef.current) {
            const img = new Image();
            img.src = signature;
            img.onload = () => {
                if (sigCanvasRef.current) {
                    sigCanvasRef.current.clear();
                    const ctx = sigCanvasRef.current.getCanvas().getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0);
                    }
                }
            };
        } else if (!signature && sigCanvasRef.current) {
            sigCanvasRef.current.clear();
        }
    }, [signature]);

    return (
    <>
            <div className="flex flex-col rounded-4xl gap-10 ">
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold flex items-center gap-4 px-2 md:mt-10 mt-5">
                    <FileText className="md:w-14 md:h-14 w-12 h-12" />
                    <div className='flex flex-col'>
                        <div className='text-3xl font-bold'>Syarat dan ketentuan</div>
                        <div className='text-lg font-bold'>Serah Terima Kendaraan di Wrap Station</div>
                    </div>
                </div>
                <div className="py-10 flex flex-col gap-3">
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">1.</span>
                        <span>Kondisi kendaraan dapat berubah setelah pembersihan. Tim akan menginformasikan jika ada perubahan.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">2.</span>
                        <span>Status cat kendaraan (repaint/original) tidak dapat dipastikan, risiko ditanggung pemilik.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">3.</span>
                        <span>Penambahan jarak tempuh (mileage) bisa terjadi, bukan tanggung jawab kami.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">4.</span>
                        <span>Kerusakan/malfungsi mesin selama atau setelah pengerjaan bukan tanggung jawab kami</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">5.</span>
                        <span>Kerusakan akibat pembongkaran aksesori oleh pihak lain bukan tanggung jawab kami.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">6.</span>
                        <span>Kehilangan barang pribadi bukan tanggung jawab Wrap Station. Harap kosongkan kendaraaan.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">7.</span>
                        <span>Warp Station berhak melakukan tindakan teknis bila diperlukan dan disetujui sebelumnya.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">8.</span>
                        <span>Kondisi/modifikasi khusus yang tidak diinformasikan menjadi tanggung jawab pemilik.</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">9.</span>
                        <span>Penurunan baterai EV adalah kondisi alami, bukan tanggung jawab kami</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="font-semibold min-w-[2rem] text-right">10.</span>
                        <span>Estimasi pengerjaan dapat berubah. Keterlambatan akan diinormasikan ke pelanggan.</span>
                    </div>
                </div>
                
                {/* START: Penambahan Checkbox Syarat & Ketentuan */}
                <div className="flex items-center mt-4">
                    <input 
                        id="agreeTerms" 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={agreeTerms}
                        onChange={(e) => handleAgreeTermsChange(e.target.checked)}
                    />
                    <label 
                        htmlFor="agreeTerms" 
                        className="ml-2 text-md font-semibold text-gray-900 cursor-pointer"
                    >
                        Dengan ini saya menyatakan telah membaca, memahami, dan menyetujui seluruh poin dalam Syarat & Ketentuan yang berlaku
                    </label>
                </div>
                {/* END: Penambahan Checkbox Syarat & Ketentuan */}
                
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold">Signature</div>
                <div className="flex flex-col gap-2">
                    <div className="bg-white border-2 border-gray-300 shadow-lg w-[300px] h-[210px] rounded relative overflow-hidden">
                        <SignatureCanvas
                            ref={sigCanvasRef}
                            penColor="black"
                            backgroundColor="white"
                            canvasProps={{
                                width: 300,
                                height: 210,
                                className: 'sigCanvas w-full h-full'
                            }}
                            onEnd={handleSignatureEnd}
                        />
                    </div>
                    <button
                        onClick={handleClearSignature}
                        className="w-[300px] px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition-colors text-sm font-medium"
                        type="button"
                    >
                        Clear Signature
                    </button>
                </div>
            </div>
        </div>
    </>
    );
}