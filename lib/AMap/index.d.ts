import React from 'react';
interface AMapProps<T> extends React.HTMLAttributes<T> {
    akey: string;
    zoom?: number;
    center?: [number, number];
}
export declare type TranscriptComponent<ItemT = any> = (props: AMapProps<ItemT>, ref: React.ForwardedRef<HTMLDivElement>) => React.ReactElement | null;
declare const _default: React.ForwardRefExoticComponent<AMapProps<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export default _default;
