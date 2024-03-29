import React, {useState, useEffect,} from "react";
// import { useParams } from "react-router";
import {
  IonRefresher,
  IonRefresherContent
} from "@ionic/react";
import "./Standing.css";
import { fetchData } from "../../service/index";
import { RefresherEventDetail } from '@ionic/core';
import { BrowserView, isBrowser, isMobile} from "react-device-detect";

const Standing: React.FC = () => {
  // const { name } = useParams<{ name: string }>();
  const [standing, setStandings] = useState<any>();

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
    fetchData("standings",'').then((res: any) => {
      res.table.sort(function(a:any, b:any){
        return a.intRank - b.intRank
      })
      setStandings(res.table);
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();  
    }, 2000);
  }

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
    // console.log(props.data)
    function ifMyTeam(team: string) {
      if (!localStorage.getItem("team_name")) {
        if (team === "Man United") {
          return "myTeam"
        }
      } else {
        if (team === localStorage.getItem("team_name")) {
          return "myTeam"
        }
      }
    }
    return(
      <tbody>
        <tr className={ifMyTeam(props.data.strTeam)}>
          <td className="text-center">{parseInt(props.numb) + 1}</td>
          {
            isBrowser ? <td className="text-center"><img alt={props.data.strTeam} src={props.data.strTeamBadge} /></td> : ''
          }
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
    <div>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
    <table id="customers">
      <thead>
      <tr>
        <th></th>
        {
          isBrowser ? <th> Badge </th> : ''
        }
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
    </div>
  );
};

export default Standing;
