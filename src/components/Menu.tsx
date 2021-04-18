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
  homeOutline,
  footballOutline,
  football,
  podiumOutline,
  bookOutline
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
    iosIcon: homeOutline,
    mdIcon: homeOutline,
  },
  {
    title: "Profile",
    url: "/page/Profile",
    iosIcon: footballOutline,
    mdIcon: football,
  },
  {
    title: "Last Match",
    url: "/page/Lastmatch",
    iosIcon: bookOutline,
    mdIcon: bookOutline,
  },
  {
    title: "Standings",
    url: "/page/Standings",
    iosIcon: podiumOutline,
    mdIcon: podiumOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const [teamName, setTeamName] = useState<any>([]);
  const [teamLogo, setTeamLogo] = useState<any>([]);

  useEffect(() => {
    let getTeamName: any = localStorage.getItem("team_name");
    let getTeamLogo: any = localStorage.getItem("team_logo");
    if (!getTeamName) {
      getTeamLogo = "https://www.thesportsdb.com/images/media/team/badge/xzqdr11517660252.png"
      getTeamName = "Man United"
    }
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
