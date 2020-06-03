import React,{useState,useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import '../styles/stylesheet.css';

import RecordTable from './Table';
import About from "./About";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      
    },
  },
  button: {
    margin: theme.spacing(1),
  },
  modal:{
    width: "400px",
    height: "100px"
  },
  

  
}));

function App(){

 
  const classes = useStyles();
  const serverURL = "http://localhost:5000";
  const [formDetails, setFormDetails] = useState({firstName:"",lastName:"",email:"",password:""});
  const [recordDetails,setRecordDetails] = useState([]);
  const [status, setStatus]    = useState({success:false,message:""});
  const [show, setShow]        = useState(false);



  useEffect(() => {

    document.title = `MERN-DEMO`;
  });
  

  const  handleOnSubmit = async (e) => {
    e.preventDefault();
    const postUrl = serverURL + "/register";
    console.log("Contacting server at ",postUrl,formDetails);

    try{
        var response = await axios.post(postUrl,formDetails);
        console.log("Server Response " ,response);
        setStatus({success:true,message:"Success"});               
    }
    catch{
        console.error("Error while contacting server");
        setStatus({success:false,message:"Authentication Failed!"});             
    }            
    setFormDetails({firstName:"",lastName:"",email:"",password:""});
    setShow(true);
}

const handleRetrive=async(e) =>{
  e.preventDefault();
  const postUrl = serverURL + "/read";
  console.log("Contacting server at ",postUrl,formDetails);

  try{
      var response = await axios.post(postUrl,formDetails);
      console.log("Server Response " ,response.data);
      setRecordDetails(response.data);
      setStatus({success:true,message:"Success"});               
  }
  catch{
      console.error("Error while contacting server");
      setStatus({success:false,message:"Authentication Failed!"});             
  }            
  setShow(true);
}


const handleEdit=async(e) =>{
  e.preventDefault();
  const postUrl = serverURL + "/update";
  console.log("Contacting server at ",postUrl,formDetails);

  try{
      var response = await axios.post(postUrl,formDetails);
      console.log("Server Response " ,response.data);
      setStatus({success:true,message:"Success"});               
  }
  catch{
      console.error("Error while contacting server");
      setStatus({success:false,message:"Authentication Failed!"});             
  }            
  setFormDetails({firstName:"",lastName:"",email:"",password:""});
  setShow(true);
}

const handleDelete=async(e) =>{
  e.preventDefault();
  const postUrl = serverURL + "/delete";
  console.log("Contacting server at ",postUrl,formDetails);

  try{
      var response = await axios.post(postUrl,formDetails);
      console.log("Server Response " ,response.data);
      setStatus({success:true,message:"Success"});               
  }
  catch{
      console.error("Error while contacting server");
      setStatus({success:false,message:"Authentication Failed!"});             
  }        
  setFormDetails({firstName:"",lastName:"",email:"",password:""});    
  setShow(true);
}

const handleClose =()=>{
  setShow(false);
}
  const handleChange = (e) => {

  setFormDetails({...formDetails, [e.target.id]:e.target.value})
  }

    return(
 
        <div className="app-body">
          <div className="header">
            <img className="header-img" src="https://pbs.twimg.com/media/DQlOsZyVAAAXfAx.jpg"/>
            <About/>
          </div>
          <div className="crud">
            <div className="create">
              <ExpansionPanel>
                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" >
                  Create
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form className={classes.root} noValidate autoComplete="off">

                        <TextField required id="firstName" type="search" label="First Name" onChange={handleChange} value={formDetails.firstName} />
                        <TextField required id="lastName" type="search" label="Last Name" onChange={handleChange} value={formDetails.lastName}  />
                        <TextField required id="email"  type="search" label="Email" onChange={handleChange} value={formDetails.email} />
                        <TextField required id="password"  label="Password"  type="password" onChange={handleChange} value={formDetails.password}/>
                        <br/>
                        <Button variant="contained"  color="primary"  size="small" onClick={handleOnSubmit} className={classes.button} >
                          Save
                        </Button>   
                    </form>           
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>  
            <br/>
            <div className="read">
              <ExpansionPanel>
                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" >
                  Read
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form className={classes.root} noValidate autoComplete="off">

                        <RecordTable records={recordDetails}/>
                        <Button variant="contained"  color="primary"  size="small" onClick={handleRetrive} className={classes.button} >
                          Get
                        </Button>   
                    </form>
            
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div> 
            <br/>
            <div className="update">
              <ExpansionPanel>
                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" >
                  Update
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form className={classes.root} noValidate autoComplete="off">

                        <TextField required id="email" type="search" label="Email" onChange={handleChange} value={formDetails.email}  />
                        <TextField  id="firstName" type="search" label="First Name" onChange={handleChange} value={formDetails.firstName} />
                        <TextField  id="lastName"  type="search" label="Last Name" onChange={handleChange} value={formDetails.lastName} />      
                        <br/>
                        <Button variant="contained"  color="primary" onClick={handleEdit} size="small"  className={classes.button} >
                          Edit
                        </Button>   
                    </form>
            
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
            <br/>
            <div className="delete">
              <ExpansionPanel>
                <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header" >
                  Delete
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <form className={classes.root} noValidate autoComplete="off">

                        <TextField required id="email" type="search" label="Email" onChange={handleChange} value={formDetails.email} /> 
                        <br/>
                        <Button variant="contained"  color="secondary"  size="small" onClick={handleDelete} className={classes.button} >
                          Delete
                        </Button>   
                    </form>           
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>                                          
          </div> 

          <Dialog   open={show} onClose={handleClose} > 
            
            <Box pt={7} pb={7} pl={30} pr={30}>Success! </Box>  
           
          </Dialog>         
        </div> 
);

}
export default App;