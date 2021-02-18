export const postBlog=(userId,token,blog)=>{
  return fetch(`/api/blog/${userId}`,{
    method:"POST",
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify(blog)
  })
  .then(response=>{
    return response.json();
  })
  .catch(err=>{
    console.log(err);
  })
};

export const likeBlog=(userId,blogId,token)=>{
  return fetch(`/api/likeblog/${blogId}/${userId}`,{
    method:"PUT",
    headers:{
      Accept:"application/json",
      Authorization:`Bearer ${token}`
    }
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const deleteBlog=(userId,blogId,token)=>{
  return fetch(`/api/blog/${blogId}/${userId}`,{
    method:"DELETE",
    headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
  })
  .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
}

export const getBlog=(blogId)=>{
  return fetch(`/api/blog/${blogId}`,{
    method:"GET",
    headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

        }
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const getAllBlogs=()=>{
  return fetch(`/api/blog`,{
    method:"GET",
    headers: {
        Accept: "application/json",
    }
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const getUserBlogs=(userId)=>{
  return fetch(`/api/blog/${userId}`,{
    method:"GET",
    headers: {
        Accept: "application/json",
    }
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const updateBlog = (blogId,userId,token,blog) => {
    return fetch(`/api/blog/${blogId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(blog)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
