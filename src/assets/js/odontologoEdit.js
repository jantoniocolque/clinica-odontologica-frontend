export default async function edit(id,nombre,apellido,matricula){
    let response = await fetch(`http://localhost:8081/api/odontologos/`,{
        method: "PUT",
        body: JSON.stringify({
            id:id,
            nombre: nombre,
            apellido: apellido,
            matricula:matricula
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    let data = await response.json();
    return data;
}
