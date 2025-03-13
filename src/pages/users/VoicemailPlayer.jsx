import React from "react";

const VoicemailPlayer = () => {
  const fileURL =
    "https://voip.callnigeriaonline.com/wallboard/recordfile.php?download=file&file=cGJpbGxpbmdfMS0xNzQxODY2NDk2LjgxNzk0My53YXY=";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Voicemail Playback</h1>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <p className="mb-2 text-gray-600">Click play to listen:</p>
        <audio controls preload="auto">
                <source src={fileURL} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
      </div>
    </div>
  );
};

export default VoicemailPlayer;
