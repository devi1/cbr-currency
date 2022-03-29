import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Valute, ValuteObject} from './Main';
import { useNavigate } from 'react-router-dom';

function Data(){

    const location = useLocation();
    const state = location.state as Valute;
    const [valuteObj, setValueObj] = useState<ValuteObject>();
    const [valuteObjDaily, setValuteObjDaily] = useState<ValuteObject>();
    const [valutes, setValutes] = useState<Valute[]>([]);
    const [valutesDaily, setValutesDaily] = useState<Valute[]>([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        getDailyData();
        getArchiveData();
    }, [valutesDaily]);

    useEffect(() => {
        getArchiveData();
    }, [valutes]); 

    useEffect(() => {
        if (valuteObj !== undefined) {
            for(const [index, data] of Object.entries(valuteObj)){
                const res = valutes.filter((item) => item.CharCode === data.CharCode);
                if (res.length === 0){
                valutes.push(data);
                }
            }
            setValutes(valutes);
        }
    }, [valuteObj]);



    
    useEffect(() => {
        if (valuteObjDaily !== undefined) {
            for(const [index, data] of Object.entries(valuteObjDaily)){
                const res = valutesDaily.filter((item) => item.CharCode === data.CharCode);
                if (res.length === 0){
                    valutesDaily.push(data);
                }
            }
            setValutesDaily(valutesDaily);
        }
    }, [valuteObjDaily]);
    

    async function getArchiveData(){
        const resArchive = await fetch("https://www.cbr-xml-daily.ru/archive/2022/02/11/daily_json.js");
        const data = await resArchive.json();
        console.log(data);
        setValueObj(data.Valute);
    }

    async function getDailyData(){
        const resArchive = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
        const data = await resArchive.json();
        console.log(data);
        setValuteObjDaily(data.Valute); 
    }

    const getItemPrev = (id: string): Valute => {

        const res = valutesDaily.filter((item) => item.CharCode === id);

        console.log(res);
        
        return res[0];
    }
    const getItem = (id: string): Valute => {

        const res = valutes.filter((item) => item.CharCode === id);

        console.log(res);

        return res[0];
    }


    console.log(valutesDaily, valutes);
    return(
        <div>
            <h2>{state.CharCode}</h2>
            <table>
                <tbody>
                    <tr>
                        <th>29.03.2022</th>
                        <th>Change</th>
                        <th>26.03.2022</th>
                        <th>Change</th>
                        <th>11.02.2022</th>
                        <th>Change</th>
                        <th>10.02.2022</th>
                    </tr>
                    <tr>
                        <td>{getItemPrev(state.CharCode)?.Value}</td>
                    <td style={{color:(getItemPrev(state.CharCode)?.Value > getItemPrev(state.CharCode)?.Previous)? 'green':'red'}}>
                            {(getItemPrev(state.CharCode)?.Value > getItemPrev(state.CharCode)?.Previous)?
                            "▲"+(((getItemPrev(state.CharCode)?.Value) - getItemPrev(state.CharCode)?.Previous)*100/getItemPrev(state.CharCode)?.Previous).toFixed(4)+"%":
                            "▼"+(((getItemPrev(state.CharCode)?.Previous) - getItemPrev(state.CharCode)?.Value)*100/getItemPrev(state.CharCode)?.Value).toFixed(4)+"%"} 
                        </td> 
                        <td>{getItemPrev(state.CharCode)?.Previous}</td>
                        <td style={{color: (getItemPrev(state.CharCode)?.Previous > getItem(state.CharCode)?.Value)? 'green':'red'}}>
                            {(getItemPrev(state.CharCode)?.Previous > getItem(state.CharCode)?.Value)?
                            "▲"+(((getItemPrev(state.CharCode)?.Previous) - getItem(state.CharCode)?.Value)*100/getItem(state.CharCode)?.Value).toFixed(4)+"%":
                            "▼"+(((getItem(state.CharCode)?.Value) - getItemPrev(state.CharCode)?.Previous)*100/getItemPrev(state.CharCode)?.Previous).toFixed(4)+"%"} 
                        </td> 
                        <td>{getItem(state.CharCode)?.Value}</td>
                        <td style={{color:(getItem(state.CharCode)?.Value > getItem(state.CharCode)?.Previous)? 'green':'red'}}>
                            {(getItem(state.CharCode)?.Value > getItem(state.CharCode)?.Previous)?
                            "▲"+(((getItem(state.CharCode)?.Value) - getItem(state.CharCode)?.Previous)*100/getItem(state.CharCode)?.Previous).toFixed(4)+"%":
                            "▼"+(((getItem(state.CharCode)?.Previous) - getItem(state.CharCode)?.Value)*100/getItem(state.CharCode)?.Value).toFixed(4)+"%"} 
                        </td> 
                        <td>{getItem(state.CharCode)?.Previous}</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => navigate(`/`)}>
                Back
            </button>
          
        </div>
    )
}


export default Data;