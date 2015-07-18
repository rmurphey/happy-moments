var formatDate = require('./helpers/formatDate');
var getHashNum = require('./helpers/getHashNum');

// using list from API call
module.exports = function(data) {

  var allMoments, count, currentMoment;

  currentMoment = getHashNum(window.location.href);
  allMoments = data;
  count = allMoments.count;

  var randomMoment = function() {
    currentMoment = Math.floor(Math.random()*count);
    return displayMoment(currentMoment);
  };

  var nextMoment = function() {
    currentMoment++;
    return displayMoment(currentMoment);
  };

  var prevMoment = function() {
    currentMoment--;
    return displayMoment(currentMoment);
  };

  if (currentMoment) {
    // There was a moment specified in the hash.
    updateMoments();
  } else {
    // No moment specified, we need to pick one.
    randomMoment();
  }

  function displayMoment (n) {
    var momentData = allMoments.results.happyMoments[n];
    var date = momentData.date.text;
    var moment = momentData.moment;
    document.querySelector('.moment--text').innerHTML = moment;
    document.querySelector('.moment--date').innerHTML = formatDate(date);
    history.pushState(null, null, '#' + n);
  }

  return {
    prevMoment: prevMoment,
    randomMoment: randomMoment,
    nextMoment: nextMoment
  };
};
