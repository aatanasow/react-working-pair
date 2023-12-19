import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import { readFile } from "./utils/file";
import FileUpload from "./components/FileUpload";
import Title from "./components/Title";
import Table from "./components/table/Table";

function App() {
  const [data, setData] = useState([]);
  const [err, setErr] = useState([]);

  const head = ["Employee ID", "Project ID", "Date From", "Date To"];

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

      {!!data.length && !err.length && (
        <>
          <Title title="Raw data" />
          <Table head={head} data={data} />
        </>
      )}
    </div>
  );
}

export default App;
