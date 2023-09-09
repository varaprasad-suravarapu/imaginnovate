import React from 'react'

const tableComponent = ({weather}) => {
  return (
    weather.map(item => {
        return (
            <table cellPadding="0" cellSpacing="0" key={item.dt}>
                <thead>
                    <tr>
                        <th colSpan={2} className='date'>{item.dt_txt.split(" ")[0]}</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td colSpan={2} className='temp'>{item.main.temp}</td>
                </tr>
                <tr>
                <td colSpan={2}>
                    <table cellPadding="0" cellSpacing="0">
                        <tbody>
                            <tr>
                                <td>Min</td>
                                <td>Max</td>
                            </tr>
                            <tr>
                                <td>{item.main.temp_min}</td>
                                <td>{item.main.temp_max}</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td>{item.main.pressure}</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td>{item.main.humidity}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                </tr>
                </tbody>
            </table>
        )
    })
    
  )
}

export default tableComponent