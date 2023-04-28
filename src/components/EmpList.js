import React from 'react'

function emplist({ list }) {
    return (
        list.forEach((emp) => {
            <div>{emp.name}</div>
        })
    )
}

export default emplist