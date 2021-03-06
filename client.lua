Citizen.CreateThread(function()
    local player = PlayerPedId()
    Citizen.Wait(1000)
    while true do
      Citizen.Wait(0)
      if IsPedInAnyVehicle(player, false) then
        local vehicle = GetVehiclePedIsIn(player, false);
        -- If driving, and the engine is running
        if (GetPedInVehicleSeat(vehicle, -1) == player and GetIsVehicleEngineRunning(vehicle)) then
          local gear = GetVehicleCurrentGear(vehicle)
          local speed = GetEntitySpeed(vehicle)
          local fuel = GetVehicleFuelLevel(vehicle)
          local isAirborne = IsPedInAnyPlane(player) or IsPedInAnyHeli(player)
          local altitude
          if isAirborne then
            altitude = GetEntityHeightAboveGround(vehicle)
          else
            altitude = nil
          end
          SendNuiMessage(json.encode({
                             action = "show",
                             gear = gear,
                             speed = speed,
                             fuel = fuel,
                             isAirborne = isAirborne,
                             altitude = altitude
          }))
          Citizen.Wait(100)
        else
          SendNuiMessage(json.encode({
                             action = "hide"
          }))
          Citizen.Wait(500)
        end
      else
        SendNuiMessage(json.encode({type = "UIState", action = "hide"}))
        Citizen.Wait(500)
      end
      
    end
    
    
end)

