/** 두 날짜의 차이 구하기 */
const getDayDiff = indate => {
  const date1 = new Date();
  const date2 = new Date(indate);
  const DateDiff = date1.getTime() - date2.getTime();
  const result = Math.floor(Math.abs(DateDiff / (1000 * 60 * 60 * 24)));
  console.log(result);
  return result;
  // console.log(getDayDiff('2021-05-01', '2021-09-01'));
  // 4
};
