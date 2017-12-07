import { DocumentNode } from 'graphql';
import { FragmentMatcher } from 'graphql-anywhere';
import { Transaction } from 'apollo-cache';
import { IdValue, StoreValue } from 'apollo-utilities';

export type IdGetter = (value: Object) => string | null | undefined;

/**
 * This is an interface used to access, set and remove
 * StoreObjects from the cache
 */
export interface MemoryCache<T> {
  get(dataId: string): StoreObject;
  set(dataId: string, value: StoreObject): void;
  delete(dataId: string): void;
  clear(): void;

  // non-Map elements:
  /**
   * returns the whole cache as T
   */
  toObject(): T;
  /**
   * returns an Object with key-value pairs matching the contents of the store
   */
  forceToObject(): object;
  /**
   * replace the state of the store
   */
  replace(newData: T): void;
}
export interface MemoryCacheRecording<T> extends MemoryCache<T> {
  record(transaction: (recordingCache: MemoryCacheRecording<T>) => void): T;
}
/**
 * This is a normalized representation of the Apollo query result cache. It consists of
 * a flattened representation of query result trees.
 */
export interface NormalizedCacheObject {
  [dataId: string]: StoreObject;
}

export interface StoreObject {
  __typename?: string;
  [storeFieldKey: string]: StoreValue;
}

export interface MemoryCacheFactory<T> {
  createCache(seed?: any): MemoryCache<T>;
  createRecordingCache(seed?: any): MemoryCacheRecording<T>;
  concatCaches(...caches: T[]): T;
}

export type OptimisticStoreItem = {
  id: string;
  data: any;
  transaction: Transaction<any>;
};

export type ReadQueryOptions<T> = {
  store: MemoryCache<T>;
  query: DocumentNode;
  fragmentMatcherFunction?: FragmentMatcher;
  variables?: Object;
  previousResult?: any;
  rootId?: string;
  config?: ApolloReducerConfig<T>;
};

export type DiffQueryAgainstStoreOptions = ReadQueryOptions<any> & {
  returnPartialData?: boolean;
};

export type ApolloReducerConfig<T> = {
  dataIdFromObject?: IdGetter;
  fragmentMatcher?: FragmentMatcherInterface;
  addTypename?: boolean;
  cacheResolvers?: CacheResolverMap;
  storeFactory?: MemoryCacheFactory<T>;
};

export type ReadStoreContext = {
  store: MemoryCache<any>;
  returnPartialData: boolean;
  hasMissingField: boolean;
  cacheResolvers: CacheResolverMap;
};

export interface FragmentMatcherInterface {
  match(
    idValue: IdValue,
    typeCondition: string,
    context: ReadStoreContext,
  ): boolean;
}

export type PossibleTypesMap = { [key: string]: string[] };

/**
 * This code needs an optional `previousResult` property on `IdValue` so that when the results
 * returned from the store are the same, we can just return the `previousResult` and not a new
 * value thus preserving referential equality.
 *
 * The `previousResult` property is added to our `IdValue`s in the `graphql-anywhere` resolver so
 * that they can be in the right position for `resultMapper` to test equality and return whichever
 * result is appropriate.
 *
 * `resultMapper` takes the `previousResult`s and performs a shallow referential equality check. If
 * that passes then instead of returning the object created by `graphql-anywhere` the
 * `resultMapper` function will instead return the `previousResult`. This process is bottom-up so
 * we start at the leaf results and swap them for `previousResult`s all the way up until we get to
 * the root object.
 */
export interface IdValueWithPreviousResult extends IdValue {
  previousResult?: any;
}

export type IntrospectionResultData = {
  __schema: {
    types: [
      {
        kind: string;
        name: string;
        possibleTypes: {
          name: string;
        }[];
      }
    ];
  };
};

export type CacheResolver = (
  rootValue: any,
  args: { [argName: string]: any },
) => any;

export type CacheResolverMap = {
  [typeName: string]: {
    [fieldName: string]: CacheResolver;
  };
};

// backwards compat
export type CustomResolver = CacheResolver;
export type CustomResolverMap = CacheResolverMap;
