var nord0 = "#2e3440";
var nord1 = "#3b4252";
var nord2 = "#434c5e";
var nord3 = "#4c566a";
var nord4 = "#d8dee9";
var nord5 = "#e5e9f0";
var nord6 = "#eceff4";
var darkLinkColor = "#abb9cf";
var darkMode = true;
var selectionBorderFocusedColor = nord3;
var selectionBorderBlurColor = nord1;

function toggleDarkMode()
{
    // Set to lightmode
    if(darkMode == true)
    {
        document.documentElement.style.setProperty('--jumbotron-background', nord5);
        document.documentElement.style.setProperty('--content-background', nord6);
        document.documentElement.style.setProperty('--body-text-color', nord0);
        document.documentElement.style.setProperty('--link-hover-color', nord1);
        document.documentElement.style.setProperty('--link-color', nord3);
        document.documentElement.style.setProperty('--nav-hover-background', nord4);
        document.documentElement.style.setProperty('--dropdown-select-color', darkLinkColor);
        document.documentElement.style.setProperty('--selection-border-focused-color', darkLinkColor);
        document.documentElement.style.setProperty('--selection-border-blur-color', nord4);
        selectionBorderFocusedColor = darkLinkColor;
        selectionBorderBlurColor = nord4;
    }
    // Set to darkmode
    else
    {
        document.documentElement.style.setProperty('--jumbotron-background', nord1);
        document.documentElement.style.setProperty('--content-background', nord0);
        document.documentElement.style.setProperty('--body-text-color', nord4);
        document.documentElement.style.setProperty('--link-hover-color', nord6);
        document.documentElement.style.setProperty('--link-color', darkLinkColor);
        document.documentElement.style.setProperty('--nav-hover-background', nord3);
        document.documentElement.style.setProperty('--dropdown-select-color', nord2);
        document.documentElement.style.setProperty('--selection-border-focused-color', nord3);
        document.documentElement.style.setProperty('--selection-border-blur-color', nord1);
        selectionBorderFocusedColor = nord3;
        selectionBorderBlurColor = nord1;
    }
    darkMode = !darkMode;
}
