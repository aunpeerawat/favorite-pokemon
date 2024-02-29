import React,{useState} from 'react'
import {FaHeart} from 'react-icons/fa'

function FavPoke({favorite,removeFav,addFav}) {
  return (
    <div className='container'>
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {favorite?.map((pokemon,index)=>(
        <div className='my-4 md:my-0' key={index}>
            <h3 className='capitalize font-bold'>{pokemon.name}</h3>
            <img className="mb-6 mx-auto sm:w-3/6 md:w-auto" src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon.name}></img>
            <button onClick={()=>{removeFav(index)}}><FaHeart className='text-red-500'/></button>
        </div>))}
    </div></div>
  )
}

export default FavPoke