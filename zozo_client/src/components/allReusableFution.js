export const getAge = (birthday) => {
  console.log("Calculating age for birthday:", birthday);
  
  if (!birthday) return "";
  const birthDate = new Date(birthday);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};