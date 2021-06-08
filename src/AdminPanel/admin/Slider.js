import React  from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css' 
import '../styles/indexNew.css'
import ResponsiveDrawer from './ResponsiveDrawer'
import {Loading } from '../components/Icons'

class Silder extends React.Component {
  state={
    sliderid:"",
    sliderstatus:'',
    title:'',
    btntext:'',
    btnlink:'',
    description:'',
    image:'',
    loading:true
  }

    render() {
        console.log(this.state);

        return (
            <div className="dashboard" style={{paddingTop:100}}>
                <ResponsiveDrawer />
                <section class="content-admin">
        <div class="container-fluid">
   <div class="container bg-white p-4 mt-5 shadow" style={{borderRadius: "10px"}}>
    <h5 class="mb-2">Sliders</h5>
      <hr/>
     <div class="row">
       <div class="ol-sm-12 col-md-4 col-4">
       <form method="post" action="https://clinkdelivery.com/admin/slider" enctype="multipart/form-data">
       <input type="hidden" name="_token" value="lDU5tVnWtVuj7m96v2TCsgetZ5WDKunqIbJaIVnX"></input>          
        <div class="form-group">
                <label for="name" class="font-weight-bold">SLider ID</label>
                <input type="hidden" name="sldid" id="sldId" onChange={(e) => this.setState({sliderid: e.target.value})}></input>
                <input type="text"  onChange={(e) => this.setState({sliderid: e.target.value})} class="form-control " aria-describedby="text" placeholder="Auto Assigned" disabled></input>
              </div>
               <div class="form-group">
                <label for="title" class="font-weight-bold">Title</label>
                <input type="text" id="sldTitle" class="form-control" onChange={(e) => this.setState({title: e.target.value})} name="title" aria-describedby="text" placeholder="Title"></input>
              </div>
               <div class="form-group">
                <label for="description" class="font-weight-bold">Description</label>
                <textarea id="sldDescription" name="description"onChange={(e) => this.setState({description: e.target.value})} placeholder="write..." class="form-control w-100" rows="3"></textarea>
                
              </div>
           
       </form>
       </div>
       <div class="col-sm-12 col-md-4 col-4">
              <div class="form-group">
                <label class="font-weight-bold">Slider Status</label><small class="req"> *</small>
                  <select onChange={(e) => this.setState({sliderstatus: e.target.value})} id="sldStatus" name="status" class="form-control">
                          <option value="active">Active</option>
                          <option value="not active">Not Active</option>
                  </select>    
                  <div class="col-sm-12 col-md-4 col-4 mt-4">
               <div class="form-group">
                <label for="btn_text" class="font-weight-bold">Image</label><br/>
                 <img src="./Silder_files/default.jpg" id="sldImage" onChange={(e) => this.setState({image: e.target.files[0]})} alt="" class="img-fluid" style={{width: "250px"}}></img>
              </div>
               
              <div class="form-group">
                <input type="file" name="slimg" id="showImgSlid" class="form-control-plaintext " aria-describedby="text" placeholder="Auto Assigned"></input>
              </div>
               <button type="submit" class="btn btn-success"><i class="fa fa-save"></i> { this.state.loading ? <Loading color="#fffa" /> : " Save"}</button>
       </div>
              </div>

       </div>
       
     </div>
   </div>
  <div class="container bg-white p-4 mt-5 shadow mb-5" style={{borderRadius: "10px"}}>
    <h4><i class="fa fa-image"></i>Slider</h4>
    <hr/>

      <div style={{overflowX:"auto"}} class="w-100">
                      
                       <table class="table  table-bordered mx-auto">
              <thead class="thead-light">
                <tr>
                <th class="row_style">Silder Image</th>
                  <th class="row_style">Title</th>
                  <th class="row_style">Description</th>
                  <th class="row_style">Status</th>
                   <th class="row_style">Action</th>
                </tr>
              </thead>
              <tbody>
                                                    <tr>
                    <input type="hidden" class="SliderId" value="2"></input>
                <td>
                    <img class="SliderImg" src="./Orders_files/1611224843.png" width="40px" height="40px" alt="Slider"></img>
                  </td>
                  <td class="SliderTitle">Time to Clink it up
                     </td>
                     <td class="SliderDescription">Every celebration deserves a clink! Have your favorite Alcohol delivered to you instantly with Clink Delivery we provide you with .
                       </td>
                     
                         <td class="SliderStatus">active
                           
                             </td>
                             <td>
                                 <a style={{marginRight: "20px"}} href="https://clinkdelivery.com/admin/front-slider#" class="EditSliderD">Edit</a> <a href="https://clinkdelivery.com/admin/sldel/2" style={{color: "red"}}>Delete</a>
               
                </td>
                </tr>
                                                               </tbody>
            </table>
                    </div>
  </div>
        </div>
        </section>
            </div>
        )

    }
}
export default Silder