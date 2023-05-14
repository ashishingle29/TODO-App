import React, { useEffect, useState } from "react";
import "./Profile.scss";
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {
  chevronUpOutline,
  chevronDownOutline,
  logOutOutline,
  createOutline,
} from "ionicons/icons";
import Todo from "../todolist/Todo";

export default function Profile() {
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [task, setTask] = useState([]);
  const [isHidden, setIsHidden] = useState(false);

 

  const navigate = useNavigate();

  // const BASE_URL = "http://localhost:5000";
  const BASE_URL = "https://todo-app-ten-tau-44.vercel.app";

  useEffect(() => {
    let id = localStorage.getItem("user-id");
    setId(id);

    axios
      .get(`${BASE_URL}/profile/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/read/${id}/All`)
      .then((response) => {
        let allTask = response.data.data;
        setTask(allTask);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [task]);

  // function edit() {}

  function logOut() {
    localStorage.removeItem("user-id");

    navigate("/");
  }

  function hide() {
    if (isHidden) setIsHidden(false);
    else setIsHidden(true);
  }


  if (data)
    return (
      <div className="proComponent">
        <div className="componentHeader">
          <h2 className="proHeading">{isHidden ? "Task" : "Profile"}</h2>
          {/* <div className="empty"></div> */}
          {/* <div className="edit" onClick={edit}>
            <IonIcon icon={createOutline} />
          </div> */}
          <div className="logOut" onClick={logOut}>
            <IonIcon icon={logOutOutline} />
          </div>
        </div>
        {!isHidden && (
          <>
            <div className="profile">
              <div className="profileImage"></div>
              <div className="profileDetails">
                <p>{data.name}</p>
                <p>{data.email}</p>
              </div>
              <div className="profileDetails">
                <p>&nbsp;</p>
                <p>{data.mobile}</p>
              </div>
            </div>
          </>
        )}

        <div className="up_down" onClick={hide}>
          {isHidden ? (
            <IonIcon icon={chevronDownOutline} />
          ) : (
            <IonIcon icon={chevronUpOutline} />
          )}
        </div>
        <Todo />
      </div>
    );
}
