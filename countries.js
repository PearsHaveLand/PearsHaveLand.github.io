// Having these as global is useful, since it's used in different functions
// I'd rather not pass this around as an argument
var countries = [];
var MAX_RESULTS = 5;
var currResult = -1;

// Updates the list of search results
function updateSearch() {
  let keyEvent = window.event.keyCode;

  // On arrow keys, we don't want to remove results, since we're highlighting existing ones
  if (!(keyEvent >= 37 && keyEvent <= 40)) {

    // We want to clear the results first, so there's no repetitions
    clearResults();
  }

  // Only refresh results on backspace or letter
  if ((keyEvent == 8 || keyEvent == 32 || (keyEvent >= 65 && keyEvent <= 90))) {

    // If the key pressed was not ESC, get new results
    if (window.event.keyCode != 27){

      let val = document.getElementById("searchinput").value;

      // For this project, I don't want suggestions to appear in an empty search box
      if (val != "") {
        searchList(val, countries);
      }
    }
  }
}

// Searches a list for the value provided
function searchList(value) {

  let len = countries.length; // Used for iteration
  let counter = 0;  // Number of results found
  let iterator = 0; // Iterates through countries list

  // Used for case-insensitive comparison
  let valUpper = value.toUpperCase();

  // Iterates through entire list, displaying top 5 results
  while (iterator < len && counter < MAX_RESULTS) {

    // Used for case-insensitive comparison
    let countryUpper = countries[iterator].toUpperCase();

    // Perform comparison and render results
    if(countryUpper.includes(valUpper)) {
      renderResult(countries[iterator]);
      counter++;
    }

    iterator++;
  }
}

// Displays each search result on-screen
function renderResult(result) {
  let results = document.getElementById("searchresults");

  // Create new "result" node for each result
  // "result" nodes are easy to identify by their classname
  let node = document.createElement("div");
  node.classList.add("result");
  node.addEventListener("mouseover", handleMouseOver);
  node.addEventListener("mouseout", handleMouseOff);
  node.innerHTML += result;
  results.appendChild(node);
}

function handleMouseOver() {
  let node = event.target || event.srcElement;
  if (currResult != -1) {
    let highlightedNode = document.getElementById("highlighted");
    undoHighlight(document.getElementById("highlighted"));
  }
  highlight(node);
}

function handleMouseOff() {
  let node = event.target || event.srcElement;
  if (node.id == "highlighted") {
    undoHighlight(node);
  }
}

// Clears all results from the screen
function clearResults() {
  let resultList = document.getElementsByClassName("result");
  let parent = document.getElementById("searchresults");
  let len = resultList.length

  // Iterates through each result in the list, removing each existing result
  while(len > 0) {
    result = resultList[0];
    parent.removeChild(result);
    len = resultList.length;
  }
  currResult = -1;
}

// Changes the focus to a different result, highlighting the next item
function handleKeyDown() {
  keyEvent = window.event.keyCode;

  // If up or down arrow
  if (keyEvent == 38 || keyEvent == 40) {

    let resultList = document.getElementsByClassName("result");
    let resultLen = Math.min(resultList.length, MAX_RESULTS);
    let oldResult = currResult;

    if (resultLen > 0) {
      // handle up arrow
      if (keyEvent == 38) {
        currResult = (currResult - 1) % resultLen;
        if (currResult == -1) {
          currResult = resultLen - 1;
        }
      }
      // handle down arrow
      else if (keyEvent == 40) {
        currResult = (currResult + 1) % resultLen;
      }
      if (currResult < 0) {
        currResult = 0;
      }
      if (oldResult != -1) {
        undoHighlight(document.getElementById("highlighted"));
      }
      highlight(resultList[currResult], oldResult);
    }
  }
}

function highlight(node) {
  node.id = "highlighted";
}

function undoHighlight(node){
  if (node != null) {
    node.id = "";
  }
}

window.onload = function() {

  // Load country list for searching
  countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua & Deps",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Rep",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo {Democratic Rep}",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland {Republic}",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea North",
    "Korea South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar {Burma}",
    "Burma",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St Kitts & Nevis",
    "St Lucia",
    "Saint Vincent & the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome & Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];

  let inputField = document.getElementById("searchinput");
  inputField.addEventListener("keyup", updateSearch);
  document.addEventListener("keydown", handleKeyDown);
};
