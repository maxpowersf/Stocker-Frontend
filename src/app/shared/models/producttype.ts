export enum ProductType {
    ByUnit = 1,
    ByWeight100 = 2,
    ByWeight250 = 3
}

export const ProductTypeMapping = [
    { value: ProductType.ByUnit, name: 'By Unit' },
    { value: ProductType.ByWeight100, name: 'By Weight x100' },
    { value: ProductType.ByWeight250, name: 'By Weight x250' }
]