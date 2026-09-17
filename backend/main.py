"""Image-to-Audio Converter API - Main Application"""

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
from gtts import gTTS
import io

app = FastAPI(
    title="Image-to-Audio Converter",
    description="Convert images containing text to audio files using OCR and TTS",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Tesseract path (update for your system)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "running",
        "message": "Image-to-Audio Converter API",
        "docs": "/docs"
    }


@app.post("/convert")
async def convert_image_to_audio(file: UploadFile = File(...)):
    """
    Convert an image to audio by extracting text via OCR and converting to speech.
    
    Args:
        file: Image file (PNG, JPG, etc.)
    
    Returns:
        JSON with extracted text and audio file path
    """
    try:
        # Read uploaded image
        image_data = await file.read()
        img = Image.open(io.BytesIO(image_data))
        
        # Extract text using Tesseract OCR
        text_result = pytesseract.image_to_string(img)
        
        if not text_result.strip():
            return {
                "error": "No text found in image",
                "text_result": ""
            }
        
        # Convert text to speech
        tts = gTTS(text=text_result, lang='en', slow=False)
        audio_filename = "output.mp3"
        tts.save(audio_filename)
        
        return {
            "status": "success",
            "text_result": text_result,
            "audio_file": audio_filename,
            "message": "Image successfully converted to audio"
        }
    
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "message": "Failed to process image"
        }
