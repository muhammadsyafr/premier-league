import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import {Standing, Lastmatch, Profile, Main, Nextmatch} from "./index";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  function switchMenus(param: string) {
    if(param === 'Main'){
      return <Main />
    }else if(param === 'Profile'){
      return <Profile />
    }else if(param === 'Lastmatch'){
      return <Lastmatch />
    } else if(param === 'Standings'){
      return <Standing />
    } else if(param === 'Nextmatch'){
      return <Nextmatch />
    }
  }
  
  useEffect(() => {
    switchMenus(name);
  },[name]);

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

      <IonContent>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {
          switchMenus(name)
        }
      </IonContent>
    </IonPage>
  );
};

export default Page;
