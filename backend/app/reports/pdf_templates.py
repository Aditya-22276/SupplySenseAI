from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

from reportlab.platypus import (
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

styles = getSampleStyleSheet()

#colors

PRIMARY = colors.HexColor("#2563EB")
SECONDARY = colors.HexColor("#4F46E5")
SUCCESS = colors.HexColor("#16A34A")
WARNING = colors.HexColor("#D97706")
DANGER = colors.HexColor("#DC2626")

LIGHT = colors.HexColor("#F8FAFC")
LIGHT_BLUE = colors.HexColor("#EFF6FF")
LIGHT_PURPLE = colors.HexColor("#EEF2FF")

TEXT = colors.HexColor("#1E293B")
SUBTEXT = colors.HexColor("#64748B")

# STYLES
title_style = styles["Heading1"]
title_style.fontName = "Helvetica-Bold"
title_style.fontSize = 28
title_style.leading = 32
title_style.alignment = TA_CENTER
title_style.textColor = PRIMARY


heading_style = styles["Heading2"]

heading_style.fontName = "Helvetica-Bold"
heading_style.fontSize = 18
heading_style.leading = 24
heading_style.textColor = SECONDARY


normal_style = styles["BodyText"]

normal_style.fontName = "Helvetica"
normal_style.fontSize = 11
normal_style.leading = 18
normal_style.textColor = TEXT


small_style = styles["BodyText"]

small_style.fontSize = 9
small_style.leading = 14
small_style.textColor = SUBTEXT

# HEADER
def build_header(summary):

    story = []

    story.append(
        Paragraph(
            "SupplySense AI",
            title_style
        )
    )

    story.append(

        Paragraph(

            "AI Powered Supply Chain Analytics Platform",

            heading_style

        )

    )

    story.append(
        Spacer(
            1,
            0.20 * inch
        )
    )

    story.append(

        Paragraph(

            "<b>Executive Business Intelligence Report</b>",

            heading_style

        )

    )

    story.append(
        Spacer(
            1,
            0.25 * inch
        )
    )

    info = [

        ["Generated", summary["generated_at"]],

        ["Prepared By", summary["prepared_by"]],

        ["Version", summary["report_version"]],

        ["Company", summary["company"]]

    ]

    table = Table(

        info,

        colWidths=[
            2.0 * inch,
            4.0 * inch
        ]

    )

    table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0,0),
                (0,-1),
                LIGHT_BLUE
            ),

            (
                "TEXTCOLOR",
                (0,0),
                (-1,-1),
                TEXT
            ),

            (
                "FONTNAME",
                (0,0),
                (0,-1),
                "Helvetica-Bold"
            ),

            (
                "BOTTOMPADDING",
                (0,0),
                (-1,-1),
                10
            ),

            (
                "GRID",
                (0,0),
                (-1,-1),
                0.25,
                colors.grey
            )

        ])

    )

    story.append(table)

    story.append(
        Spacer(
            1,
            0.35 * inch
        )
    )
    

    return story

# ---------------------------------------------------
# KPI DASHBOARD
# ---------------------------------------------------

def build_kpi_cards(summary):

    story = []

    story.append(
        Paragraph(
            "Executive KPI Dashboard",
            heading_style
        )
    )

    story.append(
        Spacer(
            1,
            0.18 * inch
        )
    )

    cards = [

        [
            "Overall Risk Score",
            str(summary["overall_score"]),
            "/100"
        ],

        [
            "Forecast Accuracy",
            summary["forecast_accuracy"],
            ""
        ],

        [
            "Inventory Health",
            summary["inventory_health"],
            ""
        ],

        [
            "Supplier Performance",
            summary["supplier_performance"],
            ""
        ]

    ]

    card_table = Table(
        cards,
        colWidths=[
            2.8 * inch,
            2.0 * inch,
            1.0 * inch
        ]
    )

    card_table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0,0),
                (-1,-1),
                LIGHT_PURPLE
            ),

            (
                "TEXTCOLOR",
                (0,0),
                (-1,-1),
                TEXT
            ),

            (
                "FONTNAME",
                (0,0),
                (0,-1),
                "Helvetica-Bold"
            ),

            (
                "FONTNAME",
                (1,0),
                (1,-1),
                "Helvetica-Bold"
            ),

            (
                "FONTSIZE",
                (1,0),
                (1,-1),
                18
            ),

            (
                "BOTTOMPADDING",
                (0,0),
                (-1,-1),
                18
            ),

            (
                "TOPPADDING",
                (0,0),
                (-1,-1),
                18
            ),

            (
                "GRID",
                (0,0),
                (-1,-1),
                0.5,
                colors.HexColor("#CBD5E1")
            ),

            (
                "BOX",
                (0,0),
                (-1,-1),
                1,
                SECONDARY
            ),

            (
                "BACKGROUND",
                (0,0),
                (-1,0),
                LIGHT_BLUE
            )

        ])

    )

    story.append(card_table)

    story.append(
        Spacer(
            1,
            0.35 * inch
        )
    )

    return story


