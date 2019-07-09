const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let loadWin = null
let win = null

let createLoadAppWindow = () => {
    loadWin = new BrowserWindow({
        width: 320,
        height: 160,
        show: true,
        frame: false,
        icon: 'src/assets/ps_logo.ico'
    })

    loadWin.loadURL(url.format({
        pathname: path.join(__dirname, 'loadapp.html'),
        protocol: 'file:',
        slashes: true
    }))

    loadWin.once('ready-to-show', () => {
        loadWin.show()
    })
}

let createWindow = () => {
    // createLoadAppWindow()

    win = new BrowserWindow({
        width:  1080,
        height: 760,
        show: false,
        frame: false,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'src/assets/ps_logo.ico'
    })
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.once('ready-to-show', () => {

        // let load screen stay on for 3 seconds
        // setTimeout(() => {
        //     loadWin.close()
        //     win.show()
        // }, 3000);
        win.show()
    })
}


app.once('ready', createWindow)


// macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// macOS
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})