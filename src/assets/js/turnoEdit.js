export default async function edit(id,fecha,hora,id_paciente,id_odontologo){
    let response = await fetch(`http://localhost:8081/api/turnos/`,{
        method: "PUT",
        body: JSON.stringify({
            id:id,
            fecha: fecha,
            hora: hora,
            id_paciente: id_paciente,
            id_odontologo:id_odontologo
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    let data = await response.json();
    return data;
}
