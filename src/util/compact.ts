export default function* compact<T>(source: Iterable<T | undefined | null>): IterableIterator<T> {
  for (const element of source) {
    if (element !== undefined && element !== null) {
      yield element
    }
  }
}
