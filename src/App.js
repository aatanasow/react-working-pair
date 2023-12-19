import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { readFile } from "./utils/file";
import FileUpload from "./components/FileUpload";

function App() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState([]);

  function handleFileUpload(e) {
    e.preventDefault();
    readFile(e)
      .then((result) => {
        console.log("---", result);
        setData(result);
      })
      .catch((error) => setErr(error));
  }

  return (
    <div className="App">
      <FileUpload changeHandler={handleFileUpload} />
      <Modal errors={err} />
    </div>
  );
}

export default App;
