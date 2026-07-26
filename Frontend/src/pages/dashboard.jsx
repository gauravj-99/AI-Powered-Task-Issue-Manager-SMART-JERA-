import api from "../services/api";
import{ useState} from "react";
import {useNavigate} from "react-router-dom";
function Dashboard(){
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const navigate=useNavigate();
    const token = localStorage.getItem("token");
    const createProject=async()=>{
    try{
        const token =localStorage.getItem("token");
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

    }catch(error){
        console.log(error);
    }
};
<button onClick={createProject}>
    Create Project
</button>
    const logoutHandler=()=>{
        localStorage.removeItem("token");
        navigate("/");

    };
    return(
        <div>
            <h1>Dashboard</h1>
            <h3>Login Successfully</h3>
            <p>{token}</p>
            <textarea
            rows="8"
            cols="80"
            value={token}
            readOnly
            />

            <br/>
            <br/>

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
            <button onClick={logoutHandler}>
                logout
            </button>

            <hr/>
            <hr/>

            <h2>
                Projects
            </h2>
            <button>Create Project</button>
        </div>

    );
}

export default Dashboard;
