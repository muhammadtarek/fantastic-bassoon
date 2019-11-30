import React from 'react'; // eslint-disable-line

import { isFeatureEnabled } from 'utils';
import IFeatureFlagProps from './FeatureFlag.types';

function FeatureFlag({ featureKey, children }: IFeatureFlagProps) {
  return isFeatureEnabled(featureKey) ? children : <> </>;
}

export default FeatureFlag;
