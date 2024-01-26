import '../styles/global.css';
import type { IResizeImage } from '../utils/resizeImage';

const form: HTMLFormElement = document.querySelector("#img-form");
const img: HTMLInputElement = document.querySelector("#img");
const outputPath: HTMLSpanElement = document.querySelector("#output-path");
const filename: HTMLSpanElement = document.querySelector("#filename");
const heightInput: HTMLInputElement = document.querySelector("#height");
const widthInput: HTMLInputElement = document.querySelector("#width");


function loadImage(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files[0];

  if (!isFileImage(file)) {
    toastifyAlert({ message: `Please select an Image`, type: 'error' });
    return;
  }

  // Get original dimensions
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = String(image.width);
    heightInput.value = String(image.height);
  };

  form.style.display = 'block';

  filename.innerText = file.name;
  outputPath.innerText = window.path.join(window.os.homedir(), 'imageresizer');
}

// Send image data to main
function sendImage(e: Event) {
  e.preventDefault();

  const width = widthInput.value;
  const height = heightInput.value;
  const imgPath = img.files[0].path;

  if (!img.files[0]) {
    toastifyAlert({ message: 'Please, select and image', type: 'error' });
  }

  if (width === '' || height === '') {
    toastifyAlert({ message: 'Please fill in a height and width', type: 'error' });
  }

  // Send to main using ipcRenderer
  window.ipcRenderer.send('image:resize', {
    imgPath,
    width,
    height
  } as Omit<IResizeImage, 'dest'>);
}

// Catch the image:done event
window.ipcRenderer.on('image:done', () => {
  toastifyAlert({ message: `Image resized to ${widthInput.value} x ${heightInput.value}`, type: 'success' });
});

//  Make sure file is image
function isFileImage(file: File) {
  const acceptedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];

  return file && acceptedImageTypes.includes(file?.type);
}

export function toastifyAlert({ message, type }: { message: string, type: 'success' | 'error'; }) {
  const background = {
    success: 'green',
    error: 'red'
  };

  window.toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: background[type],
      color: 'white',
      textAlign: 'center'
    }
  });
}



img.addEventListener('change', loadImage);
form.addEventListener('submit', sendImage);