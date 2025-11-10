export function getNextId(collection: { id: number }[]) {
  return collection.length === 0 ? 1 : Math.max(...collection.map((item) => item.id)) + 1;
}
