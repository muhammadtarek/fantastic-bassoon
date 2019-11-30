const featureFlags = new Map();

/**
 * Checks if the feature is enabled
 *
 * @param key string | number
 * @returns boolean
 */
export const isFeatureEnabled = (key: string | number) => {
  // If the flag is not found in featureFlags, consider it as enabled
  if (!featureFlags.has(key)) {
    // Log a warning if the flag is not found
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        `Key: ${key} is not provided in FeatureFlags, it will return true by default but you have too include it`,
      );
    }

    return true;
  }

  return featureFlags.has(key) && featureFlags.get(key);
};

// Enable all features in development
if (process.env.NODE_ENV === 'development') {
  featureFlags.forEach((_, key) => featureFlags.set(key, true));
}

export default featureFlags;
