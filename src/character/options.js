export default {
    "attributes": [
        "Control",      // 0
        "Daring",       // 1
        "Fitness",      // 2
        "Insight",      // 3
        "Presence",     // 4
        "Reason"        // 5
    ],
    "disciplines": [
        "Command",      // 0
        "Conn",         // 1
        "Engineering",  // 2
        "Security",     // 3
        "Science",      // 4
        "Medicine"      // 5
    ],
    "talents": [
        {"name":"Bold","reqs":[]},
        {"name":"Cautious","reqs":[]},
        {"name":"Collaboration","reqs":[]},
        {"name":"Constantly Watching","reqs":[]},
        {"name":"Dauntless","reqs":[]},
        {"name":"Personal Effects","reqs":[]},
        {"name":"Studious","reqs":[]},
        {"name":"Technical Expertise","reqs":[]},
        {"name":"Tough","reqs":[]},
        {"name":"Advisor","reqs":[{"dcp":0,"min":2}]},
        {"name":"Defuse the tension","reqs":[{"dcp":0,"min":3}]},
        {"name":"Supervisor","reqs":[]},
        {"name":"Fly-by","reqs":[{"dcp":1,"min":2}]},
        {"name":"Precise Evasion","reqs":[{"dcp":1,"min":4}]},
        {"name":"Push the Limits","reqs":[{"dcp":1,"min":4}]},
        {"name":"Starship Expert","reqs":[{"dcp":1,"min":3}]},
        {"name":"Close Protection","reqs":[{"dcp":3,"min":4}]},
        {"name":"Interrogation","reqs":[{"dcp":3,"min":3}]},
        {"name":"Mean Right Hook","reqs":[]},
        {"name":"Pack Tactics","reqs":[]},
        {"name":"Quick to Action","reqs":[{"dcp":3,"min":3}]},
        {"name":"A Little More Power","reqs":[{"dcp":2,"min":3}]},
        {"name":"I Know My Ship","reqs":[{"dcp":2,"min":4}]},
        {"name":"In the Nick of Time","reqs":[{"dcp":2,"min":3},{"dcp":4,"min":3}]},
        {"name":"Intense Scrunity","reqs":[{"dcp":2,"min":3},{"dcp":4,"min":3}]},
        {"name":"Jury-rig","reqs":[{"dcp":2,"min":4}]},
        {"name":"Computer Expertise","reqs":[{"dcp":4,"min":2}]},
        {"name":"Testing a Theory","reqs":[{"dcp":2,"min":2},{"dcp":4,"min":2}]},
        {"name":"Doctor's Orders","reqs":[{"dcp":5,"min":4}]},
        {"name":"Field Medicine","reqs":[]},
        {"name":"First Response","reqs":[{"dcp":5,"min":3}]},
        {"name":"Quick Study","reqs":[{"dcp":5,"min":3}]},
        {"name":"Triage","reqs":[{"dcp":5,"min":3}]}
    ],
    "eras": [
        {"name":"Enterprise","species":[0,3,4,5,7]},                // 0
        {"name":"Original Series","species":[0,3,4,5,6,7]},         // 1
        {"name":"The Next Generation","species":[0,1,2,3,4,5,6,7]}  // 2
    ],
    "speciesRoll": [ // do while roll > value above
        [2,4,16,18,20], // era 0
        [2,4,14,16,18,20], // era 1
        [2,4,6,8,14,16,18,20] // era 2
    ],
    "species": [
        {"name":"Andorian","attrs":[1,1,0,0,1,0],       // 0
            "speciesTalents":["Proud and Honorable","The Ushaan"],
            "exValue":"Proud Son/Daughter of Andoria"},
        {"name":"Bajorian","attrs":[1,1,0,1,0,0],       // 1
            "speciesTalents":["Orb Experience","Strong Pagh"],
            "exValue":"Faith in the Prophets"},
        {"name":"Betazoid","attrs":[0,0,0,1,1,1],       // 2
            "speciesTalents":["Empath","Telepath"],
            "exValue":"Compassion through Understanding"},
        {"name":"Denobulan","attrs":[0,0,1,1,0,1],      // 3
            "speciesTalents":["Cultural Felxibility","Parent Figure"],
            "exValue":"Safety in Numbers"},
        {"name":"Human", "attrs": undefined,                  // 4
            "speciesTalents":["Resolute","Spirit of Discovery"],
            "exValue":"The Drive for Exploration"},
        {"name":"Tellarite","attrs":[1,0,1,1,0,0],      // 5
            "speciesTalents":["Incisive Scrutiny","Strudy"],
            "exValue":"All Ideas must Withstand Scrutiny"},
        {"name":"Trill","attrs":[1,0,0,0,1,1],          // 6
            "speciesTalents":["Former Initiate","Joined"],
            "exValue":"Four Lifetimes of Adventure"},
        {"name":"Vulcan","attrs":[1,0,1,0,0,1],         // 7
            "speciesTalents":["Kolinahr","Mind-meld","Nerve Pinch"],
            "exValue":"The Needs of the Many Outweights the Needs of the Few, or the One"}
    ],
}
