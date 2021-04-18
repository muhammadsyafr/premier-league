import React, {useState, useEffect} from "react";
// import { useParams } from "react-router";
import "./Standing.css";
import { fetchData } from "../../service/index";
import {
  BrowserView,
} from "react-device-detect";

const Standing: React.FC = () => {
  // const { name } = useParams<{ name: string }>();
  const [standing, setStandings] = useState<any>();

  useEffect(() => {
    document.title = "Standings Premier League"
    fetchData("standings",'').then((res: any) => {
      res.table.sort(function(a:any, b:any){
        return a.intRank - b.intRank
      })
      setStandings(res.table);
    });
  }, []);

  const Teams = (props:any) => {
    console.log(props.data)
    return(
      <tbody>
        <tr className={props.data.strTeam === localStorage.getItem("team_name") ? "myTeam" : ""}>
          <td className="text-center">{parseInt(props.numb) + 1}</td>
          <BrowserView><td className="text-center"><img alt={props.data.strTeam} src={props.data.strTeamBadge} /></td></BrowserView>
          <td>{props.data.strTeam}</td>
          <td>{props.data.intPlayed}</td>
          <td>{props.data.intGoalsFor}</td>
          <td>{props.data.intGoalsAgainst}</td>
          <td>{props.data.intGoalDifference}</td>
          <td>{props.data.intWin}</td>
          <td>{props.data.intDraw}</td>
          <td>{props.data.intLoss}</td>
          <td>{props.data.intPoints}</td>
          </tr>
        </tbody>
    )
  }

  return (
    <table id="customers">
      <thead>
      <tr>
        <th></th>
        <th>Badge</th>
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
