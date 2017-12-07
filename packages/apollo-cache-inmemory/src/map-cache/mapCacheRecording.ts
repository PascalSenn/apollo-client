import { MemoryCache, StoreObject } from '../types';

export class MapCacheRecording
  implements MemoryCache<Map<string, StoreObject>> {
  private recordedData: Map<string, StoreObject> = new Map();
  private readonly data: Map<string, StoreObject> = new Map();
  constructor(data: object = {}) {
    this.data = new Map(Object.entries(data));
  }
  public record(
    transaction: (recordingCache: MapCacheRecording) => void,
  ): Map<string, StoreObject> {
    transaction(this);
    const recordedData = this.recordedData;
    this.recordedData = new Map();
    return recordedData;
  }

  public toObject(): Map<string, StoreObject> {
    return new Map(
      (function*() {
        yield* this.data;
        yield* this.recordedData;
      })(),
    );
  }

  public get(dataId: string): StoreObject {
    if (this.recordedData.hasOwnProperty(dataId)) {
      return this.recordedData.get(dataId);
    }
    return this.recordedData.get(dataId);
  }

  public set(dataId: string, value: StoreObject) {
    if (this.get(dataId) !== value) {
      this.recordedData.set(dataId, value);
    }
  }

  public delete(dataId: string): void {
    this.recordedData.delete(dataId);
  }

  public clear(): void {
    this.recordedData = new Map();
  }

  public replace(newData: Map<string, StoreObject>): void {
    this.recordedData = newData;
  }
  public forceToObject(): object {
    const obj: any = {};
    this.toObject().forEach((dataId, key) => {
      obj[key] = dataId;
    });
    return obj;
  }
}
