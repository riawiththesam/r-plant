export async function saveFile(name: string, value: string) {
  const opts = {
    suggestedName: name,
    types: [
      {
        description: "Map file",
        accept: { "application/json": [".json"] },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(opts);
  const writable = await handle.createWritable();
  await writable.write(value);
  await writable.close();
}

export async function loadFile() {
  const fileHandleList = await window.showOpenFilePicker();
  const handle = fileHandleList[0];
  const file = await handle.getFile();
  const text = await file.text();
  console.log(text);
}
