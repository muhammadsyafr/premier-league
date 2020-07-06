import {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  } from "@ionic/react";
  import React, {useEffect, useState} from "react";
  import { useParams } from "react-router";
  import { fetchData } from "../../service/index";
  
  const Nextmatch: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const [nextMatch, setNextMatch] = useState<any>();

    useEffect(() => {
      document.title = "Next Match"
      let getTeamId: any = localStorage.getItem("team_id");
      fetchData("next_match",getTeamId).then((res: any) => {
        console.log(res.events)
        setNextMatch(res);
      });
    }, []);
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    );
  };
  
  export default Nextmatch;
  