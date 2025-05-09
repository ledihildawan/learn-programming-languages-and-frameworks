let getItems = () => ajax('<host1>/items');
let getInfo = (item) => ajax(`<host2>/data/${item.getId()}/info`);
let getFiles = (dataInfo) => ajax(`<host3>/data/files/${dataInfo.files}`);

getItems()
  .then((items) => items.map(getInfo))
  .then((promises) => Promise.all(promises))
  .then((infos) => infos.map(getFiles))
  .then((promises) => Promise.all(promises))
  .then(processFiles);
