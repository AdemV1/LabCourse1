import React,{Component} from 'react';
import {variables} from './Variables.js';

export class ZipCode extends Component{

    constructor(props){
        super(props);

        this.state={
            zipkodet:[],
            modalTitle:"",
            ZIP_ID:0,
            ZIP_Kodi:"",
            Qyteti:""
                    }
    }

    refreshList(){

        fetch(variables.API_URL+'zipcode')
        .then(response=>response.json())
        .then(data=>{
            this.setState({zipkodet:data});
        });

    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeZIP_Kodi =(e)=>{
        this.setState({ZIP_Kodi:e.target.value});
    }
    changeQyteti =(e)=>{
        this.setState({Qyteti:e.target.value});
    }
   

    addClick(){
        this.setState({
            modalTitle:"Add ZipCode",
            ZIP_ID:0,
            ZIP_Kodi:"",
            Qyteti:"",
            
        });
    }
    editClick(zip){
        this.setState({
            modalTitle:"Edit ZipCode",
            ZIP_ID:zip.ZIP_ID,
            ZIP_Kodi:zip.ZIP_Kodi,
            Qyteti:zip.Qyteti,
            
        });
    }

    createClick(){
        fetch(variables.API_URL+'zipcode',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ZIP_Kodi:this.state.ZIP_Kodi,
                Qyteti:this.state.Qyteti,
               
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
        fetch(variables.API_URL+'zipcode',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ZIP_ID:this.state.ZIP_ID,
                ZIP_Kodi:this.state.ZIP_Kodi,
                Qyteti:this.state.Qyteti,
             
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
        fetch(variables.API_URL+'zipcode/'+id,{
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

    // imageUpload=(e)=>{
    //     e.preventDefault();

    //     const formData=new FormData();
    //     formData.append("file",e.target.files[0],e.target.files[0].name);

    //     fetch(variables.API_URL+'zipcode/savefile',{
    //         method:'POST',
    //         body:formData
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         this.setState({PhotoFileName:data});
    //     })
    // }

    render(){
        const {
            zipkodet,
            modalTitle,
            ZIP_ID,
            ZIP_Kodi,
            Qyteti
            
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Shto ZipCode
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            ZIP_ID
        </th>
        <th>
            ZipCode 
        </th>
        <th>
        Qyteti
        </th>
            </tr>
    </thead>
    <tbody>
        {zipkodet.map(zip=>
            <tr key={zip.ZIP_ID}>
                <td>{zip.ZIP_ID}</td>
                <td>{zip.ZIP_Kodi}</td>
                <td>{zip.Qyteti}</td>
                <td>{zip.DateOfJoining}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(zip)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(zip.ZIP_ID)}>
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
            <span className="input-group-text">ZipCode</span>
            <input type="text" className="form-control"
            value={ZIP_Kodi}
            onChange={this.changeZIP_Kodi}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Qyteti</span>
            <input type="text" className="form-control"
            value={Qyteti}
            onChange={this.changeQyteti}/>
        </div>

        {/* <div className="input-group mb-3">
            <span className="input-group-text">DOJ</span>
            <input type="date" className="form-control"
            value={DateOfJoining}
            onChange={this.changeDateOfJoining}/>
        </div> */}


     </div>
     {/* <div className="p-2 w-50 bd-highlight">
         <img width="250px" height="250px"
         src={PhotoPath+PhotoFileName}/>
         <input className="m-2" type="file" onChange={this.imageUpload}/>
     </div> */}
    </div>

    {ZIP_ID==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {ZIP_ID!=0?
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