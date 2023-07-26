import React,{Fragment,useState} from "react";
import {Link} from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosConfig'
import '../css/login.css';
const Login = ({setAuth}) =>{

    const [inputs,setInputs]= useState({
        email:"",
        password:""
    })
    const {email,password}=inputs
    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]
            :e.target.value

        });}

        const onSubmitForm =async(e)=>{
            e.preventDefault()
            
            try {const body = {email,password}
                const response= await fetch("http://localhost:5000/api/jwtAuth/login",
                {method:"POST",
                 headers:{"Content-Type": "application/json"}, 
                 body: JSON.stringify(body)
                 
             });
             const parseRes = await response.json()
             console.log('bbbb',parseRes)
            if(parseRes.token){

                localStorage.setItem("token",parseRes.token)
                toast("login successfully !")
                setAuth(true);
                toast.success("login successfully !")
                console.log('hoooooooooooo')
            }else{
                setAuth(false); 
                toast.error(parseRes)
            }


             
            } catch (err) {
                console.error(err.message)
            }
        }
    return (
        <div className="login-page">
           <div className="container">
                    <div className="sub-container-left">
                      <div className="image-left" >
                      <img src="/gestionCandidat.jpg" alt="Description de l'image" style={{width:"100%",height:"100%"}} />
                       </div>
                    </div>
                    <form className="sub-container-right" onSubmit={onSubmitForm}>
                        <div className="image-right">
                        <img src="/archibaldlogo.jpg" alt="Description de l'image" style={{width:"100%",height:"100%",borderRadius: "50%"}} />
                        </div>
                        <div className="login-title"> 
                           <h1 className='archibaldtitlelogin'>ARCHIBALD</h1>
                           <h1 className='headitlogin'>IT</h1>
                        </div>
                        <div className="input-container">
                            <input className="un "
                            type="email" name="email"
                            placeholder="email" value={email}
                            onChange={e=>onChange(e)} />
                        </div>
                        <div className="input-container">
                            <input className="pass"
                             type="password" name="password"
                             placeholder="password"value={password}
                             onChange={e=>onChange(e)}/>
                        </div>
                        <div>
                            <button className="buttonCon">submit</button>
                        </div>
                     
                        </form>
                            
                    
                
             </div>    
             <ToastContainer />
        </div>
    )
}
export default Login;