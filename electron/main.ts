import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { readFileSync, writeFileSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// The built directory structure
//
// ├─┬ dist
// │ ├─┬ electron
// │ │ ├── main.js
// │ │ └── preload.js
// │ ├── index.html
// │ ├── ...other-static-files-from-public
// │
process.env.DIST = path.join(__dirname, '../dist');
process.env.FARM_PUBLIC = app.isPackaged
    ? process.env.DIST
    : path.join(process.env.DIST, '../public');

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        icon: path.join(process.env.FARM_PUBLIC, 'logo.svg'),
        webPreferences: {
            preload: path.join(__dirname, './preload.mjs'),
            nodeIntegration: true,
        },
    });

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send(
            'main-process-message',
            new Date().toLocaleString(),
        );
    });

    if (process.env.FARM_DEV_SERVER_URL) {
        win.loadURL(process.env.FARM_DEV_SERVER_URL);
        win.webContents.openDevTools();
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'));
    }
}

ipcMain.handle('dialog:open', async () => {
    const result = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [
            {
                name: 'Markdowns',
                extensions: ['md'],
            },
        ],
    });
    return result; // Retorna o resultado da seleção de arquivos/diretórios
});
ipcMain.handle('fs:open', async (event: any, path: string) => {
    try {
        const result = readFileSync(path);

        return result;
    } catch (error) {
        console.log(error);
    }
});
ipcMain.handle('dialog:create', async (event: any, data: string) => {
    try {
        // Gets the path to create the file
        const createFilePath = dialog.showSaveDialogSync({
            filters: [
                { name: 'Markdown', extensions: ['md'] },
                { name: 'Text File', extensions: ['txt', 'rtf'] },
            ],
        });

        try {
            const fileCreated = writeFileSync(createFilePath, data, {
                encoding: 'utf8',
            });
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});

app.on('window-all-closed', () => {
    app.quit();
    win = null;
});

app.whenReady().then(createWindow);
