const Menu = [
  { header: 'Apps' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'dashboard'
  },
  { divider: true },
  { header: 'Extras' },
  {
    title: 'Pages',
    group: 'extra',
    icon: 'list',
    items: [
      { name: 'Login', title: 'Login', component: 'login' }
    ]
  }
]
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase()
      let textB = y.title.toUpperCase()
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
    })
  }
})

export default Menu
