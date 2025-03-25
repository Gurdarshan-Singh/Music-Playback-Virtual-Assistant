# Project Setup Instructions

Our project consists of two main directories: **frontend** and **backend**. Follow these steps to set up and run the application.

## Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies (if not already installed):
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```

   ```
3. Start the backend server:
   ```sh
   uvicorn main:app --reload
   ```

## Important: Set API Keys Before Running the Project
Before running the project, ensure you have set up your API keys in `speech_to_text.py`:

- **OpenAI API Key** – Required for speech-to-text functionality.
- **Hugging Face API Key** – Required for model inference.

Make sure to replace placeholder values with your actual API keys.

---

Now you're ready to run the project! 🚀
