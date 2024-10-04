import { useParams } from 'react-router-dom';
import StockGraph from "./graphs";
import Trade from "./trade";

const StocksInfo =() =>{
    const { username, stockname } = useParams();
     console.log("usssssssssss",username,stockname);
     
    return (
        <>
            <StockGraph stockname={stockname} />
            <Trade username={username} stockname={stockname} />
        </>
        
    )
}

export default StocksInfo;