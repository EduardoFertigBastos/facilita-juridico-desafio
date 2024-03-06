export default function getDescendantProp(obj: any, desc: string) {
  return desc.split('.').reduce((a, b) => a[b], obj);
}
