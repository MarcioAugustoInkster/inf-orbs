export function calcAgeByBirthDate(birthDate: string): number {
    const splitArray = birthDate.split('-');
    const formatTimeStamp = new Date(Number(splitArray[0]), Number(splitArray[1]), Number(splitArray[2]));
    const currentDatetime = new Date().getTime();
    const periodDifference = currentDatetime - Number(formatTimeStamp);
    const currentAge = Math.floor(periodDifference / ((((1000*60)*60)*24)*365.25))
    return currentAge;
}
