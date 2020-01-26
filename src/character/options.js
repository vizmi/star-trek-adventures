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
        // species talents
        {"name":"Proud and Honorable","reqs":[{"type":"spc","id":0}]},
        {"name":"The Ushaan","reqs":[{"type":"spc","id":0}]},
        {"name":"Orb Experience","reqs":[{"type":"spc","id":1}]},
        {"name":"Strong Pagh","reqs":[{"type":"spc","id":1}]},
        {"name":"Empath","reqs":[{"type":"spc","id":2}]},
        {"name":"Telepath","reqs":[{"type":"spc","id":2}]},
        {"name":"Cultural Felxibility","reqs":[{"type":"spc","id":3}]},
        {"name":"Parent Figure","reqs":[{"type":"spc","id":3}]},
        {"name":"Resolute","reqs":[{"type":"spc","id":4}]},
        {"name":"Spirit of Discovery","reqs":[{"type":"spc","id":4}]},
        {"name":"Incisive Scrutiny","reqs":[{"type":"spc","id":5}]},
        {"name":"Strudy","reqs":[{"type":"spc","id":5}]},
        {"name":"Former Initiate","reqs":[{"type":"spc","id":6}]},
        {"name":"Joined","reqs":[{"type":"spc","id":6}]},
        {"name":"Kolinahr","reqs":[{"type":"spc","id":7}]},
        {"name":"Mind-meld","reqs":[{"type":"spc","id":7}]},
        {"name":"Nerve Pinch","reqs":[{"type":"spc","id":7}]},
        // general talents
        {"name":"Bold","reqs":[]},
        {"name":"Cautious","reqs":[]},
        {"name":"Collaboration","reqs":[]},
        {"name":"Constantly Watching","reqs":[]},
        {"name":"Dauntless","reqs":[]},
        {"name":"Personal Effects","reqs":[]},
        {"name":"Studious","reqs":[]},
        {"name":"Technical Expertise","reqs":[]},
        {"name":"Tough","reqs":[]},
        {"name":"Advisor","reqs":[{"type":"dcp","id":0,"min":2}]},
        {"name":"Defuse the tension","reqs":[{"type":"dcp","id":0,"min":3}]},
        {"name":"Supervisor","reqs":[]},
        {"name":"Fly-by","reqs":[{"type":"dcp","id":1,"min":2}]},
        {"name":"Precise Evasion","reqs":[{"type":"dcp","id":1,"min":4}]},
        {"name":"Push the Limits","reqs":[{"type":"dcp","id":1,"min":4}]},
        {"name":"Starship Expert","reqs":[{"type":"dcp","id":1,"min":3}]},
        {"name":"Close Protection","reqs":[{"type":"dcp","id":3,"min":4}]},
        {"name":"Interrogation","reqs":[{"type":"dcp","id":3,"min":3}]},
        {"name":"Mean Right Hook","reqs":[]},
        {"name":"Pack Tactics","reqs":[]},
        {"name":"Quick to Action","reqs":[{"type":"dcp","id":3,"min":3}]},
        {"name":"A Little More Power","reqs":[{"type":"dcp","id":2,"min":3}]},
        {"name":"I Know My Ship","reqs":[{"type":"dcp","id":2,"min":4}]},
        {"name":"In the Nick of Time","reqs":[{"type":"dcp","id":2,"min":3},{"type":"dcp","id":4,"min":3}]},
        {"name":"Intense Scrunity","reqs":[{"type":"dcp","id":2,"min":3},{"type":"dcp","id":4,"min":3}]},
        {"name":"Jury-rig","reqs":[{"type":"dcp","id":2,"min":4}]},
        {"name":"Computer Expertise","reqs":[{"type":"dcp","id":4,"min":2}]},
        {"name":"Testing a Theory","reqs":[{"type":"dcp","id":2,"min":2},{"type":"dcp","id":4,"min":2}]},
        {"name":"Doctor's Orders","reqs":[{"type":"dcp","id":5,"min":4}]},
        {"name":"Field Medicine","reqs":[]},
        {"name":"First Response","reqs":[{"type":"dcp","id":5,"min":3}]},
        {"name":"Quick Study","reqs":[{"type":"dcp","id":5,"min":3}]},
        {"name":"Triage","reqs":[{"type":"dcp","id":5,"min":3}]}
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
            "exValue":"Proud Son/Daughter of Andoria"},
        {"name":"Bajorian","attrs":[1,1,0,1,0,0],       // 1
            "exValue":"Faith in the Prophets"},
        {"name":"Betazoid","attrs":[0,0,0,1,1,1],       // 2
            "exValue":"Compassion through Understanding"},
        {"name":"Denobulan","attrs":[0,0,1,1,0,1],      // 3
            "exValue":"Safety in Numbers"},
        {"name":"Human", "attrs": undefined,                  // 4
            "exValue":"The Drive for Exploration"},
        {"name":"Tellarite","attrs":[1,0,1,1,0,0],      // 5
            "exValue":"All Ideas must Withstand Scrutiny"},
        {"name":"Trill","attrs":[1,0,0,0,1,1],          // 6
            "exValue":"Four Lifetimes of Adventure"},
        {"name":"Vulcan","attrs":[1,0,1,0,0,1],         // 7
            "exValue":"The Needs of the Many Outweights the Needs of the Few, or the One"}
    ],
    "environments":[
        {roll:1,"name":"Homeworld",
            "attributes":undefined,"disciplines":[0,3,4],"exValue":"Body and Mind Alike Must Be Healthy"},
        {roll:2,"name":"Busy Colony",
            "attributes":[1,4],"disciplines":[0,3,4],"exValue":"Most Comfortable in a Crowd"},
        {roll:3,"name":"Isolated Colony",
            "attributes":[3,5],"disciplines":[2,4,5],"exValue":"Engineer at Heart"},
        {roll:4,"name":"Frontier Colony",
            "attributes":[0,2],"disciplines":[1,3,5],"exValue":"No Stranger to Violence"},
        {roll:5,"name":"Starship or Starbase",
            "attributes":[0,3],"disciplines":[0,1,2],"exValue":"A Starship is a Home, it’s Crew a Family"},
        {roll:6,"name":"Another Species' World",
            "attributes":undefined,"disciplines":[0,1,2,3,4,5],"exValue":"Emotion in a Crisis only Makes Things Worse"},
    ],
    "upbringings": [
        {"name":"Starfleet","roll":1,"a2":0,"a1":2,"r2":1,"r1":3,"disciplines":[0,1,2,3,4,5,6],
            "exFocuses":"Astronavigation, Composure, Extra-Vehicular Activity, Hand Phasers, Hand-to-Hand Combat, Small Craft, Starfleet Protocol, Starship Recognition, History",
            "exValue":"Serving Starfleet is a Family Tradition"},
        {"name":"Business or Trade","roll":2,"a2":4,"a1":1,"r2":3,"r1":5,"disciplines":[0,2,4],
            "exFocuses":"Finances, Geology, Linguistics, Manufacturing, Metallurgy, Negotiation, Survey",
            "exValue":"Indefatigable Confidence"},
        {"name":"Agriculture or Rural","roll":3,"a2":2,"a1":0,"r2":5,"r1":4,"disciplines":[1,3,5],
            "exFocuses":"Animal Handling, Athletics, Emergency Medicine, Ground Vehicles, Infectious Diseases, Navigation, Endurance, Toxicology",
            "exValue":"Proud and Honest"},
        {"name":"Science and Technology","roll":4,"a2":0,"a1":5,"r2":3,"r1":1,"disciplines":[1,2,4,5],
            "exFocuses":"Astrophysics, Astronavigation, Computers, Cybernetics, Power Systems, Genetics, Physics, Subspace Communications, Surgery, Quantum Mechanics, Warp Field Dynamics, Xenobiology.",
            "exValue":"Understands Technology Better Than People"},
        {"name":"Artistic and Creative","roll":5,"a2":4,"a1":3,"r2":2,"r1":1,"disciplines":[0,2,4],
            "exFocuses":"Botany, Cultural Studies, Holoprogramming, Linguistics, Music, Observation, Persuasion, Psychology.",
            "exValue":"Insatiable Curiosity"},
        {"name":"Diplomacy and Politics","roll":6,"a2":4,"a1":0,"r2":5,"r1":2,"disciplines":[0,1,3],
            "exFocuses":"Composure, Debate, Diplomacy, Espionage, Interrogation, Law, Philosophy, Starfleet Protocol",
            "exValue":"A Responsibility to the Truth"},
    ],
    "academies":[
        {"name":"Command","rolls":[1,2],"majors":[0,1],"exFocuses":"Astronavigation, Composure, Diplomacy, Extra-Vehicular Activity, Evasive Action, Helm Operations, Inspiration, Persuasion, Small Craft, Starship Recognition, Starfleet Protocols, Team Dynamics","exValues":"'Fast Ships and Strange New Worlds', 'Threw Out The Handbook and Wrote My Own'"},
        {"name":"Operations","rolls":[3,4],"majors":[2,3],"exFocuses":"Computers, Cybernetics, Electro-Plasma Power Systems, Espionage, Hand Phasers, Hand-to-Hand Combat, Infiltration, Interrogation, Shipboard Tactical Systems, Survival, Transporters & Replicators, Warp Field Dynamics.","exValues":"'Always Prepared, Always Vigilant', 'Precise to a Fault'"},
        {"name":"Sciences","rolls":[5,6],"majors":[4,5],"exFocuses":"Anthropology, Astrophysics, Botany, Computers, Cybernetics, Emergency Medicine, Exo-tectonics, Genetics, Geology, Infectious Diseases, Linguistics, Physics, Psychiatry, Quantum Mechanics, Trauma Surgery, Virology, Warp Field Dynamics, Xenobiology","exValues":"'Exploring to Test New Theories', 'A Theory For Every Situation'"},
    ],
    "dependencies":[
        {"p":"era","c":["species","anotherSpecies"]},
        {"p":"species","c":["speciesAttributes", "speciesTalents","anotherSpecies"]},
        {"p":"speciesAttributes","c":["environmentAttributes"]},
        {"p":"speciesTalents","c":[]},
        {"p":"environment", "c":["anotherSpecies","environmentAttributes",
            "environmentValue","environmentDisciplines"]},
        {"p":"anotherSpecies","c":["environmentAttributes"]},
        {"p":"environmentAttributes","c":["academyAttributes"]},
        {"p":"environmentValue","c":[]},
        {"p":"environmentDisciplines","c":["academyMajorDiscipline","academyMinorDisciplines"]},
        {"p":"upbringing",
            "c":["upbringingAccepted", "upbringingDisciplines","upbringingFocus","upbringingTalent"]},
        {"p":"upbringingAccepted","c":["academyAttributes"]},
        {"p":"upbringingDisciplines","c":["academyMajorDiscipline","academyMinorDisciplines"]},
        {"p":"upbringingFocus","c":[]},
        {"p":"upbringingTalent","c":[]},
        {"p":"academy",
            "c":["academyAttributes","academyValue","academyMajorDiscipline",
                "academyMinorDisciplines", "academyFocus", "academyTalent"]},
        {"p":"academyValue","c":[]},
        {"p":"academyAttributes","c":[]},
        {"p":"academyMajorDiscipline","c":[]},
        {"p":"academyMinorDisciplines","c":[]},
        {"p":"academyFocus","c":[]},
        {"p":"academyTalent","c":[]},
    ]
}
