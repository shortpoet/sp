/**
 * Composable for PDF generation functionality
 * Handles timestamp generation and PDF print window opening
 */
export function usePDFGeneration() {
  /**
   * Generate a timestamped PDF filename
   * Format: Carlos_Soriano_Resume_YYYY-MM-DD_HH-mm
   */
  const generateTimestampedFilename = () => {
    const pad = n => String(n).padStart(2, '0');
    const d = new Date();
    const timestamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}_${pad(d.getHours())}-${pad(d.getMinutes())}`;
    
    return `Carlos_Soriano_Resume_${timestamp}`;
  };

  /**
   * Open PDF print window with timestamped filename
   * Uses the /print route with title query parameter
   */
  const openPDFPrint = () => {
    const filename = generateTimestampedFilename();
    const encodedFilename = encodeURIComponent(filename);
    window.open(`/print?print=true&title=${encodedFilename}`, '_blank');
  };

  return {
    generateTimestampedFilename,
    openPDFPrint
  };
}