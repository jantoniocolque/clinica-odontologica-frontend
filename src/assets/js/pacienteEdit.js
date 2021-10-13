export default async function edit(id,nombre,apellido,dni,fechaAlta,idDomicilio,calle,numero,localidad,provincia){
    let response = await fetch(`https://api-clinica-odontologica.herokuapp.com/api/pacientes/`,{
        method: "PUT",
        body: JSON.stringify({
            id:id,
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaAlta:fechaAlta,
            id_domicilio:idDomicilio,
            calle:calle,
            numero:numero,
            localidad:localidad,
            provincia:provincia
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    let data = await response.json();
    return data;
}
