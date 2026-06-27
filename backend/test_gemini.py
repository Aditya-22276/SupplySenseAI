from app.ai.gemini_service import (
    generate_supply_chain_insight
)

response = generate_supply_chain_insight(
    "Give me one supply chain recommendation."
)

print(response)