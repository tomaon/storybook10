export class IDBStorage {
  private readonly appEnv: string;
  private readonly db: Promise<IDBDatabase>;

  constructor(appId: string, appEnv: string) {
    this.appEnv = appEnv;
    this.db = new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(appId);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => request.result.createObjectStore(appEnv);
    });
  }

  // Storage

  async length(): Promise<number> {
    return this.count();
  }

  async clear(): Promise<void> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readwrite");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).clear();
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve();
        }),
    );
  }

  async getItem<T>(key: IDBValidKey | IDBKeyRange): Promise<T | undefined> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readonly");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).get(key);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        }),
    );
  }

  async key(_index: number): Promise<IDBValidKey> {
    throw new Error("not implemented");
  }

  async removeItem(key: IDBValidKey | IDBKeyRange): Promise<void> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readwrite");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).delete(key);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve();
        }),
    );
  }

  async setItem<T>(key: IDBValidKey, value: T): Promise<IDBValidKey> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readwrite");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).put(value, key);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        }),
    );
  }

  // other

  async count(query?: IDBValidKey | IDBKeyRange): Promise<number> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readonly");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).count(query);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        }),
    );
  }

  async addItem<T>(key: IDBValidKey, value: T): Promise<IDBValidKey> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readwrite");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).add(value, key);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        }),
    );
  }

  async getItems<T>(queryOrOptions?: IDBValidKey | IDBKeyRange, count?: number): Promise<T[]> {
    return this.db.then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction(this.appEnv, "readonly");
          transaction.onabort = () => reject(transaction.error);
          const request = transaction.objectStore(this.appEnv).getAll(queryOrOptions, count);
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve(request.result);
        }),
    );
  }
}

export interface KeyValuePair<K, V> {
  k: K;
  v: V;
}
