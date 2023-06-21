function findPath(fileTree, key) {
  let path = null;

  function traverseTree(obj, currentPath) {
    for (const [currentKey, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}/${currentKey}` : currentKey;

        if (typeof value === "object") {
          traverseTree(value, newPath);
          continue;
        }

      if (currentKey === key) {
        path = newPath + "." + value;
        return;
      }

    }
  }

  traverseTree(fileTree, "");
  return path;
}

export default findPath;
