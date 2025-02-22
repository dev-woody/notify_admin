// custom-context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type CustomDialogType = 'add' | 'invite' | 'edit' | 'delete'

// 제네릭 타입 T를 도입하여 currentRow의 타입을 지정할 수 있도록 함 (기본값은 any)
export interface TableContextProps<T> {
  open: CustomDialogType | null
  setOpen: (dialog: CustomDialogType | null) => void
  currentRow: T | null
  setCurrentRow: React.Dispatch<React.SetStateAction<T | null>>
}

// 제네릭을 사용하여 context의 기본 타입을 설정 (기본적으로 any로 지정)
const TableContext = createContext<TableContextProps<any> | null>(null)

export const TableProvider = <T,>({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useDialogState<CustomDialogType>(null)
  const [currentRow, setCurrentRow] = useState<T | null>(null)

  return (
    <TableContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </TableContext.Provider>
  )
}

// useCustom 훅도 제네릭을 사용하여 소비자가 타입을 지정할 수 있도록 함
export function useCustom<T>(): TableContextProps<T> {
  const context = useContext(TableContext) as TableContextProps<T>
  if (!context) {
    throw new Error('useCustom must be used within a TableProvider')
  }
  return context
}
