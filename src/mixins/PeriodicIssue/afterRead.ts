import { CollectionAfterReadHook } from 'payload'
import { PeriodicIssue } from './PeriodicIssue'

const afterRead: CollectionAfterReadHook<PeriodicIssue> = (params) => {
  const { doc } = params
  if ('annualDate' in doc) {
    const { day, month } = doc.annualDate ?? {}
    if (typeof day !== 'number' || typeof month !== 'number') {
      delete doc.annualDate
    }
  }
  return doc
}

export default afterRead
