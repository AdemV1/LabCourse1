import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Votuesi extends Component{

    constructor(props){
        super(props);

        this.state={
            votuesit:[],
            qytetet:[],
            modalTitle:"",
            VotuesiId:0,
            VotuesiName:"",
            Shteti:"",
            Qyteti:"",
            NrPersonal:"",
            Email:"",
            NrTelefonit:"",
            Kategoria:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.png",
            PhotoPath:variables.PHOTO_URL
        }
    }

    refreshList(){

        fetch(variables.API_URL+'votuesi')
        .then(response=>response.json())
        .then(data=>{
            this.setState({votuesit:data});
        });

        // fetch(variables.API_URL+'votjekti')
        // .then(response=>response.json())
        // .then(data=>{
        //     this.setState({votuesit:data});
        // });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeVotuesiName =(e)=>{
        this.setState({VotuesiName:e.target.value});
    }
    changeShteti =(e)=>{
        this.setState({Shteti:e.target.value});
    }
    changeQyteti =(e)=>{
        this.setState({Qyteti:e.target.value});
    }
    changeNrPersonal =(e)=>{
        this.setState({NrPersonal:e.target.value});
    }
    changeEmail =(e)=>{
        this.setState({Email:e.target.value});
    }
    changeNrTelefonit =(e)=>{
        this.setState({NrTelefonit:e.target.value});
    }
    changeKategoria =(e)=>{
        this.setState({Kategoria:e.target.value});
    }
    changeDateOfJoining =(e)=>{
        this.setState({DateOfJoining:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Votuesi",
            VotuesiId:0,
            VotuesiName:"",
            Shteti:"",
            Qyteti:"",
            NrPersonal:"",
            Email:"",
            NrTelefonit:"",
            Kategoria:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.png",
            PhotoPath:variables.PHOTO_URL
        });
    }
    editClick(vot){
        this.setState({
            modalTitle:"Edit Votuesi",
            VotuesiId:vot.VotuesiId,
            VotuesiName:vot.VotuesiName,
            Shteti:vot.Shteti,
            Qyteti:vot.Qyteti,
            NrPersonal:vot.NrPersonal,
            Email:vot.Email,
            NrTelefonit:vot.NrTelefonit,
            Kategoria:vot.Kategoria,
            DateOfJoining:vot.DateOfJoining,
            PhotoFileName:vot.PhotoFileName
        });
    }


    createClick(){
        fetch(variables.API_URL+'votuesi',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VotuesiName:this.state.VotuesiName,
                Shteti:this.state.Shteti,
                Qyteti:this.state.Qyteti,
                NrPersonal:this.state.NrPersonal,
                Email:this.state.Email,
                NrTelefonit:this.state.NrTelefonit,
                Kategoria:this.state.Kategoria,
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
        fetch(variables.API_URL+'votuesi',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VotuesiId:this.state.VotuesiId,
                VotuesiName:this.state.VotuesiName,
                Shteti:this.state.Shteti,
                Qyteti:this.state.Qyteti,
                NrPersonal:this.state.NrPersonal,
                Email:this.state.Email,
                NrTelefonit:this.state.NrTelefonit,
                Kategoria:this.state.Kategoria,
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
        fetch(variables.API_URL+'votuesi/'+id,{
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

        fetch(variables.API_URL+'votuesi/savefile',{
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
            votuesit,
            modalTitle,
            VotuesiId,
            VotuesiName,
            Shteti,
            Qyteti,
            NrPersonal,
            Email,
            NrTelefonit,
            Kategoria,
            DateOfJoining,
            PhotoFileName
        
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Votuesi
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            VotuesiId
        </th>
        <th>
            VotuesiName
        </th>
        <th>
            Shteti
        </th>
        <th>
            Qyteti
        </th>
        <th>
            NrPersonal
        </th>
        <th>
            Email
        </th>
        <th>
            NrTelefonit
        </th>
        <th>
            Kategoria
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
        {votuesit.map(vot=>
            <tr key={vot.VotuesiId}>
                <td>{vot.VotuesiId}</td>
                <td>{vot.VotuesiName}</td>
                <td>{vot.Shteti}</td>
                <td>{vot.Qyteti}</td>
                <td>{vot.NrPersonal}</td>
                <td>{vot.Email}</td>
                <td>{vot.NrTelefonit}</td>
                <td>{vot.Kategoria}</td>
                <td>{vot.DateOfJoining}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(vot)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(vot.VotuesiId)}>
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
            <span className="input-group-text">Votuesi Name</span>
            <input type="text" className="form-control"
            value={VotuesiName}
            onChange={this.changeVotuesiName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Shteti</span>
            <select className="form-select"
            onChange={this.changeShteti}
            value={Shteti}>
                {votuesit.map(vot=><option key={vot.Shteti}>
                    {vot.Shteti}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Qyteti</span>
            <select className="form-select"
            onChange={this.changeQyteti}
            value={Qyteti}>
                {votuesit.map(vot=><option key={vot.Qyteti}>
                    {vot.Qyteti}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">NrPersonal</span>
            <select className="form-select"
            onChange={this.changeNrPersonal}
            value={Shteti}>
                {votuesit.map(vot=><option key={vot.NrPersonal}>
                    {vot.NrPersonal}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <select className="form-select"
            onChange={this.changeEmail}
            value={Shteti}>
                {votuesit.map(vot=><option key={vot.Email}>
                    {vot.Email}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">NrTelefonit</span>
            <select className="form-select"
            onChange={this.changeNrTelefonit}
            value={Shteti}>
                {votuesit.map(vot=><option key={vot.NrTelefonit}>
                    {vot.NrTelefonit}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Kategoria</span>
            <select className="form-select"
            onChange={this.changeKategoria}
            value={Shteti}>
                {votuesit.map(vot=><option key={vot.Kategoria}>
                    {vot.Kategoria}
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
    
    </div>

    {VotuesiId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {VotuesiId!=0?
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