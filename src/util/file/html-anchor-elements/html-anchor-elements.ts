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
