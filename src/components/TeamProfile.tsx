import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonCardContent,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonSlides,
  IonSlide,
} from "@ionic/react";

import { arrowBack } from "ionicons/icons";

import React, { useState } from "react";
import "./TeamProfile.css";
import { sortString } from "../service/index";

type TeamProps = {
  img: string;
  formedYear: string;
  name: string;
  country: string;
  desc: string;
  socialmedia: any;
  jersey: string;
};

const TeamProfile: React.FC<TeamProps> = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  return (
    <div>
      <IonSlides options={slideOpts}>
        <IonSlide>
          <IonGrid className="ion-text-left">
            <IonRow>
              <IonCol size="4">
                <IonImg src={props.img} style={{ padding: "15px" }} />
              </IonCol>
              <IonCol>
                <IonCardContent>
                  <IonText>
                    <h2>
                      <b>{props.name}</b>
                    </h2>{" "}
                    Since {props.formedYear}
                    <hr />
                  </IonText>
                  <p>
                    {sortString(props.desc, 120)}{" "}
                    <a onClick={() => setShowModal(true)}> readmore... </a>
                  </p>
                </IonCardContent>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonSlide>
        <IonSlide>
          <IonText className="">
            <h2>
              <b>{props.name} Jersey</b>
            </h2>
            <div className="ion-text-center">
              <IonImg
                src={props.jersey}
                style={{ padding: "10px", width: "40%" }}
              />
            </div>
          </IonText>
        </IonSlide>
      </IonSlides>

      <IonCardContent className="ion-text-center">
        {Object.keys(props.socialmedia).map(function (keyName, keyIndex) {
          return <a key={keyIndex} href={'http://' + props.socialmedia[keyName]} className={`fa fa-${keyName}`}></a>;
        })}
      </IonCardContent>

      {/* Modal */}
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
        <span className="text-modal" style={{
              padding: '10px', lineHeight: '30px', color: '#5e6472', fontSize: '14px'
            }}>{props.desc}
        </span>
      </IonModal>
    </div>
  );
};

export default TeamProfile;
