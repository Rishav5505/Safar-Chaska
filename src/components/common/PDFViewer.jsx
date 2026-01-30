import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, FileText, AlertCircle } from 'lucide-react';

const PDFViewer = ({ pdfUrl, title, onClose }) => {
    const [zoom, setZoom] = useState(100);
    const [pdfError, setPdfError] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = `${title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <div className="flex items-center gap-3">
                        {!pdfError && (
                            <>
                                <button
                                    onClick={() => setZoom(Math.max(50, zoom - 10))}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-5 h-5 text-gray-600" />
                                </button>
                                <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">
                                    {zoom}%
                                </span>
                                <button
                                    onClick={() => setZoom(Math.min(200, zoom + 10))}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-5 h-5 text-gray-600" />
                                </button>
                            </>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* PDF Viewer or Error Message */}
                <div className="flex-1 overflow-auto bg-gray-100 p-4">
                    {pdfError ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-center max-w-md">
                                <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">PDF Not Available</h3>
                                <p className="text-gray-600 mb-6">
                                    The brochure PDF for this package is currently being prepared.
                                    Please contact us for detailed information or book directly.
                                </p>
                                <div className="space-y-3">
                                    <p className="text-sm text-gray-500">
                                        <strong>To add PDF:</strong> Place your PDF file at:
                                    </p>
                                    <code className="block bg-gray-800 text-green-400 p-3 rounded-lg text-xs">
                                        public/brochures/{pdfUrl.split('/').pop()}
                                    </code>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <iframe
                                src={pdfUrl}
                                className="w-full h-full min-h-[800px] bg-white rounded-lg shadow-lg"
                                title={title}
                                onError={() => setPdfError(true)}
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PDFViewer;
