export default async function edit(id,nombre,apellido,dni,fechaIngreso,idDomicilio,calle,numero,localidad,provincia){
    let response = await fetch(`http://localhost:8081/api/pacientes/`,{
        method: "PUT",
        body: JSON.stringify({
            id:id,
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaIngreso:fechaIngreso,
            domicilio:{
                id:idDomicilio,
                calle:calle,
                numero:numero,
                localidad:localidad,
                provincia:provincia
            }
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    let data = await response.json();
    return data;
}
