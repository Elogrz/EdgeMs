export const ApiUrls = {
  members: {
    login: 'http://localhost:8889/authentification/auth/login',
    inscription: '/authentification/auth/register',
  },
  product: {
    getAll: '/product/products',
  },
  order: {
    create: '/order/api/customer-orders'
  },
  payment: {
    pay: '/payments/api/payment'
  }
}
