export const getDateAsText = (date: Date) =>
  `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

export const getTimeAsText = (time: Date) =>
  `${time.getHours()}:${time.getMinutes()}`;
