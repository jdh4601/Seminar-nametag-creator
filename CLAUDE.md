1.	Input

	•	User uploads an .xlsx file.
	•	The file contains a column named “이름”.
	•	Extract all rows in that column.

	2.	Name Tag Template
Each name tag must:

	•	Size: 282px width × 376px height
	•	Portrait orientation
	•	Background: use provided chain design (color variants supported)
	•	Top text:
	•	“D.ONE SEMINAR”
	•	“MEET ONE”
	•	Center white rounded rectangle
	•	Participant name centered inside
	•	Bold black font
	•	Auto-scale font size depending on character length
	•	Ensure Korean characters render properly

	3.	A4 Layout Engine

Create a printable A4 layout:
	•	Paper size: A4 (210mm × 297mm)
	•	Portrait orientation
	•	3 columns × 3 rows per page (9 tags per page)
	•	Center the grid on the page
	•	Equal spacing between tags
	•	Add optional crop marks
	•	Maintain print-safe margins (minimum 10mm outer margin)

	4.	Scaling Rules

If exact pixel-to-mm conversion is needed:
	•	1mm ≈ 3.78px (at 96dpi)
	•	Ensure name tags print at real size, not scaled by browser
	•	Use CSS print styles with:
@page { size: A4; margin: 10mm; }

	5.	Export Options

Provide:
	•	Print-ready view (window.print())
	•	Download as single PDF
	•	Auto-paginate if names exceed 9 per page

	6.	Technical Stack

Use:
	•	React
	•	SheetJS (xlsx) to parse Excel
	•	CSS Grid for 3x3 layout
	•	jsPDF for PDF export
	•	Ensure no scaling distortion during print
