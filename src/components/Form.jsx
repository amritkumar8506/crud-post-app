import { useEffect, useState } from "react"
import { postData, updateData } from "../api/PostApi";

export const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {

    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })

    let isEmpty = Object.keys(updateDataApi).length === 0;


    useEffect(() => {
        updateDataApi && setAddData({
            title: updateDataApi.title || "",
            body: updateDataApi.body || ""
        })

    }, [updateDataApi])


    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            return { ...prev, [name]: value }
        })
    }


    const addPostData = async () => {
        const res = await postData(addData);
        if (res.status === 201) {
            setData([...data, res.data]);
            setAddData({ title: "", body: "" })
        }


    }

    //updatePostData

    const updatePostData = async () => {
        try {
            const res = await updateData(updateDataApi.id, addData)
            // console.log(updateData);
            setData((prev) => {
                return prev.map((curElem) => {
                    return curElem.id === res.data.id ? res.data : curElem;
                })
            })
            setAddData({ title: "", body: "" })
            setUpdateDataApi({}); // edit mode se wapas add mode


        } catch (error) {
            console.log(error);


        }
    }



    //formsubmit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value
        if (action === "Add") {
            addPostData();
        } else if (action === "Edit") {
            updatePostData();
        }


    }
    return (
<>
        <h1>CRUD Post App </h1>
        
        <form onSubmit={handleFormSubmit} >
            <div>
                <label htmlFor="title"></label>
                <input
                    type="text"
                    autoComplete="off"
                    id="title"
                    name="title"
                    placeholder="Add Title"
                    value={addData.title}
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label htmlFor="body"></label>
                <input
                    type="text"
                    autoComplete="off"
                    id="body"
                    name="body"
                    placeholder="Add Post"
                    value={addData.body}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit" value={isEmpty ? "Add" : "Edit"}>
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
        </>
    )

}