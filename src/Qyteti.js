import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Qyteti extends Component{

    constructor(props){
        super(props);

        this.state={
            qytetet:[],
            modalTitle:"",
            Qyteti_ID:0,
            QytetiName:"",
            Qyteti_shkurtesa:""
                    }
    }

    refreshList(){

        fetch(variables.API_URL+'qyteti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({qytetet:data});
        });

    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeQytetiName =(e)=>{
        this.setState({QytetiName:e.target.value});
    }
    changeQyteti_shkurtesa =(e)=>{
        this.setState({Qyteti_shkurtesa:e.target.value});
    }
   

    addClick(){
        this.setState({
            modalTitle:"Add Qyteti",
            Qyteti_ID:0,
            QytetiName:"",
            Qyteti_shkurtesa:"",
            
        });
    }
    editClick(qytet){
        this.setState({
            modalTitle:"Edit Qyteti",
            Qyteti_ID:qytet.Qyteti_ID,
            QytetiName:qytet.QytetiName,
            Qyteti_shkurtesa:qytet.Qyteti_shkurtesa,
            
        });
    }

    createClick(){
        fetch(variables.API_URL+'qyteti',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                QytetiName:this.state.QytetiName,
                Qyteti_shkurtesa:this.state.Qyteti_shkurtesa,
               
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
        fetch(variables.API_URL+'qyteti',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Qyteti_ID:this.state.Qyteti_ID,
                QytetiName:this.state.QytetiName,
                Qyteti_shkurtesa:this.state.Qyteti_shkurtesa,
             
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
        fetch(variables.API_URL+'qyteti/'+id,{
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

    //     fetch(variables.API_URL+'qyteti/savefile',{
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
            qytetet,
            modalTitle,
            Qyteti_ID,
            QytetiName,
            Qyteti_shkurtesa
            
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Shto Qytet
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            Qyteti_ID
        </th>
        <th>
            Qyteti 
        </th>
        <th>
            Qyteti Shkurtesa
        </th>
            </tr>
    </thead>
    <tbody>
        {qytetet.map(qytet=>
            <tr key={qytet.Qyteti_ID}>
                <td>{qytet.Qyteti_ID}</td>
                <td>{qytet.QytetiName}</td>
                <td>{qytet.Qyteti_shkurtesa}</td>
                <td>{qytet.DateOfJoining}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(qytet)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(qytet.Qyteti_ID)}>
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
            <span className="input-group-text">Qyteti</span>
            <input type="text" className="form-control"
            value={QytetiName}
            onChange={this.changeQytetiName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Qyteti Shkurtesa</span>
            <input type="text" className="form-control"
            value={Qyteti_shkurtesa}
            onChange={this.changeQyteti_shkurtesa}/>
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

    {Qyteti_ID==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {Qyteti_ID!=0?
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