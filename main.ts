bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . # # .
        . # . . .
        . # . . .
        . # . . .
        . . # # .
        `)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        . # # . .
        . # . # .
        . # . # .
        . # . # .
        . # # . .
        `)
})
function MoveController () {
    if (YCoord == 0) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 40)
    } else if (YCoord == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 40)
    } else if (XCoord == 0) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 20)
    } else if (XCoord == 4) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 20)
    } else {
        Kitronik_Move_Motor.stop()
    }
    if (Button_Value == "A") {
        Kitronik_Move_Motor.stop()
        Button_Value = "."
    } else if (Button_Value == "B") {
        Kitronik_Move_Motor.beepHorn()
        Button_Value = "."
    }
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.SemiColon), function () {
    key = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Colon))
    value = bluetooth.uartReadUntil(serial.delimiters(Delimiters.SemiColon))
    if (key == "X") {
        XCoord = parseFloat(value)
    } else if (key == "Y") {
        YCoord = parseFloat(value)
    } else if (key == "Button") {
        Button_Value = value
    }
    MoveController()
})
let value = ""
let key = ""
let Button_Value = ""
let YCoord = 0
let XCoord = 0
bluetooth.startUartService()
bluetooth.setTransmitPower(7)
XCoord = 2
YCoord = 2
basic.forever(function () {
	
})
