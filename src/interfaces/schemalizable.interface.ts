import {Document} from "bson";

export interface Schemalizable<T,S extends Document>{
    toSchema():S;
    fromSchema(schema:S):T
}
