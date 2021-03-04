import { config } from 'process';

setImmediate(() => {
  emitNet('helloserver');
});

onNet('helloclient', message => {
  console.log(`The server replied: ${message}`);
});

let isOpen = false;

const player = PlayerPedId();

setInterval(() => {
  if (IsPedInAnyVehicle(player, false)) {
    const currentVehicle = GetVehiclePedIsIn(player, false);
    // if player is in the driver's seat
    if (GetPedInVehicleSeat(currentVehicle, -1) == player) {
      while (GetPedInVehicleSeat) {}
      // turn on speedo, send data.
      const rpm = GetVehicleCurrentRpm(currentVehicle);
      const gear = GetVehicleCurrentGear(currentVehicle);
      const speed = GetEntitySpeed(currentVehicle);
      const message = {
        rpm,
        gear,
        speed,
      };
      SendNuiMessage(JSON.stringify({ type: 'UIState', action: 'show', ...message }));
    }
  } else if (isOpen == true) {
    SendNuiMessage(JSON.stringify({ type: 'UISTate', action: 'hide' }));
    isOpen = false;
  }
}, 100);

// setTick(() => {
// if player is in a vehicle already
// });
