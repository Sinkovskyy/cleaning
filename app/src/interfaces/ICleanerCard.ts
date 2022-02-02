import ICleaner from "./ICleaner";

export default interface ICleanerCard {
    cleaner: ICleaner;
    cleanersList: ICleaner[];
    setCleanersList: React.Dispatch<React.SetStateAction<ICleaner[]>>;

}