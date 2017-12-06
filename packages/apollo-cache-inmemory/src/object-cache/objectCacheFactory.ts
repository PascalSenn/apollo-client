import { MemoryCacheFactory, NormalizedCacheObject } from '../types';
import { ObjectCache } from './objectCache';
import { ObjectCacheRecording } from './objectCacheRecording';

export class ObjectCacheFactory
  implements MemoryCacheFactory<NormalizedCacheObject> {
  public createCache(seed: NormalizedCacheObject = {}): ObjectCache {
    return new ObjectCache(seed);
  }
  public createRecordingCache(
    seed: NormalizedCacheObject = {},
  ): ObjectCacheRecording {
    return new ObjectCacheRecording(seed);
  }
}

export function getObjectCacheFactory(): ObjectCacheFactory {
  return new ObjectCacheFactory();
}
