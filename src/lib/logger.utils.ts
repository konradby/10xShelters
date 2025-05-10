const getTimestamp = () => new Date().toISOString();

export const logError = (message: string, details?: any): void => {
  if (details) {
    console.error(`❌ ${getTimestamp()} ${message}`, {
      details,
      stringifiedDetails: JSON.stringify(details),
    });
  } else {
    console.error(`❌ ${getTimestamp()} ${message}`);
  }
};

export const logWarn = (message: string, details?: any): void => {
  if (details) {
    console.warn(`⚠️ ${getTimestamp()} ${message}`, {
      details,
      stringifiedDetails: JSON.stringify(details),
    });
  } else {
    console.warn(`⚠️ ${getTimestamp()} ${message}`);
  }
};

export const logInfo = (message: string, details?: any): void => {
  if (details) {
    console.info(`🔎 ${getTimestamp()} ${message}`, {
      details,
      stringifiedDetails: JSON.stringify(details),
    });
  } else {
    console.info(`🔎 ${getTimestamp()} ${message}`);
  }
};
