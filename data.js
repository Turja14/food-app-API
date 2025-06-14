// data.js

const data = [
  {
    title: "Kaya Biryani House",
    imageURL: "https://example.com/images/biryani.jpg",
    foods: ["Chicken Biryani", "Beef Biryani", "Vegetable Biryani"],
    time: "30-40 min",
    pickup: true,
    delivery: true,
    isOpen: true,
    logoURL: "https://example.com/images/logo.png",
    rating: 4.5,
    ratingsCount: "150",
    code: "KAYA123",
    coords: {
      id: "loc1",
      latitude: 23.780573,
      latitudeDelta: 0.01,
      longitude: 90.400252,
      longitudeDelta: 0.01,
      address: "123 Biryani Street, Dhaka",
      title: "Kaya Biryani House"
    }
  },
  {
    title: "Turjo's Pizza",
    imageURL: "https://example.com/images/pizza.jpg",
    foods: ["Pepperoni Pizza", "Cheese Pizza", "BBQ Chicken Pizza"],
    time: "20-30 min",
    pickup: true,
    delivery: true,
    isOpen: false,
    logoURL: "https://example.com/images/pizza-logo.png",
    rating: 4.2,
    ratingsCount: "87",
    code: "PZZA456",
    coords: {
      id: "loc2",
      latitude: 23.782112,
      latitudeDelta: 0.01,
      longitude: 90.403993,
      longitudeDelta: 0.01,
      address: "456 Pizza Avenue, Dhaka",
      title: "Turjo's Pizza"
    }
  }
];

module.exports = restaurants;
