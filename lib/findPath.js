function findPath(fileTree, key, matcher = null) {
  let path = null;

  if (!matcher) {
    matcher = (a, b) => a == b;
  }

  function traverseTree(obj, currentPath) {
    for (const [currentKey, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}/${currentKey}` : currentKey;

      if (typeof value === "object") {
        traverseTree(value, newPath);
        continue;
      }

      if (matcher(currentKey, key)) {
        path = newPath + "." + value;
        return;
      }
    }
  }

  traverseTree(fileTree, "");
  return path;
}

export default findPath;
