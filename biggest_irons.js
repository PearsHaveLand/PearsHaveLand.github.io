//import {weapons} from './weapons.js'

var weapons = null;
var ammos = null;
var MAX_DMG = 364 // currently, the Nitro Express Rifle does the most damage in the game at 364
var MAX_RNG = 300 // placeholder value for maximum effective range until I decide on something else
var MAX_ROF = 70 // placeholder value for max rate of fire
var MAX_RLD = 15  // placeholder for max reload speed
var MAX_VEL = 600 // max muzzle velocity
var MAX_MEL = 150 // max melee damage

var MAX_VALUES = {
    "damage" : 364,
    "effective_range" : 300,
    "rate_of_fire" : 70,
    "reload_time" : 15,
    "handling" : 100,
    "muzzle_velocity" : 600,
    "melee_damage" : 150,
    "heavy_melee_damage" : 150,
    "reserve_ammo" : 40,
    "mag_size" : 17,
}

var STAT_LIST = [
    "damage",
    "effective_range",
    "rate_of_fire",
    "reload_time",
    "handling",
    "muzzle_velocity",
    "melee_damage",
    "heavy_melee_damage",
    "reserve_ammo",
    "mag_size",
]

var stat_display_cards = {};

window.onload = function() {

    window.onresize = handle_resize;
    handle_resize();
    
    weapons = populate_weapons();
    fill_weapons_datalist();
    generate_stat_display_cards();
    document.getElementById("weapon_compare_searchbox1").oninput = update_weapon_stat_cards;
    document.getElementById("weapon_compare_searchbox2").oninput = update_weapon_stat_cards;
    update_weapon_stat_cards();
}

function handle_resize() {
    
    console.log("handling resize!");

    // Vertical screens should have only one column
    if (screen.availHeight >= screen.availWidth || window.innerHeight >= window.innerWidth) {
        document.getElementById("card-list-wrapper").classList.remove("card-list-2-column");
    }
    else {
        document.getElementById("card-list-wrapper").classList.add("card-list-2-column");
    }
}

