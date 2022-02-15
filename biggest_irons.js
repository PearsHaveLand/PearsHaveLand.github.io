//import {weapons} from './weapons.js'

var weapons = null;
var ammos = null;
var MAX_DMG = 364 // currently, the Nitro Express Rifle does the most damage in the game at 364
var MAX_RNG = 300 // placeholder value for maximum effective range until I decide on something else
var MAX_ROF = 70 // placeholder value for max rate of fire
var MAX_RLD = 15  // placeholder for max reload speed
var MAX_VEL = 600 // max muzzle velocity
var MAX_MEL = 150 // max melee damage

window.onload = function() {
    weapons = populate_weapons();
    ammos = populate_ammos();
    fill_weapons_datalist();
    console.log(weapons);
    document.getElementById("weapon_compare_searchbox1").oninput = update_weapon1;
    document.getElementById("weapon_compare_searchbox2").oninput = update_weapon2;
    update_weapon1();
    update_weapon2();
}

function update_weapon1() {

    let user_input = document.getElementById("weapon_compare_searchbox1").value.toLowerCase();

    let weapon1 = null;

    // Filter incorrect input
    if (user_input in weapons) {
        weapon1 = weapons[user_input];
    }
    else {
        weapon1 = weapons["none"];
    }
    let weapon_name_displays = document.getElementsByClassName("weapon1-name");
    for (item in weapon_name_displays) {
        weapon_name_displays[item].innerHTML = weapon1["display"] + ":";
    }

    // damage
    let dmg_bar = document.getElementById("weapon1_dmg");
    dmg_bar.setAttribute("aria-valuenow", weapon1["damage"].toString());

    let dmg_percent = (weapon1["damage"]/MAX_DMG) * 100;

    dmg_bar.setAttribute("style", "width: " + dmg_percent.toString() + "%")

    dmg_bar.innerHTML = weapon1["damage"];

    // range
    let rng_bar = document.getElementById("weapon1_range");
    rng_bar.setAttribute("aria-valuenow", weapon1["effective range"].toString());

    let rng_percent = (weapon1["effective range"]/MAX_RNG) * 100;

    rng_bar.setAttribute("style", "width: " + rng_percent.toString() + "%")

    rng_bar.innerHTML = weapon1["effective range"];

    // rate of fire
    let rof_bar = document.getElementById("weapon1_rof");
    rof_bar.setAttribute("aria-valuenow", weapon1["rate of fire"].toString());

    let rof_percent = (weapon1["rate of fire"]/MAX_ROF) * 100;

    rof_bar.setAttribute("style", "width: " + rof_percent.toString() + "%")

    rof_bar.innerHTML = weapon1["rate of fire"];

    // handling
    let hdl_bar = document.getElementById("weapon1_hdl");
    hdl_bar.setAttribute("aria-valuenow", weapon1["handling"].toString());

    // handling is already measured as a percentage in-game
    let hdl_percent = weapon1["handling"]; 

    hdl_bar.setAttribute("style", "width: " + hdl_percent.toString() + "%")

    hdl_bar.innerHTML = weapon1["handling"];

    // reload time
    let rld_bar = document.getElementById("weapon1_rld");
    rld_bar.setAttribute("aria-valuenow", weapon1["reload time"].toString());

    let rld_percent = (weapon1["reload time"]/MAX_RLD) * 100;

    rld_bar.setAttribute("style", "width: " + rld_percent.toString() + "%")

    rld_bar.innerHTML = weapon1["reload time"];

    // muzzle velocity
    let vel_bar = document.getElementById("weapon1_vel");
    vel_bar.setAttribute("aria-valuenow", weapon1["muzzle velocity"].toString());

    let vel_percent = (weapon1["muzzle velocity"]/MAX_VEL) * 100;

    vel_bar.setAttribute("style", "width: " + vel_percent.toString() + "%")

    vel_bar.innerHTML = weapon1["muzzle velocity"];

    // melee dmg
    let mel_bar = document.getElementById("weapon1_mel");
    mel_bar.setAttribute("aria-valuenow", weapon1["melee damage"].toString());

    let mel_percent = (weapon1["melee damage"]/MAX_MEL) * 100;

    mel_bar.setAttribute("style", "width: " + mel_percent.toString() + "%")

    mel_bar.innerHTML = weapon1["melee damage"];

    // heavy melee dmg
    let hvy_bar = document.getElementById("weapon1_hvy");
    hvy_bar.setAttribute("aria-valuenow", weapon1["heavy melee damage"].toString());

    let hvy_percent = (weapon1["heavy melee damage"]/MAX_MEL) * 100;

    hvy_bar.setAttribute("style", "width: " + hvy_percent.toString() + "%")

    hvy_bar.innerHTML = weapon1["heavy melee damage"];
}

