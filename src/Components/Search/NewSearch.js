import SearchForm from "./SearchForm";

const NewSearch = (props) => {
    const saveSearchHandler = (enteredSearchData) => {
        

    }
    return (
        <div>
            <ExpenseForm onSaveSearch={saveSearchHandler} />
        </div>
    )
}