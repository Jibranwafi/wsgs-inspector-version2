"use client";

import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from "react";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas-pro";
import { Square } from "lucide-react";
import { Condition } from "@/components/ConditionToggler";

interface CustomerData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  carBrand: string;
  carModel: string;
  color: string;
  year: string;
  licensePlate: string;
  inspectionDate: Dayjs | null;
  mileage: string;
  mileageUnit: 'km' | 'miles';
}

interface InspectionsData {
  noteSectionsVisible: boolean[];
  uploadedImages: (string | null)[];
  notes: string[];
  conditions: Condition[];
}

interface CarOverviewData {
  uploadedImages: (string | null)[];
}

interface TermsData {
  agreeTerms: boolean;
  signature: string | null;
}

interface PDFDocumentProps {
  customerData: CustomerData;
  inspectionsData: InspectionsData;
  carOverviewData: CarOverviewData;
  termsData: TermsData;
}

export interface PDFDocumentHandle {
  generatePDF: () => Promise<void>;
}

const PDFDocument = forwardRef<PDFDocumentHandle, PDFDocumentProps>(
  ({ customerData, inspectionsData, carOverviewData, termsData }, ref) => {
    const documentRef = useRef<HTMLDivElement>(null);
    const SQUARE_SIZE = 35;
    const [inspectionNumber, setInspectionNumber] = useState<string>('');

    // Helper function to render condition squares
    const renderConditionSquares = (condition: Condition) => {
      if (!condition || typeof condition !== 'string') {
        condition = 'poor';
      }
      
      const normalizedCondition = String(condition).toLowerCase().trim();
      const isGood = normalizedCondition === 'good';
      const isFair = normalizedCondition === 'fair';
      const isPoor = normalizedCondition === 'poor';
      
      return (
        <>
          <Square 
            size={SQUARE_SIZE} 
            fill={isGood ? "black" : "none"} 
            stroke={isGood ? "black" : "#9ca3af"} 
            strokeWidth={isGood ? 2 : 1}
          />
          <Square 
            size={SQUARE_SIZE} 
            fill={isFair ? "black" : "none"} 
            stroke={isFair ? "black" : "#9ca3af"} 
            strokeWidth={isFair ? 2 : 1}
          />
          <Square 
            size={SQUARE_SIZE} 
            fill={isPoor ? "black" : "none"} 
            stroke={isPoor ? "black" : "#9ca3af"} 
            strokeWidth={isPoor ? 2 : 1}
          />
        </>
      );
    };

    // Format date
    const formatDate = (dateString: string | null) => {
      if (!dateString) return 'N/A';
      return dayjs(dateString).format('YYYY-MM-DD');
    };

    // Generate inspection number only on client side to avoid hydration mismatch
    useEffect(() => {
      setInspectionNumber(
        `W-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      );
    }, []);

    // Check if a section contains images
    const sectionHasImages = (sectionId: string): boolean => {
      const imageSections = [
        'car-header-section', // Contains car images grid
        'paint-1-section',
        'windshield-2-section',
        'windows-3-section',
        'paint-4-section',
        'windshield-5-section',
        'wheels-6-section',
        'tires-7-section',
        'signature-section',
      ];
      return imageSections.includes(sectionId);
    };

    // Helper function to get appropriate scale based on section type
    const getSectionScale = (sectionId: string): number => {
      if (sectionHasImages(sectionId)) {
        // Higher scale for image-heavy sections (better image quality)
        return 2.0;
      } else {
        // Lower scale for text-heavy sections (smaller file size, text is still clear)
        return 1.2;
      }
    };

    // Helper function to compress image data
    const compressImage = (canvas: HTMLCanvasElement, useJPEG: boolean = false): string => {
      if (useJPEG) {
        // Use JPEG with quality 0.8 for image-heavy sections (better quality while keeping file size reasonable)
        return canvas.toDataURL('image/jpeg', 0.8);
      } else {
        // Use PNG for text-heavy sections (better quality for text)
        return canvas.toDataURL('image/png');
      }
    };

    // Helper function to draw page number with mixed formatting
    const drawPageNumber = (pdf: jsPDF, pageNum: number, totalPages: number, inspectionNum: string, x: number, y: number) => {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      
      // Draw "PAGE " in normal italic
      pdf.text('PAGE ', x, y);
      const pagePrefixWidth = pdf.getTextWidth('PAGE ');
      let currentX = x + pagePrefixWidth;
      
      // Draw page number in bold italic
      pdf.setFont('helvetica', 'bolditalic');
      const pageNumText = `${pageNum}`;
      pdf.text(pageNumText, currentX, y);
      currentX += pdf.getTextWidth(pageNumText);
      
      // Draw " of " in normal italic
      pdf.setFont('helvetica', 'italic');
      pdf.text(' of ', currentX, y);
      currentX += pdf.getTextWidth(' of ');
      
      // Draw total pages in bold italic
      pdf.setFont('helvetica', 'bolditalic');
      const totalPagesText = `${totalPages}`;
      pdf.text(totalPagesText, currentX, y);
      currentX += pdf.getTextWidth(totalPagesText);
      
      // Draw ".  " + inspection number in normal italic
      pdf.setFont('helvetica', 'italic');
      pdf.text(`.  ${inspectionNum}`, currentX, y);
    };

    const generatePDF = async () => {
      if (!documentRef.current) return;

      try {
        // PDF settings
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Margins and padding
        const margin = 10;
        const paddingBetweenSections = 2;
        const bottomContentPadding = 20;
        const contentWidth = pageWidth - (margin * 2);
        
        // Capture header once to use on all pages
        const headerElement = documentRef.current.querySelector('#page-header') as HTMLElement;
        let headerHeight = 0;
        let headerImgData = '';
        let headerImgWidth = contentWidth;
        
        if (headerElement) {
          const headerCanvas = await html2canvas(headerElement, {
            scale: 1.2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          });
          headerImgWidth = contentWidth;
          headerHeight = (headerCanvas.height * headerImgWidth) / headerCanvas.width;
          headerImgData = compressImage(headerCanvas, false); // PNG for text-heavy header
        }
        
        // Get all sections with IDs in order
        const sectionIds = [
          'customer-info-section',
          'border-after-customer',
          'item-header-section',
          'border-after-item-header',
          'car-info-section',
          'border-after-car-info',
          'item-inspections-header',
          'border-after-inspections-header',
          'article-header-section',
          'border-after-article-header',
          'inspection-items-section',
          'border-after-inspection-items',
          'remarks-section',
          'photograph-notice-section',
          'car-header-section',
          'border-after-car-images',
          'paint-1-section',
          'windshield-2-section',
          'windows-3-section',
          'paint-4-section',
          'windshield-5-section',
          'wheels-6-section',
          'tires-7-section',
          'terms-section',
          'signature-section',
        ];

        const headerStartY = margin;
        const contentStartY = headerStartY + headerHeight;
        
        let currentY = contentStartY;
        let pageNumber = 0;
        let totalPages = 0;
        
        // First pass: calculate total pages
        let testY = contentStartY;
        let testPageNumber = 0;
        for (const sectionId of sectionIds) {
          if (testPageNumber === 0 && (sectionId === 'border-after-photograph-notice' || sectionId === 'car-header-section')) {
            totalPages++;
            testPageNumber++;
            testY = contentStartY;
          }
          
          const section = documentRef.current.querySelector(`#${sectionId}`) as HTMLElement;
          if (!section) continue;
          
          const sectionScale = getSectionScale(sectionId);
          const sectionCanvas = await html2canvas(section, {
            scale: sectionScale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          });
          
          const sectionImgWidth = contentWidth;
          const sectionImgHeight = (sectionCanvas.height * sectionImgWidth) / sectionCanvas.width;
          
          const availableHeight = pageHeight - testY - bottomContentPadding - 10;
          if (sectionImgHeight > availableHeight && testY > contentStartY) {
            totalPages++;
            testPageNumber++;
            testY = contentStartY;
          }
          testY += sectionImgHeight + paddingBetweenSections;
        }
        totalPages++;
        
        // Add header to first page
        if (headerImgData) {
          pdf.addImage(headerImgData, 'PNG', margin, headerStartY, headerImgWidth, headerHeight);
        }
        
        // Second pass: render sections
        for (const sectionId of sectionIds) {
          const section = documentRef.current.querySelector(`#${sectionId}`) as HTMLElement;
          if (!section) continue;
          
          if (pageNumber === 0 && (sectionId === 'border-after-photograph-notice' || sectionId === 'car-header-section')) {
            drawPageNumber(pdf, 1, totalPages, inspectionNumber, margin, pageHeight - 10);
            
            pdf.addPage();
            pageNumber++;
            
            if (headerImgData) {
              pdf.addImage(headerImgData, 'PNG', margin, headerStartY, headerImgWidth, headerHeight);
            }
            
            currentY = contentStartY;
          }
          
          const sectionScale = getSectionScale(sectionId);
          const sectionCanvas = await html2canvas(section, {
            scale: sectionScale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
          });
          
          const sectionImgWidth = contentWidth;
          const sectionImgHeight = (sectionCanvas.height * sectionImgWidth) / sectionCanvas.width;
          
          // Determine if this section should use JPEG (for images) or PNG (for text)
          const useJPEG = sectionHasImages(sectionId);
          const imageData = compressImage(sectionCanvas, useJPEG);
          const imageFormat = useJPEG ? 'JPEG' : 'PNG';
          
          const extraSpacingBeforePhotograph = sectionId === 'photograph-notice-section' ? 10 : 0;
          const reducedSpacingSections = ['item-header-section', 'car-info-section', 'article-header-section'];
          const reducedUpperMarginBorders = ['border-after-article-header', 'border-after-item-header', 'border-after-car-info', 'customer-info-section'];
          const sectionSpacing = (reducedSpacingSections.includes(sectionId) || reducedUpperMarginBorders.includes(sectionId)) ? 0 : paddingBetweenSections;
          
          const availableHeight = pageHeight - currentY - bottomContentPadding - 10 - extraSpacingBeforePhotograph;
          
          if (sectionImgHeight > availableHeight && currentY > contentStartY) {
            const currentPageNum = pageNumber + 1;
            drawPageNumber(pdf, currentPageNum, totalPages, inspectionNumber, margin, pageHeight - 10);
            
            pdf.addPage();
            pageNumber++;
            
            if (headerImgData) {
              pdf.addImage(headerImgData, 'PNG', margin, headerStartY, headerImgWidth, headerHeight);
            }
            
            currentY = contentStartY;
          } else if (currentY > contentStartY) {
            currentY += sectionSpacing;
          }
          
          if (extraSpacingBeforePhotograph > 0) {
            currentY += extraSpacingBeforePhotograph;
          }
          
          pdf.addImage(
            imageData,
            imageFormat,
            margin,
            currentY,
            sectionImgWidth,
            sectionImgHeight
          );
          
          currentY += sectionImgHeight;
        }
        
        const finalPageNum = pageNumber + 1;
        drawPageNumber(pdf, finalPageNum, totalPages, inspectionNumber, margin, pageHeight - 10);

        pdf.save(`Inspection_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    };

    useImperativeHandle(ref, () => ({
      generatePDF,
    }));

    return (
      <div ref={documentRef} className="absolute left-[-9999px] top-0 opacity-0 pointer-events-none flex flex-col p-16 bg-white text-sm" style={{ width: '1400px' }}>
        {/* Header */}
        <div id="page-header" className="flex flex-col">
          <div className="flex flex-row w-full py-5">
            <div className="w-fit flex flex-col justify-center bg-black p-5">
              <img src="/Logo-WS.png" alt="Wrap Station Logo" />
            </div>
            <div className="w-full"></div>
            <div className="w-fit font-bold text-center px-10 py-5 text-3xl border-4 border-black flex flex-col justify-center">
              INSPECTION REPORT
            </div>
          </div>
          <div className="w-full border-y-2 border-black mb-5"></div>
        </div>

        {/* Customer Info Section */}
        <div id="customer-info-section" className="font-bold text-lg">
          <div className="flex flex-row pt-2 pb-6">
            <div className="flex flex-col w-1/8">
              <div>CUSTOMER</div>
              <div>INVOICE #</div>
              <div>INSPECTOR</div>
            </div>
            <div className="flex flex-col w-1/4">
              <div>: {`${customerData.firstName} ${customerData.lastName}`}</div>
              <div>: {inspectionNumber}</div>
              <div>: Inspector Name</div>
            </div>
            <div className="flex flex-col w-1/3">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="flex flex-col w-1/6 text-left">
              <div>INSPECTION #</div>
              <div>DATE</div>
              <div>LOCATION</div>
            </div>
            <div className="flex flex-col w-fit">
              <div>:</div>
              <div>:</div>
              <div>:</div>
            </div>
            <div className="flex flex-col w-1/4 text-right">
              <div>{inspectionNumber}</div>
              <div>{formatDate(customerData.inspectionDate?.format('YYYY-MM-DD') || null)}</div>
              <div>WRAP STATION MEDAN</div>
            </div>
          </div>
        </div>

        <div id="border-after-customer" className="w-full border-y-2 border-black"></div>

        {/* Item Header Section */}
        <div id="item-header-section" className="">
          <div className="flex font-bold py-2 text-2xl">
            <div className="w-1/3 flex justify-start">ITEM</div>
            <div className="w-1/3 flex justify-center">LICENSE PLATE</div>
            <div className="w-1/3 flex justify-end">MILEAGE</div>
          </div>
        </div>

        <div id="border-after-item-header" className="w-full border-y-2 border-black"></div>

        {/* Car Info Section */}
        <div id="car-info-section" className="">
          <div className="flex py-2 text-lg">
            <div className="w-1/3 flex justify-start">
              {`${customerData.carBrand} ${customerData.carModel}`}
            </div>
            <div className="w-1/3 flex justify-center">{customerData.licensePlate}</div>
            <div className="w-1/3 flex justify-end">
              {customerData.mileage} {customerData.mileageUnit.toUpperCase()}
            </div>
          </div>
        </div>

        <div id="border-after-car-info" className="w-full border-y-2 border-black"></div>

        {/* Item Inspections Header */}
        <div id="item-inspections-header" className="">
          <div className="w-full font-bold text-left my-10 text-2xl">
            ITEM INSPECTIONS
          </div>
        </div>

        <div id="border-after-inspections-header" className="w-full border-y-2 border-black"></div>

        {/* Article Header Section */}
        <div id="article-header-section" className="">
          <div className="flex font-bold py-2 text-2xl">
            <div className="w-1/3 flex justify-start">ARTICLE</div>
            <div className="w-1/3 flex justify-center">CONDITIONS</div>
            <div className="w-1/3 flex justify-end">NOTES</div>
          </div>
        </div>

        <div id="border-after-article-header" className="w-full border-y-2 border-black"></div>

        {/* Inspection Items Section */}
        <div id="inspection-items-section" className="">
          <div className="flex flex-col pb-6">
            <div className="flex flex-row py-3">
              <div className="w-1/3 flex justify-start font-bold"></div>
              <div className="w-1/3 flex justify-center gap-14 text-xl">
                <div>G</div>
                <div>F</div>
                <div>P</div>
              </div>
              <div className="w-1/3 flex justify-end"></div>
            </div>
            
            {[
              { name: '1. PAINT', dataIndex: 0 },
              { name: '2. WINDSHIELD', dataIndex: 2 },
              { name: '3. WINDOWS', dataIndex: 1 },
              { name: '4. MIRRORS', dataIndex: 4 },
              { name: '5. REAR WINDOW', dataIndex: 3 },
              { name: '6. TIRES', dataIndex: 6 },
              { name: '7. WHEELS', dataIndex: 5 },
            ].map((item) => {
              const condition = inspectionsData.conditions[item.dataIndex] || 'poor';
              return (
                <div key={item.dataIndex} className="flex flex-row py-3">
                  <div className="w-1/3 flex justify-start font-bold text-xl">{item.name}</div>
                  <div className="w-1/3 flex justify-center gap-8">
                    {renderConditionSquares(condition)}
                  </div>
                  <div className="w-1/3 flex justify-end text-base">
                    {inspectionsData.notes[item.dataIndex] || '-'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div id="border-after-inspection-items" className="w-full border-y-2 border-black"></div>

        {/* Remarks Section */}
        <div id="remarks-section" className="py-5">
          <div className="flex flex-col italic gap-5 text-2xl">
            <div>Remarks:</div>
            <div>G = GOOD = This item is in good condition in performing to standard</div>
            <div>F = FAIR = This item is in fair condition in performing adequately</div>
            <div>P = POOR = This item is in poor condition in performing below standard</div>
          </div>
        </div>

        {/* Photograph Notice Section */}
        <div id="photograph-notice-section" className="mt-32">
          <div className="font-bold text-center py-5 border-4 border-black text-2xl">
            DETAILED PHOTOGRAPH PRESENTED ON THE LATER PAGES
          </div>
        </div>

        <div className="w-full border-y-2 border-black"></div>

        {/* Car Header Section */}
        <div id="car-header-section" className="">
          <div className="font-bold mb-5 text-2xl">CAR</div>
          <div className="w-full border-y-2 border-black"></div>

          {/* Car Images Section - reordered to match document: Front, Back, Side A, Side B */}
          <div className="grid grid-cols-2 my-5 gap-5">
            {[
              { image: carOverviewData.uploadedImages[0], label: 'Front' }, // Front = index 0
              { image: carOverviewData.uploadedImages[1], label: 'Back' }, // Back = index 1
              { image: carOverviewData.uploadedImages[3], label: 'Side A' }, // Side A = index 3
              { image: carOverviewData.uploadedImages[2], label: 'Side B' }, // Side B = index 2
            ].map((item, index) => (
              <div key={index} className="flex justify-center border-2 border-gray-200 pb-4">
                {item.image ? (
                  <img src={item.image} alt={`${item.label} image`} className="w-full max-w-full max-h-64 object-contain" />
                ) : (
                  <div className="py-8 text-gray-400">
                    {item.label} image
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div id="border-after-car-images" className="w-full border-y-2 border-black"></div>

        {/* Inspection Item Images */}
        {[
          { section: '1. PAINT', id: 'paint-1', dataIndex: 0 },
          { section: '2. WINDSHIELD', id: 'windshield-2', dataIndex: 2 },
          { section: '3. WINDOWS', id: 'windows-3', dataIndex: 1 },
          { section: '4. MIRRORS', id: 'paint-4', dataIndex: 4 },
          { section: '5. REAR WINDOW', id: 'windshield-5', dataIndex: 3 },
          { section: '6. TIRES', id: 'wheels-6', dataIndex: 6 },
          { section: '7. WHEELS', id: 'tires-7', dataIndex: 5 },
        ].map((item) => {
          const image = inspectionsData.uploadedImages[item.dataIndex];
          return (
            <div key={item.id} id={`${item.id}-section`}>
              <div className="text-2xl">
                <div className="mb-5 font-bold">{item.section}</div>
              </div>
              <div className="w-full border-y-2 border-black"></div>
              <div className="py-5">
                {image ? (
                  <div className="pb-4 w-fit max-w-full">
                    <img src={image} alt={item.section} className="max-w-full max-h-64 object-contain" />
                  </div>
                ) : (
                  <div className="pb-4 w-fit px-4 py-2 text-gray-400">
                    No image uploaded
                  </div>
                )}
              </div>
              <div className="w-full border-y-2 border-black"></div>
            </div>
          );
        })}

        {/* Terms Section */}
        <div id="terms-section" className="">
          <div className="flex flex-col italic pb-10 text-xl">
            <div className="my-5">TERMS AND CONDITIONS :</div>
            <div className="flex flex-col gap-3">
              {[
                'Kondisi kendaraan dapat berubah setelah pembersihan. Tim akan menginformasikan jika ada perubahan.',
                'Status cat kendaraan (repaint/original) tidak dapat dipastikan, risiko ditanggung pemilik.',
                'Penambahan jarak tempuh (mileage) bisa terjadi, bukan tanggung jawab kami.',
                'Kerusakan/malfungsi mesin selama atau setelah pengerjaan bukan tanggung jawab kami',
                'Kerusakan akibat pembongkaran aksesori oleh pihak lain bukan tanggung jawab kami.',
                'Kehilangan barang pribadi bukan tanggung jawab Wrap Station. Harap kosongkan kendaraaan.',
                'Warp Station berhak melakukan tindakan teknis bila diperlukan dan disetujui sebelumnya.',
                'Kondisi/modifikasi khusus yang tidak diinformasikan menjadi tanggung jawab pemilik.',
                'Penurunan baterai EV adalah kondisi alami, bukan tanggung jawab kami',
                'Estimasi pengerjaan dapat berubah. Keterlambatan akan diinormasikan ke pelanggan.',
              ].map((text, index) => (
                <div key={index} className="flex gap-3">
                  <span className="font-semibold min-w-[2rem] text-right">{index + 1}.</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div id="signature-section" className="">
          <div className="flex justify-center w-full mx-auto my-10">
            <div className="flex flex-col text-center text-xl">
              <div>Customer Signature:</div>
              {termsData.signature ? (
                <div className="my-4">
                  <img src={termsData.signature} alt="Customer Signature" className="max-w-lg max-h-56 object-contain" />
                </div>
              ) : (
                <div className="my-4 text-gray-400">No signature</div>
              )}
              <div>{`${customerData.firstName} ${customerData.lastName}`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PDFDocument.displayName = 'PDFDocument';

export default PDFDocument;

