from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.reports.report_generator import (
    generate_pdf_report
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/export")
def export_report():

    report = generate_pdf_report()

    return FileResponse(
        path=report["path"],
        filename=report["filename"],
        media_type="application/pdf"
    )