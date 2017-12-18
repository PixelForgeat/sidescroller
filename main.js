const url = require("url");
const electron = require("electron");
const path = require("path"); 
const{app,BrowserWindow,Menu} = electron;

global.mainWindow;
global.scaler;  //Resolution Scaler als Global Variable

//process.env.NODE_ENV = 'production';      //Wenn nicht Auskommentiert werden die Devtools deaktiviert

app.on('ready',function(){
    mainWindow = new BrowserWindow({    // Neues Window erstellt
        width:700*scaler,
        height:600*scaler,
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
            label:'700x600',
            click(){
                scaler=2/2;
            }
        },{
            label:'1050x900',
            click(){
                scaler=3/2;
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