import { app, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";
import { userInfo } from "os";

let loadWin: BrowserWindow;
let loginWin: BrowserWindow;
let mainWin: BrowserWindow;

enum Permissions {
    Admin = "Admin",
    Readonly = "Readonly"
}
interface UserConfig {
    firstName?: string,
    lastName?: string,
    email: string,
    accessPermissions: Permissions
}

let createLoadAppWindow = () => {
    loadWin = new BrowserWindow({
        width: 320,
        height: 160,
        show: false,
        frame: false,
        icon: 'src/assets/psLogo.ico'
    });

    loadWin.loadURL(url.format({
        pathname: path.join(app.getAppPath(), 'load.html'),
        protocol: 'file:',
        slashes: true
    }));

    // loadWin.once('ready-to-show', () => {
    //     loadWin.show();
    // });
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
        pathname: path.join(app.getAppPath(), 'login.html'),
        protocol: 'file',
        slashes: true
    }));

    // loginWin.once('ready-to-show', () => {
    //     loginWin.show();
    // });
    return loginWin;
}

let createWindow = () => {
    mainWin = new BrowserWindow({
        width: 1200,
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

    mainWin.loadURL(url.format({
        pathname: path.join(app.getAppPath(), 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // mainWin.once('ready-to-show', () => {
    //     mainWin.show()
    // });
    return mainWin;
}


let configFile = app.getAppPath() + "\\silk.config.json";

// INIT
app.once('ready', () => {
    loadWin = createLoadAppWindow();
    loadWin.once('ready-to-show', () => {
        loadWin.show();
    });

    fs.access(configFile, err => {
        if (!err) {
            let filebuffer = fs.readFileSync(configFile, "utf8");
            let userPref = JSON.parse(filebuffer);
            
            mainWin = createWindow();
            mainWin.once('ready-to-show', () => {
                setTimeout(() => {
                    loadWin.close();
                    mainWin.show();
                }, 3000);
            });

            mainWin.once("show", () => {
                mainWin.webContents.send("init:UserPref", userPref.email, userPref.accessPermissions);
            })
        } else {
            loginWin = createLoginWindow();
            loginWin.once('ready-to-show', () => {
                setTimeout(() => {
                    loadWin.close();
                    loginWin.show();
                }, 3000);
            });
        }
    });
});

// macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// macOS
app.on('activate', () => {
    if (mainWin === null) {
        mainWin = createWindow();
    }
});

// on MainWin
ipcMain.on("json:submit", (event: any, data: any) => {
    let raw = fs.readFileSync(data, "utf8");
    let user = JSON.parse(raw);

    mainWin.webContents.send("json:receive", user.firstName, user.lastName);
});

ipcMain.on("reset:UserPref", (e: any, d: any) => {
    loginWin = createLoginWindow();
    loginWin.once('ready-to-show', () => {
        mainWin.close();
        loginWin.show();
    });
});

// on LoginWin
ipcMain.on("register:Email", (e: any, d: any) => {
    let userPref: any;
    fs.access(configFile, err => {
        if (!err) { // if config file already exists
            let filebuffer = fs.readFileSync(configFile, "utf8"); // open config file
            userPref = JSON.parse(filebuffer); // parse config file contents to object
            userPref.email = d; // set new data to replace previous data
            fs.writeFileSync(configFile, JSON.stringify(userPref), "utf8"); // write to config file
            mainWin = createWindow();
        } else {
            userPref = {} as UserConfig;
            userPref.email = d;
            userPref.accessPermissions = Permissions.Admin;
            fs.writeFileSync(configFile, JSON.stringify(userPref), "utf8"); // write to config file
            mainWin = createWindow();
        }
    });

    mainWin.once('ready-to-show', () => { 
        loginWin.close();
        mainWin.show(); 
    });

    mainWin.once("show", () => {
        mainWin.webContents.send("init:UserPref", userPref.email, userPref.accessPermissions);
    });
});