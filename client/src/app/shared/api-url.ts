export const ApiUrls = {
  members: {
    getAll: '/membres/all',
    login: '/membres/login',
    inscription: '/membres/inscription',
    getOne: (id: string) => `/membres/${id}`
  },
  product: {
    getAll: '/products/',
    create: (id: string) => `/prodcut/${id}`
  },
  order: {
    create: '/commandes/passerCommande'
  },
  payment: {
    pay: '/payment'
  }
}
