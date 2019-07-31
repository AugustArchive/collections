import Collection from './entities/collection';
import List from './entities/list';

export interface ExtensiveName<T> {
    name: string;
}

export const version: string = require('../package').version;

export {
    Collection,
    List
};