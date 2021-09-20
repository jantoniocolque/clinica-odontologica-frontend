

export default async function deleteElement(id,name){
    let response = await fetch(`http://localhost:8081/api/${name}/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    return response;
}
        