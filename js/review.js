// creating a form that allows users to submit a review of a product,
//  but only if they have filled out the required fields.
Vue.component('todo-review', {
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            reviews: [],
            recommend: null,
            errors: []
        }
    },
// {<input id="name" v-model="name">}Vue’s v-model directive gives us this two-way binding.
// That way, whenever something new is entered into the input,
// the data changes. And whenever the data changes, anywhere using that data will update.


    template: `
      <section>
      <main>
        <div class="grid-items-review">
          <form class="review-form" @submit.prevent="onSubmit">
            <h3 class="error" v-if="errors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </h3>
            <p>
              <label for="name">Name: </label>
              <input id="name" v-model="name" placeholder="Name...">
            </p>
            <p>
              <label for="review">Review:</label>
              <textarea id="review" v-model="review"></textarea>
            </p>
            <p>
              <label for="rating">Rating: </label>
              <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </p>
            <p>Recommend a vän?</p>
            <label>
              Yes
              <input type="radio" value="Yes" v-model="recommend">
            </label>
            <label>
              No
              <input type="radio" value="No" v-model="recommend">
            </label>
            <p>
              <input type="submit" value="Submit">
            </p>
          </form>
        </div>
        <!--      As you can see, we’ve added v-model to our input, textarea and select. -->
        <!--      Note on the select we’ve used the .number modifier (more on this below).-->
        <!--      This ensures that the data will be converted into an integer versus a string.-->
        <!--      &ndash;&gt;-->
        <!--      &lt;!&ndash; -->
        <!--      Creating a list of our reviews with v-for and printing them out using -->
        <!--      dot notation, since each review is an object.-->
        <!--      In the p tag, we’re checking if the reviews array has a length -->
        <!--      (has any todoReview objects in it), and it if does not, we’ll -->
        <!--      display: “There are no reviews yet.”-->

        <div class="grid-items-review">
          <div class="review-form">
            <h3>Reviews</h3>
            <p v-if="!reviews.length">Det finns ingen reviews än!</p>
            <ul>
              <li v-for="view in reviews">
                <p>{{ view.name }}</p>
                <p>{{ view.rating }}</p>
                <p>{{ view.review }}</p>
                <p>{{ view.recommend }}</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
      </section>
    `,

    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating && this.recommend) {
                this.reviews.push({
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                })
                // /*We’re now emitting an event announcement by the name of “review-submitted”,
                //  and passing along with it the todoReview object we just created.
                //  Use $emit to send up data from our child to our parent when an event occurs.
                //  */
                this.$emit('review-submitted', todoReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recommend required.")
            }
        }
    }
})

new Vue({
    el: '#review'
})

// /*
// Form Validation
// Often with forms, we’ll have required fields. For instance, we wouldn’t want our user to be able to submit a review if the field they were supposed to write their review in is empty.
// Fortunately, HTML5 provides you with the required attribute, like so: <input required>
// This will provide an automatic error message when the user tries to submit the form if that field is not filled in.
// */
//
// /*
// Custom validation:
// This translates to: if our name data is empty, push “Name required.”
// into our errors array. The same goes for our review and rating data.
// If either are empty, an error string will be pushed into our errors array.
// */