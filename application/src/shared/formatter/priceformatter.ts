export const priceFormatter = (price: number) => `${Intl.NumberFormat('ru-RU').format(price)} руб.`