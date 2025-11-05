import Image from "next/image";
import { Square } from "lucide-react";

export default function document() {
  return (
    <div className="h-[1754px] w-[1240ox] bg-white  text-[16px]">
        <div className="flex flex-col">


            <div className="flex flex-col  p-16">
                <div className=" flex flex-row w-full py-5">
                    <div className=" w-fit flex flex-col justify-center bg-black p-5">
                        <img src="Logo-WS.png"/>
                    </div>
                    <div className="w-full"></div>
                    <div className=" w-fit font-bold text-center px-5 text-3xl border-2 border-black flex flex-col justify-center">INSPECTION REPORT</div>
                </div>
                <div className="w-full border-y-2 border-black"></div>

                <div className=" font-bold">
                    <div className="flex flex-row py-2">
                        <div className="flex flex-col  w-1/5">
                            <div className="">CUSTOMER</div>
                            <div className="">INVOICE #</div>
                            <div className="">INSPECTOR</div>
                        </div>
                        <div className="flex flex-col  w-1/5">
                            <div className="">: customer_name_from_vehicledata</div>
                            <div className="">: number_W1310371038710371</div>
                            <div className="">: insert_inspector_name</div>
                        </div>
                        <div className="flex flex-col  w-1/5">
                            <div className=""></div>
                            <div className=""></div>
                            <div className=""></div>
                        </div>
                        <div className="flex flex-col  w-1/5 text-left">
                            <div className="">INSPECTION #</div>
                            <div className="">DATE</div>
                            <div className="">LOCATION</div>
                        </div>
                        <div className="flex flex-col  w-fit">
                            <div className="">:</div>
                            <div className="">:</div>
                            <div className="">:</div>
                        </div>
                        <div className="flex flex-col  w-1/5 text-right">
                            <div className="">number_W1310371038710371</div>
                            <div className="">date_from_vehicledata</div>
                            <div className="">WARP STATION MEDAN</div>
                        </div>
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="flex font-bold py-2">
                        <div className="w-1/3 flex justify-start">ITEM</div>
                        <div className="w-1/3 flex justify-center">LISCENSE PLATE</div>
                        <div className="w-1/3 flex justify-end">MILEAGE </div>
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="flex py-2">
                        <div className="w-1/3 flex justify-start">car_name_from_vehicledata</div>
                        <div className="w-1/3 flex justify-center">license_plate_from_vehicledata</div>
                        <div className="w-1/3 flex justify-end">mileage_from_vehicledata</div>
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="w-full font-bold text-left my-5">
                        ITEM INSPECTIONS
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="flex font-bold py-2">
                        <div className="w-1/3 flex justify-start">ARTICLE</div>
                        <div className="w-1/3 flex justify-center">CONDITIONS</div>
                        <div className="w-1/3 flex justify-end">NOTES</div>
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="flex flex-col">
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold"></div>
                            <div className="w-1/3  flex justify-center gap-8">
                                <div>G</div>
                                <div>F</div>
                                <div>P</div>
                            </div>
                            <div className="w-1/3  flex justify-end"></div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">1. PAINT</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square/>
                                <Square/>
                                <Square fill="black" stroke="black" />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">2. WINDSHIELD</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square fill="black" stroke="black" />
                                <Square />
                                <Square />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">3. WINDOWS</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square />
                                <Square />
                                <Square />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">4. MIRRORS</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square />
                                <Square />
                                <Square />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">5. REAR WINDOW</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square />
                                <Square />
                                <Square />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">6. TIRES</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square />
                                <Square />
                                <Square />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        <div className="flex flex-row  py-3">
                            <div className="w-1/3  flex justify-start font-bold">7. WHEELS</div>
                            <div className="w-1/3  flex justify-center gap-4">
                                <Square />
                                <Square />
                                <Square />
                            </div>
                            <div className="w-1/3  flex justify-end">notes_from_inspectionspage</div>
                        </div>
                        
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="py-5">
                    <div className="flex flex-col italic gap-3">
                        <div className="">Remarks:</div>
                        <div className="">G = GOOD = This item is in good condition in performing to standard</div>
                        <div className="">F = FAIR = This item is in fair condition in performing adequately</div>
                        <div className="">P = POOR = This item is in poor condition in performing below standard</div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="font-bold text-center p-2 border-2 border-black">DETAILED PHOTOGRAPH PRESENTED ON THE LATER PAGES</div>
                </div>

                <div className="italic">PAGE <b>1 of 5.</b> number_W1310371038710371</div>
            </div>







            <div className="flex flex-col  p-5">
            <div className=" flex flex-row w-full py-5">
                    <div className=" w-fit flex flex-col justify-center bg-black p-5">
                        <img src="Logo-WS.png"/>
                    </div>
                    <div className="w-full"></div>
                    <div className=" w-fit font-bold text-center px-5 text-3xl border-2 border-black flex flex-col justify-center">INSPECTION REPORT</div>
                </div>
                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="font-bold my-5">CAR</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="grid grid-cols-2 my-5 gap-5">
                        <div className=" flex justify-center border-2 border-black ">car_image</div>
                        <div className=" flex justify-center border-2 border-black ">car_image</div>
                        <div className=" flex justify-center border-2 border-black ">car_image</div>
                        <div className=" flex justify-center border-2 border-black ">car_image</div>
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">1. PAINT</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">2. WINDSHIELD</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>


                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">3. WINDOWS</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>

                <div className="italic">PAGE <b>2 of 5.</b> number_W1310371038710371</div>
            </div>







            <div className="flex flex-col  p-5">
            <div className=" flex flex-row w-full py-5">
                    <div className=" w-fit flex flex-col justify-center bg-black p-5">
                        <img src="Logo-WS.png"/>
                    </div>
                    <div className="w-full"></div>
                    <div className=" w-fit font-bold text-center px-5 text-3xl border-2 border-black flex flex-col justify-center">INSPECTION REPORT</div>
                </div>
                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">4. PAINT</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">5. WINDSHIELD</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">6. WINDOWS</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 font-bold">7. MIRRORS</div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="my-5 border-2 border-black w-fit">insert_picture</div>
                </div>

                <div className="italic">PAGE <b>3 of 5.</b> number_W1310371038710371</div>
            </div>







            <div className="flex flex-col  p-5">
                <div className=" flex flex-row w-full py-5">
                    <div className=" w-fit flex flex-col justify-center bg-black p-5">
                        <img src="Logo-WS.png"/>
                    </div>
                    <div className="w-full"></div>
                    <div className=" w-fit font-bold text-center p-2 text-3xl">INSPECTION REPORT</div>
                </div>
                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="flex flex-col italic">
                        <div className="">TERMS AND CONDITIONS :</div>
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
                    </div>
                </div>

                <div className="w-full border-y-2 border-black"></div>

                <div className="">
                    <div className="flex justify-center w-full">
                        <div className="flex flex-col">
                            <div>Customer Signature:</div>
                            <div>insert_signature</div>
                            <div>customer_name</div>
                        </div>
                    </div>
                </div>




                <div className="italic">PAGE <b>4 of 5.</b> number_W1310371038710371</div>
            </div>







            <div className="flex flex-col  p-5">
            <div className=" flex flex-row w-full py-5">
                    <div className=" w-fit flex flex-col justify-center bg-black p-5">
                        <img src="Logo-WS.png"/>
                    </div>
                    <div className="w-full"></div>
                    <div className=" w-fit font-bold text-center px-5 text-3xl border-2 border-black flex flex-col justify-center">INSPECTION REPORT</div>
                </div>

                <div className="italic">PAGE <b>5 of 5.</b> number_W1310371038710371</div>
            </div>

        </div>
    </div>
  );
}
