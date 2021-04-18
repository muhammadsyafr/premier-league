import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonImg,
  IonButton,
  IonRefresher,
  IonRefresherContent
} from "@ionic/react";
import { RefresherEventDetail } from '@ionic/core';
import { fetchData } from "../../service/index";

const CardTeam = (props:any) => {
  const setTeamToState = (team:any) => {
    console.log(team)
    window.localStorage.setItem("team_name", team.name);
    window.localStorage.setItem("team_id", team.teamId);
    window.localStorage.setItem("team_logo", team.logo);
    // window.location.reload();
    // history.push('/page/Profile')
    window.location.replace('/page/Profile')
  }

  return (
    <div onClick={ () => setTeamToState(props)}>
      <IonCard>
        <div className="ion-text-center">
          <IonImg
            style={{ width: "100px", padding: "10px" }}
            src={props.logo}
          />
        </div>
        <div className="ion-text-center">
          <IonCardContent className="">
          <IonCardSubtitle>{props.name}</IonCardSubtitle>
            <IonButton
              size="small"
              mode="ios"
              fill="clear"
              expand="block"
            >
              Choose Team
            </IonButton>
          </IonCardContent>
        </div>
      </IonCard>
    </div>
  );
};

const Main: React.FC = () => {
  const [teams, setTeams] = useState<any>();

  useEffect(() => {
    document.title = "Main";
    fetchData("all_team", '').then((res: any) => {
      setTeams(res.teams);
    });
  }, []);

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log('Begin async operation');
    fetchData("all_team", '').then((res: any) => {
      setTeams(res.teams);
      console.log(res.teams)
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();  
    }, 2000);
  }

  return (
    <div>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={100} pullMax={200}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        {
          teams ?
          teams.map((val:any, idx:number) => <CardTeam teamId={val.idTeam} name={val.strTeam} key={idx} logo={val.strTeamBadge}  /> )
          : 'Loading'
        }
      </IonRow>
    </IonGrid>
    </div>
  );
};

export default Main;
