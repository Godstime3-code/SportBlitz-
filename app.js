const apiKey =
  "c5192a3db1764f8a8f347c2a8da5a9defd4f894bc93a991b0415efe89b441c2e";
const now = new Date();
const nowYear = now.getFullYear();
const nowDay = now.getDate();
const nowMonth = now.getMonth() + 1;

const getMatchEvent = async e => {
  const apiUrl = `https://apiv3.apifootball.com/?action=get_events&from=${nowYear}-${nowMonth}-${nowDay}&to=${nowYear}-${nowMonth}-${nowDay}&APIkey=c5192a3db1764f8a8f347c2a8da5a9defd4f894bc93a991b0415efe89b441c2e`;

  const request = await fetch(apiUrl);
  const response = await request.json();
  const matchEvents = await response;
  // Object to store the grouped event by id;


  const groupedData = matchEvents.reduce((acc, current) => {
    if (!acc[current.league_id]) {
      acc[current.league_id] = [];
    }

    acc[current.league_id].push(current);

    return acc;
  }, {});
  // loop through each match event

  const displayMatchEvent = () => {
    const matchGameContainer = document.getElementById("js_game_container");
    matchGameContainer.innerHTML = ""; // clear the element before adding new matches;

    let matchHTML = "";
    /// Loop through groupedMatches to display each league and its matches

    Object.entries(groupedData).forEach(([league_id, items]) => {
      // this is where the header is generated
      matchHTML += `<div class="game-item">
        <div class="game-header">
            <p class="game-country">${items[0]['country_name']}:</p>
            <p class="game-country-league">${items[0]["league_name"]}</p>
          
        </div>`;

      items.forEach(item => {
        // this is where the game data is generated
        matchHTML += `
            <div class="game-data">
                    <div class="game-event-time">
                        <p>${item.match_status === 'Finished' ? 'FT' : item.match_status || item.match_time}</p>
                    </div>
                    <div class="game-event-match">
                        <p><span class="game-event-home-team">${item.match_hometeam_name}</span> - <span class="game-event-away-team">${item.match_awayteam_name}</span></p>
                        <a href="#" class="game-event-score">${item.match_hometeam_score}-${item.match_awayteam_score}</a>
                    </div>
                </div>`;
      });

      matchHTML += `</div>`; // Close the game-item div
    });

    matchGameContainer.innerHTML = matchHTML;
  };
  displayMatchEvent();
};

const eventLiveBtn = document.querySelector(".link_event_live");
const eventFinishBtn = document.querySelector(".link_event_finished");

const getLiveEvent = async e => {
  const matchGameContainer = document.getElementById("js_game_container");
  e.preventDefault();

  const apiURL = `https://apiv3.apifootball.com/?action=get_events&match_live=1&APIkey=c5192a3db1764f8a8f347c2a8da5a9defd4f894bc93a991b0415efe89b441c2e`;

  const request = await fetch(apiURL);
  const response = await request.json();
  const liveEvents = await response;


  // Group data by country
  const groupedData = liveEvents.reduce((acc, current) => {
    if (!acc[current.league_id]) {
      acc[current.league_id] = [];
    }

    acc[current.league_id].push(current);

    return acc;
  }, {});

  let liveEventHTML = ``;
console.log(groupedData)
  Object.entries(groupedData).forEach(([country_name, items]) => {
    // this is where the header is generated
    liveEventHTML += `<div class="game-item">
        <div class="game-header">
            <p class="game-country">${items[0]['country_name']}:</p>
            <p class="game-country-league">${items[0]["league_name"]}</p>
           
        </div>`;

    items.forEach(item => {
      // this is where the game data is generated
      liveEventHTML += `<div class="game-data">
                <div class="game-event-time">
                    <p>${item["match_status"]}</p>
                </div>
                <div class="game-event-match">
                    <p><span class="game-event-home-team">${item["match_hometeam_name"]
        }</span> - <span class="game-event-away-team">${item["match_awayteam_name"]
        }</span></p>
                    <a href="#" class="game-event-score">${item["match_status"]
          ? `${item["match_hometeam_score"]} - ${item["match_awayteam_score"]}`
          : "-:-"
        }</a>
                </div>
            </div>`;
    });

    liveEventHTML += `</div>`; // Close the game-item div
  });

  matchGameContainer.innerHTML = liveEventHTML;
};

eventLiveBtn.addEventListener("click", getLiveEvent);

