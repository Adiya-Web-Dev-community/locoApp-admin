/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // sans: ["system-ui", "sans-serif"],
        // Add more font families as needed
        mavenPro: ["Maven Pro", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      gridTemplateColumns: {
        // custom: "40px repeat(6, 1fr)",
        // customDashboard: "40px 2.6fr 1.4fr  1.4fr 2fr 1fr 1fr 1fr 1fr 1fr",
        // // customDashboard: "40px repeat(7, 1fr)",
        // // customDishes: "40px repeat(7, 1fr)",
        // customDishes: "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 1fr 1fr ",
        // customCategoryDishes:
        //   "40px 1fr 0.8fr 1fr 1.4fr 2fr 180px 0.8fr 0.8fr  ",
        customBlog: "40px 0.4fr 1fr 1fr 0.6fr",
        customVideo: "40px  1fr 1fr 1fr 1fr 1fr 0.6fr ",
        customProduct: "40px  1fr 1fr 2fr 1fr 1fr 0.8fr 0.6fr",
        // // customOrderItem: "40px  repeat(3, fr)",
        customCompanies:
          "40px 1.4fr 1fr 0.6fr 1fr 2fr 1fr 1fr 1fr 0.8fr 0.8fr ",
        customeCategory: "40px 3fr  0.8fr",
      },
    },
  },
  plugins: [],
};
