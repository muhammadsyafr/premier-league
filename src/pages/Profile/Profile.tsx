import {
  IonContent,
} from "@ionic/react";
import "./Profile.css";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../service/index";

import Stadium from '../../components/Stadium';
import TeamProfile from "../../components/TeamProfile";

const Profile: React.FC = () => {

  const [myTeam, setmyTeam] = useState<any>();

  useEffect(() => {
    document.title = 'Team Profile'
    let getTeamName: any = localStorage.getItem("team_name");
    fetchData("team", getTeamName).then((res: any) => {
      setmyTeam(res.teams[0]);
    });
  }, []);

  return (
    <IonContent>
      {myTeam ? (
        <div style={{ padding: 0, margin: 0 }}>

         <TeamProfile 
         img={myTeam.strTeamBadge} name={myTeam.strAlternate} formedYear={myTeam.intFormedYear} country={myTeam.strCountry} desc={myTeam.strDescriptionEN}
         jersey={myTeam.strTeamJersey}
         socialmedia={{youtube: myTeam.strYoutube ,twitter: myTeam.strTwitter, facebook: myTeam.strFacebook, rss: myTeam.strWebsite}} />
         
          <Stadium
            stadiumName={myTeam.strStadium}
            img={myTeam.strStadiumThumb}
            desc={myTeam.strStadiumDescription}
            location={myTeam.strStadiumLocation}
            capacity={myTeam.intStadiumCapacity}
          />


          
        </div>
      ) : (
        "Loading"
      )}
    </IonContent>
  );
};

export default Profile;
