var nord0 = "#2e3440";
var nord1 = "#3b4252";
var nord2 = "#434c5e";
var nord3 = "#4c566a";
var nord4 = "#d8dee9";
var nord5 = "#e5e9f0";
var nord6 = "#eceff4";
var nord8 = "#88c0d0";
var darkLinkColor = "#abb9cf";
var colorTheme = "dark";
var selectionBorderFocusedColor = nord3;
var selectionBorderBlurColor = nord1;

function toggleDarkMode()
{
    if (sessionStorage.getItem("colorTheme") == null)
    {
        colorTheme = "dark";
    }
    else
    {
        colorTheme = sessionStorage.getItem("colorTheme");
    }

    // Set to lightmode
    if(colorTheme == "dark")
    {
        setTheme("light");
    }
    // Set to darkmode
    else
    {
        setTheme("dark");
    }
    sessionStorage.setItem("colorTheme", colorTheme);
    console.log(colorTheme);
}

function setTheme(theme)
{
    if (theme == "dark")
    {
        document.documentElement.style.setProperty('--jumbotron-background', nord1);
        document.documentElement.style.setProperty('--content-background', nord0);
        document.documentElement.style.setProperty('--body-text-color', nord4);
        document.documentElement.style.setProperty('--link-hover-color', nord6);
        document.documentElement.style.setProperty('--link-color', darkLinkColor);
        document.documentElement.style.setProperty('--dropdown-select-color', nord2);
        document.documentElement.style.setProperty('--selection-border-focused-color', nord3);
        document.documentElement.style.setProperty('--selection-border-blur-color', nord1);
        selectionBorderFocusedColor = nord3;
        selectionBorderBlurColor = nord1;
        colorTheme = "dark";
    }
    else
    {
        document.documentElement.style.setProperty('--jumbotron-background', nord4);
        document.documentElement.style.setProperty('--content-background', nord6);
        document.documentElement.style.setProperty('--body-text-color', nord0);
        document.documentElement.style.setProperty('--link-hover-color', nord1);
        document.documentElement.style.setProperty('--link-color', nord3);
        document.documentElement.style.setProperty('--dropdown-select-color', darkLinkColor);
        document.documentElement.style.setProperty('--selection-border-focused-color', darkLinkColor);
        document.documentElement.style.setProperty('--selection-border-blur-color', nord4);
        selectionBorderFocusedColor = darkLinkColor;
        selectionBorderBlurColor = nord4;
        colorTheme = "light";
    }
}

window.addEventListener("load", function(event){
    console.log(sessionStorage.getItem("colorTheme"));
    if (sessionStorage.getItem("colorTheme") == "light")
    {
        console.log("toggling");
        setTheme("light");
    }
})
