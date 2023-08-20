import React, { useState } from "react";

const Fileinput = ({ accept, id, fileHandleFunc , text}) => {
  let [fileSelected, setFileSelected] = useState("");

  const onChange = (E) => {
    setFileSelected(E.target.files[0].name);
    fileHandleFunc(E.target.files[0])
  };
  return (
    <>
      <label htmlFor={id} className="custom-input">
        {fileSelected
          ? `The File ${fileSelected} Selected`
          : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        onChange={onChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default Fileinput;
