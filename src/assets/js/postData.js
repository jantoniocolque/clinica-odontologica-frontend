export default async function postData(url,payload){
    let response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json",
            
        }
    })
    let data = await response.json();
    return data;
}


