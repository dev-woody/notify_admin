// CustomDialogs.tsx
import { ReactNode } from '@tanstack/react-router'
import { useCustom } from '../../../../context/table-context'
import { ActionDialog } from './action-dialog'
import { DeleteDialog } from './delete-dialog'
import { InviteDialog } from './invite-dialog'

interface DialogProps<T> {
  deleteKey: keyof T
  registerForm: ReactNode
  updateForm: ReactNode
}

type EntityWithUUID<T> = Extract<keyof T, `${string}Uuid`>

export function CustomDialogs<
  T extends Record<string, any> & {
    [K in keyof T]: K extends `${string}Uuid` ? string : never
  },
>({ deleteKey, registerForm, updateForm }: DialogProps<T>) {
  const { open, setOpen, currentRow, setCurrentRow } = useCustom<T>()

  // 특정 `UUID` 필드 찾기
  const uuidKey = Object.keys(currentRow || {}).find((key) =>
    key.endsWith('Uuid')
  ) as EntityWithUUID<T>

  return (
    <>
      <ActionDialog
        submitKey={'register'}
        key='obj-register'
        type='add'
        form={registerForm}
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <InviteDialog
        key='user-invate'
        form={registerForm}
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />
      {currentRow && uuidKey && (
        <>
          <ActionDialog
            submitKey={'update'}
            key={`custom-edit-${currentRow[uuidKey]}`}
            type='edit'
            form={updateForm}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              // setTimeout(() => {
              //   setCurrentRow(null)
              // }, 500)
            }}
            // currentRow={currentRow}
          />

          <DeleteDialog<T>
            key={`custom-delete-${currentRow[uuidKey]}`}
            open={open === 'delete'}
            deleteKey={deleteKey}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
