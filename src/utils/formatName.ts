export const formatName = (name: string) => {
  return name.length > 18 ? name.slice(0, 18) + '...' : name
}
