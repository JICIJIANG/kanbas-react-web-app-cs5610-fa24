declare module 'web-vitals' {
    export function getCLS(onReport: (metric: { value: number }) => void): void;
    export function getFID(onReport: (metric: { value: number }) => void): void;
    export function getFCP(onReport: (metric: { value: number }) => void): void;
    export function getLCP(onReport: (metric: { value: number }) => void): void;
    export function getTTFB(onReport: (metric: { value: number }) => void): void;
  }