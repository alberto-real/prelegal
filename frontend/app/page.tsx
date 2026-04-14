"use client";

import { useState, useRef } from "react";
import { NdaFormData, getDefaultFormData } from "@/lib/nda-types";
import NdaForm from "@/components/NdaForm";
import NdaPreview from "@/components/NdaPreview";

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(getDefaultFormData);
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!previewRef.current || downloading) return;
    setDownloading(true);
    try {
      const mod = await import("html2pdf.js");
      const html2pdf = mod.default ?? mod;
      html2pdf(previewRef.current, {
        margin: [10, 10, 10, 10],
        filename: "Mutual-NDA.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).then(() => {
        setDownloading(false);
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div>
            <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
              Mutual NDA Creator
            </h1>
            <p className="text-xs text-gray-500 hidden sm:block">
              Fill in the form to generate your Mutual Non-Disclosure Agreement
            </p>
          </div>
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm
              font-medium text-white transition-colors hover:bg-blue-700
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
              <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
            </svg>
            {downloading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </header>

      {/* Main content: stacked on mobile, side-by-side on desktop */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Form panel */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-6 lg:h-[calc(100vh-65px)]">
          <div className="max-w-lg mx-auto">
            <NdaForm data={formData} onChange={setFormData} />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gray-200" />

        {/* Preview panel */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:h-[calc(100vh-65px)]">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <NdaPreview data={formData} ref={previewRef} />
          </div>
        </div>
      </main>
    </div>
  );
}
