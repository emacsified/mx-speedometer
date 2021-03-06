const player = PlayerPedId();

// update speedometer every 100ms.
setInterval(() => {
  if (IsPedInAnyVehicle(player, false)) {
    const currentVehicle = GetVehiclePedIsIn(player, false);
    // if player is in the driver's seat, and the engine is running
    if (
      GetPedInVehicleSeat(currentVehicle, -1) == player &&
      GetIsVehicleEngineRunning(currentVehicle)
    ) {
      // turn on speedo, send data.
      // const rpm = GetVehicleCurrentRpm(currentVehicle);
      const gear = GetVehicleCurrentGear(currentVehicle);
      const speed = GetEntitySpeed(currentVehicle);
      const fuel = GetVehicleFuelLevel(currentVehicle);
      const isAirborne = IsPedInAnyPlane(player) || IsPedInAnyHeli(player);
      const message = {
        // rpm,
        gear,
        speed,
        fuel,
        isAirborne,
        altitude: isAirborne ? GetEntityHeightAboveGround(player) : null,
      };
      SendNuiMessage(JSON.stringify({ type: 'UIState', action: 'show', ...message }));
    } else {
      SendNuiMessage(JSON.stringify({ type: 'UISTate', action: 'hide' }));
    }
  } else {
    SendNuiMessage(JSON.stringify({ type: 'UISTate', action: 'hide' }));
  }
}, 100);

onNet('mx-speedometer:load', () => {
  console.log('LOAD THE SPEEDOMETER');
  SendNuiMessage(JSON.stringify({ type: 'UIState', action: 'show' }));
});
