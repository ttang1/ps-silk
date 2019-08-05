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
    return loadWin;
}

let createLoginWindow = () => {
    loginWin = new BrowserWindow({
        width: 800, // 50rem
        height: 480, // 30rem
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
    return loginWin;
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
app.once('ready', () => {
    (() => {
        let configFile = app.getAppPath() + "/silk.config.json";
        fs.access(configFile, err => {
            if (!err) {
                let filebuffer = fs.readFileSync(configFile);
                let userPref = JSON.parse(filebuffer);
                win = createWindow();
                win.once("show", () => {
                    win.webContents.send("init:userPref", userPref.email, userPref.accessPermissions);
                })
                
                console.log("HIII");
            } else {
                createLoginWindow();    
            }
        });
    })();
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
ipcMain.on("json:submit", (event, data) => {
    // console.log(path);
    let raw = fs.readFileSync(data);
    let user = JSON.parse(raw);
    
    win.webContents.send("json:receive", user.firstName, user.lastName);
});


ipcMain.on("reset:userPref", (e, d) => {
    loginWin = createLoginWindow();
    win.close();
});

ipcMain.on("register:email", (e, d) => {
    loginWin.close();
    win.createWindow();
});