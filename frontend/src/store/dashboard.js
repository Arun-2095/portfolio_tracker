const initialState = {
count:0
};


const dashboardReducer = (state = initialState, action)=>{

switch(action.type){
  
    case "increment": {

        return {
             ...state,
             count: state.count + action.payload
        }
    }
    default:
    return  { ...state}


}


}

export default dashboardReducer;