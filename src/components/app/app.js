import { Component } from 'react'
import AppInfo from '../app-info/app-info'
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/app-filter'
import EmployeesList from '../employees-list/employees-list'
import EmployeesAddForm from '../employees-add-form/employees-add-form'
import './app.css'

class App extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: 'Herald D.', salary: 800, increase: true, like: true,  id: 1, },
                {name: 'Clara G.', salary: 3000, increase: false, like: false,  id: 2, },
                {name: 'Kirill T.', salary: 5000, increase: false, like: false,  id: 3, },
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            // const index = data.findIndex(elem => elem.id === id)
            // const before = data.slice(0, index)
            // const after = data.slice(index + 1)
            // const newArray = [...before, ...after]
            return { 
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item 
            })
        }))
    }
    
    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }


    filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }
    // onToggleIncrease = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if(item.id === id) {
    //                 return {...item, increase: !item.increase}
    //             }
    //             return item 
    //         })
    //     }))
    // }
    // onToggleLike = (id) => {
    //     this.setState(({data}) => {
    //         const idx = data.findIndex(elem => elem.id === id) 
    //         const old = data[idx] 
    //         const newItem = {...old, like: !old.like}
    //         const newArr = [...data.slice(0, idx), newItem, ...data.slice(idx + 1)]
    //         return { 
    //             data: newArr
    //         }
    //     })
    // }
    
    render() {
        const {data, term, filter} = this.state
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)
        return (
            <div className = "app">
                <AppInfo data = {data} increased = {increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect ={this.onFilterSelect}/>
                </div>
    
                <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App