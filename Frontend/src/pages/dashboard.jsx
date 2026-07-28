import api from "../services/api";
import {useState, useEffect } from "react";

import {useNavigate} from "react-router-dom";
function Dashboard(){
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [projects, setProjects]= useState([]);
    const navigate=useNavigate();
    const token = localStorage.getItem("token");
    useEffect(()=>{
        fetchProjects();
    }, []);
    const createProject=async()=>{
    try{
        await api.post(
            "/projects",
            {
                title,
                description,
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            
                
            }
        );
        alert("Project Created");
        fetchProjects();
        setTitle("");
        setDescription("");

    }catch(error){
        console.log(error);
        alert("project not created")
    }
};
    const logoutHandler=()=>{
        localStorage.removeItem("token");
        navigate("/");
    };
    
    const fetchProjects = async ()=>{
        try{
            
            const {data}=await api.get("/projects",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            setProjects(data);
            
        }catch(error){
            console.log(error);
        }
    };

    const deleteProject=async (id)=>{
        try{
            await api.delete(
                `/projects/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Project Deleted");
            fetchProjects();
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div>
            <h1>Dashboard</h1>
            <h3>Login Successfully</h3>
            <button onClick={logoutHandler}>
                logout
            </button>
            <hr/>
            <h2>Create Project</h2>

            <input 
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e)=>
                setTitle(e.target.value)
            }
            />

            <br>
            </br>
            <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e)=>
                setDescription(e.target.value)
            }
            />

            <br/>
            <br/>
            <button onClick={createProject}>
                Create Project
            </button>
            <hr />

            <h2>Projects</h2>
            {projects.map((project)=>(
                <div key={project._id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button onClick={()=>
                        navigate(`/tasks/${project._id}`)
                        }>Open Project
                    </button>
                    <button onClick={()=>
                        deleteProject(project._id)}>
                        Delete
                    </button>
                    
                    <hr />
                </div>

            ))}         
        </div>

    );
   
    
}

export default Dashboard;
