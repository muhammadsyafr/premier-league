import {
    IonButtons,
    IonHeader,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCol,
    IonBadge,
    IonCardSubtitle,
    IonRow,
    IonImg,
    IonButton,
    IonModal,IonIcon,
    IonContent,IonText
  } from "@ionic/react";
  import { arrowBack, alarmOutline } from "ionicons/icons";
  import React, {useEffect, useState} from "react";
  import { fetchData, convertDate, getLogos,convertTime } from "../../service/index";

  const CardMatch = (props: any) => {
    const [showModal, setShowModal] = useState(false);
    let getTeamName: any = localStorage.getItem("team_name");
    if (!getTeamName) {
      getTeamName = 'Man United'
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
             
            </IonCol>
            <IonCol>
             
            </IonCol>
            <IonCol>
              
            </IonCol>
          </IonRow>
          <IonCardSubtitle className="ion-text-center">
            {getTeamName === props.data.strHomeTeam ? (
              <IonBadge color="tertiary">Home</IonBadge>
            ) : (
              <IonBadge color="secondary">Away</IonBadge>
            )} &nbsp;
            <IonBadge color="success">{convertTime(props.data.strTime)}</IonBadge>
          </IonCardSubtitle>
          
        </IonCardContent>

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
  
  const Nextmatch: React.FC = () => {
    const [nextMatch, setNextMatch] = useState<any>();

    useEffect(() => {
      document.title = "Next Match"
      let getTeamId: any = localStorage.getItem("team_id");
      fetchData("next_match",getTeamId).then((res: any) => {
        // console.log(res.events)
        setNextMatch(res.events);
      });
    }, []);
  
    return (
      <div>
      {nextMatch
        ? nextMatch.map((val: any, idx: number) => (
            <CardMatch data={val} key={idx} />
          ))
        : "Loading"}
    </div>
    );
  };
  
  export default Nextmatch;
  