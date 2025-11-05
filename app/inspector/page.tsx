"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Dayjs } from 'dayjs';
import { Condition } from "@/components/ConditionToggler";
import CustomerVehicleData from "@/components/1-CustomerVehicleData";
import InspectionsPage from "@/components/2-InspectionsPage";
import CarOverview from "@/components/3-CarOverview";
import TermsAndConditions from "@/components/4-TermsAndConditions";
import ProgressBar from "@/components/ProgressBar";
import NavigationButtons from "@/components/NavigationButtons";
import PDFDocument, { type PDFDocumentHandle } from "@/components/PDFDocument";

export default function Inspector() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [isFormValid, setIsFormValid] = useState(true);
  const [showError, setShowError] = useState(false);
  const pdfDocumentRef = useRef<PDFDocumentHandle>(null);

  // Customer Vehicle Data State
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    carBrand: '',
    carModel: '',
    color: '',
    year: '',
    licensePlate: '',
    inspectionDate: null as Dayjs | null,
    mileage: '',
    mileageUnit: 'km' as 'km' | 'miles',
  });

  // Inspections Page State
  const [inspectionsData, setInspectionsData] = useState({
    noteSectionsVisible: Array.from({ length: 7 }, () => false) as boolean[],
    uploadedImages: Array.from({ length: 7 }, () => null) as (string | null)[],
    notes: Array.from({ length: 7 }, () => '') as string[],
    conditions: Array.from({ length: 7 }, () => 'poor' as Condition) as Condition[],
  });

  // Car Overview State
  const [carOverviewData, setCarOverviewData] = useState({
    uploadedImages: Array.from({ length: 4 }, () => null) as (string | null)[],
  });

  // Terms and Conditions State
  const [termsData, setTermsData] = useState({
    agreeTerms: false,
    signature: null as string | null,
  });

  const handleNext = () => {
    if (currentStep === 1 && !isFormValid) {
      setShowError(true);
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowError(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowError(false);
    }
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
    if (isValid) {
      setShowError(false);
    }
  };

  const handleDownload = async () => {
    if (currentStep === totalSteps && termsData.agreeTerms) {
      try {
        // Generate PDF using the PDFDocument component
        await pdfDocumentRef.current?.generatePDF();
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentStep) {
      case 1:
        return (
          <CustomerVehicleData 
            onValidationChange={handleValidationChange}
            data={customerData}
            onChange={setCustomerData}
          />
        );
      case 2:
        return (
          <InspectionsPage 
            data={inspectionsData}
            onChange={setInspectionsData}
          />
        );
      case 3:
        return (
          <CarOverview 
            data={carOverviewData}
            onChange={setCarOverviewData}
          />
        );
      case 4:
        return (
          <TermsAndConditions 
            data={termsData}
            onChange={setTermsData}
          />
        );
      default:
        return (
          <CustomerVehicleData 
            onValidationChange={handleValidationChange}
            data={customerData}
            onChange={setCustomerData}
          />
        );
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundImage: "url('automotive-june-reopening.jpg')" }}
    >
      {/* Hidden PDF Document Component */}
      <PDFDocument
        ref={pdfDocumentRef}
        customerData={customerData}
        inspectionsData={inspectionsData}
        carOverviewData={carOverviewData}
        termsData={termsData}
      />

      <main className="flex flex-col">
        <div className="bg-gradient-to-b from-black via-black to-transparent flex items-center pt-10 pb-20 justify-center relative">
            <div className="flex items-center gap-4">
                <div className="md:w-[400px] w-[200px] flex justify-end">
                    <img src="/Logo-WS.png" alt="Wrapstation Logo" width={400} height={400} className="" />
                </div>
                <div className="border-r border-white md:mx-5 mx-2 md:h-[100px] h-[50px]" style={{ width: '1px' }}></div>
                <div className="md:w-[400px] w-[200px] flex justify-start">
                    <span className=" md:text-3xl text-xl text-white font-bold italic condensed">Car Inspection Page</span>
                </div>
            </div>
        </div>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <div className="md:p-5 p-3">
            <div className="border-2 border-white rounded-3xl bg-white/75 w-full md:p-10 p-3">
            {renderCurrentPage()}
            {showError && currentStep === 1 && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                Please fill out the entire form
              </div>
            )}
            <div className="border-y border-gray-300 mt-15 mb-10"></div>
            <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={currentStep === totalSteps ? handleDownload : handleNext}
          onPrevious={handlePrevious}
          isFormValid={currentStep === 1 ? isFormValid : currentStep === totalSteps ? termsData.agreeTerms : true}
        />
            </div>
        </div>
      </main>
    </div>
  );
}