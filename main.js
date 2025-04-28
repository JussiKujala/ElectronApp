import path from 'path';
import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,   // Turvallisuusasetukset: älä ota Node-integrationia käyttöön selaimessa
      contextIsolation: true      // Suojaa konteksteja toisiltaan
    }
  });

  if (isDev) {
    // Kehitysympäristössä ladat Reactin dev-palvelin
    win.loadURL('http://localhost:3000');
  } else {
    // Tuotannossa ladataan valmiiksi rakennettu React sovellus
    win.loadFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
