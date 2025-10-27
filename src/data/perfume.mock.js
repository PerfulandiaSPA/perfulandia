// src/data/perfume.mock.js
export const CATEGORIES = ['Mujer', 'Hombre'];

export const PERFUMES_LIST = [
        // Categoría Mujer
        {
                id: 1,
                name: "Chanel No. 5",
                brand: "Chanel",
                price: 120000,
                category: "Mujer",
                imageUrl: "https://fimgs.net/mdimg/perfume/o.40069.jpg",
                description: "Clásico atemporal con acorde floral aldehído.", // esto no se muestra
                specs: {
                        "Concentración": "Eau de Parfum",
                        "Volumen": "100 ml",
                        "Notas de salida": "Aldehídos, ylang-ylang, neroli",
                        "Notas de corazón": "Jazmín, rosa",
                        "Notas de fondo": "Vainilla, sándalo, vetiver",
                        "Año": "1921"
                }
        },
        {
                id: 2,
                name: "Dior Sauvage",
                price: 110000,
                category: "Mujer",
                imageUrl: "https://fimgs.net/mdimg/perfume/o.48100.jpg"
        },
        {
                id: 3,
                name: "Yves Saint Laurent Black Opium",
                price: 95000,
                category: "Mujer",
                imageUrl: "https://fimgs.net/mdimg/perfume-thumbs/375x500.25324.jpg"
        },
        {
                id: 4,
                name: "Gucci Bloom",
                price: 105000,
                category: "Mujer",
                imageUrl: "https://fimgs.net/mdimg/perfume-thumbs/375x500.44894.jpg"
        },
        {
                id: 5,
                name: "Acqua di Gioia by Giorgio Armani",
                price: 85000,
                category: "Mujer",
                imageUrl: "https://fimgs.net/mdimg/perfume-thumbs/375x500.410.jpg"
        },
        {
                id: 6,
                name: "Versace Bright Crystal",
                price: 98000,
                category: "Mujer",
                imageUrl: "https://fimgs.net/mdimg/perfume/o.632.jpg"
        },

        // Categoría Hombre

        {
                id: 7,
                name: "Tom Ford Black Orchid",
                price: 130000,
                category: "Hombre",
                imageUrl: "https://fimgs.net/mdimg/perfume/o.1018.jpg"
        },
        {
                id: 8,
                name: "Jean Paul Gaultier Le Male",
                price: 88000,
                category: "Hombre",
                imageUrl: "https://fimgs.net/mdimg/perfume-thumbs/375x500.430.jpg"
        },
        {
                id: 9,
                name: "Dior Homme Intense",
                price: 115000,
                category: "Hombre",
                imageUrl: "https://i.ebayimg.com/images/g/sacAAeSw6eVol4rP/s-l225.jpg"
        },
        {
                id: 10,
                name: "Hugo Boss Bottled",
                price: 98000,
                category: "Hombre",
                imageUrl: "https://fimgs.net/mdimg/perfume-thumbs/375x500.75183.jpg"
        },
        {
                id: 11,
                name: "Acqua di Parma Colonia",
                price: 160000,
                category: "Hombre",
                imageUrl: "https://fimgs.net/mdimg/perfume/o.1681.jpg"
        },
        {
                id: 12,
                name: "Paco Rabanne 1 Million",
                price: 105000,
                category: "Hombre",
                imageUrl: "https://fimgs.net/mdimg/perfume-thumbs/375x500.60035.jpg"
        }
];
