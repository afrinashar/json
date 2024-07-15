import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
];

const App = () => {
  const [streamData, setStreamData] = useState([]);
  const [streamingStatus, setStreamingStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://twitch-proxy.freecodecamp.rocks/streams",
          {
            params: {
              channels: channels.join(","),
            },
          }
        );
        setStreamData(response.data.streams);
      } catch (error) {
        console.error("Error fetching Twitch data:", error);
        setErrorMessage("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleStatusClick = (stream) => {
    if (stream.channel) {
      window.open(`https://www.twitch.tv/${stream.channel.name}`, "_blank");
    }
  };

  const renderStreamDetails = () => {
    if (streamingStatus.stream) {
      return (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">
              {streamingStatus.stream.channel.display_name} is currently
              streaming
            </h5>
            <p className="card-text">
              {streamingStatus.stream.game}:{" "}
              {streamingStatus.stream.channel.status}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="mt-5 mb-3">Twitch Stream Status</h1>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <div className="row">
          {streamData.map((stream) => (
            <div key={stream._id} className="col-md-4">
              <div className="card mb-3">
                <img
                  src={stream.preview.medium}
                  className="card-img-top"
                  alt="Stream Preview"
                />
                <div className="card-body">
                  <h5 className="card-title">{stream.channel.display_name}</h5>
                  <p className="card-text">{stream.channel.status}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleStatusClick(stream)}
                  >
                    Go to Channel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {renderStreamDetails()}
      </div>
    </div>
  );
};

export default App;