function update_weapon2() {
    let user_input = document.getElementById("weapon_compare_searchbox2").value.toLowerCase();

    
    let weapon1 = null;

    // Filter incorrect input
    if (user_input in weapons) {
        weapon2 = weapons[user_input];
    }
    else {
        weapon2 = weapons["none"];
    }
    let weapon_name_displays = document.getElementsByClassName("weapon2-name");
    for (item in weapon_name_displays) {
        weapon_name_displays[item].innerHTML = weapon2["display"] + ":";
    }

    // damage
    let dmg_bar = document.getElementById("weapon2_dmg");
    dmg_bar.setAttribute("aria-valuenow", weapon2["damage"].toString());

    let dmg_percent = (weapon2["damage"]/MAX_DMG) * 100;

    dmg_bar.setAttribute("style", "width: " + dmg_percent.toString() + "%")

    dmg_bar.innerHTML = weapon2["damage"];

    // range
    let rng_bar = document.getElementById("weapon2_range");
    rng_bar.setAttribute("aria-valuenow", weapon2["effective range"].toString());

    let rng_percent = (weapon2["effective range"]/MAX_RNG) * 100;

    rng_bar.setAttribute("style", "width: " + rng_percent.toString() + "%")

    rng_bar.innerHTML = weapon2["effective range"];

    // rate of fire
    let rof_bar = document.getElementById("weapon2_rof");
    rof_bar.setAttribute("aria-valuenow", weapon2["rate of fire"].toString());

    let rof_percent = (weapon2["rate of fire"]/MAX_ROF) * 100;

    rof_bar.setAttribute("style", "width: " + rof_percent.toString() + "%")

    rof_bar.innerHTML = weapon2["rate of fire"];

    // handling
    let hdl_bar = document.getElementById("weapon2_hdl");
    hdl_bar.setAttribute("aria-valuenow", weapon2["handling"].toString());

    // handling is already measured as a percentage in-game
    let hdl_percent = weapon2["handling"]; 

    hdl_bar.setAttribute("style", "width: " + hdl_percent.toString() + "%")

    hdl_bar.innerHTML = weapon2["handling"];

    // reload time
    let rld_bar = document.getElementById("weapon2_rld");
    rld_bar.setAttribute("aria-valuenow", weapon2["reload time"].toString());

    let rld_percent = (weapon2["reload time"]/MAX_RLD) * 100;

    rld_bar.setAttribute("style", "width: " + rld_percent.toString() + "%")

    rld_bar.innerHTML = weapon2["reload time"];

    // muzzle velocity
    let vel_bar = document.getElementById("weapon2_vel");
    vel_bar.setAttribute("aria-valuenow", weapon2["muzzle velocity"].toString());

    let vel_percent = (weapon2["muzzle velocity"]/MAX_VEL) * 100;

    vel_bar.setAttribute("style", "width: " + vel_percent.toString() + "%")

    vel_bar.innerHTML = weapon2["muzzle velocity"];

    // melee dmg
    let mel_bar = document.getElementById("weapon2_mel");
    mel_bar.setAttribute("aria-valuenow", weapon2["melee damage"].toString());

    let mel_percent = (weapon2["melee damage"]/MAX_MEL) * 100;

    mel_bar.setAttribute("style", "width: " + mel_percent.toString() + "%")

    mel_bar.innerHTML = weapon2["melee damage"];

    // heavy melee dmg
    let hvy_bar = document.getElementById("weapon2_hvy");
    hvy_bar.setAttribute("aria-valuenow", weapon2["heavy melee damage"].toString());

    let hvy_percent = (weapon2["heavy melee damage"]/MAX_MEL) * 100;

    hvy_bar.setAttribute("style", "width: " + hvy_percent.toString() + "%")

    hvy_bar.innerHTML = weapon2["heavy melee damage"];
}

