import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Kandidati extends Component{

    constructor(props){
        super(props);

        this.state={
            subjektet:[],
            kandidatet:[],
            modalTitle:"",
            KandidatiId:0,
            KandidatiName:"",
            Subjekti:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.png",
            PhotoPath:variables.PHOTO_URL
        }
    }

    refreshList(){

        fetch(variables.API_URL+'kandidati')
        .then(response=>response.json())
        .then(data=>{
            this.setState({kandidatet:data});
        });

        fetch(variables.API_URL+'subjekti')
        .then(response=>response.json())
        .then(data=>{
            this.setState({subjektet:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeKandidatiName =(e)=>{
        this.setState({KandidatiName:e.target.value});
    }
    changeSubjekti =(e)=>{
        this.setState({Subjekti:e.target.value});
    }
    changeDateOfJoining =(e)=>{
        this.setState({DateOfJoining:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Kandidati",
            KandidatiId:0,
            KandidatiName:"",
            Subjekti:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.png"
        });
    }
    editClick(knd){
        this.setState({
            modalTitle:"Edit Kandidati",
            KandidatiId:knd.KandidatiId,
            KandidatiName:knd.KandidatiName,
            Subjekti:knd.Subjekti,
            DateOfJoining:knd.DateOfJoining,
            PhotoFileName:knd.PhotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'kandidati',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                KandidatiName:this.state.KandidatiName,
                Subjekti:this.state.Subjekti,
                DateOfJoining:this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName
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
        fetch(variables.API_URL+'kandidati',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                KandidatiId:this.state.KandidatiId,
                KandidatiName:this.state.KandidatiName,
                Subjekti:this.state.Subjekti,
                DateOfJoining:this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName
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
        fetch(variables.API_URL+'kandidati/'+id,{
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

        fetch(variables.API_URL+'kandidati/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({PhotoFileName:data});
        })
    }

    render(){
        const {
            subjektet,
            kandidatet,
            modalTitle,
            KandidatiId,
            KandidatiName,
            Subjekti,
            DateOfJoining,
            PhotoPath,
            PhotoFileName
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Kandidati
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            KandidatiId
        </th>
        <th>
            KandidatiName
        </th>
        <th>
            Subjekti
        </th>
        <th>
            DOJ
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {kandidatet.map(knd=>
            <tr key={knd.KandidatiId}>
                <td>{knd.KandidatiId}</td>
                <td>{knd.KandidatiName}</td>
                <td>{knd.Subjekti}</td>
                <td>{knd.DateOfJoining}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(knd)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(knd.KandidatiId)}>
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
            <span className="input-group-text">Emp Name</span>
            <input type="text" className="form-control"
            value={KandidatiName}
            onChange={this.changeKandidatiName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Subjekti</span>
            <select className="form-select"
            onChange={this.changeSubjekti}
            value={Subjekti}>
                {subjektet.map(sub=><option key={sub.SubjektiID}>
                    {sub.SubjektiName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">DOJ</span>
            <input type="date" className="form-control"
            value={DateOfJoining}
            onChange={this.changeDateOfJoining}/>
        </div>


     </div>
     <div className="p-2 w-50 bd-highlight">
         <img width="250px" height="250px"
         src={PhotoPath+PhotoFileName}/>
         <input className="m-2" type="file" onChange={this.imageUpload}/>
     </div>
    </div>

    {KandidatiId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {KandidatiId!=0?
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