import React, { useState, useEffect } from "react";

function App() {
  useEffect(() => {}, []);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState(null);

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    fetch("https://8ugjegj28l.execute-api.us-east-1.amazonaws.com/dev/").then(
      (res) => console.log(res)
    );
    // "proxy": "https://8ugjegj28l.execute-api.us-east-1.amazonaws.com/dev/"
    fetch("https://ec2-54-146-218-37.compute-1.amazonaws.com/getData", {
      headers: {
        "Content-Type": `multipart/form-data: boundary=add-random-characters`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      method: "POST",
      body: selectedFile,
    })
      .then((res) => res.json())
      .then((r) => setData(r))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid m-0 px-5 py-3">
      <p className="h1 text-center">View Your Bank Statement From PDF</p>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Upload</span>
        </div>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            name="file"
            onChange={changeHandler}
          />
          <label className="custom-file-label" for="inputGroupFile01">
            {isFilePicked ? selectedFile.name : "Choose file"}
          </label>
        </div>
      </div>

      <div>
        {isFilePicked ? (
          <div className="container-fluid text-center">
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{" "}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
            <p className="text-success">File Uploaded Successfully</p>
          </div>
        ) : (
          <p className="text-danger">Select a file to show details</p>
        )}
        <div className="w-25 container-fluid text-center">
          <button
            className="btn btn-primary btn-lg btn-block"
            onClick={handleSubmission}
          >
            View Data
          </button>
        </div>
      </div>
      <table className="table mt-5">
        <thead>
          <tr>
            {data
              ? Object.keys(data).map((key, index) => (
                  <th key={index}>{key}</th>
                ))
              : undefined}
          </tr>
        </thead>
        <tbody>
          {data
            ? Object.keys(data[Object.keys(data)[0]]).map((i, key1) => (
                <tr key={key1}>
                  {Object.keys(data).map((j, key2) => (
                    <td key={key2}>{data[j][i]}</td>
                  ))}
                </tr>
              ))
            : undefined}
        </tbody>
      </table>
    </div>
  );
}

export default App;
