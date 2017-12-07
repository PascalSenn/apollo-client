import { MemoryCacheFactory, StoreObject } from '../types';
import { MapCache } from './mapCache';
import { MapCacheRecording } from './mapCacheRecording';

export class MapCacheFactory
  implements MemoryCacheFactory<Map<string, StoreObject>> {
  public createCache(seed: object = {}): MapCache {
    return new MapCache(seed);
  }
  public createRecordingCache(seed: object = {}): MapCacheRecording {
    return new MapCacheRecording(seed);
  }
  public concatCaches(
    ...caches: Map<string, StoreObject>[]
  ): Map<string, StoreObject> {
    return new Map(...caches);
  }
}

export function getMapCacheFactory(): MapCacheFactory {
  return new MapCacheFactory();
}
