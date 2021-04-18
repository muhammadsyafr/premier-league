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
        <IonBadge color="success">CAPACITY {props.capacity}</IonBadge>
      </IonCardHeader>

      <IonCardContent>
        <p>{sortString(props.desc, 200)}....</p>
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
                <IonIcon icon={arrowBack} /> &nbsp; Back
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent scrollEvents={true} >
          <p className="text-modal" style={{
                paddingLeft: '20px', paddingRight:'20px', lineHeight: '30px', color: '#5e6472', fontSize: '14px'
              }}>{props.desc}
          </p>
        </IonContent>
      </IonModal>
    </IonCard>
  );
};

export default Stadium;
