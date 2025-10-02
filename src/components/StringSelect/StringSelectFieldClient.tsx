'use client'
import React, { ComponentProps, useMemo } from 'react'
import { SelectInput, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { StringSelectOptions } from './StringSelectOptions'
import mergeFieldStyles from '@/components/common/mergeFieldStyles'
import useSelectOnChange from '@/components/common/useSelectOnChange'

export type StringSelectFieldClientProps = {
  stringSelectOptions: StringSelectOptions
} & ComponentProps<TextFieldClientComponent>

/**
 * {@link https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Select/index.tsx}
 * {@link https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Select/Input.tsx}
 */
export default function StringSelectFieldClient(props: StringSelectFieldClientProps) {
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
    path: pathFromProps,
    readOnly,
    stringSelectOptions,
  } = props

  const isClearable = true
  const isSortable = false

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    disabled,
    path,
    setValue,
    showError,
    value,
  } = useField<string | string[] | undefined>({
    potentiallyStalePath: pathFromProps,
  })

  const onChange = useSelectOnChange({
    readOnly,
    disabled,
    hasMany,
    onChange: (newValue) => {
      setValue(newValue)
    },
  })

  const styles = useMemo(() => mergeFieldStyles(field), [field])

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
      options={stringSelectOptions}
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

export type Option<TValue = unknown> = {
  [key: string]: unknown
  id?: string
  value: TValue
}
