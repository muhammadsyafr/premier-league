import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonImg,
  IonButton,
} from "@ionic/react";
import { fetchData } from "../../service/index";

const CardTeam = (props:any) => {
  // let history = useHistory();
// console.log(props);
  const setTeamToState = (team:any) => {
    console.log(team)
    window.localStorage.setItem("team_name", team.name);
    window.localStorage.setItem("team_id", team.teamId);
    window.localStorage.setItem("team_logo", team.logo);
    // window.location.reload();
    // history.push('/page/Profile')
    window.location.replace('/')
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
              // onClick={() => setShowModal(true)}
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
      // console.log(res);
      setTeams(res.teams);
    });
  }, []);
  return (
    <IonGrid>
      <IonRow>
        {
          teams ?
          teams.map((val:any, idx:number) => <CardTeam teamId={val.idTeam} name={val.strTeam} key={idx} logo={val.strTeamBadge}  /> )
          : 'Loading'
        }
      </IonRow>
    </IonGrid>
  );
};

export default Main;
