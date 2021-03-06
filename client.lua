local player = PlayerPedId()

CreateThread(function()
    if IsPedInAnyVehicle(player, false) then
        local vehicle = GetVehiclePedIsIn(player, false);
        -- If driving, and the engine is running
        if GetPedInVehicleSeat(vehicle, -1) == player and GetIsVehicleEngineRunning(currentVehicle) == true then
            local gear = GetVehicleCurrentGear(vehicle)
            local speed = GetEntitySpeed(vehicle)
            local fuel = GetVehicleFuelLevel(vehicle)
            local isAirborne = IsPedInAnyPlane(player) or IsPedInAnyHeli(player)
            SendNuiMessage({type = 'UIState', action = 'show', gear = gear, speed = speed, fuel = fuel, isAirborne = isAirborne})
            Wait(100)
        else
            SendNuiMessage({type = "UIState", action = "hide"})
            Wait(500)
        end
    else
        SendNuiMessage({type = "UIState", action = "hide"})
        Wait(500)
    end


end)

