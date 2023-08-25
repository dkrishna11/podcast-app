import React from "react";
import Button from "../../Button";

const EpisodeDetails = ({ index, title, description, audioFile, onClick }) => {
  return (
    <div style={{width:"100%"}}>
      <h2 style={{ textAlign: "left", marginBottom: "0" }}>{index}. {title}</h2>
      <p style={{marginLeft:"1.5rem"}} className="podcast-description">{description}</p>
      <Button className="epidose-button"
        text={"Play"}
        onClick={() => onClick(audioFile)}
        width={"80px"}
      />
    </div>
  );
};

export default EpisodeDetails;
