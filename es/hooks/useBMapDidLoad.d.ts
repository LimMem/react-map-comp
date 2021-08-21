export interface BMapLoadedAttribute {
    ak: string;
    uri?: string;
}
declare const useBMapDidLoad: (didLoadCallback: () => void, { ak, uri }: BMapLoadedAttribute) => boolean;
export default useBMapDidLoad;
