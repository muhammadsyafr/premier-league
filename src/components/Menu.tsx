import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonImg,
} from "@ionic/react";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  heartOutline,
  heartSharp,
  paperPlaneOutline,
  paperPlaneSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Main",
    url: "/page/Main",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Profile",
    url: "/page/Profile",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Next Match",
    url: "/page/Nextmatch",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "Last Match",
    url: "/page/Lastmatch",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "Standings",
    url: "/page/Standings",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [teamName, setTeamName] = useState<any>([]);
  const [teamLogo, setTeamLogo] = useState<any>([]);

  useEffect(() => {
    let getTeamName: any = localStorage.getItem("team_name");
    let getTeamLogo: any = localStorage.getItem("team_logo");
    setTeamName(getTeamName);
    setTeamLogo(getTeamLogo);
  }, []);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div className="ion-text-center">
          <IonImg
            src={teamLogo}
            alt="Logo"
            style={{ width: "40%", padding: "20px" }}
          />
        </div>
        <h1 className="ion-text-center">{teamName}</h1>

        <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
