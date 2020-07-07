import {
  IonContent,
  IonImg,
  IonCard,
  IonIcon,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonText,
  IonBadge
} from "@ionic/react";

import React, { useState } from "react";
import { sortString } from "../service/index";

import { arrowBack } from "ionicons/icons";

type StadiumProps = {
  stadiumName: string;
  location: string;
  capacity: any;
  desc: any;
  img: string;
};

const Stadium: React.FC<StadiumProps> = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <IonCard>
      <IonImg src={props.img} />
      <IonCardHeader>
        <IonCardTitle>{props.stadiumName} </IonCardTitle>
        <IonCardSubtitle>
          <IonBadge color="tertiary">{props.location}</IonBadge> 
        </IonCardSubtitle>
        <IonBadge color="success">capacity {props.capacity} person</IonBadge>
      </IonCardHeader>

      <IonCardContent>
        <p>{sortString(props.desc, 201)}....</p>
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
            {props.desc}
          </IonText>
        </IonContent>
      </IonModal>
    </IonCard>
  );
};

export default Stadium;
