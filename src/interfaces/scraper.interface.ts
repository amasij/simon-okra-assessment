export interface Scraper<T>{
    scrape(u?:any):Promise<T>;
}
