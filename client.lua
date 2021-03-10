AddEventHandler(
    "playerSpawned",
    function()
        Citizen.CreateThread(
            function()
                local player = PlayerPedId()
                Citizen.Wait(1000)
                while true do
                    Citizen.Wait(0)
                    if IsPedInAnyVehicle(player, false) then
                        print("In a vehicle")
                        local vehicle = GetVehiclePedIsIn(player, false)
                        -- If driving, and the engine is running
                        if (GetPedInVehicleSeat(vehicle, -1) == player and GetIsVehicleEngineRunning(vehicle)) then
                            print("driving, engine on")
                            local gear = GetVehicleCurrentGear(vehicle)
                            local speed = GetEntitySpeed(vehicle)
                            local fuel = GetVehicleFuelLevel(vehicle)
                            local isAirborne = IsPedInAnyPlane(player) or IsPedInAnyHeli(player)
                            local altitude
                            if isAirborne then
                                print("airborne")
                                altitude = GetEntityHeightAboveGround(vehicle)
                            else
                                altitude = nil
                            end

                            print("sending NUI message - show")
                            SendNUIMessage(
                                json.encode(
                                    {
                                        action = "show",
                                        gear = gear,
                                        speed = speed,
                                        fuel = fuel,
                                        isAirborne = isAirborne,
                                        altitude = altitude
                                    }
                                )
                            )
                            Citizen.Wait(100)
                        else
                            print("sending NUI Message - hide")
                            SendNUIMessage(
                                json.encode(
                                    {
                                        action = "hide"
                                    }
                                )
                            )
                            Citizen.Wait(500)
                        end
                    else
                        SendNUIMessage(json.encode({type = "UIState", action = "hide"}))
                        Citizen.Wait(500)
                    end
                end
            end
        )
    end
)
