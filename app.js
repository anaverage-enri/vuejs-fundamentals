var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        description: 'A pair of warm, fuzzy socks',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        variants: [
            {
                variantId: 0001,
                variantColor: "green",
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10,
            },
            {
                variantId: 0002,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0,
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

        updateProduct(index) {
            this.selectedVariant = index
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})