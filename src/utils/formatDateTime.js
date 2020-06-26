export function getFormatDate(date) {
  let yyyy = date.getFullYear().toString();
  let MM = (date.getMonth() + 1).toString();
  let dd = date.getDate().toString();

  return yyyy + (MM[1] ? MM : "0" + MM[0]) + (dd[1] ? dd : "0" + dd[0]);
}

export function getShortFcstTime(date) {
  let hh = date.getHours().toString();
  let mm = date.getMinutes().toString();
  let ss = date.getSeconds().toString();
  return (
    (hh[1] ? hh : "0" + hh[0]) +
    // ":" +
    (mm[1] ? mm : "0" + mm[0])
    // + ":" +
    // (ss[1] ? ss : "0" + ss[0])
  );
}
