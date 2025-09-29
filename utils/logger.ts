export const logInfo = (message: string, ...params: any[]) => {
    console.log("[INFO]", message, ...params);
  };
  
  export const logError = (message: string, ...params: any[]) => {
    console.error("[ERROR]", message, ...params);
  };  