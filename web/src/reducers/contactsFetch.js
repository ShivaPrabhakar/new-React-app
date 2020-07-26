import {FETCH_CONTACTS,FETCH_CHATS} from '../actions/types';

const initialState = {
    constacts:[]
}



export default  function(state = initialState,actions){
    const {type} = actions;
    switch(type){
        case FETCH_CONTACTS: 
            console.log(actions.toggle);
            return {...state,constacts:actions.toggle};
        
        case FETCH_CHATS:
            console.log(actions.toggle);
            return {...state,constacts : actions.toggle};
        default:
            return state;

    }
}