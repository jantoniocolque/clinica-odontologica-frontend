export default async function save(nombre,apellido,dni,fechaIngreso,calle,numero,localidad,provincia){
    let response = await fetch("http://localhost:8081/api/pacientes",{
        method: "POST",
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaIngreso:fechaIngreso,
            domicilio:{
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
