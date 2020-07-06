import axios from "axios";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
moment.locale("id");

let manchesterUnited = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Manchester%20United`;
// let nextFiveMatch = `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133612`;
let lookupTeamPremierLeague = `https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328`;
// let teams = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=watford`;
let premierLeagueChart = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4328&s=2019-2020`;

export const fetchData = async (loadContent: any, team: any) => {
  let cases = "";
  if (!team) {
    cases = manchesterUnited;
  }
  switch (loadContent) {
    case "team":
      cases = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`;
      break;
    case "standings":
      cases = premierLeagueChart;
      break;
    case "all_team":
      cases = lookupTeamPremierLeague;
      break;
    case "next_match":
      cases = `https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team}`;
      break;
    case "last_match":
      cases = `https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${team}`;
      break;
    default:
      return "Nothing!";
  }
  try {
    const res = await axios.get(cases);
    return res.data;
  } catch (error) {}
};

export const convertDate = (date: any) => {
  if (!date) return null;
  return moment(date).format("LL");
};

export const sortString = (text: any, length: number) => {
  if (!length) {
    length = 100;
  }
  if (!text) return null;
  return text.substring(0, length);
};

export const getLogos = async (team:any) => {
  const res = await axios.get(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${team}`);
  return res.data;
}