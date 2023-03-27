import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


function Game() {
  const [getLyrics, setGetLyrics] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [songInput, setSongInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [dataName, setDataName] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [equal, setEqual] = useState('');
 
  useEffect(() => {
    if (dataName === inputVal) setEqual('true')
  })
  
  async function addSong() {
    await axios.post("https://localhost:5001/api/lyricsapi", {
      name: songInput,
      artist: artistInput,
      trackId: idInput,
    });
  }
  async function randomizeTrack() {
    console.log("in randomize track");
    const newTrackId = Math.floor(Math.random() * 15);
    console.log(newTrackId);
    try {
      const response = await axios.get(`/api/${newTrackId}`, {
        trackId: newTrackId,
      })
      console.log('this is response data', response.data)
      //console.log(response.data.lyrics)
      setLyrics(response.data.lyrics)
      setDataName(response.data.name)
    } catch (err) {
      console.error("error", err);
    }
  }
  //create key for input song name
  function compareAnswer() {
    setEqual('false')
    if (dataName === inputVal) setEqual('true');  //render something
  }
  return (
    <div>
      <Navbar />
      <div className='contentBox'>
        <h1>Play</h1>
        <div>
          {(equal !== '') {
            (equal === 'true') ? <h2>Correct!</h2> : <h2>Incorrect</h2>}
          }
        </div>
        <div className="gameContent">
          <div className="lyrics" style={{width: '75%'}}>
            <button onClick={randomizeTrack}>Generate Lyrics</button>
            <div>
              {lyrics.length > 0 ? <div style={{'overflowY': 'scroll', height: '400px'}}><p>{lyrics}</p></div>: <p>Lyrics go here</p>}
            </div>
          </div>
          <form onSubmit={compareAnswer}>
            <input
              type="text"
              name="guess"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
              <button type="submit">Guess</button>
          </form>{" "}
          <br />
          {/* <form>
            <input
              type="text"
              name="addsong"
              value={songInput}
              onChange={(e) => {
                setSongInput(e.target.value);
              }}
            />
            <input
              type="text"
              name="addartist"
              value={artistInput}
              onChange={(e) => {
                setArtistInput(e.target.value);
              }}
            />
            <input
              type="text"
              name="addid"
              value={idInput}
              onChange={(e) => {
                setIdInput(e.target.value);
              }} */}
            {/* /> */}
            {/* <button onClick={addSong}>Add song</button> */}
          {/* </form>
          <button onClick={() => console.log(songInput)}>SONG</button>
          <button onClick={()=>{console.log(songInput, artistInput, idInput)}}>CHECK INPUTS</button> */}
        </div>
      </div>
    </div>
  );
}

export default Game;
