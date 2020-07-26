import {SET_CONTACTS,SET_CHATS,GET_TOGGLE_VAl} from '../actions/types';


export const setContacts = (Contats,Chats) => dispatch =>{
    dispatch({
        type:SET_CONTACTS,
        toggle:{showContats:Contats,showChats:Chats}
    });

};

export const setChats = (Contats,Chats) => dispatch=>{
    dispatch({
        type:SET_CHATS,
        toggle:{showContats:Contats,showChats:Chats}
    });
};

export const getToggleVal = () => dispatch =>{
    dispatch({
        type:GET_TOGGLE_VAl,
        toggle_val:{}
    })
}