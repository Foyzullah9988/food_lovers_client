import { useState } from "react";

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative w-[220px] h-[300px] rounded-xl bg-white shadow-lg flex items-center justify-center text-black [perspective:2000px]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Book content */}
      <p className="font-bold text-xl z-0">Hello</p>

      {/* Cover */}
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-xl bg-[#957C62] shadow-lg flex items-center justify-center cursor-pointer
                    [transform-style:preserve-3d] origin-left transition-transform duration-500
                    ${isOpen ? "[transform:rotateY(-80deg)]" : "[transform:rotateY(0deg)]"}`}
      >
        <p className="font-bold text-xl">Hover Me</p>
      </div>
    </div>
  );
}
