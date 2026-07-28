import {useParams } from "react-router-dom";
import {useState } from "react";
import {useParams } from "react-router-dom";
import api from "../services/api";
function Tasks(){
    const { projectId }= useParams();
    const [title, setTitle]= useState("");
    const [description, setDescription]=useState("");
    const [priority, setPriority]=useState("Medium");
    const token = localStorage.getItem("token");
    const createTask = async()=>{
        try{
            await api.post(
                "/tasks",
                {
                    title,
                    description,
                    priority,
                    project: projectId,
                },
                {headers:{
                    Authorization:`Bearer ${token}`,
                },
            }
            );
            alert("Task Created");
            setTitle("");
            setDescription("");
            setPriority("Medium");
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div>
            <h1>Tasks Page</h1>
            <p> Project ID: {projectId}</p>
            <input 
                type="text"
                placeholder="task title"
                value={title}
                onChange={(e)=>
                    setTitle(e.target.value)
                }
            />
            <br />
            <br />
            <input 
                type="text"
                placeholder="task description"
                value={description}
                onChange={(e)=>
                    setDescription(e.target.value)
                }
            />
            <br />
            <br />

            <select 
            value= {priority}
            onChange={(e)=>
                setPriority(e.target.value)
            }
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <br />
            <br />
            <button onclick ={createTasks}>
                Create Task</button>
        </div>
    );
}
export default Tasks;