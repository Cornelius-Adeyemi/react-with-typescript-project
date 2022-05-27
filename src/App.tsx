import React from 'react';

import './App.css';


interface propsType {};

interface listProps {
  list: any[]
}

interface detailsState {
  name:string,
  age:string|number,
  url:string,
  details:string,
  inputBool:{
    name:boolean,
    age:boolean,
    details:boolean
  },
  list:any[]
}

function List(props:listProps):JSX.Element{
  return (<div>
       <ul>
         {props.list.map((item,index)=>{
           return( <li key={index}>
             <div className='list-map'> <div className='image-name'> <div className='image-div'><img src={item.url}/></div><h4>{item.name}</h4> </div> 
                   <div className='age-detail'> <h5>{`${item.age} years old`}</h5> </div> 
                   <div className='age-detail'> <h5>{item.details}</h5></div>
             </div>
           </li>)
         })}
       </ul>
  </div>)
}


class Details extends React.Component<propsType, detailsState>{
  name!: HTMLInputElement | null;
  age!: HTMLInputElement | null;
  details!: HTMLTextAreaElement | null;
  constructor(props:propsType){
    super(props);
    this.state  = {name:"", age:"",url:"",details:"",
    inputBool:{name:false,age:false,details:false},
    list:[]};
    this.onchangeHandler = this.onchangeHandler.bind(this);
    this.onclickHandler= this.onclickHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.colorHandler = this.colorHandler.bind(this);
  }

  onchangeHandler(e:React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>){
    this.setState((state)=>{
      return{...state,[e.target.name]:e.target.value}
    })
  }

  onclickHandler(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    this.setState((state)=>{
      return{name:'',age:"", url:"",details:"",list:[...state.list,{name:state.name,age:state.age,url:state.url,details:state.details}]}
    })
  }

  errorHandler(){
     const errorObject = {
       name:"",
       age:"",
       details:""
     }

    if(this.state.inputBool.name && this.state.name ===""){
      errorObject.name = "this shouldn't be left blank"
    }else if(this.state.inputBool.name && this.state.name.length <= 2){
      errorObject.name = "Please provide a valid name";
    }
    if(this.state.inputBool.age && this.state.age===""){
      errorObject.age = "Please provide us your age";
    }else if( this.state.inputBool.age && this.state.age<10){
      errorObject.age = "You are too small for my party";
    }
    if(this.state.inputBool.details && this.state.details===""){
      errorObject.details = "give a brief description of this person";
    }else if(this.state.inputBool.details && this.state.details.length<5){
    errorObject.details = "Too short";
  }

  return errorObject;
}

blurHandler(e:React.FocusEvent<HTMLInputElement|HTMLTextAreaElement, Element> | React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
 // this.setState((state)=>{return{inputBool:{[e.target.name]:!state.inputBool.name}}})
 if(e.target.name==="name"){
  this.setState((state)=>{return{inputBool:{...state.inputBool,[e.target.name]:true}}})
 }else if(e.target.name === "age"){
  this.setState((state)=>{return{inputBool:{...state.inputBool,[e.target.name]:true}}})
 }else if(e.target.name === "details"){
  this.setState((state)=>{return{inputBool:{...state.inputBool,[e.target.name]:true}}})
 }
}

colorHandler(prevState:detailsState){
  const error = this.errorHandler();
  // for name
  if(error.name !=="" && prevState.inputBool.name){
      this.name!.style.outlineColor = "red"

  }else{
    this.name!.style.outlineColor="black"
  }  

  // for age
  if(error.age !=="" && prevState.inputBool.age){
    this.age!.style.outlineColor = "red"

}else{
  this.age!.style.outlineColor="black"
}

//for details
if(error.details !=="" && prevState.inputBool.details){
  this.details!.style.outlineColor = "red"

}else{
this.details!.style.outlineColor="black"
} 


}


componentDidUpdate(prevProps:propsType, prevState:detailsState){

  //console.log(this.state.name)
 
this.colorHandler(this.state);
  

}



render(): React.ReactNode {

      const error = this.errorHandler()
      

      const validation = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(error.name==="" && error.age==="" && error.details==="" && this.state.inputBool.age===true && this.state.inputBool.details===true && this.state.inputBool.name===true){
          this.onclickHandler(e);
          this.setState((state)=>{return{inputBool:{name:false,age:false,details:false}}})
        }else{
          return false;
        }
      }
      
      return (<div>
        <h2> People Invited To My Party </h2>

       <List list ={this.state.list}/>
        

        <div className='form-div'>
          <form onSubmit={(e)=>{return(validation(e))}} >
            <input ref={(element)=>this.name=element} type="text" value={this.state.name} placeholder="Name" name="name" onChange={(e)=>{this.onchangeHandler(e);this.blurHandler(e)}} onBlur={this.blurHandler} />
            <div id='error-p'>{error.name}</div>
            <input type="number" ref={(element)=>this.age=element} value={this.state.age} placeholder="Age" name='age'onChange={(e)=>{this.onchangeHandler(e);this.blurHandler(e)}} onBlur={this.blurHandler} />
            <div id='error-p'>{error.age}</div>
            <input type="text" value={this.state.url} placeholder="Enter url" name='url' onChange={this.onchangeHandler}  />
            
            <textarea value={this.state.details} ref={(element)=>this.details=element} placeholder='Enter' name='details' onChange={(e)=>{this.onchangeHandler(e);this.blurHandler(e)}} onBlur={this.blurHandler}/>
            <div id='error-p'>{error.details}</div>
            <button type='submit' className='button-class'  >Add to List</button>


          </form>
        </div>
      </div>)
  }
}



function App() {
  return (
    <div className="App">
      <Details/>
    </div>
  );
}

export default App;
