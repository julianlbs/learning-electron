import jimp from 'jimp';
import path from 'path';
import fs from 'node:fs';
import { shell } from 'electron';
import { mainWindow } from '../renderer';

export interface IResizeImage {
  imgPath: string,
  width: string,
  height: string,
  dest: string;
}

export async function resizeImage(options: IResizeImage) {

  try {

    // Create filename
    const filename = path.basename(options.imgPath);

    // Create dest folder if not exists
    if (!fs.existsSync(options.dest)) {
      fs.mkdirSync(options.dest);
    }
    // Write file to dest
    // fs.writeFileSync(path.join(options.dest, filename), imgBuffer);
    (await jimp.read(options.imgPath)).resize(Number(options.width), Number(options.height)).write(path.join(options.dest, filename));

    //  Send success to render
    mainWindow.webContents.send('image:done');

    // Open dest folder
    shell.openPath(options.dest);
  } catch (err) {
    console.log(err);
  }
}