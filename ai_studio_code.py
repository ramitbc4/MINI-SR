from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random # Sample prediction ko lagi

# App suru garne
app = FastAPI()

# Frontend bata request auna milne banauna ko lagi (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Sabai origin lai allow garne
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# User bata aaune data ko model
class UserInput(BaseModel):
    dob: str # Date of Birth (e.g., "1995-10-25")
    place: str

# Home route
@app.get("/")
def read_root():
    return {"message": "SEE YOUR FUTURE - Backend API"}

# Astrology prediction ko API endpoint
@app.post("/predict/astrology")
def get_astrology_prediction(user_input: UserInput):
    """
    Yo function le user ko DOB ra place lincha ra ek sample prediction dincha.
    Real app ma, yaha AstroSage jasto API call huncha.
    """
    print(f"Received data: DOB={user_input.dob}, Place={user_input.place}")

    rashis = ["Mesh (Aries)", "Brish (Taurus)", "Mithun (Gemini)", "Karkat (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Brishchik (Scorpio)", "Dhanu (Sagittarius)", "Makar (Capricorn)", "Kumbha (Aquarius)", "Meen (Pisces)"]
    
    # Simple logic to generate a random Rashi for demo
    random_rashi = random.choice(rashis)

    # Sample predictions
    career_predictions = [
        "aagami 6 mahina ma career ma naya abasar aaune sambhawana chha.",
        "tapaiko kaam ma focus badhaunus, promotion ko yog chha.",
        "kunai naya skill sikda career lai faida pugne dekhinchha.",
    ]
    
    love_predictions = [
        "prem sambandha ma sudhar aaune samay chha.",
        "jivan saathi sanga ko sambandha majbut hunechha.",
        "kunai naya byakti sanga bhet huna sakcha.",
    ]

    # Ek random prediction banaune
    prediction = f"Tapaiko Rashi {random_rashi} ho. Astrological analysis anushar, {random.choice(career_predictions)} Sathai, {random.choice(love_predictions)}"

    # Response pathaune
    return {
        "status": "success",
        "message": f"Namaste Sathi! {user_input.place} ma janminu bhayeko tapaiko lagi bhabishyawani...",
        "prediction": prediction,
        "disclaimer": "This is for entertainment purposes only. Tapaiko karma nai tapaiko bhabishya ho."
    }