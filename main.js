const url = require("url");
const electron = require("electron");
const path = require("path"); 
const{app,BrowserWindow,Menu} = electron;

global.mainWindow;

//process.env.NODE_ENV = 'production';

app.on('ready',function(){
    mainWindow = new BrowserWindow({
        width:700*scaler,
        height:600*scaler,
        resizable:false,
        //frame:false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol:"file",
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('close', function () { 
        mainWindow = null;
        app.quit();
    })
});





app.on('will-quit', () => {
    globalShortcut.unregisterAll();
    log.info("will-quit: Global Shortcut Status: " + globalShortcut.isRegistered('CommandOrControl+L'));
});

let addwindow;

function createAddWindow(){
    addwindow = new BrowserWindow({
        width: 200,
        height:300,
        title: "kompleter pfusch"
    });
    addwindow.loadURL(url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol:"file",
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
}

const mainMenuTemplate = [{
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

if(process.env.NODE_ENV !== 'production')
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