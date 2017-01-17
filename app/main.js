/*
    Cosmos
    /main.js
    Started oct 10 2015
    Note:   This code is the quick start guide from Electron's documentation for now.
            I will rewrite it shortly.
*/

"use strict";

const {ipcMain, app, BrowserWindow, Menu} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on( "window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  createWindow();
});

app.on('activate', function() {
    if(!mainWindow) createWindow();
});


var createWindow = function() {

    var frame = process.platform != 'win32'

    mainWindow = new BrowserWindow({
        width: 1050,
        height: 670,
        titleBarStyle: 'hidden',
        minWidth: 800,
        frame: frame,
        icon: __dirname + '/icon.ico'
    });

    mainWindow.loadURL('file://' + __dirname + '/html/main.html?platform=' + process.platform);

    // Open the DevTools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      mainWindow = null;
    });

    // Create the Application's main menu
    var template = [{
        label: "Cosmos",
        submenu: [
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
        ]}, {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]}, {
            label: "Appearance",
            submenu: [
                { label: "Application colors", enabled: false },
                { label: "Light", id: "light", type: "radio", click: function() {
                    mainWindow.webContents.send('switchTheme', 'light');
                } },
                { label: "Dark", id: "dark", type: "radio", click: function() {
                    mainWindow.webContents.send('switchTheme', 'dark');
                } },
                { label: "Toggle between colors", id:"toggleColors", accelerator: "Shift+CmdOrCtrl+T", click: function() {
                    mainWindow.webContents.send('toggleTheme');
                } },
                { type: "separator" },
                { label: "Options", enabled: false },
                { label: "Switch automatically at 8AM and 8PM", type: "checkbox", click: function(menuItem) {
                    mainWindow.webContents.send('toggleSchedule', menuItem.checked);
                } },
                { label: "Colorblind mode", type: "checkbox", accelerator: "Shift+CmdOrCtrl+C", click: function(menuItem) {
                    mainWindow.webContents.send('toggleColorblind', menuItem.checked);
                } }
            ]
        }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    ipcMain.on( 'updateTheme', function ( event, sTheme ) {
        let index = 1;
        if(sTheme === 'dark') index = 2;
        Menu.getApplicationMenu().items[2].submenu.items[index].checked = true;
    } );

    ipcMain.on( 'updateSchedule', function( event, bHasSchedule ) {
        if(typeof bHasSchedule != 'boolean') bHasSchedule = (bHasSchedule == 'true');
        Menu.getApplicationMenu().items[2].submenu.items[6].checked = bHasSchedule;
    } );

    ipcMain.on( 'updateColorblind', function( event, bIsColorblind ) {
        if(typeof bIsColorblind != 'boolean') bIsColorblind = (bIsColorblind == 'true');
        Menu.getApplicationMenu().items[2].submenu.items[7].checked = bIsColorblind;
    } );

    ipcMain.on( 'bounceIcon', function( event ) {
        if( process.platform == 'darwin' ) {
            app.dock.bounce();
        }
    } );

    ipcMain.on( 'setBadge', function( event, iCount ) {
        app.setBadgeCount( iCount );
    } );

    ipcMain.on( 'minimize', function( event ) {
        mainWindow.minimize();
    } );

    ipcMain.on( 'maximize', function( event ) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize()
        } else {
            mainWindow.maximize();
        }
    } );

    ipcMain.on( 'close', function( event ) {
        mainWindow.close();
    } );

    ipcMain.on( 'showMenu', function( event ) {
        menu.popup( mainWindow, 40, 34 );
    } );


    mainWindow.webContents.send('platform', process.platform);


};
