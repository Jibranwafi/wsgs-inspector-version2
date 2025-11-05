"use client";

import Image from "next/image";


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
}
export default function inspector() {
  return (
    <div className="min-h-screen bg-white p-5">
      <main className="flex flex-col p-5 w-full border-2 border-black">
        <div className="bg-yellow-200">wrapstation logo</div>
        <div className="bg-yellow-200">car inspection page</div>
        <div className="bg-yellow-200 flex flex-row w-fit mx-auto gap-5 p-2">
            <div className="bg-red-200">step 1</div>
            <div className="bg-red-200">step 2</div>
            <div className="bg-red-200">step 3</div>
            <div className="bg-red-200">step 4</div>
        </div>


<div className="border-2 rounded-4xl p-5">
        <div className="flex flex-row">
            <div className="flex flex-col w-1/5">
                <div className="">image</div>
                <div className="text-4xl font-thin">Customer<br></br>data</div>
            </div>
        <div className="w-full mx-auto items-center justify-center grid grid-cols-2 gap-6 p-2 ">

            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Customer first name</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>


            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Customer last name </div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>



            <div className="flex flex-col  col-span-2 gap-2">

            
                <div className="font-bold w-full">Customer phone number</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>
            </div>
        </div>

<div className="border-t border-gray-200 my-10"></div>
        <div className="flex flex-row">
            <div className="flex flex-col w-1/5">
                <div className="">image</div>
                <div className="text-4xl font-thin">Vehicle<br></br>data</div>
            </div>
        <div className="w-full mx-auto items-center justify-center grid grid-cols-2 gap-4 p-2 ">
        

            <div className="flex flex-col gap-2 col-span-2">
                <div className="font-bold w-full">Customer car brand</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>


            <div className="flex flex-col gap-2 col-span-2">
                <div className="font-bold w-full">Customer car model</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>
            



            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Color</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>




            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Year</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>




            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Liscense plate</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>



            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Inspection date</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>



            <div className="flex flex-col gap-2">
                <div className="font-bold w-full">Mileage</div>
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>
            </div>


        </div>
        </div>
        
        <div className="bg-yellow-200">Next & Back button</div>


      </main>






      <main className="bg-white flex flex-col p-5 w-full border-2 border-black">
        <div className="bg-yellow-200">wrapstation logo</div>
        <div className="bg-yellow-200">car inspection page</div>
        <div className="bg-yellow-200">progress bar</div>

        <div className="w-full mx-auto items-center justify-center flex flex-col gap-6">




            <div className="w-full border-2 border-gray-200 flex flex-col rounded-4xl">
                
                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>
            </div>



            <div className="w-full border-2 border-gray-200 flex flex-col rounded-4xl flex flex-col">


                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>


                <div className="border-t mx-5"></div>


                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>


                <div className="border-t mx-5"></div>


                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>



                <div className="border-t mx-5"></div>


                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>
            </div>



            <div className="w-full border-2 border-gray-200 flex flex-col rounded-4xl flex flex-col">

                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>

                <div className="border-t mx-5"></div>

                <div className="py-5 px-2 flex flex-col gap-4"> 
                    <div className="flex flex-row">
                        <div className="bg-gray-200 flex flex-row p-1 w-1/4 rounded-full">
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-red-400">Poor</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-orange-300">Fair</div>
                            <div className="w-1/3 rounded-full text-center flex flex-col justify-center bg-green-400">Good</div>
                        </div>
                        <div className="font-light w-full my-auto mx-3 text-2xl">Paint</div>
                        <div className="border-2 w-fit">add notes</div>
                        <div className="border-2 w-fit">add image</div>
                    </div>
                    <div className="flex flex-row rounded-xl bg-green-200 p-2">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="w-1/2 bg-red-200 p-2 rounded-xl">image</div>
                    </div>
                </div>

                
            </div>

        </div>
        
        <div className="bg-yellow-200">Next & Back button</div>
    </main>








    <main className="bg-white flex flex-col p-5 w-full border-2 border-black">
        <div className="bg-yellow-200">wrapstation logo</div>
        <div className="bg-yellow-200">car inspection page</div>
        <div className="bg-yellow-200">progress bar</div>

        <div className="grid grid-cols-2 gap-4">
            <div className="border-8 border-black rounded-2xl h-36">
                <div className="text-white bg-black w-fit p-4 rounded-tl-lg rounded-br-xl flex flex-row gap-3">
                    <div>aaa</div>
                    <div>image</div>
                </div>
            </div>
            <div className="border-8 border-black rounded-2xl h-36">
                <div className="text-white bg-black w-fit p-4 rounded-tl-lg rounded-br-xl flex flex-row gap-3">
                    <div>aaa</div>
                    <div>image</div>
                </div>
            </div>
            <div className="border-8 border-black rounded-2xl h-36">
                <div className="text-white bg-black w-fit p-4 rounded-tl-lg rounded-br-xl flex flex-row gap-3">
                    <div>aaa</div>
                    <div>image</div>
                </div>
            </div>
            <div className="border-8 border-black rounded-2xl h-36">
                <div className="text-white bg-black w-fit p-4 rounded-tl-lg rounded-br-xl flex flex-row gap-3">
                    <div>aaa</div>
                    <div>image</div>
                </div>
            </div>
            <div className="border-8 border-black rounded-2xl h-36">
                <div className="text-white bg-black w-fit p-4 rounded-tl-lg rounded-br-xl flex flex-row gap-3">
                    <div>aaa</div>
                    <div>image</div>
                </div>
            </div>
        </div>
        
        <div className="bg-yellow-200">Next & Back button</div>
    </main>









    <main className="bg-white flex flex-col p-5 w-full border-2 border-black">
        <div className="bg-yellow-200">wrapstation logo</div>
        <div className="bg-yellow-200">car inspection page</div>
        <div className="bg-yellow-200">progress bar</div>

        <div className="flex flex-col border-2 rounded-4xl p-5 gap-10">
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold">Syarat dan ketentuan - Serah Terima Kendaraan di Wrap Station</div>
                <div className="border-2 border-black p-4 flex flex-col">
                    <div>1. Kondisi kendaraan dapat berubah setelah pembersihan. Tim akan menginformasikan jika ada perubahan.</div>
                    <div>2. Status cat kendaraan (repaint/original) tidak dapat dipastikan, risiko ditanggung pemilik.</div>
                    <div>3. Penambahan jarak tempuh (mileage) bisa terjadi, bukan tanggung jawab kami.</div>
                    <div>4. Kerusakan/malfungsi mesin selama atau setelah pengerjaan bukan tanggung jawab kami</div>
                    <div>5. Kerusakan akibat pembongkaran aksesori oleh pihak lain bukan tanggung jawab kami.</div>
                    <div>6. Kehilangan barang pribadi bukan tanggung jawab Wrap Station. Harap kosongkan kendaraaan.</div>
                    <div>7. Warp Station berhak melakukan tindakan teknis bila diperlukan dan disetujui sebelumnya.</div>
                    <div>8. Kondisi/modifikasi khusus yang tidak diinformasikan menjadi tanggung jawab pemilik.</div>
                    <div>9. Penurunan baterai EV adalah kondisi alami, bukan tanggung jawab kami</div>
                    <div>10. Estimasi pengerjaan dapat berubah. Keterlambatan akan diinormasikan ke pelanggan.</div>
                </div>
                <div className="">checkmark</div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold">Signature</div>
                <div className="border-2 border-black p-4">content</div>
            </div>
        </div>
        
        <div className="bg-yellow-200">Next & Back button</div>
    </main>



    </div>
  );
}
