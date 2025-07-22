import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css' 
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
const TitleCards = ({title,category}) => {
  const [apiData,setApiData]=useState([]);
  const cardRef=useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzIzNTlhODE2ZmQwZWE2MDMyMTAxNTAyYzRlODgyNCIsIm5iZiI6MTc1MzA3ODcyMy45NDQsInN1YiI6IjY4N2RkYmMzZmJjYzJiNjkxNzM4ZDhkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ak7EPLK319ZZXkQWxOjeKL0dmPY3HlHBn4kEu3032cs'
  }
};



  const handelWheel=(event)=>{
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

    cardRef.current.addEventListener('wheel',handelWheel);
  },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardRef}>
      {
        apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })
      }
      </div>
    </div>
  )
}

export default TitleCards 
