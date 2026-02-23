import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Convert CSS mm → px at 96dpi (browser reference)
const PX_PER_MM = 96 / 25.4; // ≈ 3.7795

// Target print DPI for high quality output
const TARGET_DPI = 300;

function calcCanvasScale() {
  // CSS pixels of the A4 page in the DOM
  const pageWidthPx = A4_WIDTH_MM * PX_PER_MM;
  // Desired pixels for 300dpi PDF width: inches = mm / 25.4
  const targetWidthPx = (A4_WIDTH_MM / 25.4) * TARGET_DPI; // ≈ 2480px
  // html2canvas scale multiplies CSS pixels
  const scale = targetWidthPx / pageWidthPx; // ≈ 3.125
  // Guard rails: extremely large scale may cause memory issues
  return Math.min(Math.max(scale, 2), 4); // clamp between 2x and 4x
}

export async function exportToPdf(onProgress?: (page: number, total: number) => void): Promise<void> {
  const pageElements = document.querySelectorAll<HTMLElement>('[data-page]');

  if (pageElements.length === 0) {
    throw new Error('내보낼 페이지가 없습니다.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const scale = calcCanvasScale();

  for (let i = 0; i < pageElements.length; i++) {
    onProgress?.(i + 1, pageElements.length);

    const canvas = await html2canvas(pageElements[i], {
      scale,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    if (i > 0) {
      pdf.addPage();
    }

    // Ensure PDF page base is solid white (avoid viewer black bg on transparency)
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, 'F');
    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
  }

  pdf.save('이름표.pdf');
}
