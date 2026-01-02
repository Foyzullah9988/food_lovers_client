import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);

  // Detect mobile device for better interaction
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle click outside to close (for mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col mt-10 justify-center items-center px-4">
      <h2 className="text-[#5E6D63] text-2xl md:text-4xl font-bold mb-2 text-center">
        Best Deals For Foodies
      </h2>
      <p className="text-gray-600 text-sm md:text-base mb-6 text-center max-w-2xl">
        Discover exclusive discounts from your favorite local food spots. 
        Tap or hover the card to reveal your special offer!
      </p>

      <div className="relative group" ref={cardRef}>
        

        <div
          className="relative w-[280px] md:w-[320px] h-[360px] rounded-2xl bg-white shadow-xl flex items-center justify-center text-black 
          perspective-2000px cursor-pointer"
          onClick={handleToggle}
          onMouseEnter={() => !isMobile && setIsOpen(true)}
          onMouseLeave={() => !isMobile && setIsOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleToggle()}
          aria-label="Reveal discount coupon"
        >
          {/* Back side - Discount coupon */}
          <div
            className={`absolute inset-0 rounded-2xl bg-linear-to-br from-[#fff8e1] to-[#ffecb3] shadow-lg p-6 flex flex-col justify-center transition-all duration-300
              ${isOpen ? "opacity-100 z-20" : "opacity-0 z-0"}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="text-center">
              {/* Close button for mobile */}
              {isMobile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  aria-label="Close coupon"
                >
                  ✕
                </button>
              )}

              <div className="bg-linear-to-r from-[#d32f2f] to-[#f44336] text-white py-1 px-4 rounded-full inline-block mb-4">
                <span className="text-sm font-semibold">EXCLUSIVE OFFER</span>
              </div>

              <h3 className="text-[#d32f2f] text-xl font-bold mb-3 mt-8">
                🎉 Secret Discount Unlocked!
              </h3>

              <p className="text-gray-700 mb-4">
                Use this code at <strong className="text-[#d32f2f]">Dhaka Street Bites</strong> for an amazing deal!
              </p>

              {/* Discount code with copy functionality */}
              <div className="relative mb-6">
                <div className="bg-linear-to-r from-[#ffe082] to-[#ffd54f] p-4 rounded-xl shadow-md">
                  <div className="text-center mb-2">
                    <span className="text-sm text-gray-600">DISCOUNT CODE</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold tracking-[4px] text-gray-900 font-mono">
                    BITE25
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                  25% OFF
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Valid for all menu items</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Online & in-store orders</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm">Expires in 7 days</span>
                </div>
              </div>

              <button
                className="mt-6 bg-linear-to-r from-[#d32f2f] to-[#f44336] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity w-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText("BITE25");
                  toast.success("Discount code copied to clipboard!");
                }}
              >
                Copy Code to Clipboard
              </button>
            </div>
          </div>

          {/* Front side - Closed state */}
          <div
            className={`absolute inset-0 rounded-2xl bg-linear-to-br from-[#957C62] to-[#7a6451] shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-500
              ${isOpen ? "opacity-0" : "opacity-100 z-10"}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30"></div>

            <div className="text-center">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-white text-2xl font-bold mb-2">
                Exclusive Deal Inside
              </h3>
              <p className="text-white/80 mb-6 max-w-[200px] mx-auto text-center">
                Tap or hover to reveal your special discount
              </p>

              {/* Progress indicator */}
              <div className="flex justify-center gap-1 mb-6">
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
              </div>

              {/* Hint for interaction */}
              <div className="animate-pulse">
                <div className="text-white/60 text-sm">
                  {isMobile ? "Tap here 👇" : "Hover over me"}
                </div>
              </div>
            </div>
          </div>

          {/* Floating food icons */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg">
            🍔
          </div>
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
            🍕
          </div>
        </div>
      </div>

      {/* Usage instructions */}
      <div className="mt-8 text-center max-w-lg">
        <h4 className="text-gray-700 font-semibold mb-2">How to Use:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-bold text-[#d32f2f] mb-1">1. Reveal</div>
            <p>Tap or hover the card above</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-bold text-[#d32f2f] mb-1">2. Copy</div>
            <p>Click "Copy Code" button</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-bold text-[#d32f2f] mb-1">3. Enjoy</div>
            <p>Use at checkout for discount</p>
          </div>
        </div>
      </div>
    </div>
  );
}