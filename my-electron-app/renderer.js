const information = document.getElementById("info");
information.innerText = `This app is using Chrome (v${window?.versions?.chrome()}), Node.js (v${window?.versions?.node()}), and Electron (v${window?.versions?.electron()})`;

const func = async () => {
	const response = await window?.versions?.ping();
	console.log(response);
};

func();

const setButton = document.getElementById("btn");
const titleInput = document.getElementById("title");
setButton.addEventListener("click", () => {
	const title = titleInput.value;
	window.electronAPI.setTitle(title);
});

const btnOpenFile = document.getElementById("btn-open-file");
const filePathElement = document.getElementById("filePath");

btnOpenFile.addEventListener("click", async () => {
	const filePath = await window.electronAPI.openFile();
	filePathElement.innerText = filePath;
});

const counter = document.getElementById("counter");

window.electronAPI.onUpdateCounter((value) => {
	const oldValue = Number(counter.innerText);
	const newValue = oldValue + value;
	counter.innerText = newValue.toString();
	window.electronAPI.counterValue(newValue);
});
