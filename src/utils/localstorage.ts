export const setLocalStorage = <T>(name: string, items: T[]): void => {
   if (typeof window !== "undefined") {
      localStorage.setItem(name, JSON.stringify(items));
   }
};


export const getLocalStorage = <T>(name: string): T[] => {
   if (typeof window !== "undefined") {
      const data = localStorage.getItem(name);
      if (data) {
         return JSON.parse(data) as T[];
      } else {
         localStorage.setItem(name, JSON.stringify([]));
         return [] as T[];
      }
   }
   return [] as T[];
};
