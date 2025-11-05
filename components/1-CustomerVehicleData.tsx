import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import { User, Car } from 'lucide-react';

interface CustomerVehicleDataProps {
    onValidationChange?: (isValid: boolean) => void;
    data?: {
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
    };
    onChange?: (data: {
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
    }) => void;
}

export default function CustomerVehicleData({ onValidationChange, data, onChange }: CustomerVehicleDataProps) {
    const firstName = data?.firstName ?? '';
    const lastName = data?.lastName ?? '';
    const phoneNumber = data?.phoneNumber ?? '';
    const carBrand = data?.carBrand ?? '';
    const carModel = data?.carModel ?? '';
    const color = data?.color ?? '';
    const year = data?.year ?? '';
    const licensePlate = data?.licensePlate ?? '';
    const inspectionDate = data?.inspectionDate ?? null;
    const mileage = data?.mileage ?? '';
    const mileageUnit = data?.mileageUnit ?? 'km';

    const updateField = (field: string, value: any) => {
        if (onChange && data) {
            onChange({ ...data, [field]: value });
        }
    };

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1989 }, (_, i) => {
      const year = currentYear - i;
      return { value: year, label: year.toString() };
    });

    // Validate all fields
    useEffect(() => {
        const isValid = 
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            phoneNumber.trim() !== '' &&
            carBrand.trim() !== '' &&
            carModel.trim() !== '' &&
            color.trim() !== '' &&
            year !== '' &&
            licensePlate.trim() !== '' &&
            inspectionDate !== null &&
            mileage.trim() !== '';
        
        if (onValidationChange) {
            onValidationChange(isValid);
        }
    }, [firstName, lastName, phoneNumber, carBrand, carModel, color, year, licensePlate, inspectionDate, mileage, onValidationChange]);
    
    return (
    <>
        <div className="flex md:flex-row flex-col">
           <div className="flex md:flex-col flex-row md:w-1/4 w-full">
                <div className="mb-4">
                    <User className="md:w-16 md:h-16 w-12 h-12" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-thin md:hidden mb-5 ml-4">
                    Customer data
                </div>
                <div className="text-4xl font-thin md:block hidden">
                    Customer<br></br>data
                </div>
            </div>
            <div className="w-full mx-auto items-center justify-center grid grid-cols-2 gap-6 p-2 ">
            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">First name</div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter customer first name"
                className="bg-white"
                value={firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Last name </div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter customer last name"
                className="bg-white"
                value={lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                />
            </div>

            <div className="flex flex-col  col-span-2 gap-2">
                <div className="font-bold w-full">Phone number</div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="0810-123-123-123"
                className="bg-white"
                value={phoneNumber}
                onChange={(e) => updateField('phoneNumber', e.target.value)}
                />
            </div>
            </div>
        </div>

        <div className="border-t border-gray-200 my-10"></div>
        <div className="flex md:flex-row flex-col">
            <div className="flex md:flex-col flex-row md:w-1/4 w-full">
                <div className="mb-4">
                    <Car className="md:w-16 md:h-16 w-12 h-12" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-thin md:hidden mb-5 ml-4">
                    Vehicle data
                </div>
                <div className="text-4xl font-thin md:block hidden">
                    Vehicle<br></br>data
                </div>
            </div>
            <div className="w-full mx-auto items-center justify-center grid grid-cols-2 gap-6 p-2 ">
            <div className="flex flex-col gap-2 col-span-2">
                <div className="font-bold w-full">Customer car brand</div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="e.g.  Mitsubishi, Honda, Volvo, Holden"
                className="bg-white"
                value={carBrand}
                onChange={(e) => updateField('carBrand', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 col-span-2">
                <div className="font-bold w-full">Customer car model</div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="e.g. S-Model, Corolla, Golf, Defender"
                className="bg-white"
                value={carModel}
                onChange={(e) => updateField('carModel', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Color</div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter color"
                className="bg-white"
                value={color}
                onChange={(e) => updateField('color', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Year</div>
                <TextField
                id="year"
                select
                SelectProps={{ native: true }}
                className="bg-white"
                variant="outlined"
                fullWidth
                value={year}
                onChange={(e) => updateField('year', e.target.value)}
                >
                <option value="">Select year</option>
                {Array.from({ length: new Date().getFullYear() - 1989 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return <option key={year} value={year}>{year}</option>;
                })}
                </TextField>
            </div>


            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">License plate</div>
                <TextField
                variant="outlined"
                fullWidth
                placeholder="XX-XXXX-123"
                className="bg-white"
                value={licensePlate}
                onChange={(e) => updateField('licensePlate', e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Inspection date</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={inspectionDate}
                    onChange={(newValue) => updateField('inspectionDate', newValue)}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        fullWidth: true,
                        placeholder: "Select inspection date"
                      }
                    }}
                    className="bg-white"
                  />
                </LocalizationProvider>
            </div>

            <div className="flex flex-col gap-2 col-span-2">
                <div className="font-bold w-full">Mileage</div>
                <div className="flex gap-2">
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder={`Enter mileage in ${mileageUnit}`}
                        className="bg-white"
                        type="number"
                        value={mileage}
                        onChange={(e) => updateField('mileage', e.target.value)}
                    />
                <ToggleButtonGroup
                    value={mileageUnit}
                    exclusive
                    onChange={(event, newUnit) => {
                        if (newUnit !== null) {
                            updateField('mileageUnit', newUnit);
                        }
                    }}
                    aria-label="mileage unit"
                    sx={{
                        '& .MuiToggleButton-root': {
                            width: '80px',
                            '&.Mui-selected': {
                                backgroundColor: '#b4b4b4',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#b4b4b4',
                                }
                            }
                        }
                    }}
                >
                    <ToggleButton value="km" aria-label="kilometers">
                        KM
                    </ToggleButton>
                    <ToggleButton value="miles" aria-label="miles">
                        Miles
                    </ToggleButton>
                </ToggleButtonGroup>
                </div>
            </div>
            </div>
        </div>
    </>
    );
}