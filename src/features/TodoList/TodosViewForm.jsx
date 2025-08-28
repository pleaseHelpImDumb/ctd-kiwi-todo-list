function TodosViewForm({ sortField, sortDirection, setSortField, setSortDirection, queryString, setQueryString }) {

function preventRefresh(e){e.preventDefault()};

    return(
    <form onSubmit={preventRefresh}>
        <div>
            <label htmlFor="search">Search todos:</label>
            <input type="text" id="search" value={queryString} onChange={(e) => {setQueryString(e.target.value)}}/>
            <button type="button" onClick={() => setQueryString("")}>Clear</button>
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
