import {useParams } from "react-router-dom";
import {useState ,useEffect} from "react";
import api from "../services/api";
function Tasks(){
    const { projectId }= useParams();
    const [title, setTitle]= useState("");
    const [description, setDescription]=useState("");
    const [priority, setPriority]=useState("Medium");
    const [tasks, setTasks]=useState([]);
    useEffect(()=>{
        fetchTasks();
    }, []);
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
            fetchTasks();
            setTitle("");
            setDescription("");
            setPriority("Medium");
        }catch(error){
            console.log(error);
        }
    };
    const fetchTasks =async()=>{
        try{
            const {data}=await api.get(
                `/tasks/${projectId}`,{
                    headers:{
                        Authorization:`Bearer ${token}`,
                    },
                }
            );
            setTasks(data);
        } catch(error){
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
            <button onClick ={createTask}>
                Create Task
            </button>
            <hr />
            <hr />
            <h2>ALL Tasks</h2>
            {tasks.map((task)=>(
                <div key ={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <p>
                        priority: {task.priority}
                    </p>
                    <p>
                        Status: {task.status}
                    </p>
                    <button onClick={()=>
                        deleteTask(task._id)
                    }>
                        Delete
                    </button>

                    <hr />
                </div>
            ))}

        </div>


    );
}
export default Tasks;