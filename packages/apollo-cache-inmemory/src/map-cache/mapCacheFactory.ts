import { MemoryCacheFactory, StoreObject } from '../types';
import { MapCache } from './mapCache';
import { MapCacheRecording } from './mapCacheRecording';

export class MapCacheFactory
  implements MemoryCacheFactory<Map<string, StoreObject>> {
  public createCache(seed: object | Map<string, StoreObject> = {}): MapCache {
    return new MapCache(seed);
  }
  public createRecordingCache(
    seed: object | Map<string, StoreObject> = {},
  ): MapCacheRecording {
    return new MapCacheRecording(seed);
  }
  public concatCaches(
    ...caches: Map<string, StoreObject>[]
  ): Map<string, StoreObject> {
    let map: Map<string, StoreObject> = new Map();
    for (const cache of caches) {
      cache.forEach((v, k) => map.set(k, v));
    }
    return map;
  }
}

export function getMapCacheFactory(): MapCacheFactory {
  return new MapCacheFactory();
}
