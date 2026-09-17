# Development Guide

## Backend Setup

### Prerequisites
- Python 3.8+
- Tesseract-OCR installed
- pip/venv for package management

### Steps

1. **Activate virtual environment**
   ```bash
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # macOS/Linux
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Update Tesseract path**
   - Edit `backend/main.py`
   - Set correct path for your system:
     - Windows: `C:\Program Files\Tesseract-OCR\tesseract.exe`
     - macOS: `/usr/local/bin/tesseract`
     - Linux: `/usr/bin/tesseract`

4. **Run the API**
   ```bash
   uvicorn backend.main:app --reload
   ```

5. **Access the API**
   - Main: http://localhost:8000
   - Docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## Frontend Setup

### Simple Usage
1. Open `frontend/Animation_Project.html` in a web browser
2. No build process required

### Key Technologies
- HTML5
- CSS3 with animations
- Vanilla JavaScript
- GSAP (GreenSock Animation Platform)
- Locomotive Scroll

## Testing the API

### Using cURL
```bash
curl -X POST "http://localhost:8000/convert" \
  -H "accept: application/json" \
  -F "file=@test_image.png"
```

### Using Python
```python
import requests

with open('test_image.png', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/convert',
        files={'file': f}
    )
    print(response.json())
```

## Project Structure

```
Simple-Api/
├── backend/
│   ├── __init__.py
│   └── main.py
├── frontend/
│   ├── Animation_Project.html
│   ├── Animation_Project.css
│   ├── Animation_project.js
│   └── README.md
├── docs/
│   └── screenshots/
│       ├── api-workflow.svg
│       └── api-demo.svg
├── requirements.txt
├── .gitignore
└── README.md
```

## Troubleshooting

### Tesseract Not Found
- Verify installation: `tesseract --version`
- Update path in `backend/main.py`

### CORS Issues
- Check `allow_origins` in `backend/main.py`
- Ensure frontend URL is whitelisted

### Image Upload Fails
- Check file format (PNG, JPG supported)
- Verify file size isn't too large
- Ensure image has readable text

## Environment Variables

Optional: Create `.env` file for configuration
```
TESSERACT_PATH=C:\Program Files\Tesseract-OCR\tesseract.exe
FRONTEND_ORIGIN=http://localhost:3000
```
