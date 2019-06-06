// Given a UNIX Timestamp, will return a readable time since
export function timeSince(date) {
  var seconds = Math.floor((new Date() - new Date(date * 1000)) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

// Get hostname from string 
export function getHostname(url){
  var pathArray = url.split( '/' );
  var protocol = pathArray[0];
  var host = pathArray[2];
  return protocol + '//' + host;
}

