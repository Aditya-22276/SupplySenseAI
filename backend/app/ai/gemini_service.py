import os
import google.generativeai as genai

from dotenv import load_dotenv

load_dotenv()

dashboard_api_key = os.getenv("GEMINI_API_KEY")
copilot_api_key = os.getenv("GEMINI_COPILOT_KEY")


def generate_supply_chain_insight(prompt):

    try:

        genai.configure(
            api_key=dashboard_api_key
        )

        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        generation_config = genai.types.GenerationConfig(
            temperature=0.3,
            top_p=0.9,
            max_output_tokens=1500,
        )

        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )

        return response.text

    except Exception:

        raise


def generate_copilot_response(prompt):

    try:

        genai.configure(
            api_key=copilot_api_key
        )

        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        generation_config = genai.types.GenerationConfig(
            temperature=0.3,
            top_p=0.9,
            max_output_tokens=1500,
        )

        response = model.generate_content(
            prompt,
            generation_config=generation_config
        )

        return response.text

    except Exception as e:

        print("\n")
        print("=" * 80)
        print("COPILOT ERROR")
        print(e)
        print("=" * 80)
        print("\n")

        error = str(e).lower()

        if (
            "429" in error
            or "quota" in error
            or "resource exhausted" in error
        ):

            return """
⚠️ SupplySense AI Copilot is temporarily unavailable because the AI service has reached its request limit.

Please try again later.

You can continue using:

• Executive Dashboard
• Forecasting
• Risk Intelligence
• Inventory Analytics
• Supplier Analytics
• Business Health Dashboard
"""

        elif (
            "api key" in error
            or "permission" in error
            or "unauthorized" in error
            or "403" in error
        ):

            return """
⚠️ AI service configuration error.

The AI Copilot is temporarily unavailable due to an authentication issue.

Please contact the administrator.
"""

        elif (
            "timeout" in error
            or "connection" in error
            or "network" in error
            or "unreachable" in error
        ):

            return """
⚠️ Unable to connect to the AI service.

Please check your internet connection and try again in a few moments.
"""

        else:

            return """
⚠️ SupplySense AI Copilot is temporarily unavailable.

An unexpected error occurred while generating the response.

Please try again later.
"""