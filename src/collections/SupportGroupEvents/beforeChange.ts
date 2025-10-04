import { CollectionBeforeChangeHook } from 'payload'
import { SupportGroupEvent } from '@/payload-types'

const beforeChange: CollectionBeforeChangeHook<SupportGroupEvent> = async (args) => {
  const { data } = args
  data.sequence = (data.sequence ?? 0) + 1
  return data
}

export default beforeChange
