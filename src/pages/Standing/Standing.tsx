import React, {useState, useEffect} from "react";
// import { useParams } from "react-router";
import "./Standing.css";
import { fetchData } from "../../service/index";

const Standing: React.FC = () => {
  // const { name } = useParams<{ name: string }>();
  const [standing, setStandings] = useState<any>();

  useEffect(() => {
    document.title = "Standings"
    fetchData("standings",'').then((res: any) => {
      setStandings(res.table);
    });
  }, []);

  const Teams = (props:any) => {
    // console.log(props.data)
    return(
      <tbody>
      <tr>
        <td>{parseInt(props.numb) + 1}</td>
        <td>{props.data.name}</td>
        <td>{props.data.played}</td>
        <td>{props.data.goalsfor}</td>
        <td>{props.data.goalsagainst}</td>
        <td>{props.data.goalsdifference}</td>
        <td>{props.data.win}</td>
        <td>{props.data.draw}</td>
        <td>{props.data.loss}</td>
        <td>{props.data.total}</td>
        </tr>
        </tbody>
    )
  }

  return (
    <table id="customers">
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>M</th>
        <th>GF</th>
        <th>GA</th>
        <th>GD</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>P</th>
      </tr>
      </thead>
        {
          standing ? 
          standing.map((element:any, idx:number) => <Teams data={element} key={idx} numb={idx}/>)
          : 'Loading'
        }
      
    </table>
  );
};

export default Standing;
