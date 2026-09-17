# Project Architecture

## Overview

This project combines a FastAPI backend for image-to-audio conversion with an animated frontend portfolio.

```
┌─────────────────────────────────────────────────────────┐
│           Simple-Api - Image-to-Audio Converter         │
└─────────────────────────────────────────────────────────┘

                         ┌─────────────┐
                         │   Frontend  │
                         │  (HTML/CSS) │
                         └──────┬──────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                    v           v           v
            ┌──────────┐  ┌──────────┐  ┌──────────┐
            │ Upload   │  │ Display  │  │Animation │
            │  Image   │  │  Text    │  │  Effects │
            └──────┬───┘  └──────────┘  └──────────┘
                   │
                   │ HTTP POST /convert
                   v
        ┌──────────────────────────┐
        │   FastAPI Backend        │
        │   (uvicorn server)       │
        └──────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        v          v          v
    ┌────────┐  ┌────────┐  ┌────────┐
    │Tesseract│  │ gTTS  │  │Error   │
    │  (OCR) │  │ (TTS) │  │Handler │
    └────────┘  └────────┘  └────────┘
        │          │
        └──────────┼──────────┘
                   │
        ┌──────────────────────┐
        │  Response (JSON)     │
        │ - extracted text     │
        │ - audio file path    │
        │ - status message     │
        └──────────────────────┘
```

## Component Details

### Backend (`backend/main.py`)

**Core Responsibilities:**
- Accept image file uploads via REST API
- Extract text from images using Tesseract OCR
- Convert extracted text to audio using gTTS
- Handle errors gracefully
- Serve health check endpoint

**Key Endpoints:**
- `GET /` - Health check
- `POST /convert` - Image to audio conversion
- `GET /docs` - Swagger UI documentation
- `GET /redoc` - ReDoc documentation

**Dependencies:**
- FastAPI: Web framework
- Tesseract: OCR engine
- gTTS: Text-to-speech
- Pillow: Image processing

### Frontend (`frontend/`)

**Components:**
1. **HTML** (`Animation_Project.html`)
   - Navigation bar
   - Hero section
   - About section
   - Portfolio showcase
   - Client mentions
   - Footer

2. **CSS** (`Animation_Project.css`)
   - Dark theme (black background)
   - Responsive layout
   - Smooth transitions
   - Custom cursor styling
   - Animation keyframes

3. **JavaScript** (`Animation_project.js`)
   - GSAP animations
   - Locomotive Scroll setup
   - Cursor tracking
   - Interactive hover effects
   - ScrollTrigger integration

## Data Flow

### Image Conversion Process

```
1. User uploads image
   │
   ├─> Frontend sends POST request to /convert
   │
   ├─> Backend receives file
   │
   ├─> Tesseract extracts text from image
   │
   ├─> gTTS converts text to speech
   │
   ├─> Audio file saved as output.mp3
   │
   └─> Response sent with text & audio path
       └─> Frontend displays results
```

## Security Considerations

- ✅ CORS configured for specific origins
- ✅ Input validation on file uploads
- ✅ Error handling prevents information leakage
- ✅ Tesseract path configuration (platform-specific)
- ⚠️ TODO: Add file size validation
- ⚠️ TODO: Add image format whitelist
- ⚠️ TODO: Add rate limiting

## Performance Notes

- Image processing time: ~2-5 seconds (depends on size)
- OCR accuracy: Best with clear, high-contrast text
- gTTS latency: ~1-3 seconds (network dependent)
- Frontend: Smooth 60 FPS animations with GSAP

## Future Enhancements

1. **Multiple Languages Support**
   - Add language selection dropdown
   - Support for 50+ languages via gTTS

2. **Advanced OCR Options**
   - Handwriting recognition
   - Multi-column layout support
   - Confidence scoring

3. **Audio Enhancements**
   - Adjustable speech speed
   - Voice selection
   - Audio format options (MP3, WAV, OGG)

4. **Database Integration**
   - Store conversion history
   - User accounts
   - API key authentication

5. **Deployment**
   - Docker containerization
   - Cloud hosting (AWS, Azure, GCP)
   - CI/CD pipeline

## Technologies Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | HTML5 | - |
| | CSS3 | - |
| | JavaScript ES6 | - |
| | GSAP | 3.12.2 |
| | Locomotive Scroll | 3.5.4 |
| **Backend** | FastAPI | >=0.110.0 |
| | Uvicorn | >=0.29.0 |
| | Python | 3.8+ |
| **Services** | Tesseract OCR | 5.0+ |
| | gTTS | >=2.5.1 |
| **Image** | Pillow | >=10.0.0 |
