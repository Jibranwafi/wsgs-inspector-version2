// Utility functions for storing large form data using IndexedDB

const DB_NAME = 'InspectionFormDB';
const STORE_NAME = 'formData';
const DB_VERSION = 1;

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

// Store form data
export async function storeFormData(data: any): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.put(data, 'inspectionFormData');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    db.close();
  } catch (error) {
    console.error('Error storing form data:', error);
    throw error;
  }
}

// Retrieve form data
export async function getFormData(): Promise<any | null> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    const data = await new Promise<any>((resolve, reject) => {
      const request = store.get('inspectionFormData');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    
    db.close();
    return data || null;
  } catch (error) {
    console.error('Error retrieving form data:', error);
    return null;
  }
}

// Clear form data
export async function clearFormData(): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    await new Promise<void>((resolve, reject) => {
      const request = store.delete('inspectionFormData');
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    
    db.close();
  } catch (error) {
    console.error('Error clearing form data:', error);
  }
}

