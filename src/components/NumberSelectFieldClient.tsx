'use client'
import React, { ComponentProps, useCallback, useMemo } from 'react'
import { SelectInput, useField } from '@payloadcms/ui'
import type { ClientField, NumberFieldClientComponent, OptionObject } from 'payload'
import { NumberLabelMap } from '@/components/NumberLabelMap'

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

  const onChange = useCallback(
    (selectedOption: OptionObject | OptionObject[]) => {
      if (!readOnly || disabled) {
        let newValue: string | string[] | null = null
        if (selectedOption && hasMany) {
          if (Array.isArray(selectedOption)) {
            newValue = selectedOption.map((option) => option.value)
          } else {
            newValue = []
          }
        } else if (selectedOption && !Array.isArray(selectedOption)) {
          newValue = selectedOption.value
        }

        const newNumberValues = fromSelectValue(newValue)
        const newNumberValue = Array.isArray(newNumberValues) ? newNumberValues[0] : newNumberValues

        if (typeof onChangeFromProps === 'function' && typeof newNumberValue === 'number') {
          onChangeFromProps(newNumberValue)
        }

        setValue(newNumberValues)
      }
    },
    [readOnly, disabled, hasMany, setValue, onChangeFromProps],
  )

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  const options = useMemo(
    () =>
      range(0, 12).map((_) => ({
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

function range(from: number, to: number): number[] {
  const result = []
  for (let i = from; i < to; i++) {
    result.push(i)
  }
  return result
}

function mergeFieldStyles(field: ClientField | Omit<ClientField, 'type'>): React.CSSProperties {
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

export type Option<TValue = unknown> = {
  [key: string]: unknown
  id?: string
  value: TValue
}
