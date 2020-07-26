import {SET_CONTACTS,SET_CHATS,GET_TOGGLE_VAl} from '../actions/types';
// import {setContacts,setChats} from '../actions/Toggle';

const initialState = {
    toggleVal:{
        showContacts : true,
        showChats :false
    }
}



export default  function(state = initialState,actions){
    const {type} = actions;
    switch(type){
        case SET_CONTACTS: 
            console.log(actions.toggle);
            return {...state,toggleVal:actions.toggle};
        
        case SET_CHATS:
            console.log(actions.toggle);
            return {...state,toggleVal : actions.toggle};
        case GET_TOGGLE_VAl:
            console.log(actions.toggle);
            return {...state,toggle_val : state};
        default:
            return state;

    }
}