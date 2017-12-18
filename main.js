const url = require("url");
const electron = require("electron");
const path = require("path"); 
const{app,BrowserWindow,Menu} = electron;

global.mainWindow;
global.scaler = 1;  //Resolution Scaler als Global Variable

//process.env.NODE_ENV = 'production';      //Wenn nicht Auskommentiert werden die Devtools deaktiviert

app.on('ready',function(){
    mainWindow = new BrowserWindow({    // Neues Window erstellt
        width:1920*scaler,
        height:1080*scaler,
        resizable:false,
        //frame:false
    });
    mainWindow.loadURL(url.format({    // Umleitung zu dem Inhalt des mainWindows
        pathname: path.join(__dirname,"index.html"),
        protocol:"file",
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);  //Menü wird gebaut
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('close', function () {      // Schließt den Prozess wenn das mainWindow geschlossen wird
        mainWindow = null;
        app.quit();
    })
});





app.on('will-quit', () => {    //Löscht Shortcuts beim Beenden der App
    globalShortcut.unregisterAll();
    log.info("will-quit: Global Shortcut Status: " + globalShortcut.isRegistered('CommandOrControl+L'));
});

const mainMenuTemplate = [{     // Menü Konstruktorfunktion
    label:'Resulotion',
    submenu:[
        {
            label:'1080x720',
            click(){
                scaler=0,5625;
            }
        },{
            label:'1920x1080',
            click(){
                scaler=2/2;
            }
        }
    ]
}];

if(process.env.NODE_ENV !== 'production')    // Devtools
{
    mainMenuTemplate.push(
        {
            label:'Developer Tools',
            submenu: [
                {
                label:'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I':'Ctrl+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
            ]
        }
    )
}