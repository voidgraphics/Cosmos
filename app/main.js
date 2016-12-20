/*
    Cosmos
    /main.js
    Started oct 10 2015
    Note:   This code is the quick start guide from Electron's documentation for now.
            I will rewrite it shortly.
*/

const {ipcMain} = require('electron');

"use strict";

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require("menu");

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

    mainWindow = new BrowserWindow({width: 1050, height: 670, titleBarStyle: 'hidden'});

    mainWindow.loadURL('file://' + __dirname + '/html/main.html');

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
            { label: "About Cosmos", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
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
                    console.log(menuItem.checked);
                    mainWindow.webContents.send('toggleColorblind', menuItem.checked);
                } }
            ]
        }, {
            label: "Settings",
            submenu: [
                // { label: "Select a color scheme", enabled: false },
                { label: "Account", id: "account", accelerator: "CmdOrCtrl+Alt+A", click: function() {
                    mainWindow.webContents.send('navigateToSettings', 'account');
                } },
                { label: "Theme", id: "theme", accelerator: "CmdOrCtrl+Alt+T", click: function() {
                    mainWindow.webContents.send('navigateToSettings', 'theme');
                } },
                { label: "Notifications", id: "notifications", accelerator: "CmdOrCtrl+Alt+N", click: function() {
                    mainWindow.webContents.send('navigateToSettings', 'notifications');
                } }
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    ipcMain.on( 'updateTheme', function ( event, sTheme ) {
        index = 1;
        if(sTheme === 'dark') index = 2;
        Menu.getApplicationMenu().items[2].submenu.items[index].checked = true;
    } );

    ipcMain.on( 'updateSchedule', function( event, bHasSchedule ) {
        if(typeof bHasSchedule != 'boolean') bHasSchedule = (bHasSchedule == 'true');
        Menu.getApplicationMenu().items[2].submenu.items[5].checked = bHasSchedule;
    } );

    ipcMain.on( 'updateColorblind', function( event, bIsColorblind ) {
        if(typeof bIsColorblind != 'boolean') bIsColorblind = (bIsColorblind == 'true');
        Menu.getApplicationMenu().items[2].submenu.items[6].checked = bIsColorblind;
    } );
};
