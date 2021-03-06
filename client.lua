Citizen.CreateThread(function()
local player = PlayerPedId()
print("At least it ran slightly?")
while true do
  Citizen.Wait(0)
  print("starting loop")
  if IsPedInAnyVehicle(player, false) then
    print("is in a vehicle")
    local vehicle = GetVehiclePedIsIn(player, false);
    -- If driving, and the engine is running
    if GetPedInVehicleSeat(vehicle, -1) == player and GetIsVehicleEngineRunning(currentVehicle) == true then
      print("is driving")
      local gear = GetVehicleCurrentGear(vehicle)
      local speed = GetEntitySpeed(vehicle)
      local fuel = GetVehicleFuelLevel(vehicle)
      local isAirborne = IsPedInAnyPlane(player) or IsPedInAnyHeli(player)
      SendNuiMessage({type = 'UIState', action = 'show', gear = gear, speed = speed, fuel = fuel, isAirborne = isAirborne})
      Citizen.Wait(100)
    else
      SendNuiMessage({type = "UIState", action = "hide"})
      print("in car, not driving")
      Citizen.Wait(500)
    end
  else
    SendNuiMessage({type = "UIState", action = "hide"})
    print("not in a car")
    Citizen.Wait(500)
  end
  
end


end)

