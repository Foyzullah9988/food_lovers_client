import { useState } from "react";

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" flex flex-col mt-10 justify-center items-center">
      <h2 className="text-[#5E6D63] text-4xl font-bold mb-2 text-center">Best Deals For Foodies</h2>
      <div
        className="relative w-[250px] mt-5 h-[300px] rounded-xl bg-white shadow-lg flex items-center justify-center text-black [perspective:2000px]"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >

        <div className="bg-[#fff8e1] border-2 border-dashed border-[#d32f2f]/40 p-4  rounded-lg max-w-[220px] mx-auto text-center font-sans">
          <h3 className="text-[#d32f2f] font-semibold mb-2">🍛 Secret Discount for You!</h3>
          <p className="text-sm mb-3">
            Use this special code at <strong>Dhaka Street Bites</strong> to get a tasty deal.
          </p>

          <div className="bg-[#ffe082] p-2 rounded-md text-[18px] tracking-[2px] text-[#212121] font-semibold mb-3">
            CODE: BITE25
          </div>

          <p className="text-xs text-[#555]">
            Show this code at our stall or use it while ordering online to get{" "}
            <strong>25% off</strong> your meal. 🍲
          </p>
        </div>


        <div
          className={`absolute top-0 left-0 w-full h-full rounded-xl bg-[#957C62] shadow-lg flex items-center justify-center cursor-pointer
                    [transform-style:preserve-3d] origin-left transition-transform duration-500
                    ${isOpen ? "[transform:rotateY(-80deg)]" : "[transform:rotateY(0deg)]"}`}
        >
          <p className="font-bold text-xl text-white">Secret Code</p>
        </div>
      </div>
    </div>
  );
}
