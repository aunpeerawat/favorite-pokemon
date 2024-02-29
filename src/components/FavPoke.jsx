import React,{useState} from 'react'
import {FaHeart} from 'react-icons/fa'

function FavPoke({favorite,removeFav}) {
  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
        {favorite?.map((pokemon,index)=>(
        <div key={index}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon.name}></img>
            <button onClick={()=>{removeFav(index)}}><FaHeart className='text-red-500'/></button>
        </div>))}
    </div>
  )
}

export default FavPoke