var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        inventory: 8,
        image: './assets/vmSocks-green-onWhite.jpg',
        description: 'A pair of warm, fuzzy socks',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        variants: [
            {
                variantId: 0001,
                variantColor: "green",
                variantImage: './assets/vmSocks-green-onWhite.jpg',
            },
            {
                variantId: 0002,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
            }
        ],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },

        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },

        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})