export const signup=(user)=>{
  return fetch(`/api/signup`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  })
  .then(response=>{
    return response.json()
  })
  .catch(err=>{
    console.log(err);
  })
};

export const login=(user)=>{
 return fetch(`/api/login`,{
   method:"POST",
   headers:{
     Accept:"application/json",
     "Content-Type":"application/json"
   },
   body:JSON.stringify(user)
 })
 .then(response=>{
   return response.json()
 })
 .catch(err=>{
   console.log(err);
 })
};

export const authenticate=(data,next)=>{
  if(typeof window!=="undefined"){
    localStorage.setItem("jwt",JSON.stringify(data))
    next();
  }
};

export const signout=(next)=>{
  if(typeof window!=="undefined"){
    localStorage.removeItem("jwt");
    next();
    return fetch(`/api/signout`,{
      method:"GET",

    })
    .then(response=>{
      console.log("signout",response);
    })
    .catch(err=>{
      console.log(err);
    })
  }
};

export const isAuthenticated=()=>{
  if(typeof window=="undefined"){
    return false
  }
  if(localStorage.getItem("jwt")){
    return JSON.parse(localStorage.getItem("jwt"));
  }else{
    return false;
  }
};

export const getUserData= (userId) => {
    return fetch(`/api/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
