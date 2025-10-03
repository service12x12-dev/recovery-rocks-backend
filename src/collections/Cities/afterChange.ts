import { CollectionAfterChangeHook } from 'payload'
import { City } from '@/payload-types'

/**
 * worst hack ever. dirty, abnormal and suboptimal
 * Payload CMS doesn't allow to select records by several ids (where...in) via GraphQL if the type of the ID field is number
 * We need to convert the ID into a string and STORE it alongside the normal ID to be able to query the collection by several ids
 */
const afterChange: CollectionAfterChangeHook<City> = async (args) => {
  const { doc, req } = args
  const idString = doc.id.toString(10)
  if (doc.idString !== idString) {
    // without this timeout Payload enters a deadlock
    setImmediate(() => {
      req.payload
        .update({
          collection: 'cities',
          id: doc.id,
          data: { idString },
        })
        .catch((raw) => {
          console.error(raw)
        })
    })
  }
  return doc
}

export default afterChange
