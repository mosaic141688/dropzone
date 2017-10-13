
export const  SOCKET_CONNECT= (state,  status ) => {
            state.connect = true;
            console.log('SOCKET_CONNECT');
        }

export const SOCKET_CREATE_CLASS = (state , data) => {
 // console.log('SOCKET_CREATE_CLASS '+JSON.stringify(data));
  setAct(state,data);
}

export const SOCKET_NEW_STUDENT = (state,data ) => {
  //console.log('SOCKET_CREATE_STUDENT '+JSON.stringify(data));
  setAct(state,data);
}

export const SOCKET_NEW_TERM = (state,data ) => {
  //console.log('SOCKET_CREATE_TERM ',data);
  setAct(state,data);
}

export const SOCKET_NEW_SUBJECT = (state,data) => {
  //console.log('SOCKET CRESTE SUBJECT',data)
  setAct(state,data);
}

export const SOCKET_NEW_USER = (state,data) => {
  //console.log('SOCKET CRESTE USER',data)
  setAct(state,data);
}


export const SOCKET_GET_TESTS = (state,data) => {
  console.log('TESTS ',data);
  if(!data.error) state.tests = data.data;
}

export const SOCKET_TERMS = (state,data) => {
  console.log('TERMS ',data);
  if(!data.error) state.terms = data.data;
}

export const setAct=(state,data)=>{
     state.act={name:'create_class',data:data}
}

export const resetAct = (state) => {
  state.act = null;
}

export const resetAcount = (state) => {
  state.uid=null;
}


export const setUid = (state,_uid) =>{
  state.uid=_uid;
}

