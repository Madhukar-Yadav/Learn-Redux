
const initialState = {
    Employees: [{id:'1', name:'Madhu', exp: 4},{id:'2', name:'Raj', exp: 4}],
    EditEmp: ''
};

const newReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case'ADD_USER':
      console.log(state);

      let newUser = { 
                        id: action.payload.id, 
                        name:action.payload.name, 
                        exp: action.payload.exp,
                      };
        return Object.assign({}, state, {
            Employees: state.Employees.concat(newUser)
    });

    case 'UPDATE_USER':
     console.log(action);
      return Object.assign({}, state, {
          Employees : state.Employees.map((item) => item.id !== action.payload.id ? item : Object.assign({}, action.payload )),
          EditEmp: ''
    });

    case 'GET_USER':
     console.log(action.payload.id);
     var emp = '';
     state.Employees.map((item) => {
         if(item.id === action.payload.id){
            emp = item;
         } 
     })
     return Object.assign({}, state, {
          EditEmp : emp
     });

    case 'DELETE_USER':
     return Object.assign({}, state, {
       Employees: state.Employees.filter((value, index) => {       
            if(value.id !== action.payload.id)
               return value;         
       })
    });

 }
  return state;
};

export default newReducer;
