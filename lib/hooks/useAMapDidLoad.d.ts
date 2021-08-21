export interface AMapLoadedAttribute {
    key: string;
    uri?: string;
}
declare const useAMapDidLoad: (didLoadCallback: () => void, { key, uri }: AMapLoadedAttribute) => boolean;
export default useAMapDidLoad;
