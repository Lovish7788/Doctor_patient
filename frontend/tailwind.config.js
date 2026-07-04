import plugin from "eslint-plugin-react-hooks";

export default{
    content:[
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme:{
        extend:{
            colors:{
                primary:"#5f6FFF",
                // secondary:"#333333",
                // bgLight:"#fff"
            },
        },
    },
    plugins: [],
}