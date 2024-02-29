import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import FavPoke from "./components/FavPoke";
import ReactLoading from 'react-loading';

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokeID,setPokeId] = useState(1);
  const [favPoke,setFavPoke] = useState([]);
  let isExist=false;
  useEffect(() => {
    let abortController = new AbortController();
    async function loadPoke(){
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeID}`, {
          signal: abortController.signal,
        });
        setError("");
        setPoke(response.data);
      } catch (error) {
        setError("Something went wrong !?");
      } finally {
        setLoading(false);
      }
    };
    loadPoke();
    return () => abortController.abort();
  }, [pokeID]);
  function prevPoke(){
    pokeID-1>0 ? setPokeId((pokeID)=>(pokeID-1)) : setPokeId(248)
  }
  function nextPoke(){
    pokeID+1<249 ? setPokeId((pokeID)=>(pokeID+1)) : setPokeId(1)
  }
  function addFav(){
    const newFav=poke?.id;
    favPoke.some((fav,index)=>{
      console.log(index,newFav,fav.id);
      if (newFav===fav.id){
        isExist = true;
        return ;
      }
    });
    console.log(isExist);
    !isExist ? setFavPoke((previous)=>([...previous,poke])) : null;
    isExist=false;
  }
  function removeFav(deleteId){
    setFavPoke((previous)=>(previous.filter((item,index)=>(index!=deleteId))))
  }

  return (
  <div className="grid max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
    {loading ? <div className="grid grid-cols-2"><ReactLoading type="spin" color="pink" height={'50%'} width={'50%'}/> Loading...</div> :
    <><div className="h-fit">
        <div className="capitalize flex flex-inline text-5xl font-bold justify-center">{poke?.name} <img className="-mt-3 -ml-3 flex" src={poke?.sprites?.front_default} alt={poke.name}></img></div>
        <button onClick={addFav} className="my-3">Add to Favorite</button>
        <br />
        <img className="h-3/6 w-3/6 mb-6 mx-auto" src={poke?.sprites?.other?.home?.front_default} alt={poke.name}></img>
        <div className="mx-auto mb-6 text-left block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="capitalize"><b>Name :</b> {poke?.name}</div>
        <div><b>ID :</b> {poke?.id}</div>
        <div><b>Abilities :</b> </div>
        <ul>
        
          {poke?.abilities?.map((abilityItem,index)=>(<li key={index}>- {abilityItem.ability.name}</li>))}
        </ul></div>
      <div className="grid grid-cols-2 gap-6">
        <button onClick={prevPoke} className="mx-1.5">Previous</button>
        <button onClick={nextPoke}>Next</button>
      </div>
    </div>
      <div>
        <h2 className="text-3xl mb-10 font-bold">My Favorite Pokemon</h2>
        {favPoke.length>0 ? <FavPoke favorite={favPoke} removeFav={removeFav}/> : <div className="flex h-4/5 flex-wrap content-center justify-center ml-8 mr-3 mt-3 rounded">Please add your favorite Pokemon!</div>}
      </div></>}
    </div>
  </div>)
}

export default App;
