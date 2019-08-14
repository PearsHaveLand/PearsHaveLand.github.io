function updateInnerHeader(currHeight, maxHeight) {
  var scrollval = pageYOffset + window.innerHeight;
}

window.onload = function() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

  // When the user scrolls the page, run updateHeader
  window.onscroll = function() {updateHeader()};
  window.onresize = function() {updateHeader()};

  // Get the header
  var outerHeader = document.getElementById("outerheader");
  var innerHeader = document.getElementById("innerheader");

  // Get the offset position of the navbar
  var sticky = outerHeader.offsetTop;

  updateHeader();

  // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function updateHeader() {
    if (window.pageYOffset > sticky) {
      outerHeader.classList.add("sticky");
    } else {
      outerHeader.classList.remove("sticky");
    }
    var scrollval = pageYOffset + window.innerHeight + outerheader.scrollHeight;
    var percent = (scrollval / height) * 100;
    var percentString = percent.toString() + "%";
    innerHeader.style.width = percentString;
  }
}
