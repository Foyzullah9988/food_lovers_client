import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaCopy, FaTag, FaCheck, FaTimes, FaGift, FaUtensils, FaPizzaSlice, FaHamburger } from "react-icons/fa";

export default function Book() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("BITE25");
    setIsCopied(true);
    toast.success("Discount code copied to clipboard! 🎉", {
      duration: 3000,
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });

    // Reset copy state after 3 seconds
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-8 md:py-12 lg:py-16 bg-linear-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/30 px-4 py-2 rounded-full mb-4 border border-amber-200 dark:border-amber-700">
            <FaGift className="text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-amber-700 dark:text-amber-300 font-semibold text-sm">LIMITED TIME OFFER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Best <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Foodie Deals</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Discover exclusive discounts from your favorite local food spots.
            {isMobile ? "Tap the card" : "Hover or click"} to reveal your special offer!
          </p>
        </div>

        {/* Flip Card Container */}
        <div className="flex justify-center items-center mb-8 md:mb-12">
          <div
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-md perspective-1000"
            ref={cardRef}
          >
            {/* Card */}
            <div
              className={`relative w-full  h-[500px] rounded-2xl md:rounded-3xl cursor-pointer transition-all duration-700 ease-out ${isOpen ? "transform rotate-y-180" : ""
                }`}
              onClick={handleToggle}
              onMouseEnter={() => !isMobile && setIsOpen(true)}
              onMouseLeave={() => !isMobile && setIsOpen(false)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleToggle()}
              aria-label="Reveal discount coupon"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side - Closed */}
              <div
                className="absolute inset-0 rounded-2xl md:rounded-3xl bg-linear-to-br from-amber-600 via-amber-500 to-amber-700 shadow-2xl p-6 md:p-8 flex flex-col items-center justify-center backface-hidden overflow-hidden dark:from-base-100 dark:via-base-200 dark:to-base-300"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(0deg)",
                }}
              >
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white"></div>
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white"></div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/40 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/40 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/40 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/40 rounded-br-lg"></div>

                <div className="relative z-10 text-center">
                  <div className="text-5xl sm:text-6xl md:text-7xl mb-4 animate-bounce">
                    🎁
                  </div>

                  <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
                    Secret Deal Inside!
                  </h3>

                  <p className="text-amber-100 text-sm sm:text-base md:text-lg mb-6 max-w-xs mx-auto font-medium">
                    {isMobile ? "Tap to reveal your discount" : "Hover or click to unlock"}
                  </p>

                  {/* Interactive Hint */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-3 h-3 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>

                {/* Floating Food Icons - Bigger */}
                <div className="absolute -top-6 -right-6 w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-white to-amber-100 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-200">
                  <FaHamburger className="text-amber-600 text-2xl sm:text-3xl" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-14 h-14 sm:w-18 sm:h-18 bg-linear-to-br from-white to-red-100 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-200">
                  <FaPizzaSlice className="text-red-600 text-xl sm:text-2xl" />
                </div>
              </div>

              {/* Back Side - Open */}
              <div
                className="absolute inset-0 rounded-2xl md:rounded-3xl bg-linear-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl p-6 md:p-8 flex flex-col justify-center backface-hidden overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Close button for mobile */}
                {isMobile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors z-20"
                    aria-label="Close coupon"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}

                <div className="text-center">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-600 to-amber-500 dark:from-base-200 dark:to-base-300 text-white px-4 py-2 rounded-full mb-1 shadow-lg">
                    <FaTag className="w-4 h-4" />
                    <span className="font-bold text-sm md:text-base">EXCLUSIVE OFFER</span>
                  </div>

                  <h3 className="text-amber-700 dark:text-amber-400 text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                    Discount Unlocked!
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mb-2">
                    Use this code at <span className="font-bold text-amber-700 dark:text-amber-400">Dhaka Street Bites</span> for an amazing deal!
                  </p>

                  {/* Discount Code */}
                  <div className="relative mb-2">
                    <div className="bg-linear-to-r from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 p-4 md:p-6 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-600 shadow-inner">
                      <div className="text-center mb-1">
                        <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm font-medium">YOUR DISCOUNT CODE</span>
                      </div>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-gray-900 dark:text-white font-mono bg-white/50 dark:bg-gray-600/50 py-2 rounded-lg">
                        BITE25
                      </div>
                    </div>
                    <div className="absolute -top-3 -right-3 bg-linear-to-r from-red-500 to-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg">
                      25% OFF
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-1">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-amber-50 dark:bg-gray-700 p-3 rounded-lg">
                      <FaCheck className="text-green-500 dark:text-green-400 shrink-0" />
                      <span className="text-xs md:text-sm">All menu items</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-amber-50 dark:bg-gray-700 p-3 rounded-lg">
                      <FaCheck className="text-green-500 dark:text-green-400 shrink-0" />
                      <span className="text-xs md:text-sm">Online & in-store</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-amber-50 dark:bg-gray-700 p-3 rounded-lg">
                      <FaCheck className="text-green-500 dark:text-green-400 shrink-0" />
                      <span className="text-xs md:text-sm">Expires in 7 days</span>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    className={`w-full py-3 md:py-4 px-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${isCopied
                        ? "bg-linear-to-r from-amber-500 to-amber-600 text-white dark:to-amber-950  dark:from-black"
                        : "bg-linear-to-r from-amber-600 to-amber-700 text-white hover:shadow-xl hover:scale-[1.02] dark:shadow-gray-900/50 dark:from-amber-950  dark:to-black"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode();
                    }}
                  >
                    {isCopied ? (
                      <>
                        <FaCheck className="w-5 h-5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy className="w-5 h-5" />
                        Copy Code to Clipboard
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-linear-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Reveal</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {isMobile ? "Tap the card above" : "Hover or click the card"} to reveal your exclusive discount code
              </p>
            </div>

            <div className="bg-linear-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Copy</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Click the "Copy Code" button to save the discount to your clipboard
              </p>
            </div>

            <div className="bg-linear-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 p-4 md:p-6 rounded-2xl shadow-lg border border-amber-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Enjoy</h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                Use the code at checkout for an instant 25% discount on your order
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
              <span className="font-semibold text-amber-600 dark:text-amber-400">Note:</span> This offer is valid for 7 days only. One use per customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}