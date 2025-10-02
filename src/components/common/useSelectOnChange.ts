import { useCallback } from 'react'
import type { OptionObject } from 'payload'
import useStableCallback from '@/components/common/useStableCallback'

export type UseSelectOnChangeProps = {
  readOnly?: boolean
  disabled: boolean
  hasMany: boolean
  onChange: (_: string | string[] | null) => void
}

export default function useSelectOnChange(props: UseSelectOnChangeProps) {
  const { readOnly, disabled, hasMany, onChange: _onChange } = props

  const onChange = useStableCallback(_onChange)

  return useCallback(
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

        onChange?.(newValue)
      }
    },
    [readOnly, disabled, hasMany, onChange],
  )
}
