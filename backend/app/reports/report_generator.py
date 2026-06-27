from pathlib import Path
from datetime import datetime

from reportlab.platypus import SimpleDocTemplate

from app.reports.executive_summary import (
    generate_executive_summary
)

from app.reports.pdf_templates import (
    build_report_story
)

BASE_DIR = Path(__file__).resolve().parent.parent

REPORT_DIR = BASE_DIR / "generated_reports"

REPORT_DIR.mkdir(
    parents=True,
    exist_ok=True
)


def generate_pdf_report():

    summary = generate_executive_summary()

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    filename = (
        f"SupplySense_Report_{timestamp}.pdf"
    )

    pdf_path = REPORT_DIR / filename

    document = SimpleDocTemplate(
        str(pdf_path),
        rightMargin=30,
        leftMargin=30,
        topMargin=35,
        bottomMargin=35
    )

    story = build_report_story(summary)

    document.build(story)

    return {
        "status": "success",
        "filename": filename,
        "path": str(pdf_path)
    }


if __name__ == "__main__":

    result = generate_pdf_report()

    print(result)