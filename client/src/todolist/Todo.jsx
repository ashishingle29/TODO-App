import React, { useEffect, useState } from "react";
import "./Todo.scss";
import { IonIcon } from "@ionic/react";
import {
  chevronUpOutline, chevronDownOutline, close } from "ionicons/icons";
import axios from "axios";

export default function Todo() {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [rightDivStyle, setRightDivStyle] = useState({})
  const [allTasksStyle, setAllTasksStyle] = useState({});


  // const BASE_URL = "http://localhost:5000"
  const BASE_URL = "https://todo-app-ten-tau-44.vercel.app";


  const options = [
    { value: 'All', text: 'All' },
    { value: 'Uncompleted', text: 'Uncompleted' },
    { value: 'Completed', text: 'Completed' }
  ];
  const [searchCategory, setSearchCategory] = useState(options[0].value);



  function hide() {
    if (isHidden) {
      setIsHidden(false);
      setRightDivStyle({})
      setAllTasksStyle({})
    } else {
      setIsHidden(true);
      setRightDivStyle({ width: "100%" })
      setAllTasksStyle({
       })
    }
  }

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
    let completedTasks = 0;
    let unCompletedTasks = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].category === 'Completed') {
        completedTasks++
      }
      if (data[i].category === 'Uncompleted') {
        unCompletedTasks++
      }
    }

    return (
      <div className="task_components">
        
        { !isHidden &&

          <div className="leftDiv">
            <h1>Create Tasks</h1>

            <div className="addTask addTask__secondary">
              <form method="post" onSubmit={addTask}>
                <div className="inputdiv">
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
            <div className="taskStatus">
              <div className="statusLeft">
                <p>Total Task</p>
                <p>Completed Task</p>
                <p>Uncompleted Task</p>
              </div>
              <div className="statusRight">
                <p>{data.length}</p>
                <p>{completedTasks}</p>
                <p>{unCompletedTasks}</p>
              </div>
            </div>
          </div>
        }


        <div className="right_left" onClick={hide}>
          {isHidden ? (
            <IonIcon icon={chevronDownOutline} />
            
          ) : (
            <IonIcon icon={chevronUpOutline} />
          )}
        </div>

        <div className="rightDiv" style={rightDivStyle}>

          {/* Search */}
          <div className="dropSelect">
            <select value={searchCategory} onChange={handleChange}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <div className="allTask" style={allTasksStyle}>
            {/* Tasks List  */}
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
      </div>
    );
  }
}
