/**
 * Feature Flags Utility
 * 
 * This utility helps manage feature flags in a trunk-based development environment.
 * Feature flags allow us to merge incomplete features safely by hiding them behind
 * environment variables or configuration.
 */

// Feature flag definitions
export const FEATURE_FLAGS = {
  PRIORITY_TASKS: 'REACT_APP_ENABLE_PRIORITY',
  DARK_MODE: 'REACT_APP_ENABLE_DARK_MODE',
  NOTIFICATIONS: 'REACT_APP_ENABLE_NOTIFICATIONS',
  TASK_CATEGORIES: 'REACT_APP_ENABLE_CATEGORIES',
  ADVANCED_FILTERING: 'REACT_APP_ENABLE_ADVANCED_FILTERING',
  TASK_ATTACHMENTS: 'REACT_APP_ENABLE_ATTACHMENTS',
  COLLABORATIVE_EDITING: 'REACT_APP_ENABLE_COLLABORATIVE_EDITING',
  ANALYTICS: 'REACT_APP_ENABLE_ANALYTICS',
};

/**
 * Check if a feature flag is enabled
 * @param {string} flagName - The feature flag name from FEATURE_FLAGS
 * @returns {boolean} - True if the feature is enabled
 */
export const isFeatureEnabled = (flagName) => {
  const envVar = FEATURE_FLAGS[flagName];
  if (!envVar) {
    console.warn(`Unknown feature flag: ${flagName}`);
    return false;
  }
  
  return process.env[envVar] === 'true';
};

/**
 * Get all enabled features
 * @returns {Object} - Object with feature names as keys and boolean values
 */
export const getEnabledFeatures = () => {
  const enabledFeatures = {};
  
  Object.keys(FEATURE_FLAGS).forEach(flagName => {
    enabledFeatures[flagName] = isFeatureEnabled(flagName);
  });
  
  return enabledFeatures;
};

/**
 * Feature flag hook for React components
 * @param {string} flagName - The feature flag name
 * @returns {boolean} - True if the feature is enabled
 */
export const useFeatureFlag = (flagName) => {
  return isFeatureEnabled(flagName);
};

/**
 * Conditional rendering helper
 * @param {string} flagName - The feature flag name
 * @param {React.Component} Component - Component to render if enabled
 * @param {React.Component} Fallback - Component to render if disabled (optional)
 * @returns {React.Component|null} - Rendered component or null
 */
export const FeatureGate = ({ flagName, children, fallback = null }) => {
  return isFeatureEnabled(flagName) ? children : fallback;
};

/**
 * Development helper to log all feature flags
 */
export const logFeatureFlags = () => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🚩 Feature Flags Status');
    const features = getEnabledFeatures();
    Object.entries(features).forEach(([name, enabled]) => {
      console.log(`${enabled ? '✅' : '❌'} ${name}: ${enabled}`);
    });
    console.groupEnd();
  }
};

// Default export for convenience
export default {
  isFeatureEnabled,
  getEnabledFeatures,
  useFeatureFlag,
  FeatureGate,
  logFeatureFlags,
  FEATURE_FLAGS,
};
