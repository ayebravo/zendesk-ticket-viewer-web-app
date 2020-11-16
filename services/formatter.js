const moment = require("moment");

function formatDate(value) {
  let formattedDate = moment(value).format("lll");
  return formattedDate;
}

module.exports.formatDate = formatDate;
