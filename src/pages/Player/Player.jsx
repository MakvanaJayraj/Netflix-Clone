import React, { useEffect, useState } from 'react'
import './player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {
  const navigate=useNavigate();
  const {id}= useParams();
  const [apiData,setApiData]=useState({
    name:'',
    key:'',
    published_at:'',
    type:''
  })
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzIzNTlhODE2ZmQwZWE2MDMyMTAxNTAyYzRlODgyNCIsIm5iZiI6MTc1MzA3ODcyMy45NDQsInN1YiI6IjY4N2RkYmMzZmJjYzJiNjkxNzM4ZDhkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ak7EPLK319ZZXkQWxOjeKL0dmPY3HlHBn4kEu3032cs'
  }
};
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
},[])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>navigate('/')}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} 
      frameborder="0" width='90%' height='90%' title='trailer' allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
