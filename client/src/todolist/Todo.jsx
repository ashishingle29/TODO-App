import React, { useEffect, useState } from "react";
import "./Todo.scss";
import { IonIcon } from "@ionic/react";
import { checkmark, close } from "ionicons/icons";
import axios from "axios";

export default function Todo() {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const BASE_URL = "http://localhost:5000"
  // const BASE_URL = "https://what-to-do-bro.vercel.app";


  const options = [
    { value: 'All', text: 'All' },
    { value: 'Uncompleted', text: 'Uncompleted' },
    { value: 'Completed', text: 'Completed' }
  ];
  const [searchCategory, setSearchCategory] = useState(options[0].value);


  const handleChange = event => {
    console.log(event.target.value);
    setSearchCategory(event.target.value);
  };



  // Fetching Data
  useEffect(() => {
    let id = localStorage.getItem("user-id");
    setId(id);

    axios
      .get(`${BASE_URL}/read/${id}/${searchCategory}`)
      .then((response) => {
        let allTask = response.data.data;
        setData(allTask);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [data]);
  console.log(data)



  // Creating Data
  function addTask(event) {
    event.preventDefault();

    let newTask = {
      title: title,
      content: content,
      userid: id,
    };

    axios
      .post(`${BASE_URL}/create`, newTask)
      .then((res) => {
        console.log(res.data);
        event.target.reset();
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });
  }



  function deletePending(Id) {

    axios
      .delete(
        `${BASE_URL}/delete/${Id}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateCategory(id, Category) {
  
    console.log(id, Category)
    axios
      .put(`${BASE_URL}/update/${id}/${Category}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });

  }

  if (data) {
    return (
      <div className="task_components">
        <div className="taskCard taskCard__secondary">
          <h1>Tasks</h1>
          <div className="dropSelect">
            <select value={searchCategory} onChange={handleChange}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>


          {/* Add Task Button */}
          <div className="addTask addTask__secondary">
            <form method="post" onSubmit={addTask}>
              <div id="pending">
                <textarea
                  rows="2"
                  type="textarea"
                  className="inputs1"
                  placeholder=" Title"
                  required
                  onChange={(event) => setTitle(event.target.value)}
                ></textarea>
                <textarea
                  rows="3"
                  type="textarea"
                  className="inputs2"
                  placeholder=" Description"
                  required
                  onChange={(event) => setContent(event.target.value)}
                ></textarea>
              </div>
              <button type="submit">+</button>
            </form>
          </div>

          {/* Tasks List */}
          {data.map((element, i) => {
            return (
              <div key={i} className="taskItem taskItem__secondary">
                <div className="cross">

                  {
                    element.category === 'Completed' ?
                      (

                        <div className="doneButton" style={{ background: "rgb(105, 197, 83)" }} onClick={() => updateCategory(element._id, element.category)}>
                          <div className="x" style={{ background: "#E4EBF5" }}></div>
                          <div className="y" style={{ background: "#E4EBF5" }}></div>
                        </div>
                      ) : (
                        <div className="doneButton" onClick={() => updateCategory(element._id, element.category)}>
                          <div className="x" ></div>
                          <div className="y" ></div>
                        </div>
                      )
                  }
                  <div className="crossButton" onClick={() => deletePending(element._id)}>
                    <IonIcon icon={close} />
                  </div>
                </div>
                <div className="text">
                  <h2>{element.title}</h2>
                  <p>{element.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
