import { MemoryCache, StoreObject } from '../types';

export class MapCache implements MemoryCache<Map<string, StoreObject>> {
  public cache: Map<string, StoreObject>;
  constructor(data: object = {}) {
    this.cache = new Map(Object.entries(data));
  }
  public get(dataId: string): StoreObject {
    return this.cache.get(`${dataId}`);
  }
  public set(dataId: string, value: StoreObject): void {
    this.cache.set(`${dataId}`, value);
  }
  public delete(dataId: string): void {
    this.cache.delete(`${dataId}`);
  }
  public clear(): void {
    return this.cache.clear();
  }
  public toObject(): Map<string, StoreObject> {
    return this.cache;
  }
  public forceToObject(): object {
    const obj: any = {};
    this.cache.forEach((dataId, key) => {
      obj[key] = dataId;
    });
    return obj;
  }
  public replace(newData: Map<string, StoreObject>): void {
    this.cache.clear();
    Object.entries(newData).forEach(([dataId, value]) =>
      this.cache.set(dataId, value),
    );
  }
}
