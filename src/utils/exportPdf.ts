import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

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

  for (let i = 0; i < pageElements.length; i++) {
    onProgress?.(i + 1, pageElements.length);

    const canvas = await html2canvas(pageElements[i], {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
  }

  pdf.save('이름표.pdf');
}
