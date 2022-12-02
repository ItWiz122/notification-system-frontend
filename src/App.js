import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "./constants/config";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [message, setMessage] = useState();
  const [logs, setLogs] = useState();
  const handleFetchLogs = (e) => {
    axios
      .get(API_URL + "logs")
      .then(function (response) {
        setLogs(response.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    //get message categories
    axios
      .get(API_URL + "message-categories")
      .then(function (response) {
        setCategories(response.data);
        setSelectedCategory(response.data[0]?._id);
      })
      .catch(function (error) {
        console.log(error);
      });

    //get logs
    handleFetchLogs();
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();
    axios
      .post(API_URL + "logs", {
        categoryId: selectedCategory,
        message,
      })
      .then(function (response) {
        handleFetchLogs();
        setMessage("");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleMessage}>
        <label for="cars" className="label">
          Category:
        </label>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select"
        >
          {categories.map((category) => (
            <option value={category._id}>{category.name}</option>
          ))}
        </select>
        <br />

        <textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Message"
          className="text-area"
          name="txtname"
          rows="4"
          cols="50"
          maxlength="200"
        ></textarea>
        <br />

        <button
          disabled={!message}
          style={{
            backgroundColor: !message ? "gray" : "#05C3DD",
            borderColor: !message ? "black" : "#05C3DD",
          }}
          className="btn"
        >
          Send
        </button>
      </form>
      <br />
      <br />
      <h1>Logs</h1>
      {logs?.map((item) => (
        <>
          <div>{item.name}</div>
          <br />
        </>
      ))}
    </div>
  );
}

export default App;
