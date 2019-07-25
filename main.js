const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const url = require('url');
let fs = require('fs');
let loadWin;
let loginWin;
let win;

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            { label: "New" },
            { label: "Open" },
            { label: "Save" }
        ]
    }
];

let silkConfig = {
    isSet: false,
    firstName: null,
    lastName: null,
    email: null
};


let createLoadAppWindow = () => {
    loadWin = new BrowserWindow({
        width: 320,
        height: 160,
        show: false,
        frame: false,
        icon: 'src/assets/psLogo.ico'
    });

    loadWin.loadURL(url.format({
        pathname: path.join(__dirname, 'load.html'),
        protocol: 'file:',
        slashes: true
    }));

    loadWin.once('ready-to-show', () => {
        loadWin.show();
    });
}

let createLoginWindow = () => {
    loginWin = new BrowserWindow({
        width: 800,
        height: 460,
        show: false,
        frame: false, 
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'src/assets/psLogo.ico'
    });

    loginWin.loadURL(url.format({
        pathname: path.join(__dirname, 'login.html'),
        protocol: 'file',
        slashes: true
    }));

    loginWin.once('ready-to-show', () => {
        loginWin.show();
    });
}

let createWindow = () => {
    createLoadAppWindow();

    win = new BrowserWindow({
        width:  1200,
        height: 800,
        show: false,
        frame: false,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: 'src/assets/psLogo.ico'
    });
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Menu
    // const mainMenu = Menu.buildFromTemplate(menuTemplate);
    // Menu.setApplicationMenu(mainMenu);

    win.once('ready-to-show', () => {

        // let load screen stay on for 3 seconds
        setTimeout(() => {
            loadWin.close();
            win.show();
        }, 3000);
        // win.show()
    });
    return win;
}

// app.once('ready', createWindow);
// app.once('ready', createLoadAppWindow)
app.once('ready', ()=>{
    (() => {
        let configRaw = fs.readFileSync(__dirname + "\\silk.config.json");
        console.log(configRaw);
    })();
    if (!silkConfig.isSet) {
        createLoginWindow();
    } else {
        // createLoadAppWindow();
        createWindow();
    }
});

// macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// macOS
app.on('activate', () => {
    if (win === null) {
        win = createWindow();
    }
});



// works with Navbar.tsx
ipcMain.on("json:submit",(event, data) => {
    // console.log(path);
    let raw = fs.readFileSync(data);
    let user = JSON.parse(raw);
    
    win.webContents.send("json:receive", user.firstName, user.lastName);
});