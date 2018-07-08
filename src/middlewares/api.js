import $ from 'jquery';
import SAPHANATreeView from '../Datafiles/SAPHANATreeView.json';

const canceled = {};

const apiMiddleware = ({ dispatch }) => (next) => (action) => {

  const handleResponse = (data) => {    
       
    if (action.cancelable && canceled[action.cancelable]) {
      return;
    } 
      dispatch({ type: action.payload.next.SUCCESS, payload: data })

  };
  if (action.type === 'API_REQUEST') {
 
    fetch(action.payload.url)
      .then((response) => response.json())
      .then(handleResponse);
 
    dispatch({ type: action.payload.next.PENDING });
  }

    if (action.type === 'API_REQUEST_POST') {
      
    $.ajax({
       type: 'POST',
       url: action.payload.url,
       dataType: 'json',
       contentType: 'application/json; charset=utf-8',
       data: JSON.stringify(action.payload.data),
       success: function (response){
        handleResponse(response);        
       },
       failure: function (response){
         console.log(response);
       }
    });

      // fetch(action.payload.url,{
      //     method: 'POST',
      //     dataType: 'json',
      //     contentType: 'application/json',
      //     body: JSON.stringify(action.payload.data)
      // })
      // .then((response) => response.json())
      // .then(handleResponse);    
 
    dispatch({ type: action.payload.next.PENDING });
  }

  if (action.type === 'CANCEL_API_REQUEST') {
    canceled[action.id] = true;
    setTimeout(() => delete canceled[action.id], 5000);
  }

  return next(action);
};

export default apiMiddleware;