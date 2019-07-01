const vue = new Vue({
  el: "#app",
  data: {
    firstName: "ledi",
    lastName: "hildawan",
    fullName: "",
    age: 22,
    hobbies: [
      "sport",
      "travel",
      "read",
      "music"
    ]
  },
  computed: {
    fullName: {
      get: function () {
        return `${this.firstName} ${this.lastName}`;
      },
      set: function ({ firstName, lastName }) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
    }
  },
  methods: {
    sayHi: function () {
      console.log(`Hello I'm ${this.fullName}`)
    }
  }
});