const getFinishedEvent = async e => {
  const matchGameContainer = document.getElementById("js_game_container");

  const apiUrl = `https://apiv3.apifootball.com/?action=get_events&from=${nowYear}-${nowMonth}-${nowDay}&to=${nowYear}-${nowMonth}-${nowDay}&APIkey=c5192a3db1764f8a8f347c2a8da5a9defd4f894bc93a991b0415efe89b441c2e`;
  const request = await fetch(apiUrl);
  const response = await request.json();
  const finishedEvents = await response;

  const finishedEvent = finishedEvents.filter(fe => {
    return fe["match_status"] === "Finished";
  });

 const groupedData = finishedEvent.reduce((acc, current) => {
    if (!acc[current.league_id]) {
      acc[current.league_id] = [];
    }

    acc[current.league_id].push(current);

    return acc;
  }, {});
  

  let finishedEventHTML = ``;
    Object.entries(groupedData).forEach(([country_name, items]) => {
    // this is where the header is generated
    finishedEventHTML += `<div class="game-item">
        <div class="game-header">
            <p class="game-country">${items[0]['country_name']}:</p>
            <p class="game-country-league">${items[0]["league_name"]}</p>
            
        </div>`;

    items.forEach(item => {
      // this is where the game data is generated
finishedEventHTML +=`
        <div class="game-data">
            <div class="game-event-time">
                <p>${item["match_status"]}</p>
            </div>
            <div class="game-event-match">
                <p><span class="game-event-home-team">${item["match_hometeam_name"]
      }</span> - <span class="game-event-away-team">${item["match_awayteam_name"]
      }</span></p>
                <a href="#" class="game-event-score">${item["match_status"]
        ? `${item["match_hometeam_score"]} - ${item["match_awayteam_score"]}`
        : "-:-"
      }</a>
            </div>
    </div>`    });

    finishedEventHTML += `</div>`; // Close the game-item div
  });


  matchGameContainer.innerHTML = finishedEventHTML;
};
eventFinishBtn.addEventListener("click", getFinishedEvent);

getMatchEvent();

document.querySelector(".nav_refresh_link").addEventListener("click", () => {
  window.location.reload();
});


const yesterdayScoreBtn = document.getElementById('js_match_event_yesterday_btn');


const getYesterdayEvent = async e => {
  const matchGameContainer = document.getElementById("js_game_container");
  const apiURL = `https://apiv3.apifootball.com/?action=get_events&from=${nowYear
  }-${nowMonth}-${nowDay - 1}&to=${nowYear}-${nowMonth}-${nowDay - 1}&APIkey=c5192a3db1764f8a8f347c2a8da5a9defd4f894bc93a991b0415efe89b441c2e`;
  
  const request = await fetch(apiURL);
  const response = await request.json();
  const yesterdayEvent = await response;
  

  // Group data by country
  const groupedData = yesterdayEvent.reduce((acc, current) => {
    if (!acc[current.league_id]) {
      acc[current.league_id] = [];
    }

    acc[current.league_id].push(current);

    return acc;
  }, {});

  let yesterdayEventHTML = ``;

  Object.entries(groupedData).forEach(([league_id, items]) => {
    // this is where the header is generated
    yesterdayEventHTML += `<div class="game-item">
        <div class="game-header">
            <p class="game-country">${items[0]['country_name']}:</p>
            <p class="game-country-league">${items[0]["league_name"]}</p>

        </div>`;

    items.forEach(item => {
      // this is where the game data is generated
      yesterdayEventHTML += `<div class="game-data">
                <div class="game-event-time">
                    <p>${item["match_status"]}</p>
                </div>
                <div class="game-event-match">
                    <p><span class="game-event-home-team">${item["match_hometeam_name"]
        }</span> - <span class="game-event-away-team">${item["match_awayteam_name"]
        }</span></p>
                    <a href="#" class="game-event-score">${item["match_status"]
          ? `${item["match_hometeam_score"]} - ${item["match_awayteam_score"]}`
          : "-:-"
        }</a>
                </div>
            </div>`;
    });

    yesterdayEventHTML += `</div>`; // Close the game-item div
  });

  matchGameContainer.innerHTML = yesterdayEventHTML;
};


yesterdayScoreBtn.addEventListener('click', ()=>{
  
getYesterdayEvent();
});


//

const tommorrowScoreBtn = document.getElementById('js_match_event_tommorrow_btn');

const getTommorrowEvent = async e => {
  const matchGameContainer = document.getElementById("js_game_container");
  const apiURL = `https://apiv3.apifootball.com/?action=get_events&from=${nowYear
  }-${nowMonth}-${nowDay + 1}&to=${nowYear}-${nowMonth}-${nowDay + 1}&APIkey=c5192a3db1764f8a8f347c2a8da5a9defd4f894bc93a991b0415efe89b441c2e`;
  
  const request = await fetch(apiURL);
  const response = await request.json();
  const tommorrowEvent = await response;
  

  // Group data by country
  const groupedData = tommorrowEvent.reduce((acc, current) => {
    if (!acc[current.league_id]) {
      acc[current.league_id] = [];
    }

    acc[current.league_id].push(current);

    return acc;
  }, {});

  let tommorrowEventHTML = ``;

  Object.entries(groupedData).forEach(([league_id, items]) => {
    // this is where the header is generated
    tommorrowEventHTML += `<div class="game-item">
        <div class="game-header">
            <p class="game-country">${items[0]['country_name']}:</p>
            <p class="game-country-league">${items[0]["league_name"]}</p>

        </div>`;

    items.forEach(item => {
      // this is where the game data is generated
      tommorrowEventHTML += `<div class="game-data">
                <div class="game-event-time">
                    <p>${item["match_time"]}</p>
                </div>
                <div class="game-event-match">
                    <p><span class="game-event-home-team">${item["match_hometeam_name"]
        }</span> - <span class="game-event-away-team">${item["match_awayteam_name"]
        }</span></p>
                    <a href="#" class="game-event-score">${item["match_status"]
          ? `${item["match_hometeam_score"]} - ${item["match_awayteam_score"]}`
          : "-:-"
        }</a>
                </div>
            </div>`;
    });

    tommorrowEventHTML += `</div>`; // Close the game-item div
  });

  matchGameContainer.innerHTML = tommorrowEventHTML;
};


tommorrowScoreBtn.addEventListener('click', ()=>{
  
getTommorrowEvent();
});

