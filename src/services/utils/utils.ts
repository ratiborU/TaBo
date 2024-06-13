export const transformDate = (stringDate: string): string => {
  const date = new Date(stringDate);
  const day = `${date.getDate() < 10 ? '0': ''}${date.getDate()}`
  const months = `${date.getMonth() < 10 ? '0': ''}${date.getMonth() + 1}`
  const year = `${date.getFullYear()}`
  return `${day}.${months}.${year}`;
}



const userStiles = [
  "#FF7898",
  "#7886FF",
  "#FFD178",
  "#60E755",
  "#444444",
  "#2EEEE2",
]

export const getUserStiles = (username: string) => {
  let result = 0;
  if (!username) {
    return userStiles[0];
  }
  for (let i = 0; i < username.length; i++) {
    result += username.charCodeAt(i);
  }
  // console.log(result % 6);
  if (username == 'ратибор') {
    return userStiles[4];
  }
  return userStiles[result % 6];
}
