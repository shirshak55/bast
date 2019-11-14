// This script is generated by the client to copied 
// on the user's website.
//
// You should navigate this file in order to understand it.
// There is just a few functions declared at the end, to get/set cookies,
// to stringify object into strings, and to generate an uuid.
//
// Let's begin.
//
// First, we want to execute our script only
// when the initial document has been completely loaded
// and parsed.
window.addEventListener('DOMContentLoaded', (event) => {
  // Once the document is loaded we want to check if there is already 
  // a cookie setted. If so, we parse it to get the data, otherwise we 
  // generate a new one with fresh data.

  const trackerCookieName = "__tracker__";
  // TODO: Remove the pipe condition.
  const trackerUrl = window.__trackerUrl || "http://127.0.0.1:3333/tracker";
  const websiteId = window.__websiteId || 1;
  // The value of the cookie, we'll be stored inside this variable.
  // If no cookie found, this function return an empty string.
  let cookieValue = getCookie(trackerCookieName);

  if (!cookieValue) {
    // The function return a stringified json.
    cookieValue = generateTrackerData();
    // We now set the cookie with those freshly data.
    setCookie(trackerCookieName, cookieValue, 1);
  }

  // Ok, now that we have our data (with req.location).
  // What we need to do?
  // We need to try to parse it, in order to have a
  // beautiful JS object.

  try {
    let trackerData = JSON.parse(cookieValue);
    // Cool, we have our tracker data as object.
    // We should set the previous page id, for uniq visit data.

    // Now, we're gonna send it to the tracker server.
    // We should generate a new Id.
    // The server address is ours or the user one (if self-hosted).
    // We got the value from the window scope.
    // Same for the website id.
    //
    // TODO: Add function to generate an uuid.
    trackerData.id = Math.floor(Math.random() * 1000);
    trackerData.pid = trackerData.pid || null;
    console.log(trackerData)

    // Also we have to build the query (with encodeUri and all that...)
    const query = generateQueryFromObject(trackerData);
    const url =`${trackerUrl}${query}`; 
    console.log(trackerData);

    // Finally the request.
    // TODO: We should use an img url instead of the fetch api.
    fetch(url, { method: 'GET', mode: 'cors' });
    // Now we have to update our cookie to add some data like
    // the previous page id.
    const { id, ...data } = trackerData;
    const updatedTrackerData = { ...data, pid: id };
    setCookie(trackerCookieName, JSON.stringify(updatedTrackerData), 1);
    // The end.
    // clap clap clap.
  } catch(e) {
    // Finger crossed.
    console.error(e)
  }


  function generateTrackerData() {
    let { hostname, origin, href, pathname } = window.location;

    if (origin === "null") {
      origin = "";
    }

    let data = {
      website_id: websiteId,
      hostname,
      origin,
      href,
      pathname,
    };

    return JSON.stringify(data);
  }

  // From MDN
  function getCookie(name) {
    var name = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  // From MDN.
  function setCookie(name, value, expireNbDay) {
    let d = new Date();
    d.setTime(d.getTime() + (expireNbDay*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Stolen, in consequence we should highly change this.
  function generateQueryFromObject(obj) {
    let keys = Object.keys(obj);

    return '?' +
      keys.map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
      }).join('&');
  }



});

