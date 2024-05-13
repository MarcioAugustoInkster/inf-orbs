export const Flag = (country: string, isPng?: boolean) => {
    return `https://flagcdn.com/16x12/${country}.${isPng ? 'png' : 'webp'}, 
        https://flagcdn.com/32x24/${country}.webp 2x`;
}
