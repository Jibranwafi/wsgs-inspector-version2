"use client";

import { useRef } from "react";
import Image from "next/image";
import { Square, Download } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function document() {
  const documentRef = useRef<HTMLDivElement>(null);
  
  // Default size for Square icons
  const SQUARE_SIZE = 35;

  const downloadPDF = async () => {
    if (!documentRef.current) return;

    try {
      // PDF settings
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Margins and padding
      const margin = 10; // Top and bottom margin in mm
      const paddingBetweenSections = 2; // Small padding between sections on same page in mm
      const bottomContentPadding = 20; // Bottom padding for content in mm
      const contentWidth = pageWidth - (margin * 2);
      
      // Capture header once to use on all pages
      const headerElement = documentRef.current.querySelector('#page-header') as HTMLElement;
      let headerHeight = 0;
      let headerImgData = '';
      let headerImgWidth = contentWidth;
      
      if (headerElement) {
        const headerCanvas = await html2canvas(headerElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        headerImgWidth = contentWidth;
        headerHeight = (headerCanvas.height * headerImgWidth) / headerCanvas.width;
        headerImgData = headerCanvas.toDataURL('image/png');
      }
      
      // Get all sections with IDs in order (including borders)
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
        'border-after-car-header',
        'car-images-section',
        'border-after-car-images',
        'paint-1-section',
        'border-after-paint-1',
        'paint-1-image-section',
        'border-after-paint-1-image',
        'windshield-2-section',
        'border-after-windshield-2',
        'windshield-2-image-section',
        'border-after-windshield-2-image',
        'windows-3-section',
        'border-after-windows-3',
        'windows-3-image-section',
        'border-after-windows-3-image',
        'paint-4-section',
        'border-after-paint-4',
        'paint-4-image-section',
        'border-after-paint-4-image',
        'windshield-5-section',
        'border-after-windshield-5',
        'windshield-5-image-section',
        'border-after-windshield-5-image',
        'wheels-6-section',
        'border-after-wheels-6',
        'wheels-6-image-section',
        'border-after-wheels-6-image',
        'tires-7-section',
        'border-after-tires-7',
        'tires-7-image-section',
        'border-after-tires-7-image',
        'terms-section',
        'border-after-terms',
        'signature-section',
      ];

      // Calculate starting Y position (margin + header height)
      const headerStartY = margin;
      const contentStartY = headerStartY + headerHeight;
      
      let currentY = contentStartY;
      let pageNumber = 0;
      let totalPages = 0;
      
      // First pass: calculate total pages
      let testY = contentStartY;
      let testPageNumber = 0;
      for (const sectionId of sectionIds) {
        // Force page break after photograph-notice-section on first page
        if (testPageNumber === 0 && (sectionId === 'border-after-photograph-notice' || sectionId === 'car-header-section')) {
          totalPages++;
          testPageNumber++;
          testY = contentStartY;
        }
        
        const section = documentRef.current.querySelector(`#${sectionId}`) as HTMLElement;
        if (!section) continue;
        
        const sectionCanvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        
        const sectionImgWidth = contentWidth;
        const sectionImgHeight = (sectionCanvas.height * sectionImgWidth) / sectionCanvas.width;
        
        const availableHeight = pageHeight - testY - bottomContentPadding - 10; // 10mm for footer
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
        
        // Force page break after photograph-notice-section on first page
        if (pageNumber === 0 && (sectionId === 'border-after-photograph-notice' || sectionId === 'car-header-section')) {
          // Add page number to first page
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          pdf.text(`PAGE 1 of ${totalPages}.`, margin, pageHeight - 10);
          
          // Start new page
          pdf.addPage();
          pageNumber++;
          
          // Add header to new page
          if (headerImgData) {
            pdf.addImage(headerImgData, 'PNG', margin, headerStartY, headerImgWidth, headerHeight);
          }
          
          currentY = contentStartY;
        }
        
        // Capture section as canvas
        const sectionCanvas = await html2canvas(section, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        
        const sectionImgWidth = contentWidth;
        const sectionImgHeight = (sectionCanvas.height * sectionImgWidth) / sectionCanvas.width;
        
        // Add extra spacing before photograph-notice-section in PDF
        const extraSpacingBeforePhotograph = sectionId === 'photograph-notice-section' ? 10 : 0; // 10mm extra spacing
        
        // Reduce spacing for specific sections in PDF
        const reducedSpacingSections = ['item-header-section', 'car-info-section', 'article-header-section'];
        // Reduce upper margin for border sections (only before them, not after)
        const reducedUpperMarginBorders = ['border-after-article-header', 'border-after-item-header', 'border-after-car-info', 'customer-info-section'];
        const sectionSpacing = (reducedSpacingSections.includes(sectionId) || reducedUpperMarginBorders.includes(sectionId)) ? 0 : paddingBetweenSections; // 0mm instead of 2mm for these sections
        
        // Check if section fits on current page
        const availableHeight = pageHeight - currentY - bottomContentPadding - 10 - extraSpacingBeforePhotograph; // 10mm for footer
        
        if (sectionImgHeight > availableHeight && currentY > contentStartY) {
          // Add page number to current page
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'italic');
          const currentPageNum = pageNumber + 1;
          pdf.text(`PAGE ${currentPageNum} of ${totalPages}.`, margin, pageHeight - 10);
          
          // Start new page
          pdf.addPage();
          pageNumber++;
          
          // Add header to new page
          if (headerImgData) {
            pdf.addImage(headerImgData, 'PNG', margin, headerStartY, headerImgWidth, headerHeight);
          }
          
          currentY = contentStartY;
        } else if (currentY > contentStartY) {
          // Use reduced spacing for specific sections
          currentY += sectionSpacing;
        }
        
        // Add extra spacing before photograph-notice-section
        if (extraSpacingBeforePhotograph > 0) {
          currentY += extraSpacingBeforePhotograph;
        }
        
        // Add section to PDF
        pdf.addImage(
          sectionCanvas.toDataURL('image/png'),
          'PNG',
          margin,
          currentY,
          sectionImgWidth,
          sectionImgHeight
        );
        
        // Move cursor down
        currentY += sectionImgHeight;
      }
      
      // Add page number to last page
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'italic');
      const finalPageNum = pageNumber + 1;
      pdf.text(`PAGE ${finalPageNum} of ${totalPages}.`, margin, pageHeight - 10);

      // Save the PDF
      pdf.save(`Inspection_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-sm">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
      </div>
      <div ref={documentRef} className="flex flex-col">







            <div className="flex flex-col  p-16">
                <div id="page-header" className="flex flex-col">
                <div className=" flex flex-row w-full py-5">
                    <div className=" w-fit flex flex-col justify-center bg-black p-5">
                        <img src="Logo-WS.png"/>
                    </div>
                    <div className="w-full"></div>
                    <div className=" w-fit font-bold text-center px-10 pb-5 text-3xl border-4 border-black flex flex-col justify-center">INSPECTION REPORT</div>
                </div>
                <div className="w-full border-y-2 border-black"></div> 
                </div>

                <div id="customer-info-section" className=" font-bold text-lg">
                    <div className="flex flex-row pt-2 pb-6">
                        <div className="flex flex-col  w-1/10">
                            <div className="">CUSTOMER</div>
                            <div className="">INVOICE #</div>
                            <div className="">INSPECTOR</div>
                        </div>
                        <div className="flex flex-col  w-1/4">
                            <div className="">: customer_name_from_vehicledata</div>
                            <div className="">: number_W1310371038710371</div>
                            <div className="">: insert_inspector_name</div>
                        </div>
                        <div className="flex flex-col  w-1/3">
                            <div className=""></div>
                            <div className=""></div>
                            <div className=""></div>
                        </div>
                        <div className="flex flex-col  w-1/8 text-left">
                            <div className="">INSPECTION #</div>
                            <div className="">DATE</div>
                            <div className="">LOCATION</div>
                        </div>
                        <div className="flex flex-col  w-fit">
                            <div className="">:</div>
                            <div className="">:</div>
                            <div className="">:</div>
                        </div>
                        <div className="flex flex-col  w-1/4 text-right">
                            <div className="">number_W1310371038710371</div>
                            <div className="">date_from_vehicledata</div>
                            <div className="">WARP STATION MEDAN</div>
                        </div>
                    </div>
                </div>

                <div id="border-after-customer" className="w-full border-y-2 border-black"></div>

                <div id="item-header-section" className="">
                    <div className="flex font-bold pb-5 text-2xl">
                        <div className="w-1/3 flex justify-start">ITEM</div>
                        <div className="w-1/3 flex justify-center">LISCENSE PLATE</div>
                        <div className="w-1/3 flex justify-end">MILEAGE </div>
                    </div>
                </div>

                <div id="border-after-item-header" className="w-full border-y-2 border-black"></div>

                <div id="car-info-section" className="">
                    <div className="flex mb-5 text-lg">
                        <div className="w-1/3 flex justify-start">car_name_from_vehicledata</div>
                        <div className="w-1/3 flex justify-center">license_plate_from_vehicledata</div>
                        <div className="w-1/3 flex justify-end">mileage_from_vehicledata</div>
                    </div>
                </div>

                <div id="border-after-car-info" className="w-full border-y-2 border-black"></div>

                <div id="item-inspections-header" className="">
                    <div className="w-full font-bold text-left my-3 mb-10 text-2xl">
                        ITEM INSPECTIONS
                    </div>
                </div>

                <div id="border-after-inspections-header" className="w-full border-y-2 border-black"></div>

                <div id="article-header-section" className="">
                    <div className="flex font-bold pb-5 text-2xl">
                        <div className="w-1/3 flex justify-start">ARTICLE</div>
                        <div className="w-1/3 flex justify-center">CONDITIONS</div>
                        <div className="w-1/3 flex justify-end">NOTES</div>
                    </div>
                </div>

                <div id="border-after-article-header" className="w-full border-y-2 border-black"></div>

                <div id="inspection-items-section" className="">
                    <div className="flex flex-col pb-6">
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold"></div>
                            <div className="w-1/3  flex justify-center gap-14 text-xl">
                                <div>G</div>
                                <div>F</div>
                                <div>P</div>
                            </div>
                            <div className="w-1/3  flex justify-end"></div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">1. PAINT</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE}/>
                                <Square size={SQUARE_SIZE}/>
                                <Square size={SQUARE_SIZE} fill="black" stroke="black" />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">paintnotes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">2. WINDSHIELD</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE} fill="black" stroke="black" />
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">windshieldnotes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">3. WINDOWS</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">windowsnotes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">4. MIRRORS</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">mirrorsnotes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">5. REAR WINDOW</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">rearwindownotes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">6. TIRES</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">tiresnotes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold text-xl">7. WHEELS</div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                                <Square size={SQUARE_SIZE} />
                            </div>
                            <div className="w-1/3  flex justify-end text-base">wheelsnotes_from_inspectionspage</div>
                        </div>
                        
                    </div>
                </div>

                <div id="border-after-inspection-items" className="w-full border-y-2 border-black"></div>

                <div id="remarks-section" className="py-5">
                    <div className="flex flex-col italic gap-5 text-2xl">
                        <div className="">Remarks:</div>
                        <div className="">G = GOOD = This item is in good condition in performing to standard</div>
                        <div className="">F = FAIR = This item is in fair condition in performing adequately</div>
                        <div className="">P = POOR = This item is in poor condition in performing below standard</div>
                    </div>
                </div>

                <div id="photograph-notice-section" className="mt-32">
                    <div className="font-bold text-center pb-5 border-4  border-black text-2xl">DETAILED PHOTOGRAPH PRESENTED ON THE LATER PAGES</div>
                </div>


                <div className="w-full border-y-2 border-black"></div>

                <div id="car-header-section" className="">
                    <div className="font-bold mb-5 text-xl">CAR</div>
                </div>

                <div id="border-after-car-header" className="w-full border-y-2 border-black"></div>

                <div id="car-images-section" className="">
                    <div className="grid grid-cols-2 my-5 gap-5">
                        <div className=" flex justify-center border-2 border-black pb-4">front_image</div>
                        <div className=" flex justify-center border-2 border-black pb-4">back_image</div>
                        <div className=" flex justify-center border-2 border-black pb-4">SideA_image</div>
                        <div className=" flex justify-center border-2 border-black pb-4">SideB_image</div>
                    </div>
                </div>

                <div id="border-after-car-images" className="w-full border-y-2 border-black"></div>

                <div id="paint-1-section" className="text-xl">
                    <div className="mb-5 font-bold">1. PAINT</div>
                </div>

                <div id="border-after-paint-1" className="w-full border-y-2 border-black"></div>

                <div id="paint-1-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_paintpicture_from_inspectionspage</div>
                </div>

                <div id="border-after-paint-1-image" className="w-full border-y-2 border-black"></div>

                <div id="windshield-2-section" className="text-xl">
                    <div className="mb-5 font-bold">2. WINDSHIELD</div>
                </div>

                <div id="border-after-windshield-2" className="w-full border-y-2 border-black"></div>

                <div id="windshield-2-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_windshieldpicture_from_inspectionspage</div>
                </div>


                <div id="border-after-windshield-2-image" className="w-full border-y-2 border-black"></div>

                <div id="windows-3-section" className="text-xl">
                    <div className="mb-5 font-bold">3. WINDOWS</div>
                </div>

                <div id="border-after-windows-3" className="w-full border-y-2 border-black"></div>

                <div id="windows-3-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_windowspicture_from_inspectionspage</div>
                </div>

                <div id="border-after-windows-3-image" className="w-full border-y-2 border-black"></div>

                <div id="paint-4-section" className="text-xl">
                    <div className="mb-5 font-bold">4. MIRRORS</div>
                </div>

                <div id="border-after-paint-4" className="w-full border-y-2 border-black"></div>

                <div id="paint-4-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_mirrorspicture_from_inspectionspage</div>
                </div>

                <div id="border-after-paint-4-image" className="w-full border-y-2 border-black"></div>

                <div id="windshield-5-section" className="text-xl">
                    <div className="mb-5 font-bold">5. REAR WINDOW</div>
                </div>

                <div id="border-after-windshield-5" className="w-full border-y-2 border-black"></div>

                <div id="windshield-5-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_rearwindowpicture_from_inspectionspage</div>
                </div>

                <div id="border-after-windshield-5-image" className="w-full border-y-2 border-black"></div>

                <div id="wheels-6-section" className="text-xl">
                    <div className="mb-5 font-bold">6. TIRES</div>
                </div>

                <div id="border-after-wheels-6" className="w-full border-y-2 border-black"></div>

                <div id="wheels-6-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_wheelspicture_from_inspectionspage</div>
                </div>

                <div id="border-after-wheels-6-image" className="w-full border-y-2 border-black"></div>

                <div id="tires-7-section" className="text-xl">
                    <div className="mb-5 font-bold">7. WHEELS</div>
                </div>

                <div id="border-after-tires-7" className="w-full border-y-2 border-black"></div>

                <div id="tires-7-image-section" className="py-5">
                    <div className="border-2 border-black pb-4 w-fit">insert_tirespicture_from_inspectionspage</div>
                </div>


                <div id="border-after-tires-7-image" className="w-full border-y-2 border-black"></div>

                <div id="terms-section" className="">
                    <div className="flex flex-col italic pb-10 text-xl">
                        <div className="my-5">TERMS AND CONDITIONS :</div>
                        <div className="flex flex-col gap-3">
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
                    </div>
                </div>

                <div id="border-after-terms" className="w-full border-y-2 border-black"></div>

                <div id="signature-section" className="">
                    <div className="flex justify-center w-full mx-auto">
                        <div className="flex flex-col text-center">
                            <div>Customer Signature:</div>
                            <div>insert_signature</div>
                            <div>customer_name</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
  );
}
