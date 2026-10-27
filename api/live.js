export default async function handler(req, res) {
  const season = "2026";
  const leagueId = "530294";

  const views = [
    "mTeam",
    "mStandings",
    "mSettings",
    "mMatchup",
    "mMatchupScore"
  ];

  const query = views.map((view) => "view=" + encodeURIComponent(view)).join("&");
  const url =
    "https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/" +
    season +
    "/segments/0/leagues/" +
    leagueId +
    "?" +
    query;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Pedrr.com"
      }
    });

    const body = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(response.status);

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    res.send(body);
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch ESPN league data",
      message: error.message
    });
  }
}