function fill_weapons_datalist() {
    
    weapons_list = document.getElementById("weapon_compare_datalist");
    weapons_arr = Object.keys(weapons);
    for (key in weapons_arr) {
        option = document.createElement("option");
        option.textContent = weapons_arr[key];
        option.value = weapons_arr[key];
        weapons_list.appendChild(option);
     }
}

function toggle_desc() {
    let desc_div = document.getElementById("description");
    let toggle_btn = document.getElementById("description-toggle");
    
    if (desc_div.style.display === "none") {
        desc_div.style.display = "block";
        toggle_btn.innerHTML = "Hide Description";
    }
    else {
        desc_div.style.display = "none";
        toggle_btn.innerHTML = "Show Description";
    }
}

function populate_weapons() {
    return {
        "berthier mle 1892": 
        {
            "display": "Berthier Mle 1892",
            "ammo type": "long",
            "damage": 130,
            "effective range": 305,
            "rate of fire": 36,
            "handling": 79,
            "reload time": 3,
            "muzzle velocity": 590,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 356,
            "mag size": 3,
            "reserve ammo": 12,
            "special ammo list": "berthier"
        },
        "berthier mle 1892 deadeye": 
        {
            "display": "Berthier Mle 1892 Deadeye",
            "ammo type": "long",
            "damage": 130,
            "effective range": 305,
            "rate of fire": 36,
            "handling": 75,
            "reload time": 3,
            "muzzle velocity": 590,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 388,
            "mag size": 3,
            "reserve ammo": 12,
            "special ammo list": "berthier"
        },
        "bomb lance": 
        {
            "display": "Bomb Lance",
            "ammo type": "special",
            "damage": 150,
            "effective range": 25,
            "rate of fire": 15,
            "handling": 87,
            "reload time": 4,
            "muzzle velocity": 60,
            "melee damage": 180,
            "heavy melee damage": 360,
            "cost": 199,
            "mag size": 1,
            "reserve ammo": 5,
            "special ammo list": "none"
        },
        "bornheim no. 3": 
        {
            "display": "Bornheim No. 3",
            "ammo type": "compact",
            "damage": 74,
            "effective range": 64,
            "rate of fire": 210,
            "handling": 64,
            "reload time": 3,
            "muzzle velocity": 380,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 201,            
            "mag size": 6,
            "reserve ammo": 10,
            "special ammo list": "bornheim"
        },
        "bornheim no. 3 extended": 
        {
            "display": "Bornheim No. 3 Extended",
            "ammo type": "compact",
            "damage": 74,
            "effective range": 64,
            "rate of fire": 210,
            "handling": 64,
            "reload time": 8,
            "muzzle velocity": 380,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 306,            
            "mag size": 9,
            "reserve ammo": 10,
            "special ammo list": "bornheim"
        },
        "caldwell conversion chain pistol": 
        {
            "display": "Caldwell Conversion Chain Pistol",
            "ammo type": "compact",
            "damage": 104,
            "effective range": 84,
            "rate of fire": 44,
            "handling": 60,
            "reload time": 28,
            "muzzle velocity": 300,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 50,            
            "mag size": 17,
            "reserve ammo": 18,
            "special ammo list": "caldwell conversion"
        },
        "caldwell conversion pistol": 
        {
            "display": "Caldwell Conversion Pistol",
            "ammo type": "compact",
            "damage": 104,
            "effective range": 84,
            "rate of fire": 44,
            "handling": 66,
            "reload time": 11,
            "muzzle velocity": 300,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 26,            
            "mag size": 6,
            "reserve ammo": 18,
            "special ammo list": "caldwell conversion"
        },
        "caldwell conversion uppercut": 
        {
            "display": "Caldwell Conversion Uppercut",
            "ammo type": "long",
            "damage": 130,
            "effective range": 96,
            "rate of fire": 40,
            "handling": 57,
            "reload time": 15,
            "muzzle velocity": 410,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 275,            
            "mag size": 6,
            "reserve ammo": 9,
            "special ammo list": "caldwell conversion uppercut"
        },
        "caldwell pax": 
        {
            "display": "Caldwell Pax",
            "ammo type": "medium",
            "damage": 110,
            "effective range": 86,
            "rate of fire": 46,
            "handling": 60,
            "reload time": 11,
            "muzzle velocity": 330,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 100,            
            "mag size": 6,
            "reserve ammo": 12,
            "special ammo list": "caldwell pax"
        },
        "caldwell pax claw": 
        {
            "display": "Caldwell Pax Claw",
            "ammo type": "medium",
            "damage": 110,
            "effective range": 86,
            "rate of fire": 46,
            "handling": 60,
            "reload time": 11,
            "muzzle velocity": 330,
            "melee damage": 37,
            "heavy melee damage": 75,
            "cost": 100,            
            "mag size": 6,
            "reserve ammo": 12,
            "special ammo list": "caldwell pax"
        },
        "caldwell rival 78": 
        {
            "display": "Caldwell Rival 78",
            "ammo type": "shotgun",
            "damage": 175,
            "effective range": 12,
            "rate of fire": 90,
            "handling":87,
            "reload time": 4,
            "muzzle velocity": 400,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 100,            
            "mag size": 2,
            "reserve ammo": 8,
            "special ammo list": "caldwell rival"
        },
        "caldwell rival 78 handcannon": 
        {
            "display": "Caldwell Rival 78 Handcannon",
            "ammo type": "shotgun",
            "damage": 85,
            "effective range": 8,
            "rate of fire": 90,
            "handling":84,
            "reload time": 4,
            "muzzle velocity": 350,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 85,            
            "mag size": 2,
            "reserve ammo": 6,
            "special ammo list": "caldwell rival"
        },
        "crossbow": 
        {
            "display": "Crossbow",
            "ammo type": "special",
            "damage": 260,
            "effective range": 47,
            "rate of fire": 10,
            "handling":54,
            "reload time": 6,
            "muzzle velocity": 150,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 50,            
            "mag size": 1,
            "reserve ammo": 18,
            "special ammo list": "crossbow"
        },
        "crown & king auto-5": 
        {
            "display": "Crown & King Auto-5",
            "ammo type": "shotgun",
            "damage": 185,
            "effective range": 12,
            "rate of fire": 100,
            "handling": 78,
            "reload time": 10,
            "muzzle velocity": 425,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 600,            
            "mag size": 5,
            "reserve ammo": 6,
            "special ammo list": "crown & king"
        },
        "dolch 96": 
        {
            "display": "Dolch 96",
            "ammo type": "medium",
            "damage": 97,
            "effective range": 78,
            "rate of fire": 164,
            "handling": 61,
            "reload time": 6,
            "muzzle velocity": 440,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 750,            
            "mag size": 10,
            "reserve ammo": 10,
            "special ammo list": "dolch 96"
        },
        "hand crossbow": 
        {
            "display": "Hand Crossbow",
            "ammo type": "special",
            "damage": 195,
            "effective range": 45,
            "rate of fire": 12,
            "handling": 53,
            "reload time": 5,
            "muzzle velocity": 100,
            "melee damage": 13,
            "heavy melee damage": 27,
            "cost": 30,            
            "mag size": 1,
            "reserve ammo": 16,
            "special ammo list": "hand crossbow"
        },
        "hunting bow": 
        {
            "display": "Hunting Bow",
            "ammo type": "special",
            "damage": 227,
            "effective range": 23,
            "rate of fire": 45,
            "handling": 66,
            "reload time": 1,
            "muzzle velocity": 150,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 57,            
            "mag size": 1,
            "reserve ammo": 16,
            "special ammo list": "hunting bow"
        },
        "hand crossbow": 
        {
            "display": "Hand Crossbow",
            "ammo type": "special",
            "damage": 195,
            "effective range": 45,
            "rate of fire": 12,
            "handling": 53,
            "reload time": 5,
            "muzzle velocity": 100,
            "melee damage": 13,
            "heavy melee damage": 27,
            "cost": 30,            
            "mag size": 1,
            "reserve ammo": 16,
            "special ammo list": "hand crossbow"
        },
        "lemat mark ii": 
        {
            "display": "LeMat Mark II",
            "ammo type": "compact",
            "damage": 97,
            "effective range": 79,
            "rate of fire": 42,
            "handling": 66,
            "reload time": 15,
            "muzzle velocity": 300,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 95,            
            "mag size": 9,
            "reserve ammo": 18,
            "special ammo list": "lemat mark ii"
        },
        "lebel 1886": 
        {
            "display": "Lebel 1886",
            "ammo type": "long",
            "damage": 132,
            "effective range": 310,
            "rate of fire": 34,
            "handling": 83,
            "reload time": 18,
            "muzzle velocity": 630,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 397,            
            "mag size": 10,
            "reserve ammo": 5,
            "special ammo list": "lebel 1886"
        },
        "lebel 1886 aperture": 
        {
            "display": "Lebel 1886 Aperture",
            "ammo type": "long",
            "damage": 132,
            "effective range": 310,
            "rate of fire": 34,
            "handling": 80,
            "reload time": 18,
            "muzzle velocity": 630,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 425,            
            "mag size": 10,
            "reserve ammo": 5,
            "special ammo list": "lebel 1886"
        },
        "lebel 1886 marksman": 
        {
            "display": "Lebel 1886 Marksman",
            "ammo type": "long",
            "damage": 132,
            "effective range": 310,
            "rate of fire": 34,
            "handling": 80,
            "reload time": 18,
            "muzzle velocity": 630,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 437,            
            "mag size": 10,
            "reserve ammo": 5,
            "special ammo list": "lebel 1886"
        },
        "lebel 1886 talon": 
        {
            "display": "Lebel 1886 Talon",
            "ammo type": "long",
            "damage": 132,
            "effective range": 310,
            "rate of fire": 34,
            "handling": 81,
            "reload time": 18,
            "muzzle velocity": 630,
            "melee damage": 27,
            "heavy melee damage": 150,
            "cost": 422,            
            "mag size": 10,
            "reserve ammo": 5,
            "special ammo list": "lebel 1886"
        },
        "martini-henry ic1": 
        {
            "display": "Martini-Henry IC1",
            "ammo type": "long",
            "damage": 143,
            "effective range": 334,
            "rate of fire": 45,
            "handling": 70,
            "reload time": 3,
            "muzzle velocity": 400,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 122,            
            "mag size": 1,
            "reserve ammo": 20,
            "special ammo list": "martini-henry ic1"
        },
        "martini-henry ic1": 
        {
            "display": "Martini-Henry IC1 Deadeye",
            "ammo type": "long",
            "damage": 143,
            "effective range": 334,
            "rate of fire": 45,
            "handling": 67,
            "reload time": 3,
            "muzzle velocity": 400,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 145,            
            "mag size": 1,
            "reserve ammo": 20,
            "special ammo list": "martini-henry ic1"
        },
        "martini-henry ic1 riposte": 
        {
            "display": "Martini-Henry IC1 Riposte",
            "ammo type": "long",
            "damage": 143,
            "effective range": 334,
            "rate of fire": 45,
            "handling": 66,
            "reload time": 3,
            "muzzle velocity": 400,
            "melee damage": 82,
            "heavy melee damage": 168,
            "cost": 164,            
            "mag size": 1,
            "reserve ammo": 20,
            "special ammo list": "martini-henry ic1"
        },
        "martini-henry ic1 riposte": 
        {
            "display": "Martini-Henry IC1 Riposte",
            "ammo type": "long",
            "damage": 143,
            "effective range": 334,
            "rate of fire": 45,
            "handling": 66,
            "reload time": 3,
            "muzzle velocity": 400,
            "melee damage": 82,
            "heavy melee damage": 168,
            "cost": 164,            
            "mag size": 1,
            "reserve ammo": 20,
            "special ammo list": "martini-henry ic1"
        },
        "mosin-nagant m1891": 
        {
            "display": "Mosin-Nagant M1891",
            "ammo type": "long",
            "damage": 136,
            "effective range": 319,
            "rate of fire": 34,
            "handling": 75,
            "reload time": 4,
            "muzzle velocity": 615,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 490,            
            "mag size": 5,
            "reserve ammo": 10,
            "special ammo list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 avtomat": 
        {
            "display": "Mosin-Nagant M1891 Avtomat",
            "ammo type": "long",
            "damage": 136,
            "effective range": 319,
            "rate of fire": 400,
            "handling": 35,
            "reload time": 11,
            "muzzle velocity": 615,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 1250,            
            "mag size": 15,
            "reserve ammo": 0,
            "special ammo list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 bayonet": 
        {
            "display": "Mosin-Nagant M1891 Bayonet",
            "ammo type": "long",
            "damage": 136,
            "effective range": 319,
            "rate of fire": 34,
            "handling": 70,
            "reload time": 4,
            "muzzle velocity": 615,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 540,
            "mag size": 5,
            "reserve ammo": 10,
            "special ammo list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 obrez": 
        {
            "display": "Mosin-Nagant Obrez",
            "ammo type": "long",
            "damage": 133,
            "effective range": 314,
            "rate of fire": 34,
            "handling": 68,
            "reload time": 4,
            "muzzle velocity": 550,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 290,            
            "mag size": 5,
            "reserve ammo": 10,
            "special ammo list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 obrez drum": 
        {
            "display": "Mosin-Nagant M1891 Obrez Drum",
            "ammo type": "long",
            "damage": 133,
            "effective range": 314,
            "rate of fire": 34,
            "handling": 65,
            "reload time": 11,
            "muzzle velocity": 550,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 350,            
            "mag size": 15,
            "reserve ammo": 0,
            "special ammo list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 obrez mace": 
        {
            "display": "Mosin-Nagant M1891 Obrez Mace",
            "ammo type": "long",
            "damage": 133,
            "effective range": 314,
            "rate of fire": 34,
            "handling": 65,
            "reload time": 4,
            "muzzle velocity": 550,
            "melee damage": 54,
            "heavy melee damage": 90,
            "cost": 310,            
            "mag size": 5,
            "reserve ammo": 10,
            "special ammo list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 sniper": 
        {
            "display": "Mosin-Nagant M1891 Sniper",
            "ammo type": "long",
            "damage": 136,
            "effective range": 319,
            "rate of fire": 34,
            "handling": 75,
            "reload time": 5,
            "muzzle velocity": 615,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 550,            
            "mag size": 5,
            "reserve ammo": 10,
            "special ammo list": "mosin-nagant m1891"
        },
        "nagant m1895": 
        {
            "display": "Nagant M1895",
            "ammo type": "compact",
            "damage": 91,
            "effective range": 73,
            "rate of fire": 40,
            "handling": 63,
            "reload time": 12,
            "muzzle velocity": 330,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 24,            
            "mag size": 7,
            "reserve ammo": 21,
            "special ammo list": "nagant m1895"
        },
        "nagant m1895 deadeye": 
        {
            "display": "Nagant M1895 Deadeye",
            "ammo type": "compact",
            "damage": 91,
            "effective range": 73,
            "rate of fire": 63,
            "handling": 85,
            "reload time": 13,
            "muzzle velocity": 330,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 42,            
            "mag size": 7,
            "reserve ammo": 21,
            "special ammo list": "nagant m1895"
        },
        "nagant m1895 officer": 
        {
            "display": "Nagant M1895 Officer",
            "ammo type": "compact",
            "damage": 91,
            "effective range": 73,
            "rate of fire": 100,
            "handling": 58,
            "reload time": 12,
            "muzzle velocity": 330,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 96,            
            "mag size": 7,
            "reserve ammo": 14,
            "special ammo list": "nagant m1895"
        },
        "nagant m1895 officer carbine": 
        {
            "display": "Nagant M1895 Officer Carbine",
            "ammo type": "compact",
            "damage": 104,
            "effective range": 92,
            "rate of fire": 100,
            "handling": 89,
            "reload time": 12,
            "muzzle velocity": 360,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 155,            
            "mag size": 7,
            "reserve ammo": 14,
            "special ammo list": "nagant m1895"
        },
        "nagant m1895 officer carbine deadeye": 
        {
            "display": "Nagant M1895 Officer Carbine Deadeye",
            "ammo type": "compact",
            "damage": 104,
            "effective range": 92,
            "rate of fire": 100,
            "handling": 84,
            "reload time": 12,
            "muzzle velocity": 360,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 211,            
            "mag size": 7,
            "reserve ammo": 14,
            "special ammo list": "nagant m1895"
        },
        "nagant m1895 precision": 
        {
            "display": "Nagant M1895 Precision",
            "ammo type": "compact",
            "damage": 91,
            "effective range": 73,
            "rate of fire": 63,
            "handling": 86,
            "reload time": 13,
            "muzzle velocity": 330,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 29,            
            "mag size": 7,
            "reserve ammo": 21,
            "special ammo list": "nagant m1895"
        },
        "nagant m1895 silencer": 
        {
            "display": "Nagant M1895 Silencer",
            "ammo type": "compact",
            "damage": 91,
            "effective range": 56,
            "rate of fire": 40,
            "handling": 61,
            "reload time": 12,
            "muzzle velocity": 250,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 53,            
            "mag size": 7,
            "reserve ammo": 21,
            "special ammo list": "nagant m1895"
        },
        "nitro express rifle": 
        {
            "display": "Nitro Express Rifle",
            "ammo type": "special",
            "damage": 364,
            "effective range": 250,
            "rate of fire": 60,
            "handling": 41,
            "reload time": 4,
            "muzzle velocity": 550,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 1015,            
            "mag size": 2,
            "reserve ammo": 4,
            "special ammo list": "nitro express rifle"
        },
        "romero 77": 
        {
            "display": "Romero 77",
            "ammo type": "shotgun",
            "damage": 200,
            "effective range": 15,
            "rate of fire": 30,
            "handling": 92,
            "reload time": 3,
            "muzzle velocity": 450,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 34,            
            "mag size": 1,
            "reserve ammo": 12,
            "special ammo list": "romero 77"
        },
        "romero 77 handcannon": 
        {
            "display": "Romero 77 Handcannon",
            "ammo type": "shotgun",
            "damage": 140,
            "effective range": 10,
            "rate of fire": 30,
            "handling": 86,
            "reload time": 3,
            "muzzle velocity": 375,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 26,            
            "mag size": 1,
            "reserve ammo": 10,
            "special ammo list": "romero 77"
        },
        "romero 77 hatchet": 
        {
            "display": "Romero 77 Hatchet",
            "ammo type": "shotgun",
            "damage": 140,
            "effective range": 10,
            "rate of fire": 30,
            "handling": 80,
            "reload time": 3,
            "muzzle velocity": 375,
            "melee damage": 90,
            "heavy melee damage": 150,
            "cost": 62,            
            "mag size": 1,
            "reserve ammo": 10,
            "special ammo list": "romero 77"
        },
        "romero 77 talon": 
        {
            "display": "Romero 77 Talon",
            "ammo type": "shotgun",
            "damage": 200,
            "effective range": 15,
            "rate of fire": 30,
            "handling": 88,
            "reload time": 3,
            "muzzle velocity": 450,
            "melee damage": 27,
            "heavy melee damage": 150,
            "cost": 59,            
            "mag size": 1,
            "reserve ammo": 12,
            "special ammo list": "romero 77"
        },
        "scottfield model 3": 
        {
            "display": "Scottfield Model 3",
            "ammo type": "medium",
            "damage": 107,
            "effective range": 85,
            "rate of fire": 41,
            "handling": 68,
            "reload time": 9,
            "muzzle velocity": 280,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 77,            
            "mag size": 6,
            "reserve ammo": 12,
            "special ammo list": "scottfield"
        },
        "scottfield model 3 precision": 
        {
            "display": "Scottfield Model 3 Precision",
            "ammo type": "medium",
            "damage": 107,
            "effective range": 85,
            "rate of fire": 52,
            "handling": 80,
            "reload time": 9,
            "muzzle velocity": 280,
            "melee damage": 27,
            "heavy melee damage": 54,
            "cost": 85,            
            "mag size": 6,
            "reserve ammo": 12,
            "special ammo list": "scottfield"
        },
        "scottfield model 3 spitfire": 
        {
            "display": "Scottfield Model 3 Spitfire",
            "ammo type": "medium",
            "damage": 107,
            "effective range": 85,
            "rate of fire": 77,
            "handling": 62,
            "reload time": 9,
            "muzzle velocity": 280,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 108,            
            "mag size": 6,
            "reserve ammo": 12,
            "special ammo list": "scottfield"
        },
        "scottfield model 3 swift": 
        {
            "display": "Scottfield Model 3 Swift",
            "ammo type": "medium",
            "damage": 107,
            "effective range": 85,
            "rate of fire": 41,
            "handling": 68,
            "reload time": 4,
            "muzzle velocity": 280,
            "melee damage": 13,
            "heavy melee damage": 31,
            "cost": 95,            
            "mag size": 6,
            "reserve ammo": 12,
            "special ammo list": "scottfield"
        },
        "none":
        {
            "display": "None",
            "ammo type": "none",
            "damage": 0,
            "effective range": 0,
            "rate of fire": 0,
            "handling": 0,
            "reload time": 0,
            "muzzle velocity": 0,
            "melee damage": 0,
            "heavy melee damage": 0,
            "cost": 0,            
            "mag size": 0,
            "reserve ammo": 0,
            "special ammo list": "none"
        }
    }
}

function populate_ammos() {
    return {
        "berthier":
        {
            "spitzer":
            {
                "damage": -19,
                "effective range": 13,
                "rate of fire": 0,
                "handling": -8,
                "reload time": 0,
                "muzzle velocity": 190,
                "cost": 220
            },
            "incendiary":
            {
                "damage": 0,
                "effective range": 0,
                "rate of fire": 0,
                "handling": 0,
                "reload time": 0,
                "muzzle velocity": 0,
                "cost": 35
            }
        },
        "bornheim":
        {
            "high velocity":
            {
                "damage": 0,
                "effective range": 0,
                "rate of fire": 0,
                "handling": -6,
                "reload time": 0,
                "muzzle velocity": 160,
                "cost": 75
            },
            "incendiary":
            {
                "damage": 0,
                "effective range": 0,
                "rate of fire": 0,
                "handling": 0,
                "reload time": 0,
                "muzzle velocity": 0,
                "cost": 25
            }
        }
    }
}