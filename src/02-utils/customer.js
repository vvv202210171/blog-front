export const buildTree = function (list) {
  const parents = {};
  list
    .filter((v) => v.categoryPid === 0)
    .forEach((v) => {
      parents[v.categoryId] = v;
    });
  list
    .filter((v) => v.categoryPid !== 0)
    .forEach((element) => {
      const parent = parents[element.categoryPid];
      if (parent) {
        if (parent.children) {
          parent.children.push(element);
        } else {
          parent.children = [element];
        }
      } else {
        parents[element.categoryId] = element;
      }
    });
  return Object.values(parents);
}