function update_weapon_stat_cards() {

    let weapon1_name = document.getElementById("weapon_compare_searchbox1").value.toLowerCase();
    let weapon2_name = document.getElementById("weapon_compare_searchbox2").value.toLowerCase();
    
    let weapon1 = (weapon1_name in weapons) ? weapons[weapon1_name] : weapons["none"];
    let weapon2 = (weapon2_name in weapons) ? weapons[weapon2_name] : weapons["none"];

    weapon1["capacity"] = weapon1["mag_size"] + weapon1["reserve_ammo"];
    weapon2["capacity"] = weapon2["mag_size"] + weapon2["reserve_ammo"];

    let weapon_1_name_fields = document.getElementsByClassName("weapon1-name");
    for (item in weapon_1_name_fields) {
        weapon_1_name_fields[item].innerHTML = weapon1["display"] + ":";
    }

    let weapon_2_name_fields = document.getElementsByClassName("weapon2-name");
    for (item in weapon_2_name_fields) {
        weapon_2_name_fields[item].innerHTML = weapon2["display"] + ":";
    }

    for (var stat of STAT_LIST) {
        let weapon_1_stat_name = "weapon1_" + stat;
        let weapon_2_stat_name = "weapon2_" + stat;

        let weapon_1_bar = stat_display_cards[stat][weapon_1_stat_name];
        let weapon_2_bar = stat_display_cards[stat][weapon_2_stat_name];

        weapon_1_bar.setAttribute("aria-valuenow", weapon1[stat].toString());
        weapon_2_bar.setAttribute("aria-valuenow", weapon2[stat].toString());

        let weapon_1_stat_percent = (weapon1[stat]/MAX_VALUES[stat]) * 100;
        let weapon_2_stat_percent = (weapon2[stat]/MAX_VALUES[stat]) * 100;

        weapon_1_bar.setAttribute("style", "width: " + weapon_1_stat_percent.toString() + "%");
        weapon_2_bar.setAttribute("style", "width: " + weapon_2_stat_percent.toString() + "%");

        weapon_1_bar.innerHTML = weapon1[stat];
        weapon_2_bar.innerHTML = weapon2[stat];

        // The padded text causes the bar to display even when the
        // value is 0. So remove the padding if the value is 0
        if (weapon_1_bar.innerHTML == 0)
            weapon_1_bar.classList.remove("weapon_bar_padded_text");
        else
            weapon_1_bar.classList.add("weapon_bar_padded_text");

        if (weapon_2_bar.innerHTML == 0)
            weapon_2_bar.classList.remove("weapon_bar_padded_text");
        else
            weapon_2_bar.classList.add("weapon_bar_padded_text");
    }
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

function generate_stat_display_cards() {
    
    for (var stat of STAT_LIST) {
        let weapon_1_stat_name = "weapon1_" + stat;
        let weapon_2_stat_name = "weapon2_" + stat;

        stat_display_cards[stat] = {};
        stat_display_cards[stat][weapon_1_stat_name] = document.getElementById(weapon_1_stat_name);
        stat_display_cards[stat][weapon_2_stat_name] = document.getElementById(weapon_2_stat_name);
    }
}

function populate_weapons() {
    return {
        "none":
        {
            "display": "None",
            "ammo type": "none",
            "damage": 0,
            "effective_range": 0,
            "rate_of_fire": 0,
            "handling": 0,
            "reload_time": 0,
            "muzzle_velocity": 0,
            "melee_damage": 0,
            "heavy_melee_damage": 0,
            "cost": 0,            
            "mag_size": 0,
            "reserve_ammo": 0,
            "special_ammo_list": "none"
        },
        "berthier mle 1892": 
        {
            "display": "Berthier Mle 1892",
            "ammo type": "long",
            "damage": 130,
            "effective_range": 305,
            "rate_of_fire": 36,
            "handling": 79,
            "reload_time": 3,
            "muzzle_velocity": 590,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 356,
            "mag_size": 3,
            "reserve_ammo": 12,
            "special_ammo_list": "berthier"
        },
        "berthier mle 1892 deadeye": 
        {
            "display": "Berthier Mle 1892 Deadeye",
            "ammo type": "long",
            "damage": 130,
            "effective_range": 305,
            "rate_of_fire": 36,
            "handling": 75,
            "reload_time": 3,
            "muzzle_velocity": 590,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 388,
            "mag_size": 3,
            "reserve_ammo": 12,
            "special_ammo_list": "berthier"
        },
        "berthier mle 1892 riposte": 
        {
            "display": "Berthier Mle 1892 Riposte",
            "ammo type": "long",
            "damage": 130,
            "effective_range": 305,
            "rate_of_fire": 36,
            "handling": 79,
            "reload_time": 3,
            "muzzle_velocity": 590,
            "melee_damage": 82,
            "heavy_melee_damage": 168,
            "cost": 370,
            "mag_size": 3,
            "reserve_ammo": 12,
            "special_ammo_list": "berthier"
        },
        "bomb lance": 
        {
            "display": "Bomb Lance",
            "ammo type": "special",
            "damage": 150,
            "effective_range": 25,
            "rate_of_fire": 15,
            "handling": 87,
            "reload_time": 4,
            "muzzle_velocity": 60,
            "melee_damage": 180,
            "heavy_melee_damage": 360,
            "cost": 199,
            "mag_size": 1,
            "reserve_ammo": 5,
            "special_ammo_list": "none"
        },
        "bornheim no. 3": 
        {
            "display": "Bornheim No. 3",
            "ammo type": "compact",
            "damage": 74,
            "effective_range": 64,
            "rate_of_fire": 210,
            "handling": 64,
            "reload_time": 3,
            "muzzle_velocity": 380,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 201,            
            "mag_size": 6,
            "reserve_ammo": 10,
            "special_ammo_list": "bornheim"
        },
        "bornheim no. 3 extended": 
        {
            "display": "Bornheim No. 3 Extended",
            "ammo type": "compact",
            "damage": 74,
            "effective_range": 64,
            "rate_of_fire": 210,
            "handling": 64,
            "reload_time": 8,
            "muzzle_velocity": 380,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 306,            
            "mag_size": 9,
            "reserve_ammo": 10,
            "special_ammo_list": "bornheim"
        },
        "bornheim no. 3 match": 
        {
            "display": "Bornheim No. 3 Match",
            "ammo type": "compact",
            "damage": 80,
            "effective_range": 68,
            "rate_of_fire": 210,
            "handling": 85,
            "reload_time": 3,
            "muzzle_velocity": 400,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 224,            
            "mag_size": 6,
            "reserve_ammo": 10,
            "special_ammo_list": "bornheim"
        },
        "caldwell 92 new army": 
        {
            "display": "Caldwell 92 New Army",
            "ammo type": "compact",
            "damage": 97,
            "effective_range": 79,
            "rate_of_fire": 107,
            "handling": 59,
            "reload_time": 10,
            "muzzle_velocity": 230,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 90,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "caldwell 92"
        },
        
        "caldwell conversion chain pistol": 
        {
            "display": "Caldwell Conversion Chain Pistol",
            "ammo type": "compact",
            "damage": 104,
            "effective_range": 84,
            "rate_of_fire": 44,
            "handling": 60,
            "reload_time": 28,
            "muzzle_velocity": 300,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 50,            
            "mag_size": 17,
            "reserve_ammo": 18,
            "special_ammo_list": "caldwell conversion"
        },
        "caldwell conversion pistol": 
        {
            "display": "Caldwell Conversion Pistol",
            "ammo type": "compact",
            "damage": 104,
            "effective_range": 84,
            "rate_of_fire": 44,
            "handling": 66,
            "reload_time": 11,
            "muzzle_velocity": 300,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 26,            
            "mag_size": 6,
            "reserve_ammo": 18,
            "special_ammo_list": "caldwell conversion"
        },
        "caldwell conversion uppercut": 
        {
            "display": "Caldwell Conversion Uppercut",
            "ammo type": "long",
            "damage": 130,
            "effective_range": 96,
            "rate_of_fire": 40,
            "handling": 57,
            "reload_time": 15,
            "muzzle_velocity": 410,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 275,            
            "mag_size": 6,
            "reserve_ammo": 9,
            "special_ammo_list": "caldwell conversion uppercut"
        },
        "caldwell pax": 
        {
            "display": "Caldwell Pax",
            "ammo type": "medium",
            "damage": 110,
            "effective_range": 86,
            "rate_of_fire": 46,
            "handling": 60,
            "reload_time": 11,
            "muzzle_velocity": 330,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 100,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "caldwell pax"
        },
        "caldwell pax claw": 
        {
            "display": "Caldwell Pax Claw",
            "ammo type": "medium",
            "damage": 110,
            "effective_range": 86,
            "rate_of_fire": 46,
            "handling": 60,
            "reload_time": 11,
            "muzzle_velocity": 330,
            "melee_damage": 37,
            "heavy_melee_damage": 75,
            "cost": 100,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "caldwell pax"
        },
        "caldwell rival 78": 
        {
            "display": "Caldwell Rival 78",
            "ammo type": "shotgun",
            "damage": 175,
            "effective_range": 12,
            "rate_of_fire": 90,
            "handling":87,
            "reload_time": 4,
            "muzzle_velocity": 400,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 100,            
            "mag_size": 2,
            "reserve_ammo": 8,
            "special_ammo_list": "caldwell rival"
        },
        "caldwell rival 78 handcannon": 
        {
            "display": "Caldwell Rival 78 Handcannon",
            "ammo type": "shotgun",
            "damage": 85,
            "effective_range": 8,
            "rate_of_fire": 90,
            "handling":84,
            "reload_time": 4,
            "muzzle_velocity": 350,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 85,            
            "mag_size": 2,
            "reserve_ammo": 6,
            "special_ammo_list": "caldwell rival"
        },
        "crossbow": 
        {
            "display": "Crossbow",
            "ammo type": "special",
            "damage": 260,
            "effective_range": 47,
            "rate_of_fire": 10,
            "handling":54,
            "reload_time": 6,
            "muzzle_velocity": 150,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 50,            
            "mag_size": 1,
            "reserve_ammo": 18,
            "special_ammo_list": "crossbow"
        },
        "crown & king auto-5": 
        {
            "display": "Crown & King Auto-5",
            "ammo type": "shotgun",
            "damage": 185,
            "effective_range": 12,
            "rate_of_fire": 100,
            "handling": 78,
            "reload_time": 10,
            "muzzle_velocity": 425,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 600,            
            "mag_size": 5,
            "reserve_ammo": 6,
            "special_ammo_list": "crown & king"
        },
        "dolch 96": 
        {
            "display": "Dolch 96",
            "ammo type": "medium",
            "damage": 97,
            "effective_range": 78,
            "rate_of_fire": 164,
            "handling": 61,
            "reload_time": 6,
            "muzzle_velocity": 440,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 750,            
            "mag_size": 10,
            "reserve_ammo": 10,
            "special_ammo_list": "dolch 96"
        },
        "dolch 96 precision": 
        {
            "display": "Dolch 96 Precision",
            "ammo type": "medium",
            "damage": 97,
            "effective_range": 78,
            "rate_of_fire": 164,
            "handling": 69,
            "reload_time": 6,
            "muzzle_velocity": 440,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 790,            
            "mag_size": 10,
            "reserve_ammo": 10,
            "special_ammo_list": "dolch 96"
        },
        "hand crossbow": 
        {
            "display": "Hand Crossbow",
            "ammo type": "special",
            "damage": 195,
            "effective_range": 45,
            "rate_of_fire": 12,
            "handling": 53,
            "reload_time": 5,
            "muzzle_velocity": 100,
            "melee_damage": 13,
            "heavy_melee_damage": 27,
            "cost": 30,            
            "mag_size": 1,
            "reserve_ammo": 16,
            "special_ammo_list": "hand crossbow"
        },
        "hunting bow": 
        {
            "display": "Hunting Bow",
            "ammo type": "special",
            "damage": 227,
            "effective_range": 23,
            "rate_of_fire": 45,
            "handling": 66,
            "reload_time": 1,
            "muzzle_velocity": 150,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 57,            
            "mag_size": 1,
            "reserve_ammo": 16,
            "special_ammo_list": "hunting bow"
        },
        "hand crossbow": 
        {
            "display": "Hand Crossbow",
            "ammo type": "special",
            "damage": 195,
            "effective_range": 45,
            "rate_of_fire": 12,
            "handling": 53,
            "reload_time": 5,
            "muzzle_velocity": 100,
            "melee_damage": 13,
            "heavy_melee_damage": 27,
            "cost": 30,            
            "mag_size": 1,
            "reserve_ammo": 16,
            "special_ammo_list": "hand crossbow"
        },
        "lemat mark ii": 
        {
            "display": "LeMat Mark II",
            "ammo type": "compact",
            "damage": 97,
            "effective_range": 79,
            "rate_of_fire": 42,
            "handling": 66,
            "reload_time": 15,
            "muzzle_velocity": 300,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 95,            
            "mag_size": 9,
            "reserve_ammo": 18,
            "special_ammo_list": "lemat mark ii"
        },
        "lebel 1886": 
        {
            "display": "Lebel 1886",
            "ammo type": "long",
            "damage": 132,
            "effective_range": 310,
            "rate_of_fire": 34,
            "handling": 83,
            "reload_time": 18,
            "muzzle_velocity": 630,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 397,            
            "mag_size": 10,
            "reserve_ammo": 5,
            "special_ammo_list": "lebel 1886"
        },
        "lebel 1886 aperture": 
        {
            "display": "Lebel 1886 Aperture",
            "ammo type": "long",
            "damage": 132,
            "effective_range": 310,
            "rate_of_fire": 34,
            "handling": 80,
            "reload_time": 18,
            "muzzle_velocity": 630,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 425,            
            "mag_size": 10,
            "reserve_ammo": 5,
            "special_ammo_list": "lebel 1886"
        },
        "lebel 1886 marksman": 
        {
            "display": "Lebel 1886 Marksman",
            "ammo type": "long",
            "damage": 132,
            "effective_range": 310,
            "rate_of_fire": 34,
            "handling": 80,
            "reload_time": 18,
            "muzzle_velocity": 630,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 437,            
            "mag_size": 10,
            "reserve_ammo": 5,
            "special_ammo_list": "lebel 1886"
        },
        "lebel 1886 talon": 
        {
            "display": "Lebel 1886 Talon",
            "ammo type": "long",
            "damage": 132,
            "effective_range": 310,
            "rate_of_fire": 34,
            "handling": 81,
            "reload_time": 18,
            "muzzle_velocity": 630,
            "melee_damage": 27,
            "heavy_melee_damage": 150,
            "cost": 422,            
            "mag_size": 10,
            "reserve_ammo": 5,
            "special_ammo_list": "lebel 1886"
        },
        "martini-henry ic1": 
        {
            "display": "Martini-Henry IC1",
            "ammo type": "long",
            "damage": 143,
            "effective_range": 334,
            "rate_of_fire": 45,
            "handling": 70,
            "reload_time": 3,
            "muzzle_velocity": 400,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 122,            
            "mag_size": 1,
            "reserve_ammo": 20,
            "special_ammo_list": "martini-henry ic1"
        },
        "martini-henry ic1 deadeye": 
        {
            "display": "Martini-Henry IC1 Deadeye",
            "ammo type": "long",
            "damage": 143,
            "effective_range": 334,
            "rate_of_fire": 45,
            "handling": 67,
            "reload_time": 3,
            "muzzle_velocity": 400,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 145,            
            "mag_size": 1,
            "reserve_ammo": 20,
            "special_ammo_list": "martini-henry ic1"
        },
        "martini-henry ic1 marksman": 
        {
            "display": "Martini-Henry IC1 Marksman",
            "ammo type": "long",
            "damage": 143,
            "effective_range": 334,
            "rate_of_fire": 45,
            "handling": 68,
            "reload_time": 3,
            "muzzle_velocity": 400,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 173,            
            "mag_size": 1,
            "reserve_ammo": 20,
            "special_ammo_list": "martini-henry ic1"
        },
        "martini-henry ic1 riposte": 
        {
            "display": "Martini-Henry IC1 Riposte",
            "ammo type": "long",
            "damage": 143,
            "effective_range": 334,
            "rate_of_fire": 45,
            "handling": 66,
            "reload_time": 3,
            "muzzle_velocity": 400,
            "melee_damage": 82,
            "heavy_melee_damage": 168,
            "cost": 164,            
            "mag_size": 1,
            "reserve_ammo": 20,
            "special_ammo_list": "martini-henry ic1"
        },
        "mosin-nagant m1891": 
        {
            "display": "Mosin-Nagant M1891",
            "ammo type": "long",
            "damage": 136,
            "effective_range": 319,
            "rate_of_fire": 34,
            "handling": 75,
            "reload_time": 4,
            "muzzle_velocity": 615,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 490,            
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 avtomat": 
        {
            "display": "Mosin-Nagant M1891 Avtomat",
            "ammo type": "long",
            "damage": 136,
            "effective_range": 319,
            "rate_of_fire": 400,
            "handling": 35,
            "reload_time": 11,
            "muzzle_velocity": 615,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 1250,            
            "mag_size": 15,
            "reserve_ammo": 0,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 bayonet": 
        {
            "display": "Mosin-Nagant M1891 Bayonet",
            "ammo type": "long",
            "damage": 136,
            "effective_range": 319,
            "rate_of_fire": 34,
            "handling": 70,
            "reload_time": 4,
            "muzzle_velocity": 615,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 540,
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 obrez": 
        {
            "display": "Mosin-Nagant Obrez",
            "ammo type": "long",
            "damage": 133,
            "effective_range": 314,
            "rate_of_fire": 34,
            "handling": 68,
            "reload_time": 4,
            "muzzle_velocity": 550,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 290,            
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 obrez drum": 
        {
            "display": "Mosin-Nagant M1891 Obrez Drum",
            "ammo type": "long",
            "damage": 133,
            "effective_range": 314,
            "rate_of_fire": 34,
            "handling": 65,
            "reload_time": 11,
            "muzzle_velocity": 550,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 350,            
            "mag_size": 15,
            "reserve_ammo": 0,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 obrez mace": 
        {
            "display": "Mosin-Nagant M1891 Obrez Mace",
            "ammo type": "long",
            "damage": 133,
            "effective_range": 314,
            "rate_of_fire": 34,
            "handling": 65,
            "reload_time": 4,
            "muzzle_velocity": 550,
            "melee_damage": 54,
            "heavy_melee_damage": 90,
            "cost": 310,            
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "mosin-nagant m1891 sniper": 
        {
            "display": "Mosin-Nagant M1891 Sniper",
            "ammo type": "long",
            "damage": 136,
            "effective_range": 319,
            "rate_of_fire": 34,
            "handling": 75,
            "reload_time": 5,
            "muzzle_velocity": 615,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 550,            
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "mosin-nagant m1891"
        },
        "nagant m1895": 
        {
            "display": "Nagant M1895",
            "ammo type": "compact",
            "damage": 91,
            "effective_range": 73,
            "rate_of_fire": 40,
            "handling": 63,
            "reload_time": 12,
            "muzzle_velocity": 330,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 24,            
            "mag_size": 7,
            "reserve_ammo": 21,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 deadeye": 
        {
            "display": "Nagant M1895 Deadeye",
            "ammo type": "compact",
            "damage": 91,
            "effective_range": 73,
            "rate_of_fire": 63,
            "handling": 85,
            "reload_time": 13,
            "muzzle_velocity": 330,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 42,            
            "mag_size": 7,
            "reserve_ammo": 21,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 officer": 
        {
            "display": "Nagant M1895 Officer",
            "ammo type": "compact",
            "damage": 91,
            "effective_range": 73,
            "rate_of_fire": 120,
            "handling": 58,
            "reload_time": 12,
            "muzzle_velocity": 330,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 96,            
            "mag_size": 7,
            "reserve_ammo": 14,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 officer brawler": 
        {
            "display": "Nagant M1895 Officer Brawler",
            "ammo type": "compact",
            "damage": 91,
            "effective_range": 73,
            "rate_of_fire": 120,
            "handling": 54,
            "reload_time": 12,
            "muzzle_velocity": 330,
            "melee_damage": 31,
            "heavy_melee_damage": 72,
            "cost": 110,            
            "mag_size": 7,
            "reserve_ammo": 14,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 officer carbine": 
        {
            "display": "Nagant M1895 Officer Carbine",
            "ammo type": "compact",
            "damage": 104,
            "effective_range": 92,
            "rate_of_fire": 120,
            "handling": 89,
            "reload_time": 12,
            "muzzle_velocity": 360,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 155,            
            "mag_size": 7,
            "reserve_ammo": 14,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 officer carbine deadeye": 
        {
            "display": "Nagant M1895 Officer Carbine Deadeye",
            "ammo type": "compact",
            "damage": 104,
            "effective_range": 92,
            "rate_of_fire": 120,
            "handling": 84,
            "reload_time": 12,
            "muzzle_velocity": 360,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 211,            
            "mag_size": 7,
            "reserve_ammo": 14,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 precision": 
        {
            "display": "Nagant M1895 Precision",
            "ammo type": "compact",
            "damage": 91,
            "effective_range": 73,
            "rate_of_fire": 63,
            "handling": 86,
            "reload_time": 13,
            "muzzle_velocity": 330,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 29,            
            "mag_size": 7,
            "reserve_ammo": 21,
            "special_ammo_list": "nagant m1895"
        },
        "nagant m1895 silencer": 
        {
            "display": "Nagant M1895 Silencer",
            "ammo type": "compact",
            "damage": 91,
            "effective_range": 56,
            "rate_of_fire": 40,
            "handling": 61,
            "reload_time": 12,
            "muzzle_velocity": 250,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 53,            
            "mag_size": 7,
            "reserve_ammo": 21,
            "special_ammo_list": "nagant m1895"
        },
        "nitro express rifle": 
        {
            "display": "Nitro Express Rifle",
            "ammo type": "special",
            "damage": 364,
            "effective_range": 250,
            "rate_of_fire": 60,
            "handling": 41,
            "reload_time": 4,
            "muzzle_velocity": 550,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 1015,            
            "mag_size": 2,
            "reserve_ammo": 4,
            "special_ammo_list": "nitro express rifle"
        },
        "romero 77": 
        {
            "display": "Romero 77",
            "ammo type": "shotgun",
            "damage": 200,
            "effective_range": 15,
            "rate_of_fire": 30,
            "handling": 92,
            "reload_time": 3,
            "muzzle_velocity": 450,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 34,            
            "mag_size": 1,
            "reserve_ammo": 12,
            "special_ammo_list": "romero 77"
        },
        "romero 77 alamo": 
        {
            "display": "Romero 77 Alamo",
            "ammo type": "shotgun",
            "damage": 200,
            "effective_range": 15,
            "rate_of_fire": 22,
            "handling": 92,
            "reload_time": 13,
            "muzzle_velocity": 450,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 98,            
            "mag_size": 5,
            "reserve_ammo": 5,
            "special_ammo_list": "romero 77"
        },
        "romero 77 handcannon": 
        {
            "display": "Romero 77 Handcannon",
            "ammo type": "shotgun",
            "damage": 140,
            "effective_range": 10,
            "rate_of_fire": 30,
            "handling": 86,
            "reload_time": 3,
            "muzzle_velocity": 375,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 26,            
            "mag_size": 1,
            "reserve_ammo": 10,
            "special_ammo_list": "romero 77"
        },
        "romero 77 hatchet": 
        {
            "display": "Romero 77 Hatchet",
            "ammo type": "shotgun",
            "damage": 140,
            "effective_range": 10,
            "rate_of_fire": 30,
            "handling": 80,
            "reload_time": 3,
            "muzzle_velocity": 375,
            "melee_damage": 90,
            "heavy_melee_damage": 150,
            "cost": 62,            
            "mag_size": 1,
            "reserve_ammo": 10,
            "special_ammo_list": "romero 77"
        },
        "romero 77 talon": 
        {
            "display": "Romero 77 Talon",
            "ammo type": "shotgun",
            "damage": 200,
            "effective_range": 15,
            "rate_of_fire": 30,
            "handling": 88,
            "reload_time": 3,
            "muzzle_velocity": 450,
            "melee_damage": 27,
            "heavy_melee_damage": 150,
            "cost": 59,            
            "mag_size": 1,
            "reserve_ammo": 12,
            "special_ammo_list": "romero 77"
        },
        "scottfield model 3": 
        {
            "display": "Scottfield Model 3",
            "ammo type": "medium",
            "damage": 107,
            "effective_range": 85,
            "rate_of_fire": 41,
            "handling": 68,
            "reload_time": 9,
            "muzzle_velocity": 280,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 77,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "scottfield"
        },
        "scottfield model 3 brawler": 
        {
            "display": "Scottfield Model 3 Brawler",
            "ammo type": "medium",
            "damage": 107,
            "effective_range": 85,
            "rate_of_fire": 41,
            "handling": 62,
            "reload_time": 9,
            "muzzle_velocity": 280,
            "melee_damage": 31,
            "heavy_melee_damage": 72,
            "cost": 92,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "scottfield"
        },
        "scottfield model 3 precision": 
        {
            "display": "Scottfield Model 3 Precision",
            "ammo type": "medium",
            "damage": 107,
            "effective_range": 85,
            "rate_of_fire": 52,
            "handling": 80,
            "reload_time": 9,
            "muzzle_velocity": 280,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 85,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "scottfield"
        },
        "scottfield model 3 spitfire": 
        {
            "display": "Scottfield Model 3 Spitfire",
            "ammo type": "medium",
            "damage": 107,
            "effective_range": 85,
            "rate_of_fire": 77,
            "handling": 62,
            "reload_time": 9,
            "muzzle_velocity": 280,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 108,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "scottfield"
        },
        "scottfield model 3 swift": 
        {
            "display": "Scottfield Model 3 Swift",
            "ammo type": "medium",
            "damage": 107,
            "effective_range": 85,
            "rate_of_fire": 41,
            "handling": 68,
            "reload_time": 4,
            "muzzle_velocity": 280,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 95,            
            "mag_size": 6,
            "reserve_ammo": 12,
            "special_ammo_list": "scottfield"
        },
        "sparks lrr": 
        {
            "display": "Sparks LRR",
            "ammo type": "long",
            "damage": 149,
            "effective_range": 347,
            "rate_of_fire": 38,
            "handling": 73,
            "reload_time": 4,
            "muzzle_velocity": 533,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 130,            
            "mag_size": 1,
            "reserve_ammo": 16,
            "special_ammo_list": "sparks"
        },
        "sparks lrr silencer": 
        {
            "display": "Sparks LRR Silencer",
            "ammo type": "long",
            "damage": 149,
            "effective_range": 144,
            "rate_of_fire": 38,
            "handling": 71,
            "reload_time": 4,
            "muzzle_velocity": 300,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 150,            
            "mag_size": 1,
            "reserve_ammo": 16,
            "special_ammo_list": "sparks"
        },
        "sparks lrr sniper": 
        {
            "display": "Sparks LRR Sniper",
            "ammo type": "long",
            "damage": 149,
            "effective_range": 347,
            "rate_of_fire": 38,
            "handling": 70,
            "reload_time": 4,
            "muzzle_velocity": 533,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 199,            
            "mag_size": 1,
            "reserve_ammo": 16,
            "special_ammo_list": "sparks"
        },
        "sparks lrr pistol": 
        {
            "display": "Sparks LRR Pistol",
            "ammo type": "long",
            "damage": 149,
            "effective_range": 150,
            "rate_of_fire": 38,
            "handling": 60,
            "reload_time": 4,
            "muzzle_velocity": 453,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 155,            
            "mag_size": 1,
            "reserve_ammo": 14,
            "special_ammo_list": "sparks"
        },
        "specter 1882": 
        {
            "display": "Specter 1882",
            "ammo type": "shotgun",
            "damage": 185,
            "effective_range": 12,
            "rate_of_fire": 40,
            "handling": 85,
            "reload_time": 14,
            "muzzle_velocity": 425,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 188,            
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "specter"
        },
        "specter 1882 bayoney": 
        {
            "display": "Specter 1882 Bayonet",
            "ammo type": "shotgun",
            "damage": 175,
            "effective_range": 12,
            "rate_of_fire": 40,
            "handling": 81,
            "reload_time": 14,
            "muzzle_velocity": 400,
            "melee_damage": 27,
            "heavy_melee_damage": 168,
            "cost": 223,            
            "mag_size": 5,
            "reserve_ammo": 10,
            "special_ammo_list": "specter"
        },
        "specter 1882 compact": 
        {
            "display": "Specter 1882 Compact",
            "ammo type": "shotgun",
            "damage": 85,
            "effective_range": 8,
            "rate_of_fire": 40,
            "handling": 80,
            "reload_time": 11,
            "muzzle_velocity": 350,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 164,            
            "mag_size": 4,
            "reserve_ammo": 8,
            "special_ammo_list": "specter"
        },
        "springfield 1866": 
        {
            "display": "Springfield 1866",
            "ammo type": "medium",
            "damage": 132,
            "effective_range": 212,
            "rate_of_fire": 42,
            "handling": 80,
            "reload_time": 2,
            "muzzle_velocity": 490,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 38,            
            "mag_size": 1,
            "reserve_ammo": 24,
            "special_ammo_list": "springfield"
        },
        "springfield 1866 compact": 
        {
            "display": "Springfield 1866 Compact",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 67,
            "reload_time": 2,
            "muzzle_velocity": 440,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 33,            
            "mag_size": 1,
            "reserve_ammo": 24,
            "special_ammo_list": "springfield"
        },
        "springfield 1866 compact deadeye": 
        {
            "display": "Springfield 1866 Compact Deadeye",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 73,
            "reload_time": 2,
            "muzzle_velocity": 440,
            "melee_damage": 13,
            "heavy_melee_damage": 31,
            "cost": 46,            
            "mag_size": 1,
            "reserve_ammo": 24,
            "special_ammo_list": "springfield"
        },
        "springfield 1866 compact striker": 
        {
            "display": "Springfield 1866 Compact Striker",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 66,
            "reload_time": 2,
            "muzzle_velocity": 440,
            "melee_damage": 52,
            "heavy_melee_damage": 105,
            "cost": 56,            
            "mag_size": 1,
            "reserve_ammo": 24,
            "special_ammo_list": "springfield"
        },
        "springfield 1866 marksman": 
        {
            "display": "Springfield 1866 marksman",
            "ammo type": "medium",
            "damage": 132,
            "effective_range": 212,
            "rate_of_fire": 42,
            "handling": 75,
            "reload_time": 2,
            "muzzle_velocity": 490,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 73,            
            "mag_size": 1,
            "reserve_ammo": 24,
            "special_ammo_list": "springfield"
        },
        "vetterli 71 karabiner": 
        {
            "display": "Vetterli 71 Karabiner",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 87,
            "reload_time": 12,
            "muzzle_velocity": 410,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 105,            
            "mag_size": 7,
            "reserve_ammo": 20,
            "special_ammo_list": "vetterli"
        },
        "vetterli 71 karabiner bayonet": 
        {
            "display": "Vetterli 71 Karabiner Bayonet",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 85,
            "reload_time": 12,
            "muzzle_velocity": 410,
            "melee_damage": 27,
            "heavy_melee_damage": 168,
            "cost": 155,            
            "mag_size": 7,
            "reserve_ammo": 20,
            "special_ammo_list": "vetterli"
        },
        "vetterli 71 karabiner deadeye": 
        {
            "display": "Vetterli 71 Karabiner Deadeye",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 83,
            "reload_time": 12,
            "muzzle_velocity": 410,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 130,            
            "mag_size": 7,
            "reserve_ammo": 20,
            "special_ammo_list": "vetterli"
        },
        "vetterli 71 karabiner marksman": 
        {
            "display": "Vetterli 71 Karabiner Marksman",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 203,
            "rate_of_fire": 42,
            "handling": 80,
            "reload_time": 12,
            "muzzle_velocity": 410,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 190,            
            "mag_size": 7,
            "reserve_ammo": 20,
            "special_ammo_list": "vetterli"
        },
        "vetterli 71 karabiner silencer": 
        {
            "display": "Vetterli 71 Karabiner Silencer",
            "ammo type": "medium",
            "damage": 130,
            "effective_range": 133,
            "rate_of_fire": 42,
            "handling": 82,
            "reload_time": 12,
            "muzzle_velocity": 280,
            "melee_damage": 27,
            "heavy_melee_damage": 54,
            "cost": 150,            
            "mag_size": 7,
            "reserve_ammo": 20,
            "special_ammo_list": "vetterli"
        },
    }
}

function populate_ammos() {
    return {
        "berthier":
        {
            "spitzer":
            {
                "damage": -19,
                "effective_range": 13,
                "rate_of_fire": 0,
                "handling": -8,
                "reload_time": 0,
                "muzzle_velocity": 190,
                "cost": 220
            },
            "incendiary":
            {
                "damage": 0,
                "effective_range": 0,
                "rate_of_fire": 0,
                "handling": 0,
                "reload_time": 0,
                "muzzle_velocity": 0,
                "cost": 35
            }
        },
        "bornheim":
        {
            "high velocity":
            {
                "damage": 0,
                "effective_range": 0,
                "rate_of_fire": 0,
                "handling": -6,
                "reload_time": 0,
                "muzzle_velocity": 160,
                "cost": 75
            },
            "incendiary":
            {
                "damage": 0,
                "effective_range": 0,
                "rate_of_fire": 0,
                "handling": 0,
                "reload_time": 0,
                "muzzle_velocity": 0,
                "cost": 25
            }
        }
    }
}