Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <!-- u can use ":" instead of "v-bind:" -->
                <img :src="image" :alt="description">
            </div>

            <div class="product-info">
                <h1>{{title}}</h1>

                <!-- v-if remove/add element to the DOM
                U can use v-show to change the visibility instead if the element is frequently changed -->
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{shipping}}</p>

                <product-details :details="details"></product-details>
                
                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                    <!-- u can use "@" instead of "v-on:" -->
                </div>

                <button @click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock}">Add to Cart
                </button>
                    <!-- <button @click="removeFromCart">Remove from Cart</button> -->
            </div>

            <div>
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet!</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{review.name}}</p>
                        <p>{{review.review}}</p>
                        <p>{{review.rating}}</p>
                    </li>
                </ul>
            </div>

            <product-review @review-submitted="addReview"></product-review>
        </div>
    `,
    data() {
        return {
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },

        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },

        updateProduct(index) {
            this.selectedVariant = index
        },

        addReview(productReview) {
            this.reviews.push(productReview)
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.55
        }
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    `
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>

        <p>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name">
        </p>
        
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) this.errors.push("Name required!")
                if (!this.review) this.errors.push("Review required!")
                if (!this.rating) this.errors.push("Rating required!")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})