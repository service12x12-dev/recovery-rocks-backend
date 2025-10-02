import type { ClientField } from 'payload'
import React from 'react'

export default function mergeFieldStyles(
  field: ClientField | Omit<ClientField, 'type'>,
): React.CSSProperties {
  return {
    ...(field?.admin?.style || {}),
    ...(field?.admin?.width
      ? {
          '--field-width': field.admin.width,
        }
      : {
          flex: '1 1 auto',
        }),
    ...(field?.admin?.style?.flex
      ? {
          flex: field.admin.style.flex,
        }
      : {}),
  }
}
