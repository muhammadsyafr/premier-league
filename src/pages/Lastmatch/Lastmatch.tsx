import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonBadge,
  IonImg,
  IonButton,
  IonModal,
  IonIcon,
  IonContent,
  IonText
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { fetchData, getLogos, convertDate } from "../../service/index";
import "./Lastmatch.css";
import { arrowBack } from "ionicons/icons";

const CardMatch = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  let getTeamName: any = localStorage.getItem("team_name");
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
          {getTeamName == props.data.strHomeTeam ? (
            <IonBadge color="tertiary">Home</IonBadge>
          ) : (
            <IonBadge color="danger">Away</IonBadge>
          )}
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
              <IonBadge color="success">{props.data.intHomeScore}</IonBadge>
            ) : (
              <IonBadge color="danger">{props.data.intHomeScore}</IonBadge>
            )}
          </IonCol>
          <IonCol>
            <small></small>
          </IonCol>
          <IonCol>
            {props.data.intAwayScore >= props.data.intHomeScore ? (
              <IonBadge color="success">{props.data.intAwayScore}</IonBadge>
            ) : (
              <IonBadge color="danger">{props.data.intAwayScore}</IonBadge>
            )}
          </IonCol>
        </IonRow>
      </IonCardContent>
      <IonButton
        size="small"
        mode="ios"
        fill="clear"
        expand="block"
        onClick={() => setShowModal(true)}
      >
        See More Details
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
          <IonText style={{ padding: "10px", lineHeight: "20px" }}>
            {props.data.strEvent}
          </IonText>
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
    fetchData("last_match", getTeamId).then((res: any) => {
      console.log(res.results);
      setLastMatch(res.results);
    });
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
