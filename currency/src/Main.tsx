import React, {useState, useEffect, useRef, useMemo} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useNavigate } from 'react-router-dom';
import './App.css';

export interface ValuteObject {
  index: string;
  data: Valute
}

export interface Valute {
  CharCode: string;
  ID: string;
  Name: string;
  Nominal: number;
  NumCode: string;
  Previous: number;
  Value: number;
}

function Main() {

  const [valuteObj, setValueObj] = useState<ValuteObject>();
  const [valutes, setValutes] = useState<Valute[]>([]);
  const [colored, setColor] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {

    getPreData();
  }, [valuteObj]); 

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

  async function  getPreData(){
    const res = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
    const data = await res.json();
    
    setValueObj(data.Valute);
  }
  
  return (
    <div className="Main">

      <table>
        <tbody>
          <tr>
            <th>Currency</th>
            <th>Value</th>
            <th>Previous</th>
            <th>Changes</th>
          </tr>
          
          
            {valutes.map((item) => {

              

              return <tr key={item.CharCode} onClick={() => navigate(`/${item.CharCode}`, {state: item})}>
                      <td>
                          <Tooltip title={item.Name} placement="bottom"> 
                              <a>
                                  {item.CharCode}
                              </a>
                          </Tooltip>
                      </td>
                      
                      <td>{item.Value} ₽</td> 
                      <td>{item.Previous} ₽</td>
                      <td style={{color: item.Value > item.Previous ? 'green' : 'red'}}>
                          {(item.Value > item.Previous)?
                          "▲"+((item.Value - item.Previous)*100/item.Value).toFixed(4)+"%":
                          "▼" + ((item.Previous - item.Value)*100/item.Previous).toFixed(4)+"%"}
                      </td>
                  </tr>})
            }
          </tbody>
      </table>
      
    </div>
  );
}

export default Main;