# ---------------------------------------------------
# RISK INTELLIGENCE
# ---------------------------------------------------

def build_risk_section(summary):

    story = []

    story.append(
        Paragraph(
            "Risk Intelligence",
            heading_style
        )
    )

    story.append(
        Spacer(
            1,
            0.15 * inch
        )
    )

    risk_data = [

        [
            "Risk Type",
            "Current Status"
        ],

        [
            "Inventory Risk",
            summary["inventory_risk"]
        ],

        [
            "Supplier Risk",
            summary["supplier_risk"]
        ],

        [
            "Stockout Risk",
            summary["stockout_risk"]
        ]

    ]

    table = Table(
        risk_data,
        colWidths=[
            3.2 * inch,
            3.0 * inch
        ]
    )

    table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0,0),
                (-1,0),
                PRIMARY
            ),

            (
                "TEXTCOLOR",
                (0,0),
                (-1,0),
                colors.white
            ),

            (
                "FONTNAME",
                (0,0),
                (-1,0),
                "Helvetica-Bold"
            ),

            (
                "BACKGROUND",
                (0,1),
                (-1,-1),
                LIGHT
            ),

            (
                "GRID",
                (0,0),
                (-1,-1),
                0.3,
                colors.grey
            ),

            (
                "BOTTOMPADDING",
                (0,0),
                (-1,-1),
                12
            )

        ])

    )

    story.append(table)

    story.append(
        Spacer(
            1,
            0.35 * inch
        )
    )

    return story

# ---------------------------------------------------
# FORECAST SUMMARY
# ---------------------------------------------------

def build_forecast_section(summary):

    story = []

    story.append(
        Paragraph(
            "Forecast Summary",
            heading_style
        )
    )

    story.append(
        Spacer(
            1,
            0.15 * inch
        )
    )

    for item in summary["forecast_summary"]:

        story.append(

            Paragraph(

                f"• {item}",

                normal_style

            )

        )

    story.append(
        Spacer(
            1,
            0.30 * inch
        )
    )

    return story


# ---------------------------------------------------
# AI RECOMMENDATION
# ---------------------------------------------------

def build_ai_recommendation(summary):

    story = []

    story.append(
        Paragraph(
            "AI Recommendations",
            heading_style
        )
    )

    story.append(
        Spacer(
            1,
            0.15 * inch
        )
    )

    recommendations = []

    for item in summary["recommendations"]:

        recommendations.append(
            Paragraph(
                f"• {item}",
                normal_style
            )
        )

    recommendation_table = Table(
        [[recommendations]],
        colWidths=[6.3 * inch]
    )

    recommendation_table.setStyle(

        TableStyle([

            (
                "BACKGROUND",
                (0,0),
                (-1,-1),
                colors.HexColor("#EFF6FF")
            ),

            (
                "BOX",
                (0,0),
                (-1,-1),
                1,
                PRIMARY
            ),

            (
                "TOPPADDING",
                (0,0),
                (-1,-1),
                15
            ),

            (
                "BOTTOMPADDING",
                (0,0),
                (-1,-1),
                15
            ),

            (
                "LEFTPADDING",
                (0,0),
                (-1,-1),
                15
            ),

            (
                "RIGHTPADDING",
                (0,0),
                (-1,-1),
                15
            )

        ])

    )

    story.append(recommendation_table)

    story.append(
        Spacer(
            1,
            0.30 * inch
        )
    )

    return story


# ---------------------------------------------------
# FOOTER
# ---------------------------------------------------

def build_footer():

    story = []

    story.append(
        Spacer(
            1,
            0.40 * inch
        )
    )

    story.append(

        Paragraph(

            "<font color='#64748B'>"
            "<b>SupplySense AI</b><br/>"
            "AI Powered Supply Chain Analytics Platform<br/>"
            "Confidential Business Report"
            "</font>",

            small_style

        )

    )

    return story


# ---------------------------------------------------
# COMPLETE REPORT
# ---------------------------------------------------

def build_report_story(summary):

    story = []

    story.extend(
        build_header(summary)
    )

    story.extend(
        build_kpi_cards(summary)
    )

    story.extend(
        build_risk_section(summary)
    )

    story.extend(
        build_forecast_section(summary)
    )

    story.extend(
        build_ai_recommendation(summary)
    )

    story.extend(
        build_footer()
    )

    return story