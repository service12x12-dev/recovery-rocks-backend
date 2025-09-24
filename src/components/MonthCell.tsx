'use client'
import React from 'react'
import { DefaultCell } from '@payloadcms/ui'
import type { DefaultCellComponentProps, NumberFieldClient } from 'payload'
import { RussianMonth } from '@/i18n/RussianMonth'

export default function MonthCell(
  props: DefaultCellComponentProps<NumberFieldClient, number | undefined>,
) {
  const { cellData: _cellData, ...rest } = props
  const cellData = _cellData in RussianMonth ? RussianMonth[_cellData] : _cellData
  return <DefaultCell cellData={cellData} {...rest} />
}
