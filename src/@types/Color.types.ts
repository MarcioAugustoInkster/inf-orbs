const colors = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'white',
    'black',
] as const;

export type Color = typeof colors[number];
