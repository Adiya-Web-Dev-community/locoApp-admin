/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // custom: "40px repeat(6, 1fr)",
        // customDashboard: "40px 2.6fr 1.4fr  1.4fr 2fr 1fr 1fr 1fr 1fr 1fr",
        // // customDashboard: "40px repeat(7, 1fr)",
        // // customDishes: "40px repeat(7, 1fr)",
        // customDishes: "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 1fr 1fr ",
        // customCategoryDishes:
        //   "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 0.8fr  ",
        // customRestaurant: "40px 1.4fr 2fr 0.8fr 1fr 1.4fr 1fr 1fr 1fr 0.6fr",
        // customOrder: "40px  1.2fr 1.6fr 2.2fr 1.4fr 0.6fr 1fr 1fr 1.4fr 0.6fr",
        // // customOrderItem: "40px  repeat(3, fr)",
        // customeOrderItem: "40px repeat(3, 1fr)",
        customeCategory: "40px 2fr  0.6fr",
      },
    },
  },
  plugins: [],
};
