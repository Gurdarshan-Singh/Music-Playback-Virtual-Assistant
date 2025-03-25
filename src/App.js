import React, { useState } from "react";
import { Typography, Button, Box, Paper, Stack } from "@mui/material";
import { ReactMic } from "react-mic";
import YouTube from "react-youtube";

function App() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [textMood, setTextMood] = useState("");
  const [voiceMood, setVoiceMood] = useState("");
  const [finalMood, setFinalMood] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  
  const startRecording = () => {
    setRecording(true);
    setVideoUrl("");
    setTextMood("");
    setVoiceMood("");
    setFinalMood("");
    setAiResponse("");
    setTranscription("");
  };

  const stopRecording = () => setRecording(false);

  const onStop = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
  };

  const sendAudioToBackend = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append("file", audioBlob, "audio.wav");

    const response = await fetch("http://127.0.0.1:8000/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setTranscription(data.transcription);
    setTextMood(data.text_mood);
    setVoiceMood(data.voice_mood);
    setFinalMood(data.final_mood);
    setVideoUrl(data.video_url);
    setAiResponse(data.ai_response);
  };

  const getVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 4,

      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "rgba(255, 255, 255, 0.9)",
          p: 8,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          AI Music Assistant
        </Typography>
        <ReactMic
          record={recording}
          onStop={onStop}
          mimeType="audio/wav"
          className="sound-wave"
          strokeColor="#ff4081"
          backgroundColor="#f3f3f3"
        />
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button onClick={startRecording} variant="contained" color="primary">
            Start
          </Button>
          <Button onClick={stopRecording} variant="contained" color="secondary">
            Stop
          </Button>
          <Button onClick={sendAudioToBackend} variant="contained" color="success">
            Transcribe
          </Button>
        </Stack>
        {transcription && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Transcription:</strong> {transcription}
          </Typography>
        )}
        {textMood && (
          <Typography variant="body1">
            <strong>Text Mood:</strong> {textMood}
          </Typography>
        )}
        {voiceMood && (
          <Typography variant="body1">
            <strong>Voice Mood:</strong> {voiceMood}
          </Typography>
        )}
        {finalMood && (
          <Typography variant="body1">
            <strong>Final Mood:</strong> {finalMood}
          </Typography>
        )}
        {aiResponse && (
          <Typography variant="body1">
            <strong>AI Response:</strong> {aiResponse}
          </Typography>
        )}
        {finalMood && (
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic", color: "gray" }}>
                    {finalMood.includes("happy") && (
            <>
              “Happiness is not something ready made. It comes from your own actions.” – Dalai Lama
              <br />
            </>
          )}
          {finalMood.includes("calm") && (
            <>
              “The greatest weapon against stress is our ability to choose one thought over another.” – William James
              <br />
            </>
          )}
          {finalMood.includes("neutral") && (
            <>
              “Be yourself; everyone else is already taken.” – Oscar Wilde
              <br />
            </>
          )}
          {finalMood.includes("sad") && (
            <>
              “Sadness flies away on the wings of time.” – Jean de La Fontaine
              <br />
            </>
          )}
          {finalMood.includes("angry") && (
            <>
              “For every minute you remain angry, you give up sixty seconds of peace of mind.” – Ralph Waldo Emerson
              <br />
            </>
          )}
          {finalMood.includes("stressed") && (
            <>
              “You cannot always control what goes on outside. But you can always control what goes on inside.” – Wayne Dyer
              <br />
            </>
          )}

          </Typography>
        )}
        {videoUrl && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Recommended Song:</Typography>
            <YouTube
              videoId={getVideoId(videoUrl)}
              opts={{
                width: "100%",
                playerVars: {
                  autoplay: 1, // Automatically plays the video
                },
              }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default App;