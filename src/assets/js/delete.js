

export default async function deleteElement(id,name){
    let response = await fetch(`https://api-clinica-odontologica.herokuapp.com/api/${name}/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response;
}
        