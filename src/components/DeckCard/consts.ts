export type OptionsItem = {
  name: string
  label: string
  icon: string
}

export type OptionsItems = {
  label: string
  items: OptionsItem[]
}

export const items: OptionsItems[] = [
  {
    label: 'Options',
    items: [
      {
        name: 'edit',
        label: 'Edit Course',
        icon: 'pi pi-file-edit'
      },
      {
        name: 'toggle',
        label: 'Toggle Visibility',
        icon: 'pi pi-eye'
      },
      {
        name: 'reset',
        label: 'Reset statistics',
        icon: 'pi pi-history'
      },
      {
        name: 'quit',
        label: 'Quit Course',
        icon: 'pi pi-ban'
      }
    ]
  }
]
