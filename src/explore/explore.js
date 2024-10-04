import HottestStocks from "./hotteststocks.js";
import Watchlist from "./watchlist.js";
import { useParams } from "react-router-dom";

 
const Explore = () => {
    const { username } = useParams();
    return(
        <>
            <HottestStocks username ={username} />
            <Watchlist username ={username} />
        </>
         
  );
}

export default Explore;