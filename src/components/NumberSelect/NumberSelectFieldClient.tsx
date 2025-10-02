'use client'
import React, { ComponentProps, useMemo } from 'react'
import { SelectInput, useField } from '@payloadcms/ui'
import type { NumberFieldClientComponent, OptionObject } from 'payload'
import { NumberLabelMap } from '@/components/NumberSelect/NumberLabelMap'
import mergeFieldStyles from '@/components/common/mergeFieldStyles'
import useSelectOnChange from '@/components/common/useSelectOnChange'

export type CustomNumberFieldClientProps = {
  numberLabelMap: NumberLabelMap
} & ComponentProps<NumberFieldClientComponent>

/**
 * {@link https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Select/index.tsx}
 * {@link https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Select/Input.tsx}
 */
export default function CustomNumberFieldClient(props: CustomNumberFieldClientProps) {
  const {
    field,
    field: {
      name,
      admin: { className, description, placeholder } = {},
      hasMany = false,
      label,
      localized,
      required,
    },
    onChange: onChangeFromProps,
    path: pathFromProps,
    readOnly,
    numberLabelMap,
  } = props

  const isClearable = true
  const isSortable = false

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value: _value,
  } = useField<number | number[] | undefined>({
    potentiallyStalePath: pathFromProps,
  })

  const value = useMemo(() => toSelectValue(_value), [_value])

  const onChange = useSelectOnChange({
    readOnly,
    disabled,
    hasMany,
    onChange: (newValue) => {
      const newNumberValues = fromSelectValue(newValue)
      const newNumberValue = Array.isArray(newNumberValues) ? newNumberValues[0] : newNumberValues

      if (typeof onChangeFromProps === 'function' && typeof newNumberValue === 'number') {
        onChangeFromProps(newNumberValue)
      }

      setValue(newNumberValues)
    },
  })

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  const options = useMemo(
    () =>
      Object.keys(numberLabelMap)
        .map((_) => parseInt(_, 10))
        .filter((_) => !Number.isNaN(_))
        .map((_) => ({
          value: String(_),
          label: numberLabelMap[_] ?? String(_),
        })) satisfies OptionObject[],
    [numberLabelMap],
  )

  return (
    <SelectInput
      AfterInput={AfterInput}
      BeforeInput={BeforeInput}
      className={className}
      Description={Description}
      description={description}
      Error={Error}
      hasMany={hasMany}
      isClearable={isClearable}
      isSortable={isSortable}
      Label={Label}
      label={label}
      localized={localized}
      name={name}
      onChange={onChange as (value: Option | Option[]) => void}
      options={options}
      path={path}
      placeholder={placeholder as string}
      readOnly={readOnly || disabled}
      required={required}
      showError={showError}
      style={styles}
      value={value}
    />
  )
}

function toSelectValue(_: number | number[] | undefined): string | string[] | undefined {
  return Array.isArray(_)
    ? _.length === 0
      ? undefined
      : _.map((__) => __.toString(10))
    : typeof _ === 'number'
      ? _.toString(10)
      : undefined
}

function fromSelectValue(_: string | string[] | null): number | number[] | null {
  return Array.isArray(_)
    ? _.length === 0
      ? null
      : _.map((__) => parseInt(__)).filter((__) => !Number.isNaN(__))
    : typeof _ === 'string'
      ? parseOrNull(_)
      : null
}

function parseOrNull(_: string): number | null {
  const result = parseInt(_, 10)
  if (Number.isNaN(result)) {
    return null
  }
  return result
}

export type Option<TValue = unknown> = {
  [key: string]: unknown
  id?: string
  value: TValue
}
