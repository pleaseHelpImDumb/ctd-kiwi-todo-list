import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
    padding: 10px;
    margin: 20px;
    margin-left: 5px;
    border-color: #212922;
    border-radius: 5px; 
`;

const StyledLabel = styled.label`
    font-family: 'Montserrat', sans-serif; 
`;

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
            <StyledLabel htmlFor="search">Search todos:</StyledLabel>
            <input type="text" id="search" value={localQueryString} onChange={(e) => {setLocalQueryString(e.target.value)}}/>
            <button type="button" onClick={() => setLocalQueryString("")}>Clear</button>
        </div>
        <div>
            <StyledLabel htmlFor="sortSelect">Sort by</StyledLabel>
            <StyledSelect name="sort" id="sortSelect" value={sortField} onChange={(event) => setSortField(event.target.value)}>
                <option value="title">Title</option>
                <option value="createdTime">Time added</option>
            </StyledSelect>
            <StyledLabel htmlFor="directionSelect">Direction</StyledLabel>
            <StyledSelect name="direction" id="directionSelect" value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </StyledSelect>
        </div>
    </form>
);
};


export default TodosViewForm;
