import { useEffect, useState } from "react";

function TodosViewForm({ sortField, sortDirection, setSortField, setSortDirection, queryString, setQueryString }) {

function preventRefresh(e){e.preventDefault()};

const [localQueryString, setLocalQueryString] = useState(queryString);

useEffect(() =>{
    const debounce = setTimeout(()=>{
        setQueryString(localQueryString);
    }, 500);
    return (()=>clearTimeout(debounce));
},[localQueryString, setQueryString]);


return(
    <form onSubmit={preventRefresh}>
        <div>
            <label htmlFor="search">Search todos:</label>
            <input type="text" id="search" value={localQueryString} onChange={(e) => {setLocalQueryString(e.target.value)}}/>
            <button type="button" onClick={() => setLocalQueryString("")}>Clear</button>
        </div>
        <div>
            <label htmlFor="sortSelect">Sort by</label>
            <select name="sort" id="sortSelect" value={sortField} onChange={(event) => setSortField(event.target.value)}>
                <option value="title">Title</option>
                <option value="createdTime">Time added</option>
            </select>
            <label htmlFor="directionSelect">Direction</label>
            <select name="direction" id="directionSelect" value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </form>
);
};


export default TodosViewForm;
