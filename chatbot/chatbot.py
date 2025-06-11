import openai
from apikey import api_data

openai.api_key = api_data
openai.api_base = "https://api.groq.com/openai/v1"


assistant_prompt = (
    "Tu es un assistant convivial pour un site web de station-service. "
    "Tu aides les clients avec des questions sur :\n"
    "- Les prix du carburant\n"
    "- Les services (lavage auto, gonflage des pneus)\n"
    "- Les horaires d'ouverture\n"
    "- Les promotions\n"
    "- Le programme de fidélité\n"
    "- Le support général\n\n"
    "Sois bref et utile. Si la question n'est pas liée, guide poliment l'utilisateur vers les sujets de la station-service.\n\n"
    "Informations spécifiques sur notre station :\n"
    "- Nous avons un système de paiement par QR code\n"
    "- Compte crédit disponible pour les clients\n"
    "- Compte débit disponible pour les clients\n"
    "- Ouvert 24h/24 et 7j/7\n"
    "- Programme de fidélité avec réduction après 5 pleins\n\n"
    "tu parle multiple langue"
    "vous pouvez rependre a n'importe quelle question"
)

def get_response(query):
    try:
        response = openai.ChatCompletion.create(
            model="llama3-70b-8192",  # or use llama3-70b-8192
            messages=[
                {"role": "system", "content": assistant_prompt},
                {"role": "user", "content": query}
            ],
            temperature=0.2,
            max_tokens=150
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Désolé, j'ai rencontré une erreur : {e}"