const sizes = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'full',
] as const;

export type Size = typeof sizes[number];
