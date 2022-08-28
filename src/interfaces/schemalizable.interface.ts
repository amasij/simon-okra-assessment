import {Document} from "bson";

export interface Schemalizable<T extends Document>{
    toSchema():T;
}
