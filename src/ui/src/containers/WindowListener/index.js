import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import useStore from '../../configureStore';

const WindowListener = props => {
  useEffect(() => {
    window.addEventListener('message', handleEvent);
    return function cleanup() {
      window.removeEventListener('message', handleEvent);
    };
  });

  const {} = useStore(state => state);
  const handleEvent = event => {
    const data = event.data;
    data.useMetric = false;
    const useMetric = data.useMetric;

    if (data.useMetric != undefined) {
      const useMetricNow = data.useMetric != false;
      if (useMetric != useMetricNow) {
        useMetric = useMetricNow;
        UnitDisplay.innerText = useMetric ? 'KMH' : 'MPH';
      }
    }

    if (data.rawSpeed != undefined) {
      var multiplier = useMetric ? 3.6 : 2.236936;
      var unitSpeed = Math.floor(parseFloat(data.rawSpeed) * multiplier);
      var speedString = unitSpeed.toString();

      if (speedString.length > 3) speedString = '999';
      console.log(speedString);

      for (let i = 0; i < 3; i++) {
        SpeedDisplay[i].innerText = speedString[i] == '&' ? '' : speedString[i];
      }
    }

    if (data.gear != undefined) {
      const gear = parseInt(data.gear);
      console.log(gear);
      if (gear == 0) {
        GearNum.innerText = 'R';
        GearDisplay.classList.add('reverseGear');
        GearDisplay.classList.remove('normalGear');
      } else {
        GearNum.innerText = gear;
        GearDisplay.classList.remove('reverseGear');
        GearDisplay.classList.add('normalGear');
      }
    }

    if (data.rpm != undefined) {
      const rawRpm = parseFloat(data.rpm);
      console.log(rpm);
      RpmDisplay.style.width = `${(parseFloat(data.rpm) * 100.0).toFixed(2)}%`;
      GearDisplay.classList.toggle('rpmOverload', rawRpm * 9 > 7.5);
    }
  };

  return <>{props.children}</>;
};

WindowListener.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WindowListener;
