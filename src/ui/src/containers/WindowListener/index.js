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
    const useMetric = false;

    let rawRpm;
    let gear;
    let speedString;

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
      speedString = unitSpeed.toString();

      if (speedString.length > 3) speedString = '999';

      for (let i = 0; i < 3; i++) {
        SpeedDisplay[i].innerText = speedString[i] == '&' ? '' : speedString[i];
      }
    }

    if (data.gear != undefined) {
      gear = parseInt(data.gear);
      if (gear == 0) {
        // GearNum.innerText = 'R';
        // GearDisplay.classList.add('reverseGear');
        // GearDisplay.classList.remove('normalGear');
      } else {
        // GearNum.innerText = gear;
        // GearDisplay.classList.remove('reverseGear');
        // GearDisplay.classList.add('normalGear');
      }
    }

    if (data.rpm != undefined) {
      rawRpm = parseFloat(data.rpm);
      // RpmDisplay.style.width = `${(parseFloat(data.rpm) * 100.0).toFixed(2)}%`;
      // GearDisplay.classList.toggle('rpmOverload', rawRpm * 9 > 7.5);
    }

    console.log(
      JSON.stringify({
        rpm: (parseFloat(data.rpm) * 100.0).toFixed(2),
        gear,
        speed: Math.floor(parseFloat(data.speed) * 2.236936),
      }),
    );
  };

  return <>{props.children}</>;
};

WindowListener.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WindowListener;
