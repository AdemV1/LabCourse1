import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Administratori extends Component{

    constructor(props){
        super(props);

        this.state={
            administratoret:[],
            modalTitle:"",
            AdminId:0,
            AdminName:"",
            AdminPassword:""
            
        }
    }

    refreshList(){

        fetch(variables.API_URL+'administratori')
        .then(response=>response.json())
        .then(data=>{
            this.setState({administratoret:data});
        });

        // fetch(variables.API_URL+'subjekti')
        // .then(response=>response.json())
        // .then(data=>{
        //     this.setState({administratoret:data});
        // });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeAdministratoriName =(e)=>{
        this.setState({AdminName:e.target.value});
    }
    changeAdminEmail =(e)=>{
        this.setState({AdminEmail:e.target.value});
    }
    changeAdminPassword =(e)=>{
        this.setState({AdminPassword:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Administratori",
            AdminId:0,
            AdminName:"",
            AdminEmail:"",
            AdminPassword:""
            
        });
    }
    editClick(adm){
        this.setState({
            modalTitle:"Edit Administratori",
            AdminId:adm.AdminId,
            AdminName:adm.AdminName,
            AdminEmail:adm.AdminEmail,
            AdminPassword:adm.AdminPassword
            
        });
    }

    createClick(){
        fetch(variables.API_URL+'administratori',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AdminName:this.state.AdminName,
                AdminEmail:this.state.AdminEmail,
                AdminPassword:this.state.AdminPassword
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'administratori',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                AdminId:this.state.AdminId,
                AdminName:this.state.AdminName,
                AdminEmail:this.state.AdminEmail,
                AdminPassword:this.state.AdminPassword
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'administratori/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'administratori/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        
    }

    render(){
        const {
            administratoret,
            modalTitle,
            AdminId,
            AdminName,
            AdminEmail,
            AdminPassword,
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Administratori
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            AdminId
        </th>
        <th>
            AdminName
        </th>
        <th>
            AdminEmail
        </th>
        <th>
            Password
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {administratoret.map(adm=>
            <tr key={adm.AdminId}>
                <td>{adm.AdminId}</td>
                <td>{adm.AdminName}</td>
                <td>{adm.AdminEmail}</td>
                <td>{adm.AdminPassword}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(adm)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(adm.AdminId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Emri dhe Mbiemri</span>
            <input type="text" className="form-control"
            value={AdminName}
            onChange={this.changeAdministratoriName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input type="email" className="form-control"
            value={AdminEmail}
            onChange={this.changeAdminEmail}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Password</span>
            <input type="password" className="form-control"
            value={AdminPassword}
            onChange={this.changeAdminPassword}/>
        </div>


     </div>
     
    </div>

    {AdminId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {AdminId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

</div>
</div> 
</div>


</div>
        )
    }
}