import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import PostDisplay from './PostDisplay';
import { POST_TYPE } from './store/PostReducer';
import { USER_TYPE } from './store/UserReducer';
import UserDisplay from './UserDisplay'

function App() {
  const [userid, setUserid] = useState(0)
  const dispatch = useDispatch()
  const [postid, setPostId] = useState(0)
  const onChangeUserId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const useridFromInput = e.target.value ? Number(e.target.value) : 0
    console.log("userid", useridFromInput);
    setUserid(useridFromInput)
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
    if(usersResponse.ok) {
      const users = await usersResponse.json()
      console.log("users", users);
      const usr = users.find((userItem: any) => {
        return userItem && userItem.id === useridFromInput
      })
      console.log("usr", usr);
      dispatch({
        type: USER_TYPE,
        payload: {
          id: usr.id,
          username: usr.username,
          email: usr.email,
          city: usr.address.city
        }
      })
    }
  }
  const onChangePostId = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const postIdFromInput = e.target.value ? Number(e.target.value) : 0
    setPostId(postIdFromInput)
    const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts/" + postIdFromInput)
    if (postResponse.ok) {
      const post = await postResponse.json()
      console.log("post", post);
      dispatch({
        type: POST_TYPE,
        payload: {
          id: post.id,
          title: post.title,
          body: post.body
        }
      })
    }
  }
  return (
    <React.Fragment>
      <div className="App" style={{width: "300px"}}>
        <label>User id</label>
        <input value={userid} onChange={onChangeUserId} />
      </div>
      <UserDisplay />
      <br />
      <div className="App" style={{width: "300px"}}>
        <label>post id</label>
        <input value={postid} onChange={onChangePostId} />
      </div>
      <PostDisplay />
    </React.Fragment>
  );
}

export default App;
