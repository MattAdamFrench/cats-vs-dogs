import React from "react";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000"

function App() {
    const [selectedFile, setFile] = React.useState(null);
    const [cat, setCat] = React.useState("")
    const [dog, setDog] = React.useState("")

    const onChangeHandler = event => {
        setFile(event.target.files[0]);
    }

    const onClickHandler = event => {
        const data = new FormData();
        data.append("image", selectedFile)

        console.log(process.env)

        fetch(apiUrl + "/submit", {
            method: "post",
            mode: "cors",
            body: data
        })
            .then(res => {
                return res.json()
            })
            .then(json => {
                setCat("Cat: " + (json.cat * 100) + "%")
                setDog("Dog: " + (json.dog * 100) + "%")
            })
    }

    return (
        <div>
            <input type="file" name="file" onChange={onChangeHandler}/>
            <button onClick={onClickHandler}>
                Submit
            </button>
            <div>{cat}</div>
            <div>{dog}</div>
        </div>
    );
}

export default App;
