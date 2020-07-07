import {
  IonButtons,
  IonHeader,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonBadge,
  IonImg,
  IonButton,
  IonModal,
  IonIcon,
  IonContent,
  IonText,
  IonGrid
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { fetchData, getLogos, convertDate } from "../../service/index";
import "./Lastmatch.css";
import { arrowBack } from "ionicons/icons";

const CardMatch = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  let getTeamName: any = localStorage.getItem("team_name");
  if (!getTeamName) {
    getTeamName = "Man United";
  }
  const [logoAway, setLogoAway] = useState<any>();
  const [logoHome, setLogoHome] = useState<any>();

  useEffect(() => {
    getLogos(props.data.strAwayTeam).then((res) => {
      // console.log('Home', res.teams[0]);
      setLogoAway(res.teams[0].strTeamBadge);
    });
    getLogos(props.data.strHomeTeam).then((res) => {
      setLogoHome(res.teams[0].strTeamBadge);
    });
  }, []);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>
          <small className="ion-text-center" style={{ fontSize: "12px" }}>
            {props.data.strLeague} {props.data.strSeason}
          </small>
        </IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonRow className="ion-text-center ion-align-items-center">
          <IonCol className="ion-text-center">
            <IonImg style={{ width: "50px" }} src={logoHome}></IonImg>
          </IonCol>
          <IonCol>
            <small>{convertDate(props.data.dateEvent)}</small>
          </IonCol>
          <IonCol className="ion-text-center">
            <IonImg style={{ width: "50px" }} src={logoAway}></IonImg>
          </IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol>{props.data.strHomeTeam}</IonCol>
          <IonCol>vs</IonCol>
          <IonCol>{props.data.strAwayTeam}</IonCol>
        </IonRow>
        <IonRow className="ion-text-center">
          <IonCol>
            {props.data.intHomeScore >= props.data.intAwayScore ? (
              <IonBadge className="score" color="success">
                {props.data.intHomeScore}
              </IonBadge>
            ) : (
              <IonBadge className="score" color="danger">
                {props.data.intHomeScore}
              </IonBadge>
            )}
          </IonCol>
          <IonCol>
            <small></small>
          </IonCol>
          <IonCol>
            {props.data.intAwayScore >= props.data.intHomeScore ? (
              <IonBadge className="score" color="success">
                {props.data.intAwayScore}
              </IonBadge>
            ) : (
              <IonBadge className="score" color="danger">
                {props.data.intAwayScore}
              </IonBadge>
            )}
          </IonCol>
        </IonRow>
        <IonCardSubtitle className="ion-text-center">
          {getTeamName === props.data.strHomeTeam ? (
            <IonBadge mode="ios" color="tertiary">Home</IonBadge>
          ) : (
            <IonBadge mode="ios" color="secondary">Away</IonBadge>
          )}
        </IonCardSubtitle>
      </IonCardContent>
      <IonButton
        size="small"
        mode="ios"
        fill="clear"
        expand="block"
        onClick={() => setShowModal(true)}
      >
        Detail Match
      </IonButton>

      <IonModal isOpen={showModal} cssClass="ion-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start" onClick={() => setShowModal(false)}>
              <IonButton fill="clear">
                <IonIcon icon={arrowBack} /> Back
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-text-center">
            <IonText style={{ padding: "10px", lineHeight: "20px" }}>
              <h2>{props.data.strEvent}</h2>
            </IonText>
          </div>
          <IonGrid>
            <IonRow>
              <IonCol size="6">
              {/* Home */}
              {props.data.strHomeGoalDetails}
              </IonCol>
              <IonCol size="6">
              {/* Away */}
              {props.data.strAwayGoalDetails}
              </IonCol>
            </IonRow>
            </IonGrid>
        </IonContent>
      </IonModal>
    </IonCard>
  );
};

const Lastmatch: React.FC = () => {
  const [lastMatch, setLastMatch] = useState<any>();

  useEffect(() => {
    document.title = "Last Match";
    let getTeamId: any = localStorage.getItem("team_id");
    if (!getTeamId) {
      fetchData("last_match", 133612).then((res: any) => {
        // console.log(res.results);
        setLastMatch(res.results);
      });
    } else {
      fetchData("last_match", getTeamId).then((res: any) => {
        console.log(res.results);
        setLastMatch(res.results);
      });
    }
  }, []);

  return (
    <div>
      {lastMatch
        ? lastMatch.map((val: any, idx: number) => (
            <CardMatch data={val} key={idx} />
          ))
        : "Loading"}
    </div>
  );
};

export default Lastmatch;
