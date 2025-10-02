'use client'
import React from 'react'
import { DefaultCell } from '@payloadcms/ui'
import type { DefaultCellComponentProps, NumberFieldClient } from 'payload'
import { NumberLabelMap } from '@/components/NumberSelect/NumberLabelMap'

export type NumberSelectCellProps = {
  numberLabelMap: NumberLabelMap
} & DefaultCellComponentProps<NumberFieldClient, number | undefined>

export default function NumberSelectCell(props: NumberSelectCellProps) {
  const { cellData: _cellData, numberLabelMap, ...rest } = props
  const cellData = _cellData in numberLabelMap ? numberLabelMap[_cellData] : _cellData
  return <DefaultCell cellData={cellData} {...rest} />
}
