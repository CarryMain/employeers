import './app-info.css'

const AppInfo = ({data, increased}) => {
    const user = data.length
    return ( 
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {user}</h2>
            <h2>Премию получат: {increased}</h2>
        </div>
    )
}

export default AppInfo